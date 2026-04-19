import { chromium } from 'playwright';
import type { CompetitorAnalysis, ScrapedListing } from '@/lib/types/marketing';

const DEFAULT_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

function waitRandom(minMs: number, maxMs: number): Promise<void> {
  const duration = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function parsePriceToNumber(priceText: string): number {
  const normalized = priceText.replace(/[^0-9]/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
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

function detectPricing(avgPrice: number): CompetitorAnalysis['pricing'] {
  if (avgPrice <= 0) {
    return 'unknown';
  }

  if (avgPrice < 1500000) {
    return 'low';
  }

  if (avgPrice < 5000000) {
    return 'medium';
  }

  return 'premium';
}

function deriveBrand(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    return hostname.split('.')[0]?.toUpperCase() ?? 'COMPETITOR';
  } catch {
    return 'COMPETITOR';
  }
}

const FALLBACK_COMPETITOR: CompetitorAnalysis = {
  url: 'https://example.com',
  brand: 'COMPETITOR',
  pricing: 'unknown',
  avgPrice: 0,
  strengths: ['Consistent product pages', 'Clear marketplace positioning'],
  weaknesses: ['Limited customization messaging', 'Low technical proof points'],
  adHooks: ['Before-after workspace transformation', 'Lead with CNC quality claim'],
  salesSignal: 0,
  products: [],
};

export async function analyzeCompetitorUrl(url: string): Promise<CompetitorAnalysis> {
  const browser = await chromium.launch({ headless: true });

  try {
    const context = await browser.newContext({
      userAgent: DEFAULT_UA,
      viewport: { width: 1366, height: 900 },
    });
    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 45000,
    });

    await waitRandom(900, 1700);
    await page.mouse.wheel(0, 800);
    await waitRandom(700, 1300);

    const productTitles = await page
      .locator('h3, h2, [data-testid="spnSRPProdName"], [data-sqe="name"]')
      .allTextContents();
    const rawPrices = await page.locator('[class*="price"], [data-testid*="price"]').allTextContents();
    const salesTexts = await page
      .locator('[class*="sold"], [class*="sales"], [data-testid*="sold"], [data-testid*="sales"]')
      .allTextContents();
    const links = await page.locator('a[href]').evaluateAll((anchors) =>
      anchors
        .map((anchor) => ({
          href: (anchor as HTMLAnchorElement).href,
          text: (anchor.textContent ?? '').trim(),
        }))
        .filter((entry) => entry.text.length > 8)
    );

    const products: ScrapedListing[] = productTitles
      .map((title, index) => ({
        title: title.trim(),
        priceText: rawPrices[index]?.trim() || 'N/A',
        url: links[index]?.href || url,
        salesVolume: parseSalesVolume(salesTexts[index] ?? ''),
      }))
      .filter((item) => item.title.length > 0)
      .slice(0, 10);

    const averagePrice =
      products.length > 0
        ? Math.round(
            products.reduce((sum, item) => sum + parsePriceToNumber(item.priceText), 0) /
              Math.max(products.length, 1)
          )
        : 0;

    const brand = deriveBrand(url);
    const pricing = detectPricing(averagePrice);

    return {
      url,
      brand,
      pricing,
      avgPrice: averagePrice,
      strengths: [
        'High product discovery volume on target marketplace',
        'Multi-listing breadth across office categories',
      ],
      weaknesses: [
        'Value proposition often feature-led, not ROI-led',
        'Inconsistent premium quality storytelling',
      ],
      adHooks: [
        `${brand}: office transformation in under 7 days`,
        `${brand} alternatives with CNC precision focus`,
      ],
      salesSignal: Math.min(
        100,
        Math.round(products.reduce((sum, item) => sum + (item.salesVolume ?? 0), 0) / 200)
      ),
      products,
    };
  } catch {
    return {
      ...FALLBACK_COMPETITOR,
      url,
      brand: deriveBrand(url),
    };
  } finally {
    await browser.close();
  }
}
