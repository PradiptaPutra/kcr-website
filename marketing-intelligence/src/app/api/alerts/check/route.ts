import { z } from 'zod';
import { getResearchTrends } from '@/services/research-data-service';
import { listAlertRules, recordAlertEvent } from '@/services/data-store-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  keywords: z.array(z.string()).optional(),
});

async function deliverAlert(payload: Record<string, unknown>): Promise<boolean> {
  const webhook = process.env.ALERT_WEBHOOK_URL;
  const emailWebhook = process.env.ALERT_EMAIL_WEBHOOK_URL;
  const target = webhook || emailWebhook;

  if (!target) {
    return false;
  }

  try {
    const response = await fetch(target, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function POST(request: Request): Promise<Response> {
  const body = await request.json().catch(() => ({}));
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

  const [rules, trends] = await Promise.all([
    listAlertRules(),
    getResearchTrends({
      deepScan: false,
      keywords: parsed.data.keywords,
    }),
  ]);

  const activeRules = rules.filter((rule) => rule.enabled);
  const triggered: Array<Record<string, unknown>> = [];

  for (const rule of activeRules) {
    const trend = trends.trends.find(
      (item) => item.keyword.toLowerCase() === rule.keyword.toLowerCase()
    );

    if (!trend || trend.growth < rule.growthThreshold) {
      continue;
    }

    const payload = {
      type: 'keyword-growth-alert',
      keyword: rule.keyword,
      threshold: rule.growthThreshold,
      observedGrowth: trend.growth,
      observedVolume: trend.searchVolume,
      detectedAt: new Date().toISOString(),
    };

    const delivered = await deliverAlert(payload);

    await recordAlertEvent({
      alertRuleId: rule.id,
      keyword: rule.keyword,
      growth: trend.growth,
      delivered,
      payload,
    });

    triggered.push(payload);
  }

  return Response.json({
    triggeredCount: triggered.length,
    triggered,
  });
}
