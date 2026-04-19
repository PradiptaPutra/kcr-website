import { getSocialMonitoringOverview, trackSocialMetrics } from '@/services/social-intelligence-service';

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

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const snapshots = await trackSocialMetrics();
    const overview = await getSocialMonitoringOverview(14);

    return Response.json({
      ok: true,
      action: 'daily-social-tracking',
      snapshotsTracked: snapshots.length,
      accountsTracked: overview.summary.accountsTracked,
      avgEngagementRate: overview.summary.avgEngagementRate,
      avgSentimentScore: overview.summary.avgSentimentScore,
      alerts: overview.alerts.slice(0, 5),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to run daily social monitoring',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
