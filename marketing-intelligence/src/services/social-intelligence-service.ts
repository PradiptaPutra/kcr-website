import { prisma } from '@/lib/db';
import type { SocialPlatform } from '@prisma/client';

export interface SocialMetricSnapshot {
  platform: SocialPlatform;
  accountHandle: string;
  competitorBrand: string;
  followers: number;
  engagementRate: number;
  postingFrequency: number;
  avgViews: number;
  sentimentScore: number | null;
  topContentType: string;
  hashtagTrends: string[];
  capturedAt: Date;
}

export interface SocialAlert {
  competitorBrand: string;
  platform: SocialPlatform;
  kind: 'engagement_spike' | 'sentiment_drop' | 'follower_surge';
  severity: 'high' | 'medium' | 'low';
  message: string;
}

const CONTENT_TYPES = ['before-after', 'testimonial', 'asmr', 'product-demo', 'office-tour'];

function hashSeed(input: string): number {
  return input.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

function buildMockMetric(brand: string, platform: SocialPlatform): Omit<SocialMetricSnapshot, 'capturedAt'> {
  const seed = hashSeed(`${brand}-${platform}`);
  const followers = 3500 + (seed % 15000);
  const engagementRate = Number((1.8 + (seed % 320) / 100).toFixed(2));
  const postingFrequency = Number((2 + (seed % 30) / 10).toFixed(1));
  const avgViews = 1500 + (seed % 25000);
  const sentimentScore = Number((0.35 + (seed % 55) / 100).toFixed(2));
  const topContentType = CONTENT_TYPES[seed % CONTENT_TYPES.length];

  return {
    platform,
    accountHandle: `@${brand.toLowerCase().replace(/\s+/g, '')}${platform === 'instagram' ? 'id' : 'official'}`,
    competitorBrand: brand,
    followers,
    engagementRate,
    postingFrequency,
    avgViews,
    sentimentScore,
    topContentType,
    hashtagTrends: ['#furnitureindonesia', '#interiorkantor', '#deskksetup'],
  };
}

export async function trackSocialMetrics(): Promise<SocialMetricSnapshot[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const competitors = await prisma.competitor.findMany({
      select: {
        brand: true,
      },
    });

    if (competitors.length === 0) {
      return [];
    }

    const snapshots: SocialMetricSnapshot[] = [];

    for (const { brand } of competitors) {
      const instagram = buildMockMetric(brand, 'instagram');
      const tiktok = buildMockMetric(brand, 'tiktok');

      const now = new Date();
      snapshots.push({ ...instagram, capturedAt: now });
      snapshots.push({ ...tiktok, capturedAt: now });
    }

    await prisma.socialMetric.createMany({
      data: snapshots.map((item) => ({
        platform: item.platform,
        accountHandle: item.accountHandle,
        competitorBrand: item.competitorBrand,
        followers: item.followers,
        engagementRate: item.engagementRate,
        postingFrequency: item.postingFrequency,
        avgViews: item.avgViews,
        sentimentScore: item.sentimentScore,
        topContentType: item.topContentType,
        hashtagTrends: item.hashtagTrends,
        capturedAt: item.capturedAt,
      })),
    });

    return snapshots;
  } catch {
    return [];
  }
}

export async function getSocialMonitoringOverview(days: number = 14): Promise<{
  latest: SocialMetricSnapshot[];
  trends: Array<{ date: Date; competitorBrand: string; platform: SocialPlatform; engagementRate: number }>;
  alerts: SocialAlert[];
  summary: {
    accountsTracked: number;
    avgEngagementRate: number;
    avgSentimentScore: number;
    fastestGrowingBrand: string | null;
  };
}> {
  if (!process.env.DATABASE_URL) {
    return {
      latest: [],
      trends: [],
      alerts: [],
      summary: {
        accountsTracked: 0,
        avgEngagementRate: 0,
        avgSentimentScore: 0,
        fastestGrowingBrand: null,
      },
    };
  }

  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const recentRows = await prisma.socialMetric.findMany({
      where: {
        capturedAt: {
          gte: cutoffDate,
        },
      },
      orderBy: {
        capturedAt: 'desc',
      },
    });

    const latestByAccount = new Map<string, SocialMetricSnapshot>();
    for (const row of recentRows) {
      const key = `${row.platform}:${row.accountHandle}`;
      if (!latestByAccount.has(key)) {
        latestByAccount.set(key, {
          platform: row.platform,
          accountHandle: row.accountHandle,
          competitorBrand: row.competitorBrand,
          followers: row.followers,
          engagementRate: row.engagementRate,
          postingFrequency: row.postingFrequency,
          avgViews: row.avgViews,
          sentimentScore: row.sentimentScore,
          topContentType: row.topContentType,
          hashtagTrends: Array.isArray(row.hashtagTrends) ? (row.hashtagTrends as string[]) : [],
          capturedAt: row.capturedAt,
        });
      }
    }

    const latest = Array.from(latestByAccount.values());

    const trends = recentRows.map((row) => ({
      date: row.capturedAt,
      competitorBrand: row.competitorBrand,
      platform: row.platform,
      engagementRate: row.engagementRate,
    }));

    const alerts: SocialAlert[] = latest
      .flatMap((row) => {
        const out: SocialAlert[] = [];

        if (row.engagementRate >= 4.5) {
          out.push({
            competitorBrand: row.competitorBrand,
            platform: row.platform,
            kind: 'engagement_spike',
            severity: 'high',
            message: `${row.competitorBrand} memiliki engagement tinggi (${row.engagementRate}%) di ${row.platform}.`,
          });
        }

        if ((row.sentimentScore ?? 1) <= 0.4) {
          out.push({
            competitorBrand: row.competitorBrand,
            platform: row.platform,
            kind: 'sentiment_drop',
            severity: 'medium',
            message: `Sentimen ${row.competitorBrand} menurun (${row.sentimentScore}) di ${row.platform}.`,
          });
        }

        if (row.followers >= 12000) {
          out.push({
            competitorBrand: row.competitorBrand,
            platform: row.platform,
            kind: 'follower_surge',
            severity: 'medium',
            message: `${row.competitorBrand} menembus ${row.followers} followers di ${row.platform}.`,
          });
        }

        return out;
      })
      .slice(0, 8);

    const avgEngagementRate =
      latest.length > 0
        ? Number((latest.reduce((sum, row) => sum + row.engagementRate, 0) / latest.length).toFixed(2))
        : 0;

    const sentimentRows = latest.filter((row) => row.sentimentScore !== null);
    const avgSentimentScore =
      sentimentRows.length > 0
        ? Number(
            (
              sentimentRows.reduce((sum, row) => sum + (row.sentimentScore ?? 0), 0) / sentimentRows.length
            ).toFixed(2)
          )
        : 0;

    const groupedByBrand = new Map<string, number>();
    for (const row of latest) {
      groupedByBrand.set(row.competitorBrand, (groupedByBrand.get(row.competitorBrand) ?? 0) + row.engagementRate);
    }

    let fastestGrowingBrand: string | null = null;
    let bestScore = -Infinity;
    for (const [brand, score] of groupedByBrand.entries()) {
      if (score > bestScore) {
        fastestGrowingBrand = brand;
        bestScore = score;
      }
    }

    return {
      latest,
      trends,
      alerts,
      summary: {
        accountsTracked: latest.length,
        avgEngagementRate,
        avgSentimentScore,
        fastestGrowingBrand,
      },
    };
  } catch {
    return {
      latest: [],
      trends: [],
      alerts: [],
      summary: {
        accountsTracked: 0,
        avgEngagementRate: 0,
        avgSentimentScore: 0,
        fastestGrowingBrand: null,
      },
    };
  }
}
