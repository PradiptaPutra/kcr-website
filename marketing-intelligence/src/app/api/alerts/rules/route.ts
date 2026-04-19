import { z } from 'zod';
import { listAlertRules, upsertAlertRule } from '@/services/data-store-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  keyword: z.string().min(2),
  growthThreshold: z.number().min(0).max(1000),
  enabled: z.boolean().optional(),
});

export async function GET(): Promise<Response> {
  const rules = await listAlertRules();
  return Response.json({ rules });
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

  const rule = await upsertAlertRule(parsed.data);
  return Response.json({ rule });
}
