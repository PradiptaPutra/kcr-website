import { z } from 'zod';
import { getLatestProductScores } from '@/services/data-store-service';
import { calculateProductScore } from '@/services/intelligence-engine-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 10))
    .pipe(z.number().int().min(1).max(50)),
});

const bodySchema = z.object({
  keyword: z.string().min(2),
  trendGrowth: z.number(),
  searchVolume: z.number().int(),
  activeSellers: z.number().int(),
  adMomentum: z.number(),
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    limit: url.searchParams.get('limit') ?? undefined,
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

  const scores = await getLatestProductScores(parsed.data.limit);
  return Response.json({ scores });
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: 'Invalid request body',
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const score = calculateProductScore(parsed.data);
  return Response.json({ score });
}
