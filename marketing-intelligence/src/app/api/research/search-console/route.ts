import { z } from 'zod';
import { fetchGSCData } from '@/services/google-search-console-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  siteUrl: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

/**
 * GET handler for Google Search Console research data.
 * Returns metrics including clicks, impressions, CTR, and keyword rankings.
 */
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    siteUrl: url.searchParams.get('siteUrl') ?? undefined,
    startDate: url.searchParams.get('startDate') ?? undefined,
    endDate: url.searchParams.get('endDate') ?? undefined,
  });

  if (!parsed.success) {
    return Response.json(
      {
        error: 'Invalid query parameters',
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    const data = await fetchGSCData(parsed.data);
    return Response.json(data);
  } catch (error) {
    console.error('GSC API Route Error:', error);
    return Response.json(
      { error: 'Failed to fetch Search Console data' },
      { status: 500 }
    );
  }
}
