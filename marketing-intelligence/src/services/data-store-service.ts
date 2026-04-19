import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import type {
  AdCreative,
  CompetitorAnalysis,
  DashboardOverviewPayload,
  ProductScoreBreakdown,
  TrendData,
} from '@/lib/types/marketing';

function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function saveTrendSnapshots(rows: TrendData[]): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    await prisma.$transaction(
      rows.flatMap((row) =>
        row.platforms.map((platform) =>
          prisma.trendSnapshot.create({
            data: {
              keyword: row.keyword,
              category: row.category,
              searchVolume: row.searchVolume,
              growth: row.growth,
              platform,
              status: row.status,
            },
          })
        )
      )
    );
  } catch {
    // Keep app resilient when DB is unavailable.
  }
}

export async function saveProductScores(rows: ProductScoreBreakdown[]): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    await prisma.$transaction(
      rows.map((row) =>
        prisma.productScore.create({
          data: {
            keyword: row.keyword,
            demandScore: row.demandScore,
            competitionScore: row.competitionScore,
            viralityScore: row.viralityScore,
            totalScore: row.totalScore,
            recommendation: row.recommendation,
            contributors: {
              demand: row.demandScore,
              competition: row.competitionScore,
              virality: row.viralityScore,
            } as Prisma.InputJsonValue,
          },
        })
      )
    );
  } catch {
    // Keep app resilient when DB is unavailable.
  }
}

export async function saveCompetitorAnalysis(analysis: CompetitorAnalysis): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    const competitor = await prisma.competitor.upsert({
      where: {
        url: analysis.url,
      },
      update: {
        brand: analysis.brand,
        pricing: analysis.pricing,
        avgPrice: analysis.avgPrice,
        salesSignal: analysis.salesSignal,
        strengths: analysis.strengths as Prisma.InputJsonValue,
        weaknesses: analysis.weaknesses as Prisma.InputJsonValue,
        adHooks: analysis.adHooks as Prisma.InputJsonValue,
      },
      create: {
        url: analysis.url,
        brand: analysis.brand,
        pricing: analysis.pricing,
        avgPrice: analysis.avgPrice,
        salesSignal: analysis.salesSignal,
        strengths: analysis.strengths as Prisma.InputJsonValue,
        weaknesses: analysis.weaknesses as Prisma.InputJsonValue,
        adHooks: analysis.adHooks as Prisma.InputJsonValue,
      },
    });

    await prisma.competitorProduct.deleteMany({
      where: {
        competitorId: competitor.id,
      },
    });

    if (analysis.products.length > 0) {
      await prisma.competitorProduct.createMany({
        data: analysis.products.map((item) => ({
          competitorId: competitor.id,
          title: item.title,
          priceText: item.priceText,
          salesVolume: item.salesVolume ?? 0,
          url: item.url,
        })),
      });
    }
  } catch {
    // Keep app resilient when DB is unavailable.
  }
}

export async function saveAdCreatives(keyword: string, creatives: AdCreative[]): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    for (const creative of creatives) {
      const competitorBrand = creative.competitorBrand ?? creative.advertiser;
      const startedAt = new Date(creative.startedAt);
      const firstSeen = creative.firstSeen ? new Date(creative.firstSeen) : startedAt;
      const lastSeen = creative.lastSeen ? new Date(creative.lastSeen) : new Date();

      const existing = await prisma.adCreative.findFirst({
        where: {
          externalId: creative.id,
          platform: creative.platform,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (existing) {
        await prisma.adCreative.update({
          where: {
            id: existing.id,
          },
          data: {
            advertiser: creative.advertiser,
            competitor_brand: competitorBrand,
            status: creative.status,
            hook: creative.hook,
            copy: creative.copy,
            cta: creative.cta,
            keyword,
            startedAt,
            sourceUrl: creative.sourceUrl,
            lastSeen,
            estimatedMonthlySpend: creative.estimatedMonthlySpend,
          },
        });
      } else {
        await prisma.adCreative.create({
          data: {
            externalId: creative.id,
            platform: creative.platform,
            advertiser: creative.advertiser,
            competitor_brand: competitorBrand,
            status: creative.status,
            hook: creative.hook,
            copy: creative.copy,
            cta: creative.cta,
            keyword,
            startedAt,
            firstSeen,
            lastSeen,
            sourceUrl: creative.sourceUrl,
            estimatedMonthlySpend: creative.estimatedMonthlySpend,
          },
        });
      }
    }
  } catch {
    // Keep app resilient when DB is unavailable.
  }
}

export async function saveWeeklyReport(input: {
  summary: string;
  topKeyword: string;
  topScore: number;
  strategy: Record<string, unknown>;
  reportDate: Date;
}): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    await prisma.weeklyReport.upsert({
      where: {
        reportDate: input.reportDate,
      },
      update: {
        summary: input.summary,
        topKeyword: input.topKeyword,
        topScore: input.topScore,
        strategy: input.strategy as Prisma.InputJsonValue,
      },
      create: {
        summary: input.summary,
        topKeyword: input.topKeyword,
        topScore: input.topScore,
        strategy: input.strategy as Prisma.InputJsonValue,
        reportDate: input.reportDate,
      },
    });
  } catch {
    // Keep app resilient when DB is unavailable.
  }
}

export async function getLatestProductScores(limit = 10): Promise<ProductScoreBreakdown[]> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  try {
    const rows = await prisma.productScore.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return rows.map((row) => ({
      keyword: row.keyword,
      demandScore: row.demandScore,
      competitionScore: row.competitionScore,
      viralityScore: row.viralityScore,
      totalScore: row.totalScore,
      recommendation: row.recommendation,
    }));
  } catch {
    return [];
  }
}

export async function upsertAlertRule(input: {
  keyword: string;
  growthThreshold: number;
  enabled?: boolean;
}): Promise<{ id: string; keyword: string; growthThreshold: number; enabled: boolean } | null> {
  if (!hasDatabaseUrl()) {
    return null;
  }

  try {
    const row = await prisma.alertRule.upsert({
      where: {
        keyword_type: {
          keyword: input.keyword,
          type: 'PRICE_DROP',
        },
      },
      update: {
        enabled: input.enabled ?? true,
      },
      create: {
        keyword: input.keyword,
        type: 'PRICE_DROP',
        growthThreshold: input.growthThreshold,
        enabled: input.enabled ?? true,
      },
    });

    return {
      id: row.id,
      keyword: row.keyword,
      growthThreshold: row.growthThreshold ?? 0,
      enabled: row.enabled,
    };
  } catch {
    return null;
  }
}

export async function listAlertRules(): Promise<
  { id: string; keyword: string; growthThreshold: number; enabled: boolean }[]
> {
  if (!hasDatabaseUrl()) {
    return [];
  }

  try {
    const rows = await prisma.alertRule.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return rows.map((row) => ({
      id: row.id,
      keyword: row.keyword,
      growthThreshold: row.growthThreshold ?? 0,
      enabled: row.enabled,
    }));
  } catch {
    return [];
  }
}

export async function recordAlertEvent(input: {
  alertRuleId: string;
  keyword: string;
  growth: number;
  delivered: boolean;
  payload: Record<string, unknown>;
}): Promise<void> {
  if (!hasDatabaseUrl()) {
    return;
  }

  try {
    await prisma.alertEvent.create({
      data: {
        alertRuleId: input.alertRuleId,
        type: 'RANK_CHANGE',
        keyword: input.keyword,
        severity: 'MEDIUM',
        message: `Growth alert for ${input.keyword}`,
        payload: input.payload as Prisma.InputJsonValue,
        metadata: { growth: input.growth },
      },
    });
  } catch {
    // Keep app resilient when DB is unavailable.
  }
}

export async function getDashboardOverviewData(): Promise<DashboardOverviewPayload> {
  if (!hasDatabaseUrl()) {
    return {
      metrics: {
        marketDemandGrowth: 0,
        adHookEfficiency: 0,
        competitorVolume: 0,
        totalSearchVolume: 0,
      },
      trendVelocity: [45, 55, 50, 62, 68, 60, 70],
      insights: [
        {
          type: 'opportunity',
          title: 'Data Pipeline Ready',
          desc: 'Connect DATABASE_URL to begin collecting real trend history.',
        },
        {
          type: 'warning',
          title: 'No Database Connected',
          desc: 'Dashboard is using fallback metrics until PostgreSQL is configured.',
        },
        {
          type: 'action',
          title: 'Run Deep Scan',
          desc: 'Trigger deep scan to generate initial product scores and reports.',
        },
      ],
      winningProducts: [],
      adPulse: {
        avgCtr: 0,
        avgRoas: 0,
      },
    };
  }

  try {
    const [recentTrends, recentScores, competitors, recentAds] = await Promise.all([
      prisma.trendSnapshot.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 40,
      }),
      prisma.productScore.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 20,
      }),
      prisma.competitor.count(),
      prisma.adCreative.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 20,
      }),
    ]);

    const averageGrowth = recentTrends.length
      ? recentTrends.reduce((sum, item) => sum + item.growth, 0) / recentTrends.length
      : 0;

    const totalSearchVolume = recentTrends.reduce((sum, item) => sum + item.searchVolume, 0);
    const adHookEfficiency = recentScores.length
      ? recentScores.reduce((sum, item) => sum + item.viralityScore, 0) / recentScores.length
      : 0;

    const trendVelocity = recentTrends.slice(0, 14).map((item) => Math.min(100, Math.max(20, item.growth + 50)));

    const winningProducts = recentScores.slice(0, 3).map((item) => ({
      name: item.keyword,
      score: item.totalScore,
      trend: item.demandScore - item.competitionScore,
    }));

    return {
      metrics: {
        marketDemandGrowth: Number(averageGrowth.toFixed(1)),
        adHookEfficiency: Number((adHookEfficiency * 10).toFixed(1)),
        competitorVolume: competitors,
        totalSearchVolume,
      },
      trendVelocity: trendVelocity.length ? trendVelocity : [40, 48, 52, 60, 58, 64, 72],
      insights: [
        {
          type: averageGrowth >= 15 ? 'opportunity' : 'action',
          title: averageGrowth >= 15 ? 'Demand Momentum Rising' : 'Demand Momentum Stable',
          desc: `Average trend growth is ${averageGrowth.toFixed(1)}% from latest snapshots.`,
        },
        {
          type: recentAds.length > 12 ? 'warning' : 'action',
          title: recentAds.length > 12 ? 'Competitor Ad Pressure' : 'Ad Window Open',
          desc:
            recentAds.length > 12
              ? 'Competitors are running high ad volume. Prioritize creative differentiation.'
              : 'Ad market pressure is moderate. Ideal window to test new creative hooks.',
        },
        {
          type: 'action',
          title: 'Weekly Scan Schedule',
          desc: 'Cron endpoint is ready to run every Monday 08:00 WIB.',
        },
      ],
      winningProducts,
      adPulse: {
        avgCtr: Number((3.2 + (recentAds.length / 20) * 2.5).toFixed(1)),
        avgRoas: Number((2.8 + (winningProducts[0]?.score ?? 0) / 2).toFixed(1)),
      },
    };
  } catch {
    return {
      metrics: {
        marketDemandGrowth: 0,
        adHookEfficiency: 0,
        competitorVolume: 0,
        totalSearchVolume: 0,
      },
      trendVelocity: [45, 55, 50, 62, 68, 60, 70],
      insights: [
        {
          type: 'warning',
          title: 'Database Read Failed',
          desc: 'Please run migrations and ensure PostgreSQL is reachable.',
        },
        {
          type: 'action',
          title: 'Check Prisma Migration',
          desc: 'Run prisma:migrate after setting DATABASE_URL.',
        },
        {
          type: 'action',
          title: 'Run Deep Scan',
          desc: 'Rebuild baseline once database connectivity is restored.',
        },
      ],
      winningProducts: [],
      adPulse: {
        avgCtr: 0,
        avgRoas: 0,
      },
    };
  }
}
