import { z } from 'zod';
import { getResearchTrends } from '@/services/research-data-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  keywords: z.string().optional(),
  deepScan: z
    .string()
    .optional()
    .transform((value) => value === '1' || value === 'true'),
  geo: z.string().optional(),
  timeframe: z.string().optional(),
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    keywords: url.searchParams.get('keywords') ?? undefined,
    deepScan: url.searchParams.get('deepScan') ?? undefined,
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
    deepScan: parsed.data.deepScan,
    geo: parsed.data.geo,
    timeframe: parsed.data.timeframe,
  });

  return Response.json(payload);
}
