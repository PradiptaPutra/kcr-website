-- CreateEnum
CREATE TYPE "SocialPlatform" AS ENUM ('instagram', 'tiktok');

-- CreateTable
CREATE TABLE "SocialMetric" (
    "id" TEXT NOT NULL,
    "platform" "SocialPlatform" NOT NULL,
    "accountHandle" TEXT NOT NULL,
    "competitorBrand" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "engagementRate" DOUBLE PRECISION NOT NULL,
    "postingFrequency" DOUBLE PRECISION NOT NULL,
    "avgViews" INTEGER NOT NULL,
    "sentimentScore" DOUBLE PRECISION,
    "topContentType" TEXT NOT NULL,
    "hashtagTrends" JSONB NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SocialMetric_platform_capturedAt_idx" ON "SocialMetric"("platform", "capturedAt");

-- CreateIndex
CREATE INDEX "SocialMetric_competitorBrand_capturedAt_idx" ON "SocialMetric"("competitorBrand", "capturedAt");

-- CreateIndex
CREATE INDEX "SocialMetric_accountHandle_capturedAt_idx" ON "SocialMetric"("accountHandle", "capturedAt");
