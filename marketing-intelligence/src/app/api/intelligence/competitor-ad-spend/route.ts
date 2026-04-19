import { z } from 'zod';
import { getCompetitorAdSpendIntelligence } from '@/services/ad-spend-intelligence-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  days: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 30))
    .pipe(z.number().int().min(7).max(90)),
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    days: url.searchParams.get('days') ?? undefined,
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

  const payload = await getCompetitorAdSpendIntelligence(parsed.data.days);

  return Response.json({
    days: parsed.data.days,
    ...payload,
    timestamp: new Date().toISOString(),
  });
}
