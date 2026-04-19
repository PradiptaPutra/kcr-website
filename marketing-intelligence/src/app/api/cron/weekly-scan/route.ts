import { getResearchTrends } from '@/services/research-data-service';
import { getLatestProductScores, saveWeeklyReport } from '@/services/data-store-service';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getCurrentWibMondayAnchor(now = new Date()): Date {
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  const wibOffset = 7 * 60 * 60 * 1000;
  const wibDate = new Date(utc + wibOffset);

  const day = wibDate.getUTCDay();
  const diff = day === 1 ? 0 : (day + 6) % 7;
  wibDate.setUTCDate(wibDate.getUTCDate() - diff);
  wibDate.setUTCHours(1, 0, 0, 0);

  return wibDate;
}

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return true;
  }

  const header = request.headers.get('authorization') || '';
  return header === `Bearer ${secret}`;
}

export async function GET(request: Request): Promise<Response> {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const scan = await getResearchTrends({ deepScan: true });
  const scores = await getLatestProductScores(20);
  const top = scores[0];

  await saveWeeklyReport({
    reportDate: getCurrentWibMondayAnchor(),
    summary: top
      ? `Top product this week is ${top.keyword} with score ${top.totalScore.toFixed(2)} and recommendation ${top.recommendation}.`
      : 'Deep scan completed but no score data available.',
    topKeyword: top?.keyword ?? 'N/A',
    topScore: top?.totalScore ?? 0,
    strategy: {
      scoreCount: scores.length,
      trendCount: scan.trends.length,
      generatedAt: new Date().toISOString(),
      recommendation: top?.recommendation ?? 'NO_GO',
    },
  });

  return Response.json({
    ok: true,
    scannedAt: scan.scannedAt,
    topProduct: top ?? null,
    trendCount: scan.trends.length,
    scoreCount: scores.length,
  });
}
