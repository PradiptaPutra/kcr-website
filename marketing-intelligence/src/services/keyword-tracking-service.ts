import { prisma } from '@/lib/db';
export interface KeywordRankingData {
  keyword: string;
  competitorBrand: string;
  competitorUrl: string;
  position: number;
  previousPos: number | null;
  changePercent: number | null;
  capturedAt: Date;
}

export interface RankingAlert {
  keyword: string;
  competitor: string;
  oldPosition: number;
  newPosition: number;
  change: 'improved' | 'declined';
  changeAmount: number;
}

/**
 * Track keyword rankings for all target competitors
 * Simulates SERP results (in production, would use SerpAPI or similar)
 */
export async function trackKeywordRankings(keywords: string[]): Promise<KeywordRankingData[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const competitors = await prisma.competitor.findMany({
      select: { id: true, brand: true, url: true },
    });

    if (competitors.length === 0) {
      return [];
    }

    const rankings: KeywordRankingData[] = [];

    for (const keyword of keywords) {
      // In production, this would call SerpAPI or Google Search Console
      // For now, simulate with deterministic position logic
      const simulatedResults = simulateSerpResults(keyword, competitors);

      for (const result of simulatedResults) {
        // Get the previous position for this keyword+competitor combination
        const previousRanking = await prisma.keywordRanking.findFirst({
          where: {
            keyword,
            competitorBrand: result.competitorBrand,
          },
          orderBy: { capturedAt: 'desc' },
          take: 1,
        });

        const previousPos = previousRanking?.position ?? null;
        const changePercent =
          previousPos && previousPos > 0
            ? Number((((result.position - previousPos) / previousPos) * 100).toFixed(1))
            : null;

        rankings.push({
          keyword,
          competitorBrand: result.competitorBrand,
          competitorUrl: result.competitorUrl,
          position: result.position,
          previousPos,
          changePercent,
          capturedAt: new Date(),
        });
      }
    }

    // Persist to database
    for (const ranking of rankings) {
      await prisma.keywordRanking.create({
        data: {
          keyword: ranking.keyword,
          competitorBrand: ranking.competitorBrand,
          competitorUrl: ranking.competitorUrl,
          position: ranking.position,
          previousPos: ranking.previousPos,
          changePercent: ranking.changePercent,
          platform: 'google',
          region: 'ID',
          capturedAt: ranking.capturedAt,
        },
      });
    }

    return rankings;
  } catch {
    return [];
  }
}

/**
 * Get ranking trends for a keyword
 */
export async function getKeywordRankingTrend(
  keyword: string,
  competitorBrand?: string,
  days: number = 30
): Promise<Array<{ date: Date; position: number; competitorBrand: string }>> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const rankings = await prisma.keywordRanking.findMany({
      where: {
        keyword,
        ...(competitorBrand && { competitorBrand }),
        capturedAt: {
          gte: cutoffDate,
        },
      },
      orderBy: { capturedAt: 'asc' },
      select: {
        capturedAt: true,
        position: true,
        competitorBrand: true,
      },
    });

    return rankings.map((r) => ({
      date: r.capturedAt,
      position: r.position,
      competitorBrand: r.competitorBrand,
    }));
  } catch {
    return [];
  }
}

/**
 * Get current rankings for a keyword
 */
export async function getCurrentKeywordRankings(keyword: string): Promise<
  Array<{
    competitorBrand: string;
    competitorUrl: string;
    position: number;
    previousPos: number | null;
    changePercent: number | null;
  }>
> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    // Get the most recent ranking for each competitor for this keyword
    const rankings = await prisma.keywordRanking.findMany({
      where: { keyword },
      orderBy: { capturedAt: 'desc' },
      distinct: ['competitorBrand'],
      select: {
        competitorBrand: true,
        competitorUrl: true,
        position: true,
        previousPos: true,
        changePercent: true,
      },
    });

    return rankings;
  } catch {
    return [];
  }
}

/**
 * Detect significant ranking changes (>5% variance)
 */
export async function detectRankingAlerts(threshold: number = 5): Promise<RankingAlert[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const alerts: RankingAlert[] = [];

    // Get all unique keyword+competitor combos with recent changes
    const recentRankings = await prisma.keywordRanking.findMany({
      where: {
        changePercent: {
          not: null,
        },
      },
      orderBy: { capturedAt: 'desc' },
      distinct: ['keyword', 'competitorBrand'],
      select: {
        keyword: true,
        competitorBrand: true,
        position: true,
        previousPos: true,
        changePercent: true,
      },
    });

    for (const ranking of recentRankings) {
      if (
        ranking.changePercent !== null &&
        ranking.previousPos !== null &&
        Math.abs(ranking.changePercent) >= threshold
      ) {
        alerts.push({
          keyword: ranking.keyword,
          competitor: ranking.competitorBrand,
          oldPosition: ranking.previousPos,
          newPosition: ranking.position,
          change: ranking.position < ranking.previousPos ? 'improved' : 'declined',
          changeAmount: Math.abs(ranking.previousPos - ranking.position),
        });
      }
    }

    return alerts.sort((a, b) => b.changeAmount - a.changeAmount);
  } catch {
    return [];
  }
}

/**
 * Simulate SERP results for demo/testing
 * In production, replace with actual SerpAPI or Google Search Console API call
 */
function simulateSerpResults(
  keyword: string,
  competitors: Array<{ id: string; brand: string; url: string }>
): Array<{ competitorBrand: string; competitorUrl: string; position: number }> {
  // Deterministic simulation based on keyword and competitor
  const results = competitors.map((comp, index) => {
    // Hash the keyword + competitor to get a semi-consistent position
    const seed = (keyword.charCodeAt(0) + comp.brand.charCodeAt(0)) % 10;
    const basePos = (index + seed) % 10;
    const position = Math.max(1, Math.min(10, basePos + 1));

    return {
      competitorBrand: comp.brand,
      competitorUrl: comp.url,
      position,
    };
  });

  return results.sort((a, b) => a.position - b.position);
}

/**
 * Get ranking statistics for dashboard
 */
export async function getRankingStats(): Promise<{
  totalKeywordsTracked: number;
  topRankedCompetitor: { brand: string; avgPosition: number } | null;
  improvingKeywords: number;
  decliningKeywords: number;
}> {
  if (!process.env.DATABASE_URL) {
    return {
      totalKeywordsTracked: 0,
      topRankedCompetitor: null,
      improvingKeywords: 0,
      decliningKeywords: 0,
    };
  }

  try {
    // Get unique keywords tracked
    const keywords = await prisma.keywordRanking.findMany({
      distinct: ['keyword'],
      select: { keyword: true },
    });

    // Get average position per competitor
    const competitorStats = await prisma.keywordRanking.groupBy({
      by: ['competitorBrand'],
      _avg: {
        position: true,
      },
      orderBy: {
        _avg: {
          position: 'asc',
        },
      },
      take: 1,
    });

    const topCompetitor =
      competitorStats.length > 0
        ? {
            brand: competitorStats[0].competitorBrand,
            avgPosition: competitorStats[0]._avg.position ?? 0,
          }
        : null;

    // Count improving vs declining
    const recentChanges = await prisma.keywordRanking.findMany({
      where: {
        changePercent: { not: null },
      },
      orderBy: { capturedAt: 'desc' },
      distinct: ['keyword', 'competitorBrand'],
    });

    const improving = recentChanges.filter((r) => r.changePercent !== null && r.changePercent < 0).length;
    const declining = recentChanges.filter((r) => r.changePercent !== null && r.changePercent > 0).length;

    return {
      totalKeywordsTracked: keywords.length,
      topRankedCompetitor: topCompetitor,
      improvingKeywords: improving,
      decliningKeywords: declining,
    };
  } catch {
    return {
      totalKeywordsTracked: 0,
      topRankedCompetitor: null,
      improvingKeywords: 0,
      decliningKeywords: 0,
    };
  }
}
