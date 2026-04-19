import googleTrends from 'google-trends-api';
import kcrContext from '@/lib/data/kcr-context.json';
import type { TrendData, TrendStatus } from '@/lib/types/marketing';

const DEFAULT_TIMEFRAME = 'now 7-d';
const DEFAULT_GEO = 'ID';

interface GoogleTrendsTimelinePoint {
  time: string;
  value: number[];
}

function toStatus(growth: number): TrendStatus {
  if (growth >= 40) {
    return 'viral';
  }

  if (growth >= 12) {
    return 'rising';
  }

  return 'stable';
}

function mapCategory(keyword: string): string {
  const normalized = keyword.toLowerCase();
  const category = kcrContext.keyCategories.find((entry) => {
    const token = entry.toLowerCase().replace(/s$/, '');
    return normalized.includes(token);
  });

  return category ?? 'Office Furniture';
}

function calculateGrowth(points: number[]): number {
  if (points.length < 4) {
    return 0;
  }

  const split = Math.floor(points.length / 2);
  const earlier = points.slice(0, split);
  const latest = points.slice(split);

  const earlierAvg = earlier.reduce((sum, value) => sum + value, 0) / earlier.length;
  const latestAvg = latest.reduce((sum, value) => sum + value, 0) / latest.length;

  if (earlierAvg <= 0) {
    return latestAvg > 0 ? 100 : 0;
  }

  return Number((((latestAvg - earlierAvg) / earlierAvg) * 100).toFixed(1));
}

export async function fetchGoogleTrends(
  keywords: string[],
  options?: {
    geo?: string;
    timeframe?: string;
  }
): Promise<TrendData[]> {
  const geo = options?.geo ?? DEFAULT_GEO;
  const timeframe = options?.timeframe ?? DEFAULT_TIMEFRAME;

  const results = await Promise.all(
    keywords.map(async (keyword, index): Promise<TrendData> => {
      try {
        const payload = await googleTrends.interestOverTime({
          keyword,
          geo,
          timeframe,
        });

        const parsed = JSON.parse(payload) as {
          default?: {
            timelineData?: GoogleTrendsTimelinePoint[];
          };
        };

        const timeline = parsed.default?.timelineData ?? [];
        const points = timeline
          .map((item) => item.value[0] ?? 0)
          .filter((value) => Number.isFinite(value));

        const latestPoint = points.at(-1) ?? 0;
        const growth = calculateGrowth(points);

        return {
          id: `google-${index}-${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          keyword,
          category: mapCategory(keyword),
          searchVolume: Math.round(latestPoint * 120),
          growth,
          platforms: ['google'],
          status: toStatus(growth),
        };
      } catch {
        return {
          id: `google-${index}-${keyword.toLowerCase().replace(/\s+/g, '-')}`,
          keyword,
          category: mapCategory(keyword),
          searchVolume: 0,
          growth: 0,
          platforms: ['google'],
          status: 'stable',
        };
      }
    })
  );

  return results;
}
