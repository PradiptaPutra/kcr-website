/*
  Warnings:

  - A unique constraint covering the columns `[keyword,type]` on the table `AlertRule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `message` to the `AlertEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AlertRule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('PRICE_DROP', 'NEW_PRODUCT', 'AD_SPEND_SPIKE', 'RANK_CHANGE', 'SOCIAL_SURGE');

-- DropIndex
DROP INDEX "AlertRule_keyword_growthThreshold_key";

-- AlterTable
ALTER TABLE "AdCreative" ADD COLUMN     "competitor_brand" TEXT,
ADD COLUMN     "estimatedMonthlySpend" DOUBLE PRECISION,
ADD COLUMN     "firstSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "AlertEvent" ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "severity" TEXT NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "type" "AlertType" NOT NULL DEFAULT 'PRICE_DROP',
ALTER COLUMN "growth" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AlertRule" ADD COLUMN     "type" "AlertType" NOT NULL DEFAULT 'PRICE_DROP',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "growthThreshold" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CompetitorProduct" ADD COLUMN     "competitor_brand" TEXT;

-- CreateTable
CREATE TABLE "KeywordRanking" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "competitorUrl" TEXT NOT NULL,
    "competitorBrand" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'google',
    "region" TEXT NOT NULL DEFAULT 'ID',
    "previousPos" INTEGER,
    "changePercent" DOUBLE PRECISION,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeywordRanking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KeywordRanking_keyword_capturedAt_idx" ON "KeywordRanking"("keyword", "capturedAt");

-- CreateIndex
CREATE INDEX "KeywordRanking_competitorBrand_capturedAt_idx" ON "KeywordRanking"("competitorBrand", "capturedAt");

-- CreateIndex
CREATE INDEX "KeywordRanking_platform_region_capturedAt_idx" ON "KeywordRanking"("platform", "region", "capturedAt");

-- CreateIndex
CREATE INDEX "AdCreative_competitor_brand_lastSeen_idx" ON "AdCreative"("competitor_brand", "lastSeen");

-- CreateIndex
CREATE INDEX "AlertEvent_alertRuleId_createdAt_idx" ON "AlertEvent"("alertRuleId", "createdAt");

-- CreateIndex
CREATE INDEX "AlertEvent_severity_idx" ON "AlertEvent"("severity");

-- CreateIndex
CREATE INDEX "AlertRule_keyword_idx" ON "AlertRule"("keyword");

-- CreateIndex
CREATE UNIQUE INDEX "AlertRule_keyword_type_key" ON "AlertRule"("keyword", "type");

-- CreateIndex
CREATE INDEX "CompetitorProduct_competitor_brand_capturedAt_idx" ON "CompetitorProduct"("competitor_brand", "capturedAt");
