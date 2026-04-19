import type { ProductScoreBreakdown, TrendData } from '@/lib/types/marketing';

type ScoreInput = {
  keyword: string;
  trendGrowth: number;
  searchVolume: number;
  activeSellers: number;
  adMomentum: number;
};

function clamp(value: number, min = 0, max = 10): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeDemand(growth: number, searchVolume: number): number {
  const growthComponent = clamp(growth / 8, 0, 10);
  const volumeComponent = clamp(Math.log10(Math.max(searchVolume, 1)) * 2, 0, 10);
  return Number(((growthComponent * 0.55) + (volumeComponent * 0.45)).toFixed(2));
}

function normalizeCompetition(activeSellers: number): number {
  const pressure = clamp(activeSellers / 3, 0, 10);
  return Number((10 - pressure).toFixed(2));
}

function normalizeVirality(adMomentum: number, growth: number): number {
  const social = clamp(adMomentum / 5, 0, 10);
  const growthBoost = clamp(growth / 12, 0, 10);
  return Number(((social * 0.6) + (growthBoost * 0.4)).toFixed(2));
}

function recommendationFromScore(score: number): ProductScoreBreakdown['recommendation'] {
  if (score >= 7) {
    return 'GO';
  }

  if (score >= 4.5) {
    return 'WATCH';
  }

  return 'NO_GO';
}

export function calculateProductScore(input: ScoreInput): ProductScoreBreakdown {
  const demandScore = normalizeDemand(input.trendGrowth, input.searchVolume);
  const competitionScore = normalizeCompetition(input.activeSellers);
  const viralityScore = normalizeVirality(input.adMomentum, input.trendGrowth);

  const totalScore = Number(
    ((demandScore * 0.4) + (competitionScore * 0.35) + (viralityScore * 0.25)).toFixed(2)
  );

  return {
    keyword: input.keyword,
    demandScore,
    competitionScore,
    viralityScore,
    totalScore,
    recommendation: recommendationFromScore(totalScore),
  };
}

export function calculateScoresFromTrends(rows: {
  trend: TrendData;
  activeSellers: number;
  adMomentum: number;
}[]): ProductScoreBreakdown[] {
  return rows
    .map(({ trend, activeSellers, adMomentum }) =>
      calculateProductScore({
        keyword: trend.keyword,
        trendGrowth: trend.growth,
        searchVolume: trend.searchVolume,
        activeSellers,
        adMomentum,
      })
    )
    .sort((a, b) => b.totalScore - a.totalScore);
}
