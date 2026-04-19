-- CreateEnum
CREATE TYPE "LeadSegment" AS ENUM ('B2B', 'PROJECT', 'WHOLESALE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'QUALIFIED', 'CONTACTED', 'WON', 'LOST');

-- CreateTable
CREATE TABLE "MarketOpportunity" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "demandScore" DOUBLE PRECISION NOT NULL,
    "competitionScore" DOUBLE PRECISION NOT NULL,
    "opportunityScore" DOUBLE PRECISION NOT NULL,
    "avgMarketPrice" INTEGER NOT NULL,
    "seasonalWindow" TEXT NOT NULL,
    "recommendedSegment" "LeadSegment" NOT NULL,
    "rationale" JSONB NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MarketOpportunity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualifiedLead" (
    "id" TEXT NOT NULL,
    "segment" "LeadSegment" NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "city" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "intentScore" DOUBLE PRECISION NOT NULL,
    "budgetEstimate" INTEGER,
    "priceSensitivity" TEXT NOT NULL,
    "preferredStyles" JSONB NOT NULL,
    "preferredMaterials" JSONB NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QualifiedLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MarketOpportunity_keyword_capturedAt_idx" ON "MarketOpportunity"("keyword", "capturedAt");

-- CreateIndex
CREATE INDEX "MarketOpportunity_opportunityScore_idx" ON "MarketOpportunity"("opportunityScore");

-- CreateIndex
CREATE INDEX "MarketOpportunity_recommendedSegment_capturedAt_idx" ON "MarketOpportunity"("recommendedSegment", "capturedAt");

-- CreateIndex
CREATE INDEX "QualifiedLead_segment_status_capturedAt_idx" ON "QualifiedLead"("segment", "status", "capturedAt");

-- CreateIndex
CREATE INDEX "QualifiedLead_intentScore_idx" ON "QualifiedLead"("intentScore");

-- CreateIndex
CREATE INDEX "QualifiedLead_city_capturedAt_idx" ON "QualifiedLead"("city", "capturedAt");
