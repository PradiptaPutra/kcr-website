import { z } from 'zod';
import { analyzeCompetitorUrl } from '@/services/competitor-analysis-service';
import { enrichCompetitorInsightsWithAi } from '@/services/ai-insight-service';
import { saveCompetitorAnalysis } from '@/services/data-store-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  url: z.string().url(),
});

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

  const baseAnalysis = await analyzeCompetitorUrl(parsed.data.url);
  const aiInsights = await enrichCompetitorInsightsWithAi(baseAnalysis);

  const analysis = {
    ...baseAnalysis,
    weaknesses: aiInsights.weaknesses,
    adHooks: aiInsights.adHooks,
  };

  await saveCompetitorAnalysis(analysis);

  return Response.json(analysis);
}
