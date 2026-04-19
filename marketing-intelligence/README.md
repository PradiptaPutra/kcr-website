# KCR Digital Marketing Intelligence Tool

## Overview
A specialized intelligence dashboard designed to assist KCR Furniture in data-driven decision making. This tool analyzes market trends, competitor strategies, and ad performance to identify winning products and optimize marketing ROI.

## Core Modules (MVP)
- **Market & Trend Research**: Scans Tokopedia, Shopee, TikTok Shop, and Google Trends for rising furniture keywords and viral products.
- **Competitor Analysis**: Extract pricing strategy, positioning, and engagement metrics from competitor links.
- **Ad Intelligence**: Breakdown of Meta/TikTok ads into hooks, copy, and CTA strategies.

## Tech Stack
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Icons**: Lucide React.
- **Data Integration**: Uses context from the main `kcr-website` project (`src/lib/data/kcr-context.json`).
- **Data Connectors (Phase 1)**: `google-trends-api`, Playwright, and Route Handlers in `src/app/api/*`.

## Getting Started
1. Navigate to the directory: `cd marketing-intelligence`
2. Install dependencies: `npm install`
3. Copy environment template: `cp .env.example .env.local`
4. Install browser binary for scraping: `npx playwright install chromium`
5. Generate Prisma client: `npm run prisma:generate`
6. Run database migrations: `npm run prisma:migrate`
7. Run the development server: `npm run dev`

## Phase 1 Endpoints
- `GET /api/research/trends?deepScan=0|1&keywords=...`
	- Aggregates Google Trends and optional marketplace scan output.
- `GET /api/trends/google?keywords=...&geo=ID&timeframe=now%207-d`
	- Returns Google Trends-backed keyword signals.
- `GET /api/scrape/:platform?keyword=...&maxResults=12`
	- Scrapes marketplace search pages (`tokopedia`, `shopee`, `tiktok`) using Playwright.
- `POST /api/competitors/analyze`
	- Request body: `{ "url": "https://..." }`
	- Extracts competitor product signals, pricing position, and hook opportunities.
- `GET /api/ads/library?keyword=...&country=ID&includeReplicas=1`
	- Pulls ad creative signals from Meta Ad Library API when token is configured.
	- Returns fallback ad intelligence plus replica drafts when API token is not available.

## Phase 2/3 Endpoints
- `GET /api/dashboard/overview`
	- Returns dashboard metrics aggregated from PostgreSQL snapshots.
- `GET /api/intelligence/scores?limit=10`
	- Returns latest product validation scores (Demand + Competition + Virality).
- `POST /api/intelligence/scores`
	- Calculates a one-off score from supplied demand/competition/virality inputs.
- `GET /api/cron/weekly-scan`
	- Runs deep scan pipeline and stores weekly report output.
- `GET/POST /api/alerts/rules`
	- Manage keyword growth alert rules.
- `POST /api/alerts/check`
	- Evaluates active alert rules and triggers webhook/email notifications.

## Background Automation
- `vercel.json` config schedules weekly scan every Monday 08:00 WIB (`0 1 * * 1` UTC).
- Protect cron endpoint with `CRON_SECRET` in production.

## AI Layer
- Competitor analysis route enriches weaknesses/ad hooks using OpenAI when `OPENAI_API_KEY` is available.
- Ad replica generation uses OpenAI (model: `OPENAI_MODEL`, default `gpt-4.1-mini`) with deterministic fallback behavior when no key is set.

## Important Notes
- Marketplace selectors and anti-bot defenses change often; treat scraper output as best-effort.
- For production reliability, configure rotating proxies and run scraper jobs in controlled background workers.

## Integration with KCR Website
This tool is built as a separate sub-project to maintain separation of concerns but is designed to use the product data and brand positioning defined in the main `kcr-website` repository.

### Shared Context
The file `src/lib/data/kcr-context.json` is the bridge that feeds the marketing tool with current KCR product categories and selling points.
