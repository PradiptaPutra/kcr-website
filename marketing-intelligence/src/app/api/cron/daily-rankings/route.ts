import { trackKeywordRankings, getRankingStats } from '@/services/keyword-tracking-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return true;
  }

  const header = request.headers.get('authorization') || '';
  return header === `Bearer ${secret}`;
}

// Default keywords to track
const DEFAULT_TRACKING_KEYWORDS = [
  'ergonomic chair',
  'office desk',
  'modular workstation',
  'gaming chair',
  'standing desk',
  'office lamp',
  'desk organizer',
];

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const keywords =
      searchParams
        .get('keywords')
        ?.split(',')
        .map((k) => k.trim()) ?? DEFAULT_TRACKING_KEYWORDS;

    // Track keyword rankings
    const rankings = await trackKeywordRankings(keywords);

    // Get stats for response
    const stats = await getRankingStats();

    return Response.json({
      ok: true,
      action: 'daily-rank-tracking',
      keywordsTracked: keywords.length,
      rankingsRecorded: rankings.length,
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to track keyword rankings',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
