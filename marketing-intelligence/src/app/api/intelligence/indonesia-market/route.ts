import { z } from 'zod';
import { getIndonesiaMarketIntelligence } from '@/services/indonesia-market-intelligence-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  refresh: z
    .string()
    .optional()
    .transform((value) => value === '1' || value === 'true'),
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    refresh: url.searchParams.get('refresh') ?? undefined,
  });

  if (!parsed.success) {
    return Response.json(
      {
        error: 'Invalid query string',
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    const payload = await getIndonesiaMarketIntelligence();

    return Response.json({
      market: 'Indonesia',
      refreshed: parsed.data.refresh,
      ...payload,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Database unavailable for Indonesia market intelligence',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
