import { z } from 'zod';
import { fetchAdCreatives, buildAdReplicaDrafts } from '@/services/ad-library-service';
import { generateAdReplicasWithAi } from '@/services/ai-insight-service';
import { getCompetitorAdSpendIntelligence } from '@/services/ad-spend-intelligence-service';
import { saveAdCreatives } from '@/services/data-store-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  keyword: z.string().min(2),
  country: z.string().optional(),
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 10))
    .pipe(z.number().int().min(1).max(50)),
  brand: z.string().optional(),
  includeReplicas: z
    .string()
    .optional()
    .transform((value) => value === '1' || value === 'true'),
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    keyword: url.searchParams.get('keyword') ?? undefined,
    country: url.searchParams.get('country') ?? undefined,
    limit: url.searchParams.get('limit') ?? undefined,
    brand: url.searchParams.get('brand') ?? undefined,
    includeReplicas: url.searchParams.get('includeReplicas') ?? undefined,
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

  const creatives = await fetchAdCreatives({
    keyword: parsed.data.keyword,
    country: parsed.data.country,
    limit: parsed.data.limit,
  });

  await saveAdCreatives(parsed.data.keyword, creatives);
  const adSpendIntel = await getCompetitorAdSpendIntelligence(30);

  if (!parsed.data.includeReplicas) {
    return Response.json({
      creatives,
      adSpendIntel,
      source: process.env.META_AD_LIBRARY_ACCESS_TOKEN ? 'meta-api' : 'fallback',
    });
  }

  const replicasFromHeuristic = buildAdReplicaDrafts({
    brand: parsed.data.brand ?? 'KCR Furniture',
    creatives,
  });

  const replicas = process.env.OPENAI_API_KEY
    ? await generateAdReplicasWithAi({
        brand: parsed.data.brand ?? 'KCR Furniture',
        creatives,
      })
    : replicasFromHeuristic;

  return Response.json({
    creatives,
    replicas,
    adSpendIntel,
    source: process.env.META_AD_LIBRARY_ACCESS_TOKEN ? 'meta-api' : 'fallback',
  });
}
