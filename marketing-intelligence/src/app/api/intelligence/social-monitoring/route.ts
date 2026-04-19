import { getSocialMonitoringOverview, trackSocialMetrics } from '@/services/social-intelligence-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') ?? 'overview';
    const days = Number.parseInt(searchParams.get('days') ?? '14', 10);

    if (action === 'track') {
      const snapshots = await trackSocialMetrics();

      return Response.json({
        success: true,
        action,
        tracked: snapshots.length,
        snapshots,
        timestamp: new Date().toISOString(),
      });
    }

    const overview = await getSocialMonitoringOverview(days);

    return Response.json({
      success: true,
      action: 'overview',
      days,
      ...overview,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to fetch social monitoring',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
