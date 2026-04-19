"use client";

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Zap, Target, MousePointer2, MessageSquareText } from 'lucide-react';
import { getAdCreatives, generateAdReplicas } from '@/services/marketing-service';
import type { AdCreative, AdReplicaDraft, CompetitorAdSpendIntel } from '@/lib/types/marketing';
import { t } from '@/lib/translations';

export default function AdsPage() {
  const [keyword, setKeyword] = useState('modular workstation');
  const [creatives, setCreatives] = useState<AdCreative[]>([]);
  const [angles, setAngles] = useState<AdReplicaDraft[]>([]);
  const [adSpendRows, setAdSpendRows] = useState<CompetitorAdSpendIntel[]>([]);
  const [totalSpend, setTotalSpend] = useState(0);
  const [topSpender, setTopSpender] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [sourceLabel, setSourceLabel] = useState<'meta-api' | 'fallback'>('fallback');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await getAdCreatives({ keyword });
        setCreatives(result.creatives.slice(0, 3));
        setAdSpendRows(result.adSpendIntel.competitors.slice(0, 5));
        setTotalSpend(result.adSpendIntel.summary.totalEstimatedSpend);
        setTopSpender(result.adSpendIntel.summary.topSpender);
        setSourceLabel(result.source);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [keyword]);

  const onGenerate = async () => {
    setGenerating(true);
    try {
      const result = await generateAdReplicas({
        keyword,
        brand: 'KCR Furniture',
      });
      setAngles(result.replicas);
      setSourceLabel(result.source);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">{t('ads.title')}</h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm tracking-wider">{t('ads.subtitle')}</p>
          </div>
          <div className="flex gap-4 items-center">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="bg-black border border-zinc-800 px-3 py-2 text-[10px] uppercase tracking-wider font-mono text-zinc-300 outline-none focus:border-emerald-500"
            />
            <div className="px-4 py-2 border border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
               {t('ads.tiktokAdsActive')}
            </div>
            <div className="px-4 py-2 border border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
               {t('ads.metaAdsActive')}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Ad Breakdown Simulation */}
           <div className="bg-zinc-950 border border-zinc-800 p-8">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center rounded-sm">
                    <Target className="w-5 h-5 text-emerald-400" />
                 </div>
                 <h3 className="text-lg font-bold tracking-widest uppercase italic text-white">{t('ads.adCreativeAnalysis')}</h3>
              </div>

              <div className="space-y-8">
                 {loading ? (
                   <BreakdownSection
                     icon={<Zap size={16} />}
                     title={t('common.loading')}
                     content={t('ads.fetching')}
                     color="text-zinc-400"
                   />
                 ) : (
                   <>
                 <BreakdownSection 
                   icon={<Zap size={16} />} 
                   title={t('ads.hookAnalysis')} 
                   content={creatives[0]?.hook || t('ads.noHookData')}
                   color="text-amber-400"
                 />
                 <BreakdownSection 
                   icon={<MessageSquareText size={16} />} 
                   title={t('ads.copywritingAngle')} 
                   content={creatives[0]?.copy || t('ads.noCopyData')}
                   color="text-blue-400"
                 />
                 <BreakdownSection 
                   icon={<MousePointer2 size={16} />} 
                   title={t('ads.ctaOptimization')} 
                   content={creatives[0]?.cta || t('ads.noCtaData')}
                   color="text-emerald-400"
                 />
                   </>
                 )}
              </div>
           </div>

           {/* Ad Ideas Generator */}
           <div className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-lg font-bold tracking-widest uppercase italic text-white">{t('ads.winningAngles')}</h3>
                 <span className="text-[10px] font-mono text-zinc-500">{t('ads.aiGenerated')}</span>
              </div>

              <div className="flex-1 space-y-4">
                 {(angles.length > 0
                   ? angles
                   : [
                       {
                         angle: "The 'Space ROI' Angle",
                         body: 'Focus on how modular workstations save 15% office space while increasing comfort.',
                         hook: '',
                         cta: '',
                       },
                       {
                         angle: "The 'CNC Precision' Angle",
                         body: 'ASMR style manufacturing process showcasing European quality standards.',
                         hook: '',
                         cta: '',
                       },
                       {
                         angle: "The 'Design-First' Angle",
                         body: 'Highlighting the aesthetic synergy between hospitality and office environments.',
                         hook: '',
                         cta: '',
                       },
                     ]
                 ).map((item) => (
                   <AngleCard key={item.angle} title={item.angle} desc={item.body} />
                 ))}
              </div>

              <button
                onClick={onGenerate}
                disabled={generating}
                className="mt-8 w-full py-4 bg-emerald-500 text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-emerald-400 transition-colors disabled:opacity-50"
              >
                 {generating ? t('common.loading') : t('ads.generateNewCreatives')}
              </button>
              <p className="mt-3 text-[10px] text-zinc-500 font-mono uppercase">{t('ads.source')}: {sourceLabel}</p>
           </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold tracking-widest uppercase italic text-white">{t('ads.adSpendIntel')}</h3>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500">30D window</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="border border-zinc-800 p-4">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{t('ads.estimatedTotalSpend')}</p>
              <p className="text-xl font-bold text-white">Rp {Intl.NumberFormat('id-ID').format(Math.round(totalSpend * 16000))}</p>
            </div>
            <div className="border border-zinc-800 p-4">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{t('ads.topSpender')}</p>
              <p className="text-xl font-bold text-white">{topSpender ?? 'N/A'}</p>
            </div>
            <div className="border border-zinc-800 p-4">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">{t('ads.trackedBrands')}</p>
              <p className="text-xl font-bold text-white">{adSpendRows.length}</p>
            </div>
          </div>

          <div className="space-y-3">
            {adSpendRows.length === 0 ? (
              <p className="text-sm text-zinc-500">{t('ads.noAdSpendData')}</p>
            ) : (
              adSpendRows.map((row) => (
                <div key={row.competitorBrand} className="border border-zinc-800 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-bold text-white uppercase">{row.competitorBrand}</p>
                    <p className="text-xs text-zinc-400 uppercase">{row.dominantPlatform}</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-zinc-300">
                    <span>{t('ads.activeAds')}: {row.activeAds}</span>
                    <span>{t('ads.newAds7d')}: {row.newAds7d}</span>
                    <span>{t('ads.spend')}: Rp {Intl.NumberFormat('id-ID').format(Math.round(row.estimatedMonthlySpend * 16000))}</span>
                    <span>{t('ads.shift')}: {row.budgetShiftPercent >= 0 ? '+' : ''}{row.budgetShiftPercent}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

interface BreakdownSectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  color: string;
}

function BreakdownSection({ icon, title, content, color }: BreakdownSectionProps) {
  return (
    <div className="flex gap-4 group">
      <div className={`mt-1 ${color} group-hover:scale-125 transition-transform duration-500`}>{icon}</div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{title}</h4>
        <p className="text-sm font-mono text-zinc-300 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

interface AngleCardProps {
  title: string;
  desc: string;
}

function AngleCard({ title, desc }: AngleCardProps) {
  return (
    <div className="p-4 bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/50 transition-colors cursor-pointer group">
       <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 group-hover:text-emerald-400 transition-colors">{title}</h4>
       <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}
