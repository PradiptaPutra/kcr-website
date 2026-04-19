-- CreateEnum
CREATE TYPE "TrendStatus" AS ENUM ('rising', 'stable', 'viral');

-- CreateEnum
CREATE TYPE "PricingTier" AS ENUM ('low', 'medium', 'premium', 'unknown');

-- CreateEnum
CREATE TYPE "Recommendation" AS ENUM ('GO', 'NO_GO', 'WATCH');

-- CreateTable
CREATE TABLE "TrendSnapshot" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "searchVolume" INTEGER NOT NULL,
    "growth" DOUBLE PRECISION NOT NULL,
    "platform" TEXT NOT NULL,
    "status" "TrendStatus" NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrendSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "pricing" "PricingTier" NOT NULL,
    "avgPrice" INTEGER NOT NULL,
    "salesSignal" INTEGER NOT NULL,
    "strengths" JSONB NOT NULL,
    "weaknesses" JSONB NOT NULL,
    "adHooks" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitorProduct" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priceText" TEXT NOT NULL,
    "salesVolume" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitorProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdCreative" (
    "id" TEXT NOT NULL,
    "externalId" TEXT,
    "platform" TEXT NOT NULL,
    "advertiser" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "hook" TEXT NOT NULL,
    "copy" TEXT NOT NULL,
    "cta" TEXT NOT NULL,
    "keyword" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdCreative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductScore" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "demandScore" DOUBLE PRECISION NOT NULL,
    "competitionScore" DOUBLE PRECISION NOT NULL,
    "viralityScore" DOUBLE PRECISION NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL,
    "recommendation" "Recommendation" NOT NULL,
    "contributors" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyReport" (
    "id" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "topKeyword" TEXT NOT NULL,
    "topScore" DOUBLE PRECISION NOT NULL,
    "strategy" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertRule" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "growthThreshold" DOUBLE PRECISION NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertEvent" (
    "id" TEXT NOT NULL,
    "alertRuleId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "growth" DOUBLE PRECISION NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AlertEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrendSnapshot_keyword_capturedAt_idx" ON "TrendSnapshot"("keyword", "capturedAt");

-- CreateIndex
CREATE INDEX "TrendSnapshot_platform_capturedAt_idx" ON "TrendSnapshot"("platform", "capturedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Competitor_url_key" ON "Competitor"("url");

-- CreateIndex
CREATE INDEX "CompetitorProduct_competitorId_capturedAt_idx" ON "CompetitorProduct"("competitorId", "capturedAt");

-- CreateIndex
CREATE INDEX "AdCreative_platform_startedAt_idx" ON "AdCreative"("platform", "startedAt");

-- CreateIndex
CREATE INDEX "AdCreative_keyword_idx" ON "AdCreative"("keyword");

-- CreateIndex
CREATE INDEX "ProductScore_keyword_createdAt_idx" ON "ProductScore"("keyword", "createdAt");

-- CreateIndex
CREATE INDEX "ProductScore_totalScore_idx" ON "ProductScore"("totalScore");

-- CreateIndex
CREATE UNIQUE INDEX "WeeklyReport_reportDate_key" ON "WeeklyReport"("reportDate");

-- CreateIndex
CREATE UNIQUE INDEX "AlertRule_keyword_growthThreshold_key" ON "AlertRule"("keyword", "growthThreshold");

-- CreateIndex
CREATE INDEX "AlertEvent_keyword_createdAt_idx" ON "AlertEvent"("keyword", "createdAt");

-- AddForeignKey
ALTER TABLE "CompetitorProduct" ADD CONSTRAINT "CompetitorProduct_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "Competitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertEvent" ADD CONSTRAINT "AlertEvent_alertRuleId_fkey" FOREIGN KEY ("alertRuleId") REFERENCES "AlertRule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
