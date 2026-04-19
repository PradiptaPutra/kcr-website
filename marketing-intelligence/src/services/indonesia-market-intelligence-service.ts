import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import type {
  BestSellingProduct,
  BuyingBehaviorInsight,
  MarketTrendInsight,
  ProductOpportunity,
  QualifiedLeadItem,
} from '@/lib/types/marketing';

const STYLE_KEYWORDS = ['minimalis', 'modern', 'industrial', 'skandinavia', 'ergonomic', 'modular'];
const MATERIAL_KEYWORDS = ['kayu', 'metal', 'baja', 'aluminium', 'mfc', 'hpl', 'marble'];
const DESIGN_KEYWORDS = ['space-saving', 'multifungsi', 'executive', 'premium', 'compact'];
const TARGET_CITIES = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Makassar'];

function detectPriceBand(price: number): string {
  if (price <= 2_500_000) {
    return 'entry';
  }
  if (price <= 7_500_000) {
    return 'mid';
  }
  return 'premium';
}

function toPriceSensitivity(priceBand: string): 'high' | 'medium' | 'low' {
  if (priceBand === 'entry') {
    return 'high';
  }
  if (priceBand === 'mid') {
    return 'medium';
  }
  return 'low';
}

export async function getIndonesiaMarketIntelligence(): Promise<{
  trendInsight: MarketTrendInsight;
  bestSellers: BestSellingProduct[];
  buyingBehavior: BuyingBehaviorInsight;
  opportunities: ProductOpportunity[];
  qualifiedLeads: QualifiedLeadItem[];
  summary: {
    totalTrendKeywords: number;
    avgOpportunityScore: number;
    leadsReady: number;
  };
}> {
  try {
    const [trends, products, scores, existingLeads] = await Promise.all([
      prisma.trendSnapshot.findMany({
        orderBy: { createdAt: 'desc' },
        take: 120,
      }),
      prisma.competitorProduct.findMany({
        orderBy: { salesVolume: 'desc' },
        take: 100,
      }),
      prisma.productScore.findMany({
        orderBy: { createdAt: 'desc' },
        take: 60,
      }),
      prisma.qualifiedLead.findMany({
        orderBy: { intentScore: 'desc' },
        take: 20,
      }),
    ]);

  const topTrendKeywords = trends
    .sort((a, b) => b.searchVolume - a.searchVolume)
    .slice(0, 25)
    .map((row) => row.keyword.toLowerCase());

  const styleScored = STYLE_KEYWORDS
    .map((token) => ({ token, score: topTrendKeywords.reduce((sum, keyword) => sum + (keyword.includes(token) ? 1 : 0), 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.token);

  const materialScored = MATERIAL_KEYWORDS
    .map((token) => ({ token, score: topTrendKeywords.reduce((sum, keyword) => sum + (keyword.includes(token) ? 1 : 0), 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.token);

  const designScored = DESIGN_KEYWORDS
    .map((token) => ({ token, score: topTrendKeywords.reduce((sum, keyword) => sum + (keyword.includes(token) ? 1 : 0), 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.token);

  const month = new Date().getMonth();
  const currentSeason = month >= 4 && month <= 9 ? 'dry-season' : 'rainy-season';
  const seasonalDemand = [
    { season: currentSeason, demandIndex: Number((trends.reduce((sum, row) => sum + row.growth, 0) / Math.max(1, trends.length)).toFixed(1)) },
    { season: 'festive-q4', demandIndex: Number((trends.filter((row) => row.searchVolume > 15_000).length / Math.max(1, trends.length) * 100).toFixed(1)) },
  ];

  const bestSellers: BestSellingProduct[] = products.slice(0, 12).map((row) => {
    const numericPrice = Number(row.priceText.replace(/[^0-9]/g, '')) || 0;
    return {
      title: row.title,
      category: row.title.toLowerCase().includes('desk') ? 'desk' : row.title.toLowerCase().includes('chair') ? 'chair' : 'office-furniture',
      avgPrice: numericPrice,
      salesVolume: row.salesVolume,
      platformSignal: ['tokopedia', 'shopee'],
    };
  });

  const avgBestSellerPrice =
    bestSellers.length > 0
      ? bestSellers.reduce((sum, row) => sum + row.avgPrice, 0) / bestSellers.length
      : 0;
  const topPriceBand = detectPriceBand(avgBestSellerPrice);

  const buyingBehavior: BuyingBehaviorInsight = {
    topPriceBand,
    priceSensitivity: toPriceSensitivity(topPriceBand),
    preferredStyles: styleScored.length > 0 ? styleScored : ['minimalis', 'modern'],
    preferredMaterials: materialScored.length > 0 ? materialScored : ['kayu', 'metal'],
    purchaseDrivers: ['harga kompetitif', 'kualitas material', 'ketersediaan stok', 'kecepatan pengiriman proyek'],
  };

  const opportunities: ProductOpportunity[] = scores
    .slice(0, 15)
    .map((row) => {
      const demandScore = row.demandScore;
      const competitionScore = row.competitionScore;
      const opportunityScore = Number((demandScore * 0.6 + (10 - competitionScore) * 0.4).toFixed(2));
      const segment: 'B2B' | 'PROJECT' | 'WHOLESALE' =
        row.keyword.toLowerCase().includes('hotel') || row.keyword.toLowerCase().includes('hospitality')
          ? 'PROJECT'
          : row.totalScore >= 7.5
          ? 'B2B'
          : 'WHOLESALE';

      return {
        keyword: row.keyword,
        category: row.keyword.toLowerCase().includes('desk') ? 'desk' : 'workspace',
        demandScore,
        competitionScore,
        opportunityScore,
        estimatedAvgPrice: Math.round(avgBestSellerPrice || 3_000_000),
        recommendedSegment: segment,
      };
    })
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 8);

  if (opportunities.length > 0) {
    await prisma.$transaction(
      opportunities.map((item) =>
        prisma.marketOpportunity.create({
          data: {
            keyword: item.keyword,
            category: item.category,
            demandScore: item.demandScore,
            competitionScore: item.competitionScore,
            opportunityScore: item.opportunityScore,
            avgMarketPrice: item.estimatedAvgPrice,
            seasonalWindow: currentSeason,
            recommendedSegment: item.recommendedSegment,
            rationale: {
              demand: item.demandScore,
              competition: item.competitionScore,
              keyword: item.keyword,
            } as Prisma.InputJsonValue,
          },
        })
      )
    );
  }

  const qualifiedLeads: QualifiedLeadItem[] = existingLeads.map((lead) => ({
    id: lead.id,
    segment: lead.segment,
    companyName: lead.companyName,
    city: lead.city,
    intentScore: lead.intentScore,
    budgetEstimate: lead.budgetEstimate,
    priceSensitivity: lead.priceSensitivity,
    status: lead.status,
  }));

  const avgOpportunityScore =
    opportunities.length > 0
      ? Number((opportunities.reduce((sum, item) => sum + item.opportunityScore, 0) / opportunities.length).toFixed(2))
      : 0;

    return {
      trendInsight: {
        styleTrends: styleScored,
        materialTrends: materialScored,
        designTrends: designScored,
        seasonalDemand,
      },
      bestSellers,
      buyingBehavior,
      opportunities,
      qualifiedLeads,
      summary: {
        totalTrendKeywords: topTrendKeywords.length,
        avgOpportunityScore,
        leadsReady: qualifiedLeads.filter((item) => item.status === 'QUALIFIED').length,
      },
    };
  } catch {
    throw new Error('Unable to load Indonesia market intelligence from database');
  }
}

export async function generateQualifiedLeadsFromInsights(limit: number = 15): Promise<QualifiedLeadItem[]> {
  const intel = await getIndonesiaMarketIntelligence();
  const seeds = intel.opportunities.slice(0, limit);
  if (seeds.length === 0) {
    return [];
  }

  try {
    const created = await prisma.$transaction(
      seeds.map((seed, index) => {
        const segment = seed.recommendedSegment;
        const city = TARGET_CITIES[index % TARGET_CITIES.length];
        const intentScore = Number((Math.min(99, seed.opportunityScore * 10 + 20)).toFixed(1));
        const budgetEstimate = Math.round(seed.estimatedAvgPrice * (segment === 'WHOLESALE' ? 15 : segment === 'PROJECT' ? 8 : 5));

        const companyPrefix = segment === 'B2B' ? 'PT' : segment === 'PROJECT' ? 'Studio' : 'CV';
        const companyName = `${companyPrefix} ${seed.keyword.replace(/[^a-zA-Z0-9\s]/g, '').slice(0, 18)} ${city}`;

        return prisma.qualifiedLead.create({
          data: {
            segment,
            companyName,
            city,
            source: 'indonesia-market-intelligence',
            intentScore,
            budgetEstimate,
            priceSensitivity: intel.buyingBehavior.priceSensitivity,
            preferredStyles: intel.buyingBehavior.preferredStyles as Prisma.InputJsonValue,
            preferredMaterials: intel.buyingBehavior.preferredMaterials as Prisma.InputJsonValue,
            status: intentScore >= 75 ? 'QUALIFIED' : 'NEW',
            notes: `Lead generated for keyword ${seed.keyword} with opportunity score ${seed.opportunityScore}`,
          },
        });
      })
    );

    return created.map((lead) => ({
      id: lead.id,
      segment: lead.segment,
      companyName: lead.companyName,
      city: lead.city,
      intentScore: lead.intentScore,
      budgetEstimate: lead.budgetEstimate,
      priceSensitivity: lead.priceSensitivity,
      status: lead.status,
    }));
  } catch {
    throw new Error('Unable to generate qualified leads from database-backed intelligence');
  }
}

export async function listQualifiedLeads(options: {
  limit?: number;
  segment?: 'B2B' | 'PROJECT' | 'WHOLESALE';
  city?: string;
  status?: 'NEW' | 'QUALIFIED' | 'CONTACTED' | 'WON' | 'LOST';
} = {}): Promise<QualifiedLeadItem[]> {
  try {
    const rows = await prisma.qualifiedLead.findMany({
      where: {
        ...(options.segment ? { segment: options.segment } : {}),
        ...(options.city ? { city: options.city } : {}),
        ...(options.status ? { status: options.status } : {}),
      },
      orderBy: [{ status: 'asc' }, { intentScore: 'desc' }, { createdAt: 'desc' }],
      take: options.limit ?? 30,
    });

    return rows.map((lead) => ({
      id: lead.id,
      segment: lead.segment,
      companyName: lead.companyName,
      city: lead.city,
      intentScore: lead.intentScore,
      budgetEstimate: lead.budgetEstimate,
      priceSensitivity: lead.priceSensitivity,
      status: lead.status,
    }));
  } catch {
    throw new Error('Unable to list qualified leads from database');
  }
}

export async function updateQualifiedLeadStatus(input: {
  id: string;
  status: 'NEW' | 'QUALIFIED' | 'CONTACTED' | 'WON' | 'LOST';
  notes?: string;
}): Promise<QualifiedLeadItem> {
  const lead = await prisma.qualifiedLead.update({
    where: { id: input.id },
    data: {
      status: input.status,
      notes: input.notes,
    },
  });

  return {
    id: lead.id,
    segment: lead.segment,
    companyName: lead.companyName,
    city: lead.city,
    intentScore: lead.intentScore,
    budgetEstimate: lead.budgetEstimate,
    priceSensitivity: lead.priceSensitivity,
    status: lead.status,
  };
}

export async function exportQualifiedLeadsCsv(options: {
  segment?: 'B2B' | 'PROJECT' | 'WHOLESALE';
  city?: string;
  status?: 'NEW' | 'QUALIFIED' | 'CONTACTED' | 'WON' | 'LOST';
  limit?: number;
}): Promise<string> {
  const rows = await prisma.qualifiedLead.findMany({
    where: {
      ...(options.segment ? { segment: options.segment } : {}),
      ...(options.city ? { city: options.city } : {}),
      ...(options.status ? { status: options.status } : {}),
    },
    orderBy: [{ intentScore: 'desc' }, { createdAt: 'desc' }],
    take: options.limit ?? 200,
  });

  const headers = ['id', 'segment', 'companyName', 'city', 'intentScore', 'budgetEstimate', 'priceSensitivity', 'status', 'source'];
  const csvRows = rows.map((row) => [
    row.id,
    row.segment,
    row.companyName,
    row.city,
    row.intentScore.toFixed(1),
    row.budgetEstimate?.toString() ?? '',
    row.priceSensitivity,
    row.status,
    row.source,
  ]);

  return [headers, ...csvRows]
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}
