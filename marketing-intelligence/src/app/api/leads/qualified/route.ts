import { z } from 'zod';
import {
  exportQualifiedLeadsCsv,
  generateQualifiedLeadsFromInsights,
  listQualifiedLeads,
  updateQualifiedLeadStatus,
} from '@/services/indonesia-market-intelligence-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const querySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((value) => (value ? Number(value) : 30))
    .pipe(z.number().int().min(1).max(100)),
  segment: z.enum(['B2B', 'PROJECT', 'WHOLESALE']).optional(),
  city: z.string().optional(),
  status: z.enum(['NEW', 'QUALIFIED', 'CONTACTED', 'WON', 'LOST']).optional(),
  export: z.enum(['csv']).optional(),
});

const bodySchema = z.object({
  limit: z.number().int().min(1).max(50).optional(),
});

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    limit: url.searchParams.get('limit') ?? undefined,
    segment: url.searchParams.get('segment') ?? undefined,
    city: url.searchParams.get('city') ?? undefined,
    status: url.searchParams.get('status') ?? undefined,
    export: url.searchParams.get('export') ?? undefined,
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

  try {
    if (parsed.data.export === 'csv') {
      const csv = await exportQualifiedLeadsCsv({
        segment: parsed.data.segment,
        city: parsed.data.city,
        status: parsed.data.status,
        limit: parsed.data.limit,
      });

      return new Response(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="qualified-leads.csv"',
        },
      });
    }

    const rows = await listQualifiedLeads({
      limit: parsed.data.limit,
      segment: parsed.data.segment,
      city: parsed.data.city,
      status: parsed.data.status,
    });

    return Response.json({
      count: rows.length,
      leads: rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Database unavailable for qualified leads',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<Response> {
  const payload = await request.json().catch(() => ({}));
  const parsed = bodySchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      {
        error: 'Invalid request body',
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    const rows = await generateQualifiedLeadsFromInsights(parsed.data.limit ?? 15);

    return Response.json({
      generated: rows.length,
      leads: rows,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Database unavailable for lead generation',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['NEW', 'QUALIFIED', 'CONTACTED', 'WON', 'LOST']),
  notes: z.string().optional(),
});

export async function PATCH(request: Request): Promise<Response> {
  const payload = await request.json().catch(() => ({}));
  const parsed = updateSchema.safeParse(payload);

  if (!parsed.success) {
    return Response.json(
      {
        error: 'Invalid request body',
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  try {
    const lead = await updateQualifiedLeadStatus(parsed.data);

    return Response.json({
      lead,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Database unavailable for lead update',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
