import { getTriggeredAlerts } from '@/services/alert-system-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  try {
    const alerts = await getTriggeredAlerts();

    return Response.json({
      count: alerts.length,
      alerts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to fetch alerts',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
