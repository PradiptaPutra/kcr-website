"use client";

import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  BarChart3, 
  Search, 
  LayoutDashboard, 
  Target, 
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import type { DashboardOverviewPayload } from '@/lib/types/marketing';
import { t } from '@/lib/translations';
import KeywordRankingCard from './KeywordRankingCard';
import SocialIntelligenceCard from './SocialIntelligenceCard';

type MetricTrend = 'up' | 'down';

type InsightType = 'opportunity' | 'warning' | 'action';

interface MetricCardProps {
  title: string;
  value: string;
  trend: MetricTrend;
  label: string;
  icon: React.ReactNode;
}

interface InsightItemProps {
  type: InsightType;
  title: string;
  desc: string;
}

interface ProductItemProps {
  name: string;
  score: string;
  trend: string;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardOverviewPayload | null>(null);
  const [reporting, setReporting] = useState(false);
  const [reportMessage, setReportMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/dashboard/overview', { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as DashboardOverviewPayload;
        setData(payload);
      } catch {
        // Keep static fallback UI when API is unavailable.
      }
    };

    load();
  }, []);

  const trendBars = data?.trendVelocity?.length ? data.trendVelocity : [40, 60, 45, 90, 75, 55, 100, 80, 65, 85, 70, 95, 60, 40];
  const insights = data?.insights?.length
    ? data.insights
    : [
        {
          type: 'opportunity' as const,
          title: t('insights.workstationDemand'),
          desc: t('insights.workstationDesc'),
        },
        {
          type: 'warning' as const,
          title: t('insights.competitorAdBlitz'),
          desc: t('insights.competitorAdDesc'),
        },
        {
          type: 'action' as const,
          title: t('insights.optimizeAdHooks'),
          desc: t('insights.optimizeAdDesc'),
        },
      ];
  const winningProducts = data?.winningProducts?.length ? data.winningProducts : [];

  const generateReport = async () => {
    setReporting(true);
    setReportMessage('');

    try {
      const response = await fetch('/api/cron/weekly-scan', { cache: 'no-store' });
      if (!response.ok) {
        setReportMessage('Report generation failed');
        return;
      }

      setReportMessage('Weekly report generated');
    } catch {
      setReportMessage('Report generation failed');
    } finally {
      setReporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">{t('dashboard.title')}</h1>
          <p className="text-zinc-400 mt-1 font-mono text-sm tracking-wider">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-mono text-zinc-300">{t('dashboard.systemOnline')}</span>
          </div>
          <button
            onClick={generateReport}
            disabled={reporting}
            className="px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors duration-300 disabled:opacity-60"
          >
            {reporting ? t('dashboard.generating') : t('dashboard.generateReport')}
          </button>
        </div>
        {reportMessage ? <p className="text-[10px] text-zinc-500 font-mono uppercase">{reportMessage}</p> : null}
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title={t('dashboard.metrics.marketDemand')} 
          value={`${data ? (data.metrics.marketDemandGrowth >= 0 ? '+' : '') + data.metrics.marketDemandGrowth.toFixed(1) : '+14.2'}%`} 
          trend={data && data.metrics.marketDemandGrowth < 0 ? 'down' : 'up'} 
          label={t('dashboard.metrics.marketDemandLabel')} 
          icon={<TrendingUp className="w-4 h-4 text-emerald-400" />} 
        />
        <MetricCard 
          title={t('dashboard.metrics.adHookEfficiency')} 
          value={`${data ? data.metrics.adHookEfficiency.toFixed(1) : '68.4'}%`} 
          trend="up" 
          label={t('dashboard.metrics.adHookLabel')} 
          icon={<Zap className="w-4 h-4 text-amber-400" />} 
        />
        <MetricCard 
          title={t('dashboard.metrics.competitorVolume')} 
          value={`${data ? data.metrics.competitorVolume : 42}`} 
          trend={data && data.metrics.competitorVolume > 60 ? 'down' : 'up'} 
          label={t('dashboard.metrics.competitorLabel')} 
          icon={<Users className="w-4 h-4 text-blue-400" />} 
        />
        <MetricCard 
          title={t('dashboard.metrics.searchVolume')} 
          value={data ? Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(data.metrics.totalSearchVolume) : '1.2M'} 
          trend="up" 
          label={t('dashboard.metrics.searchLabel')} 
          icon={<Search className="w-4 h-4 text-purple-400" />} 
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Visualization */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-800 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <BarChart3 className="w-32 h-32" />
          </div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold tracking-wider uppercase italic">{t('dashboard.trends.title')}</h3>
            <select className="bg-transparent border-none text-zinc-500 text-xs font-mono outline-none cursor-pointer">
              <option>{t('dashboard.trends.last7Days')}</option>
              <option>{t('dashboard.trends.last30Days')}</option>
            </select>
          </div>
          <div className="h-[300px] flex items-end gap-1 px-4 relative">
             {/* Mock Chart Bars */}
             {trendBars.map((h, i) => (
               <div key={i} className="flex-1 bg-zinc-800 hover:bg-emerald-500/50 transition-colors duration-300 relative group/bar" style={{ height: `${h}%` }}>
                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-[10px] font-mono px-1 opacity-0 group-hover/bar:opacity-100 transition-opacity uppercase">
                   {h}%
                 </div>
               </div>
             ))}
             {/* Overlay Grid */}
             <div className="absolute inset-0 border-b border-zinc-800 flex flex-col justify-between py-1 pointer-events-none">
               {[...Array(5)].map((_, i) => <div key={i} className="w-full border-t border-zinc-900 border-dashed" />)}
             </div>
          </div>
          <div className="mt-4 flex justify-between text-[10px] font-mono text-zinc-600">
            <span>{t('dashboard.trends.dateStart')}</span>
            <span>WED, APR 15</span>
            <span>FRI, APR 17</span>
            <span>{t('dashboard.trends.dateEnd')}</span>
          </div>
        </div>

        {/* Actionable Insights */}
        <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col">
          <h3 className="text-lg font-bold tracking-wider uppercase italic mb-6">{t('dashboard.insights.title')}</h3>
          <div className="space-y-4 flex-1">
            {insights.map((item) => (
              <InsightItem
                key={item.title}
                type={item.type}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
          <button className="mt-6 w-full py-3 border border-zinc-800 text-xs uppercase tracking-[0.2em] hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2 group">
            {t('dashboard.insights.viewAll')} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-950 border border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold uppercase tracking-widest">{t('dashboard.winningProducts')}</h4>
          </div>
          <div className="space-y-4">
            {(winningProducts.length
              ? winningProducts.map((item) => ({
                  name: item.name,
                  score: item.score.toFixed(1),
                  trend: `${item.trend >= 0 ? '+' : ''}${item.trend.toFixed(1)}`,
                }))
              : [
                  { name: 'Moderna MSB 4PX', score: '9.8', trend: '+2.4' },
                  { name: 'Prime Executive CP', score: '8.5', trend: '+0.8' },
                  { name: 'Forma FWA Modular', score: '7.2', trend: '-0.4' },
                ]
            ).map((item) => (
              <ProductItem key={item.name} name={item.name} score={item.score} trend={item.trend} />
            ))}
          </div>
        </div>
        
        <div className="bg-zinc-950 border border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Megaphone className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold uppercase tracking-widest">{t('dashboard.adPulse')}</h4>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">{t('dashboard.avgCtr')}</span>
              <span className="font-mono text-white">{data ? data.adPulse.avgCtr.toFixed(1) : '4.2'}%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${Math.min(100, Math.max(10, (data?.adPulse.avgCtr ?? 4.2) * 10))}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500">{t('dashboard.avgRoas')}</span>
              <span className="font-mono text-white">{data ? data.adPulse.avgRoas.toFixed(1) : '5.8'}x</span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${Math.min(100, Math.max(10, (data?.adPulse.avgRoas ?? 5.8) * 10))}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-zinc-900 transition-colors">
          <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <LayoutDashboard className="w-6 h-6 text-zinc-500" />
          </div>
          <h4 className="font-bold uppercase tracking-widest text-sm mb-2">{t('dashboard.initializeScanner')}</h4>
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed px-8">
            {t('dashboard.scanDescription')}
          </p>
        </div>
      </div>

      {/* Keyword Ranking Section */}
      <div className="bg-zinc-950 border border-zinc-800 p-6">
        <h3 className="text-lg font-bold tracking-wider uppercase italic mb-6">{t('dashboard.keywords') || 'Keyword Rankings'}</h3>
        <KeywordRankingCard />
      </div>

      {/* Social Intelligence Section */}
      <SocialIntelligenceCard />
    </div>
  );
}

function MetricCard({ title, value, trend, label, icon }: MetricCardProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-sm group-hover:bg-zinc-800 transition-colors">
          {icon}
        </div>
        <span className={`flex items-center gap-1 text-[10px] font-bold font-mono ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend === 'up' ? t('dashboard.profit') : t('dashboard.loss')}
        </span>
      </div>
      <div>
        <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{title}</h3>
        <div className="text-2xl font-bold tracking-tight text-white italic">{value}</div>
        <p className="text-zinc-600 text-[10px] font-mono mt-1 uppercase">{label}</p>
      </div>
    </div>
  );
}

function InsightItem({ type, title, desc }: InsightItemProps) {
  const colors = {
    opportunity: 'bg-emerald-500',
    warning: 'bg-rose-500',
    action: 'bg-amber-500'
  } as const;

  return (
    <div className="p-4 border border-zinc-900 bg-zinc-900/50 hover:bg-zinc-900 transition-colors cursor-pointer group">
      <div className="flex gap-4">
        <div className={`w-1 h-auto ${colors[type]}`} />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-white transition-colors">{title}</h4>
          <p className="text-zinc-500 text-[10px] font-mono leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function ProductItem({ name, score, trend }: ProductItemProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-zinc-900 last:border-0">
      <div>
        <div className="text-xs font-bold text-white uppercase">{name}</div>
        <div className="text-[10px] text-zinc-600 font-mono tracking-tighter">{t('dashboard.score')}: {score}/10</div>
      </div>
      <div className={`text-[10px] font-mono font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend}%
      </div>
    </div>
  );
}
