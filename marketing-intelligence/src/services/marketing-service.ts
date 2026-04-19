import type {
  TrendData,
  CompetitorAnalysis,
  AdCreative,
  AdReplicaDraft,
  CompetitorAdSpendIntel,
} from '@/lib/types/marketing';

interface TrendsApiResponse {
  trends: TrendData[];
  scannedAt: string;
}

interface AdLibraryApiResponse {
  creatives: AdCreative[];
  replicas?: AdReplicaDraft[];
  adSpendIntel?: {
    competitors: CompetitorAdSpendIntel[];
    summary: {
      totalEstimatedSpend: number;
      totalActiveAds: number;
      topSpender: string | null;
      budgetShiftAlerts: Array<{ competitorBrand: string; budgetShiftPercent: number }>;
    };
  };
  source: 'meta-api' | 'fallback';
}

const FALLBACK_TRENDS: TrendData[] = [
  {
    id: 'fallback-1',
    keyword: 'Modular Workstation',
    category: 'Office Furniture',
    searchVolume: 12500,
    growth: 42,
    platforms: ['google', 'tokopedia'],
    status: 'rising',
  },
  {
    id: 'fallback-2',
    keyword: 'Ergonomic Desk Chair',
    category: 'Office Furniture',
    searchVolume: 45000,
    growth: 15,
    platforms: ['shopee', 'tiktok'],
    status: 'stable',
  },
  {
    id: 'fallback-3',
    keyword: 'Smart Meeting Table',
    category: 'Office Furniture',
    searchVolume: 8900,
    growth: 120,
    platforms: ['google', 'tiktok'],
    status: 'viral',
  },
  {
    id: 'fallback-4',
    keyword: 'Minimalist Credenza',
    category: 'Storage',
    searchVolume: 15000,
    growth: 24,
    platforms: ['tokopedia', 'shopee'],
    status: 'rising',
  },
];

export const getTrendingProducts = async (options?: {
  deepScan?: boolean;
}): Promise<TrendData[]> => {
  const deepScan = options?.deepScan ? '1' : '0';

  try {
    const response = await fetch(`/api/research/trends?deepScan=${deepScan}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const payload = (await response.json()) as TrendsApiResponse;
    return payload.trends;
  } catch {
    return FALLBACK_TRENDS;
  }
};

export type { TrendData };

const FALLBACK_COMPETITOR: CompetitorAnalysis = {
  url: 'https://example.com',
  brand: 'COMPETITOR',
  pricing: 'unknown',
  avgPrice: 0,
  strengths: ['Consistent product pages', 'Clear category coverage'],
  weaknesses: ['Weak premium storytelling', 'Unclear B2B ROI claims'],
  adHooks: ['CNC precision proof in first 3 seconds', 'Office transformation narrative'],
  salesSignal: 0,
  products: [],
};

const FALLBACK_ADS: AdCreative[] = [
  {
    id: 'fallback-ad-1',
    platform: 'meta',
    advertiser: 'Sample Competitor',
    status: 'active',
    hook: 'Office ROI from modular layouts',
    copy: 'Modular workplace systems with measurable space efficiency gains.',
    cta: 'Book Consultation',
    startedAt: new Date().toISOString(),
    sourceUrl: 'https://www.facebook.com/ads/library',
  },
];

export const analyzeCompetitor = async (url: string): Promise<CompetitorAnalysis> => {
  try {
    const response = await fetch('/api/competitors/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return (await response.json()) as CompetitorAnalysis;
  } catch {
    return {
      ...FALLBACK_COMPETITOR,
      url,
    };
  }
};

export const getAdCreatives = async (options?: {
  keyword?: string;
  country?: string;
  limit?: number;
}): Promise<{
  creatives: AdCreative[];
  source: 'meta-api' | 'fallback';
  adSpendIntel: {
    competitors: CompetitorAdSpendIntel[];
    summary: {
      totalEstimatedSpend: number;
      totalActiveAds: number;
      topSpender: string | null;
      budgetShiftAlerts: Array<{ competitorBrand: string; budgetShiftPercent: number }>;
    };
  };
}> => {
  const keyword = options?.keyword ?? 'modular workstation';
  const country = options?.country ?? 'ID';
  const limit = options?.limit ?? 10;

  try {
    const params = new URLSearchParams({
      keyword,
      country,
      limit: String(limit),
    });

    const response = await fetch(`/api/ads/library?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const payload = (await response.json()) as AdLibraryApiResponse;
    return {
      creatives: payload.creatives,
      source: payload.source,
      adSpendIntel: payload.adSpendIntel ?? {
        competitors: [],
        summary: {
          totalEstimatedSpend: 0,
          totalActiveAds: 0,
          topSpender: null,
          budgetShiftAlerts: [],
        },
      },
    };
  } catch {
    return {
      creatives: FALLBACK_ADS,
      source: 'fallback',
      adSpendIntel: {
        competitors: [],
        summary: {
          totalEstimatedSpend: 0,
          totalActiveAds: 0,
          topSpender: null,
          budgetShiftAlerts: [],
        },
      },
    };
  }
};

export const generateAdReplicas = async (options?: {
  keyword?: string;
  brand?: string;
  country?: string;
  limit?: number;
}): Promise<{ replicas: AdReplicaDraft[]; source: 'meta-api' | 'fallback' }> => {
  const keyword = options?.keyword ?? 'modular workstation';
  const country = options?.country ?? 'ID';
  const brand = options?.brand ?? 'KCR Furniture';
  const limit = options?.limit ?? 8;

  try {
    const params = new URLSearchParams({
      keyword,
      country,
      brand,
      includeReplicas: '1',
      limit: String(limit),
    });

    const response = await fetch(`/api/ads/library?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const payload = (await response.json()) as AdLibraryApiResponse;
    return {
      replicas: payload.replicas ?? [],
      source: payload.source,
    };
  } catch {
    return {
      replicas: [],
      source: 'fallback',
    };
  }
};
