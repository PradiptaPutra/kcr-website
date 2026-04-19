import OpenAI from 'openai';
import type { AdCreative, AdReplicaDraft, CompetitorAnalysis } from '@/lib/types/marketing';

const model = process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';

function getClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new OpenAI({ apiKey });
}

function parseJson<T>(raw: string | undefined, fallback: T): T {
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function enrichCompetitorInsightsWithAi(
  analysis: CompetitorAnalysis
): Promise<Pick<CompetitorAnalysis, 'weaknesses' | 'adHooks'>> {
  const client = getClient();

  if (!client) {
    return {
      weaknesses: analysis.weaknesses,
      adHooks: analysis.adHooks,
    };
  }

  const prompt = [
    'You are a B2B furniture marketing strategist for Indonesia.',
    'Given competitor data, produce concise exploit weaknesses and ad hooks.',
    'Return strict JSON: {"weaknesses": string[], "adHooks": string[]}',
    `Brand: ${analysis.brand}`,
    `Pricing tier: ${analysis.pricing}`,
    `Average price: ${analysis.avgPrice}`,
    `Products: ${analysis.products.map((item) => item.title).join(' | ')}`,
  ].join('\n');

  try {
    const response = await client.responses.create({
      model,
      input: prompt,
      temperature: 0.3,
    });

    const text = response.output_text;
    const parsed = parseJson<{ weaknesses: string[]; adHooks: string[] }>(text, {
      weaknesses: analysis.weaknesses,
      adHooks: analysis.adHooks,
    });

    return {
      weaknesses: parsed.weaknesses.slice(0, 4),
      adHooks: parsed.adHooks.slice(0, 4),
    };
  } catch {
    return {
      weaknesses: analysis.weaknesses,
      adHooks: analysis.adHooks,
    };
  }
}

export async function generateAdReplicasWithAi(input: {
  brand: string;
  creatives: AdCreative[];
}): Promise<AdReplicaDraft[]> {
  const client = getClient();
  const fallback = input.creatives.slice(0, 3).map((creative, index) => ({
    angle: `Angle ${index + 1}: ${creative.hook}`,
    hook: `${input.brand}: ${creative.hook}`,
    body: `${creative.copy} Reframed for ${input.brand} with stronger B2B ROI messaging.`,
    cta: index % 2 === 0 ? 'Get Proposal' : 'Book Virtual Showroom',
  }));

  if (!client) {
    return fallback;
  }

  const prompt = [
    'You are an ad strategist for KCR Furniture.',
    'Create 3 high-converting ad replicas inspired by these competitor creatives.',
    'Return strict JSON: {"replicas": [{"angle": string, "hook": string, "body": string, "cta": string}]}',
    `Brand: ${input.brand}`,
    `Creatives: ${input.creatives
      .map((creative) => `${creative.hook} || ${creative.copy} || ${creative.cta}`)
      .join(' ### ')}`,
  ].join('\n');

  try {
    const response = await client.responses.create({
      model,
      input: prompt,
      temperature: 0.4,
    });

    const parsed = parseJson<{ replicas: AdReplicaDraft[] }>(response.output_text, {
      replicas: fallback,
    });

    return parsed.replicas.slice(0, 3);
  } catch {
    return fallback;
  }
}
