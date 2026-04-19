import { getDashboardOverviewData } from '@/services/data-store-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  const payload = await getDashboardOverviewData();
  return Response.json(payload);
}
