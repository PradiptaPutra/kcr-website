import {
  trackKeywordRankings,
  getCurrentKeywordRankings,
  getKeywordRankingTrend,
  detectRankingAlerts,
  getRankingStats,
} from '@/services/keyword-tracking-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    const action = searchParams.get('action') || 'current';
    const days = parseInt(searchParams.get('days') ?? '30', 10);

    if (action === 'track') {
      // Track new rankings (should be called by cron job)
      const keywords = searchParams.get('keywords')?.split(',') ?? [
        'ergonomic chair',
        'office desk',
        'modular workstation',
      ];

      const rankings = await trackKeywordRankings(keywords);

      return Response.json({
        success: true,
        action: 'track',
        tracked: rankings.length,
        rankings,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === 'alerts') {
      // Get ranking change alerts
      const alerts = await detectRankingAlerts(5);

      return Response.json({
        success: true,
        action: 'alerts',
        alertCount: alerts.length,
        alerts,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === 'stats') {
      // Get ranking statistics for dashboard
      const stats = await getRankingStats();

      return Response.json({
        success: true,
        action: 'stats',
        stats,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === 'trend' && keyword) {
      // Get ranking trend for specific keyword
      const trend = await getKeywordRankingTrend(keyword, undefined, days);

      return Response.json({
        success: true,
        action: 'trend',
        keyword,
        days,
        trendCount: trend.length,
        trend,
        timestamp: new Date().toISOString(),
      });
    }

    // Default: get current rankings for a keyword
    if (!keyword) {
      return Response.json(
        {
          error: 'Missing keyword parameter',
          usage: '/api/intelligence/keyword-rankings?keyword=ergonomic+chair&action=current|trend|track|alerts|stats',
        },
        { status: 400 }
      );
    }

    const rankings = await getCurrentKeywordRankings(keyword);

    return Response.json({
      success: true,
      action: 'current',
      keyword,
      rankingCount: rankings.length,
      rankings,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to fetch keyword rankings',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
