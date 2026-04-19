import { prisma } from '@/lib/db';
import type { CompetitorAdSpendIntel } from '@/lib/types/marketing';

export async function getCompetitorAdSpendIntelligence(days: number = 30): Promise<{
  competitors: CompetitorAdSpendIntel[];
  summary: {
    totalEstimatedSpend: number;
    totalActiveAds: number;
    topSpender: string | null;
    budgetShiftAlerts: Array<{ competitorBrand: string; budgetShiftPercent: number }>;
  };
}> {
  if (!process.env.DATABASE_URL) {
    return {
      competitors: [],
      summary: {
        totalEstimatedSpend: 0,
        totalActiveAds: 0,
        topSpender: null,
        budgetShiftAlerts: [],
      },
    };
  }

  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    const rows = await prisma.adCreative.findMany({
      where: {
        competitor_brand: { not: null },
        createdAt: { gte: cutoff },
      },
      orderBy: { createdAt: 'desc' },
    });

    const byBrand = new Map<string, typeof rows>();
    for (const row of rows) {
      const brand = row.competitor_brand ?? row.advertiser;
      const list = byBrand.get(brand) ?? [];
      list.push(row);
      byBrand.set(brand, list);
    }

    const now = Date.now();
    const msInDay = 1000 * 60 * 60 * 24;

    const competitors: CompetitorAdSpendIntel[] = Array.from(byBrand.entries()).map(([brand, brandRows]) => {
      const activeRows = brandRows.filter((r) => r.status === 'active');
      const newAds7d = brandRows.filter((r) => now - r.createdAt.getTime() <= msInDay * 7).length;
      const previousAds7d = brandRows.filter((r) => {
        const ageDays = (now - r.createdAt.getTime()) / msInDay;
        return ageDays > 7 && ageDays <= 14;
      }).length;

      const estimatedMonthlySpend = brandRows.reduce((sum, row) => {
        if (typeof row.estimatedMonthlySpend === 'number') {
          return sum + row.estimatedMonthlySpend;
        }
        const inferred = row.platform === 'meta' ? 900 : 650;
        return sum + inferred;
      }, 0);

      const metaCount = brandRows.filter((r) => r.platform === 'meta').length;
      const tiktokCount = brandRows.filter((r) => r.platform === 'tiktok').length;
      const dominantPlatform =
        metaCount === tiktokCount ? 'mixed' : metaCount > tiktokCount ? 'meta' : 'tiktok';

      const anglePool = brandRows.map((r) => r.hook).filter(Boolean);
      const uniqueAngles = Array.from(new Set(anglePool)).slice(0, 3);

      const budgetShiftPercent =
        previousAds7d > 0 ? Number((((newAds7d - previousAds7d) / previousAds7d) * 100).toFixed(1)) : 0;

      return {
        competitorBrand: brand,
        activeAds: activeRows.length,
        newAds7d,
        estimatedMonthlySpend: Number(estimatedMonthlySpend.toFixed(2)),
        dominantPlatform,
        topAngles: uniqueAngles,
        budgetShiftPercent,
      };
    });

    const sorted = competitors.sort((a, b) => b.estimatedMonthlySpend - a.estimatedMonthlySpend);

    const totalEstimatedSpend = sorted.reduce((sum, row) => sum + row.estimatedMonthlySpend, 0);
    const totalActiveAds = sorted.reduce((sum, row) => sum + row.activeAds, 0);
    const topSpender = sorted[0]?.competitorBrand ?? null;
    const budgetShiftAlerts = sorted
      .filter((row) => Math.abs(row.budgetShiftPercent) >= 30)
      .map((row) => ({
        competitorBrand: row.competitorBrand,
        budgetShiftPercent: row.budgetShiftPercent,
      }));

    return {
      competitors: sorted,
      summary: {
        totalEstimatedSpend: Number(totalEstimatedSpend.toFixed(2)),
        totalActiveAds,
        topSpender,
        budgetShiftAlerts,
      },
    };
  } catch {
    return {
      competitors: [],
      summary: {
        totalEstimatedSpend: 0,
        totalActiveAds: 0,
        topSpender: null,
        budgetShiftAlerts: [],
      },
    };
  }
}
