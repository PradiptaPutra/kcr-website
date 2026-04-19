import { z } from 'zod';
import { scrapeMarketplaceTrend } from '@/services/marketplace-scraper-service';
import type { MarketplacePlatform } from '@/lib/types/marketing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const paramsSchema = z.object({
  platform: z.enum(['tokopedia', 'shopee', 'tiktok']),
});

const querySchema = z.object({
  keyword: z.string().min(2),
  maxResults: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 12))
    .pipe(z.number().int().min(1).max(40)),
});

export async function GET(
  request: Request,
  context: RouteContext<'/api/scrape/[platform]'>
): Promise<Response> {
  const params = await context.params;
  const parsedParams = paramsSchema.safeParse(params);

  if (!parsedParams.success) {
    return Response.json({ error: 'Unsupported platform' }, { status: 400 });
  }

  const url = new URL(request.url);
  const parsedQuery = querySchema.safeParse({
    keyword: url.searchParams.get('keyword') ?? undefined,
    maxResults: url.searchParams.get('maxResults') ?? undefined,
  });

  if (!parsedQuery.success) {
    return Response.json(
      {
        error: 'Invalid query string',
        details: parsedQuery.error.flatten(),
      },
      { status: 400 }
    );
  }

  const result = await scrapeMarketplaceTrend(
    parsedParams.data.platform as MarketplacePlatform,
    parsedQuery.data.keyword,
    parsedQuery.data.maxResults
  );

  return Response.json({
    platform: parsedParams.data.platform,
    keyword: parsedQuery.data.keyword,
    ...result,
  });
}
