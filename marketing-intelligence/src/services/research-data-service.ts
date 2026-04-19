import kcrContext from '@/lib/data/kcr-context.json';
import type { TrendData, MarketplacePlatform } from '@/lib/types/marketing';
import { fetchGoogleTrends } from '@/services/google-trends-service';
import { scrapeMarketplaceTrend } from '@/services/marketplace-scraper-service';
import { calculateScoresFromTrends } from '@/services/intelligence-engine-service';
import { saveProductScores, saveTrendSnapshots } from '@/services/data-store-service';

const MARKETPLACES: MarketplacePlatform[] = ['tokopedia', 'shopee', 'tiktok'];

function mergeTrendRows(rows: TrendData[]): TrendData[] {
  const merged = new Map<string, TrendData>();

  for (const row of rows) {
    const key = row.keyword.toLowerCase();
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, row);
      continue;
    }

    const platformSet = new Set([...existing.platforms, ...row.platforms]);
    const growth = Number(((existing.growth + row.growth) / 2).toFixed(1));

    merged.set(key, {
      ...existing,
      searchVolume: Math.max(existing.searchVolume, row.searchVolume),
      growth,
      platforms: Array.from(platformSet),
      status: growth >= 40 ? 'viral' : growth >= 12 ? 'rising' : 'stable',
    });
  }

  return Array.from(merged.values()).sort((a, b) => b.growth - a.growth);
}

function getDefaultKeywords(): string[] {
  return [
    ...kcrContext.products.slice(0, 3),
    'ergonomic chair',
    'modular workstation office',
  ];
}

export async function getResearchTrends(options?: {
  keywords?: string[];
  deepScan?: boolean;
  geo?: string;
  timeframe?: string;
}): Promise<{ trends: TrendData[]; scannedAt: string }> {
  const keywords = options?.keywords?.length ? options.keywords : getDefaultKeywords();

  const googleRows = await fetchGoogleTrends(keywords, {
    geo: options?.geo,
    timeframe: options?.timeframe,
  });

  if (!options?.deepScan) {
    const merged = mergeTrendRows(googleRows);
    await saveTrendSnapshots(merged);

    return {
      trends: merged,
      scannedAt: new Date().toISOString(),
    };
  }

  const marketplaceResults = await Promise.all(
    MARKETPLACES.flatMap((platform) =>
      keywords.slice(0, 3).map(async (keyword) => {
        return scrapeMarketplaceTrend(platform, keyword);
      })
    )
  );

  const marketplaceRows = marketplaceResults.map((item) => item.trend);
  const mergedRows = mergeTrendRows([...googleRows, ...marketplaceRows]);

  await saveTrendSnapshots(mergedRows);

  const listingCounts = new Map<string, number>();
  for (const item of marketplaceResults) {
    const key = item.trend.keyword.toLowerCase();
    const current = listingCounts.get(key) ?? 0;
    listingCounts.set(key, current + item.listings.length);
  }

  const scores = calculateScoresFromTrends(
    mergedRows.map((trend) => ({
      trend,
      activeSellers: listingCounts.get(trend.keyword.toLowerCase()) ?? 0,
      adMomentum: trend.growth,
    }))
  );
  await saveProductScores(scores);

  return {
    trends: mergedRows,
    scannedAt: new Date().toISOString(),
  };
}
