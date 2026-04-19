import { chromium } from 'playwright';
import type { MarketplacePlatform, ScrapedListing, TrendData, TrendStatus } from '@/lib/types/marketing';

const SEARCH_URLS: Record<MarketplacePlatform, (keyword: string) => string> = {
  tokopedia: (keyword) => `https://www.tokopedia.com/search?q=${encodeURIComponent(keyword)}`,
  shopee: (keyword) => `https://shopee.co.id/search?keyword=${encodeURIComponent(keyword)}`,
  tiktok: (keyword) => `https://www.tiktok.com/search?q=${encodeURIComponent(keyword)}`,
};

const TITLE_SELECTORS: Record<MarketplacePlatform, string> = {
  tokopedia: '[data-testid="spnSRPProdName"]',
  shopee: '[data-sqe="name"], .line-clamp-2',
  tiktok: '[data-e2e="search-card-desc"]',
};

function waitRandom(minMs: number, maxMs: number): Promise<void> {
  const duration = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function toStatus(growth: number): TrendStatus {
  if (growth >= 40) {
    return 'viral';
  }

  if (growth >= 12) {
    return 'rising';
  }

  return 'stable';
}

function toTrend(platform: MarketplacePlatform, keyword: string, count: number): TrendData {
  const growth = Number(Math.min(60, count * 6).toFixed(1));

  return {
    id: `${platform}-${keyword.toLowerCase().replace(/\s+/g, '-')}`,
    keyword,
    category: 'Marketplace Search',
    searchVolume: count * 110,
    growth,
    platforms: [platform],
    status: toStatus(growth),
  };
}

function parseSalesVolume(text: string): number {
  const normalized = text.toLowerCase();
  const matched = normalized.match(/(\d+[\.,]?\d*)\s*(rb|k|jt|m|terjual|sold)/);

  if (!matched) {
    return 0;
  }

  const base = Number(matched[1].replace(',', '.'));
  if (!Number.isFinite(base)) {
    return 0;
  }

  const unit = matched[2];
  if (unit === 'rb' || unit === 'k') {
    return Math.round(base * 1000);
  }

  if (unit === 'jt' || unit === 'm') {
    return Math.round(base * 1_000_000);
  }

  return Math.round(base);
}

export async function scrapeMarketplace(
  platform: MarketplacePlatform,
  keyword: string,
  maxResults = 12
): Promise<ScrapedListing[]> {
  const proxyServer = process.env.SCRAPER_PROXY_SERVER;
  const proxyUsername = process.env.SCRAPER_PROXY_USERNAME;
  const proxyPassword = process.env.SCRAPER_PROXY_PASSWORD;

  const browser = await chromium.launch({
    headless: true,
    proxy: proxyServer
      ? {
          server: proxyServer,
          username: proxyUsername,
          password: proxyPassword,
        }
      : undefined,
  });

  try {
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      viewport: { width: 1366, height: 900 },
    });
    const page = await context.newPage();

    await page.goto(SEARCH_URLS[platform](keyword), {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });

    // Human-like pacing helps reduce immediate anti-bot triggers.
    await waitRandom(700, 1700);
    await page.mouse.wheel(0, 900);
    await waitRandom(600, 1300);
    await page.mouse.wheel(0, 900);
    await waitRandom(800, 1800);

    const selector = TITLE_SELECTORS[platform];
    await page.waitForSelector(selector, { timeout: 12000 });

    const titles = await page.locator(selector).allTextContents();
    const salesSignals = await page
      .locator('[class*="sold"], [class*="sales"], [data-testid*="sold"], [data-testid*="sales"]')
      .allTextContents();
    const links = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors
        .map((anchor) => ({
          href: (anchor as HTMLAnchorElement).href,
          text: (anchor.textContent ?? '').trim(),
        }))
        .filter((entry) => entry.text.length > 12)
    );

    const listings: ScrapedListing[] = titles
      .map((title, index) => ({
        title: title.trim(),
        priceText: 'N/A',
        url: links[index]?.href ?? SEARCH_URLS[platform](keyword),
        salesVolume: parseSalesVolume(salesSignals[index] ?? ''),
      }))
      .filter((item) => item.title.length > 0)
      .slice(0, maxResults);

    return listings;
  } finally {
    await browser.close();
  }
}

export async function scrapeMarketplaceTrend(
  platform: MarketplacePlatform,
  keyword: string,
  maxResults = 12
): Promise<{ trend: TrendData; listings: ScrapedListing[] }> {
  try {
    const listings = await scrapeMarketplace(platform, keyword, maxResults);

    return {
      trend: toTrend(platform, keyword, listings.length),
      listings,
    };
  } catch {
    return {
      trend: toTrend(platform, keyword, 0),
      listings: [],
    };
  }
}
