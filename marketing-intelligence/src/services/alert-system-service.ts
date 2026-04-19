import { prisma } from '@/lib/db';

export interface AlertCheck {
  ruleId: string;
  triggered: boolean;
  reason: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  actionItems: string[];
  timestamp: Date;
}

/**
 * Check competitor price drops
 */
export async function checkCompetitorPriceDrop(threshold: number = 10): Promise<AlertCheck[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const results: AlertCheck[] = [];
    const rules = await prisma.alertRule.findMany({
      where: { type: 'PRICE_DROP' },
    });

    for (const rule of rules) {
      const recentSnapshots = await prisma.competitor.findMany({
        where: { brand: rule.keyword },
        orderBy: { createdAt: 'desc' },
        take: 2,
      });

      if (recentSnapshots.length >= 2) {
        const oldPrice = recentSnapshots[1].avgPrice ?? 0;
        const newPrice = recentSnapshots[0].avgPrice ?? 0;
        const percentDrop = oldPrice > 0 ? ((oldPrice - newPrice) / oldPrice) * 100 : 0;

        if (percentDrop >= threshold && percentDrop > 0) {
          results.push({
            ruleId: rule.id,
            triggered: true,
            reason: `${rule.keyword} dropped price by ${percentDrop.toFixed(1)}%`,
            severity: percentDrop > 20 ? 'critical' : 'high',
            actionItems: [
              `Review competitor pricing strategy`,
              `Consider if matching price is necessary`,
              `Check profit margins before reacting`,
            ],
            timestamp: new Date(),
          });

          await prisma.alertEvent.create({
            data: {
              alertRuleId: rule.id,
              type: 'PRICE_DROP',
              keyword: rule.keyword,
              severity: percentDrop > 20 ? 'CRITICAL' : 'HIGH',
              message: `Price drop detected: ${rule.keyword} -${percentDrop.toFixed(1)}%`,
              payload: {},
              metadata: {
                oldPrice,
                newPrice,
                percentDrop,
              },
            },
          });
        }
      }
    }

    return results;
  } catch {
    return [];
  }
}

/**
 * Check new competitor products
 */
export async function checkNewCompetitorProducts(): Promise<AlertCheck[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const results: AlertCheck[] = [];
    const rules = await prisma.alertRule.findMany({
      where: { type: 'NEW_PRODUCT' },
    });

    for (const rule of rules) {
      const products = await prisma.competitorProduct.findMany({
        where: { competitor_brand: rule.keyword },
        orderBy: { capturedAt: 'desc' },
        take: 5,
      });

      const newProductsCount = products.filter((p) => {
        const ageHours = (Date.now() - (p.capturedAt?.getTime() ?? 0)) / (1000 * 60 * 60);
        return ageHours < 24;
      }).length;

      if (newProductsCount > 0) {
        results.push({
          ruleId: rule.id,
          triggered: true,
          reason: `${newProductsCount} new products detected from ${rule.keyword}`,
          severity: newProductsCount >= 3 ? 'high' : 'medium',
          actionItems: [
            `Review new product specs and positioning`,
            `Identify competitive advantage gaps`,
            `Assess if product updates needed`,
          ],
          timestamp: new Date(),
        });

        await prisma.alertEvent.create({
          data: {
            alertRuleId: rule.id,
            type: 'NEW_PRODUCT',
            keyword: rule.keyword,
            severity: newProductsCount >= 3 ? 'HIGH' : 'MEDIUM',
            message: `${newProductsCount} new products: ${rule.keyword}`,
            payload: {},
            metadata: { newProductsCount, products: products.slice(0, 3).map((p) => p.title) },
          },
        });
      }
    }

    return results;
  } catch {
    return [];
  }
}

/**
 * Check ad spend increases
 */
export async function checkAdSpendSpike(): Promise<AlertCheck[]> {
  if (!process.env.DATABASE_URL) {
    return [];
  }

  try {
    const results: AlertCheck[] = [];
    const rules = await prisma.alertRule.findMany({
      where: { type: 'AD_SPEND_SPIKE' },
    });

    for (const rule of rules) {
      const recentAds = await prisma.adCreative.findMany({
        where: { competitor_brand: rule.keyword },
        orderBy: { createdAt: 'desc' },
        take: 20,
      });

      const newAdsCount = recentAds.filter((a) => {
        const ageHours = (Date.now() - (a.createdAt?.getTime() ?? 0)) / (1000 * 60 * 60);
        return ageHours < 24 * 7; // Last 7 days
      }).length;

      if (newAdsCount >= 3) {
        results.push({
          ruleId: rule.id,
          triggered: true,
          reason: `${rule.keyword} launched ${newAdsCount} new ad creatives in last 7 days`,
          severity: newAdsCount >= 5 ? 'high' : 'medium',
          actionItems: [
            `Download competitor ad library`,
            `Analyze new ad angles and hooks`,
            `Consider counter-campaign strategy`,
          ],
          timestamp: new Date(),
        });

        await prisma.alertEvent.create({
          data: {
            alertRuleId: rule.id,
            type: 'AD_SPEND_SPIKE',
            keyword: rule.keyword,
            severity: newAdsCount >= 5 ? 'HIGH' : 'MEDIUM',
            message: `Ad campaign detected: ${rule.keyword} (${newAdsCount} new creatives)`,
            payload: {},
            metadata: { newAdsCount },
          },
        });
      }
    }

    return results;
  } catch {
    return [];
  }
}

/**
 * Get all triggered alerts for dashboard
 */
export async function getTriggeredAlerts(): Promise<AlertCheck[]> {
  const checks = await Promise.all([
    checkCompetitorPriceDrop(10),
    checkNewCompetitorProducts(),
    checkAdSpendSpike(),
  ]);

  return checks.flat().sort((a, b) => {
    const severityRank = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityRank[a.severity] - severityRank[b.severity];
  });
}
