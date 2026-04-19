export type PlatformName = 'tokopedia' | 'shopee' | 'tiktok' | 'google';

export type TrendStatus = 'rising' | 'stable' | 'viral';

export interface TrendData {
  id: string;
  keyword: string;
  category: string;
  searchVolume: number;
  growth: number;
  platforms: PlatformName[];
  status: TrendStatus;
}

export type MarketplacePlatform = Exclude<PlatformName, 'google'>;

export interface ScrapedListing {
  title: string;
  priceText: string;
  url: string;
  salesVolume?: number;
}

export interface CompetitorAnalysis {
  url: string;
  brand: string;
  pricing: 'low' | 'medium' | 'premium' | 'unknown';
  avgPrice: number;
  strengths: string[];
  weaknesses: string[];
  adHooks: string[];
  salesSignal: number;
  products: ScrapedListing[];
}

export interface AdCreative {
  id: string;
  platform: 'meta' | 'tiktok';
  advertiser: string;
  competitorBrand?: string;
  status: 'active' | 'inactive';
  hook: string;
  copy: string;
  cta: string;
  startedAt: string;
  firstSeen?: string;
  lastSeen?: string;
  estimatedMonthlySpend?: number;
  sourceUrl: string;
}

export interface CompetitorAdSpendIntel {
  competitorBrand: string;
  activeAds: number;
  newAds7d: number;
  estimatedMonthlySpend: number;
  dominantPlatform: 'meta' | 'tiktok' | 'mixed';
  topAngles: string[];
  budgetShiftPercent: number;
}

export interface MarketTrendInsight {
  styleTrends: string[];
  materialTrends: string[];
  designTrends: string[];
  seasonalDemand: Array<{ season: string; demandIndex: number }>;
}

export interface BestSellingProduct {
  title: string;
  category: string;
  avgPrice: number;
  salesVolume: number;
  platformSignal: string[];
}

export interface BuyingBehaviorInsight {
  topPriceBand: string;
  priceSensitivity: 'high' | 'medium' | 'low';
  preferredStyles: string[];
  preferredMaterials: string[];
  purchaseDrivers: string[];
}

export interface ProductOpportunity {
  keyword: string;
  category: string;
  demandScore: number;
  competitionScore: number;
  opportunityScore: number;
  estimatedAvgPrice: number;
  recommendedSegment: 'B2B' | 'PROJECT' | 'WHOLESALE';
}

export interface QualifiedLeadItem {
  id: string;
  segment: 'B2B' | 'PROJECT' | 'WHOLESALE';
  companyName: string;
  city: string;
  intentScore: number;
  budgetEstimate: number | null;
  priceSensitivity: string;
  status: 'NEW' | 'QUALIFIED' | 'CONTACTED' | 'WON' | 'LOST';
}

export interface AdReplicaDraft {
  angle: string;
  hook: string;
  body: string;
  cta: string;
}

export interface ProductScoreBreakdown {
  keyword: string;
  demandScore: number;
  competitionScore: number;
  viralityScore: number;
  totalScore: number;
  recommendation: 'GO' | 'WATCH' | 'NO_GO';
}

export interface DashboardOverviewPayload {
  metrics: {
    marketDemandGrowth: number;
    adHookEfficiency: number;
    competitorVolume: number;
    totalSearchVolume: number;
  };
  trendVelocity: number[];
  insights: {
    type: 'opportunity' | 'warning' | 'action';
    title: string;
    desc: string;
  }[];
  winningProducts: {
    name: string;
    score: number;
    trend: number;
  }[];
  adPulse: {
    avgCtr: number;
    avgRoas: number;
  };
}
