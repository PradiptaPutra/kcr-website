import type { AdCreative, AdReplicaDraft } from '@/lib/types/marketing';

interface MetaAdsArchiveItem {
  id: string;
  page_name?: string;
  ad_creation_time?: string;
  ad_snapshot_url?: string;
  ad_creative_bodies?: string[];
  ad_creative_link_titles?: string[];
  ad_creative_link_captions?: string[];
  ad_delivery_start_time?: string;
  ad_delivery_stop_time?: string;
}

function fallbackAds(keyword: string): AdCreative[] {
  return [
    {
      id: `meta-fallback-${keyword}`,
      platform: 'meta',
      advertiser: 'Sample Competitor',
      competitorBrand: 'Sample Competitor',
      status: 'active',
      hook: `Premium ${keyword} setup in 72 hours`,
      copy: 'B2B office upgrade with CNC-grade precision and scalable modularity.',
      cta: 'Book Consultation',
      startedAt: new Date().toISOString(),
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      estimatedMonthlySpend: 1800,
      sourceUrl: 'https://www.facebook.com/ads/library',
    },
    {
      id: `tiktok-fallback-${keyword}`,
      platform: 'tiktok',
      advertiser: 'Sample Competitor',
      competitorBrand: 'Sample Competitor',
      status: 'active',
      hook: `Before/After ${keyword} transformation`,
      copy: 'Visual-first office revamp proving ROI per square meter.',
      cta: 'View Demo',
      startedAt: new Date().toISOString(),
      firstSeen: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      estimatedMonthlySpend: 1200,
      sourceUrl: 'https://ads.tiktok.com/business/creativecenter/inspiration/topads',
    },
  ];
}

function mapMetaAd(item: MetaAdsArchiveItem): AdCreative {
  const body = item.ad_creative_bodies?.[0] || 'No copy text captured';
  const title = item.ad_creative_link_titles?.[0] || 'No title captured';
  const caption = item.ad_creative_link_captions?.[0] || 'Learn more';

  return {
    id: item.id,
    platform: 'meta',
    advertiser: item.page_name || 'Unknown advertiser',
    competitorBrand: item.page_name || 'Unknown advertiser',
    status: item.ad_delivery_stop_time ? 'inactive' : 'active',
    hook: title,
    copy: body,
    cta: caption,
    startedAt: item.ad_creation_time || item.ad_delivery_start_time || new Date().toISOString(),
    firstSeen: item.ad_creation_time || item.ad_delivery_start_time || new Date().toISOString(),
    lastSeen: item.ad_delivery_stop_time || new Date().toISOString(),
    estimatedMonthlySpend: undefined,
    sourceUrl: item.ad_snapshot_url || 'https://www.facebook.com/ads/library',
  };
}

export async function fetchAdCreatives(options: {
  keyword: string;
  country?: string;
  limit?: number;
}): Promise<AdCreative[]> {
  const keyword = options.keyword.trim();
  const country = options.country ?? 'ID';
  const limit = options.limit ?? 10;
  const token = process.env.META_AD_LIBRARY_ACCESS_TOKEN;

  if (!token) {
    return fallbackAds(keyword);
  }

  const params = new URLSearchParams({
    access_token: token,
    search_terms: keyword,
    ad_reached_countries: JSON.stringify([country]),
    ad_active_status: 'ALL',
    ad_type: 'ALL',
    fields:
      'id,page_name,ad_creation_time,ad_snapshot_url,ad_creative_bodies,ad_creative_link_titles,ad_creative_link_captions,ad_delivery_start_time,ad_delivery_stop_time',
    limit: String(limit),
  });

  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/ads_archive?${params.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return fallbackAds(keyword);
    }

    const json = (await response.json()) as { data?: MetaAdsArchiveItem[] };
    const mapped = (json.data ?? []).map(mapMetaAd);

    if (mapped.length === 0) {
      return fallbackAds(keyword);
    }

    return mapped;
  } catch {
    return fallbackAds(keyword);
  }
}

export function buildAdReplicaDrafts(input: {
  brand: string;
  creatives: AdCreative[];
}): AdReplicaDraft[] {
  const base = input.creatives.slice(0, 3);

  return base.map((creative, index) => ({
    angle: `Angle ${index + 1}: ${creative.hook}`,
    hook: `${input.brand}: ${creative.hook}`,
    body: `${creative.copy} Reframed for ${input.brand} with stronger B2B ROI messaging, project proof, and procurement clarity.`,
    cta: index % 2 === 0 ? 'Get Proposal' : 'Book Virtual Showroom',
  }));
}
