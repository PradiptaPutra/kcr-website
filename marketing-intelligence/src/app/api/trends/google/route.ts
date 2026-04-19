import { z } from 'zod';
import { getResearchTrends } from '@/services/research-data-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  keywords: z.string().optional(),
  geo: z.string().optional(),
  timeframe: z.string().optional(),
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    keywords: url.searchParams.get('keywords') ?? undefined,
    geo: url.searchParams.get('geo') ?? undefined,
    timeframe: url.searchParams.get('timeframe') ?? undefined,
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

  const keywords = parsed.data.keywords
    ? parsed.data.keywords
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : undefined;

  const payload = await getResearchTrends({
    keywords,
    geo: parsed.data.geo,
    timeframe: parsed.data.timeframe,
    deepScan: false,
  });

  return Response.json(payload);
}
