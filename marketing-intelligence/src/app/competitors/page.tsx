"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, ExternalLink, ShieldAlert } from 'lucide-react';
import { analyzeCompetitor } from '@/services/marketing-service';
import type { CompetitorAnalysis } from '@/lib/types/marketing';
import { t } from '@/lib/translations';

export default function CompetitorsPage() {
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<CompetitorAnalysis | null>(null);

  const onAnalyze = async () => {
    if (!targetUrl.trim()) {
      setError(t('errors.invalidUrl'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeCompetitor(targetUrl.trim());
      setAnalysis(result);
    } catch {
      setError(t('errors.analysisFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">{t('competitors.title')}</h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm tracking-wider">{t('competitors.subtitle')}</p>
          </div>
          <button className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center gap-3">
            <Plus className="w-4 h-4" />
            {t('competitors.trackNewCompetitor')}
          </button>
        </header>

        <div className="bg-zinc-950 border border-zinc-900 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
           <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-zinc-600" />
           </div>
           <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2 italic">
             {analysis ? `${t('competitors.target')}: ${analysis.brand}` : t('competitors.noActiveTargets')}
           </h3>
           <p className="text-zinc-500 text-sm font-mono max-w-md mx-auto leading-relaxed">
              {analysis
                ? `${t('competitors.pricing')}: ${analysis.pricing.toUpperCase()} | ${t('competitors.avgPrice')}: Rp ${analysis.avgPrice.toLocaleString('id-ID')} | ${t('competitors.salesSignal')}: ${analysis.salesSignal}/100`
                : t('competitors.inputCompetitors')}
           </p>
           <div className="mt-8 flex gap-4 w-full max-w-xl">
              <input 
                type="text" 
                placeholder={t('competitors.placeholder')}
                value={targetUrl}
                onChange={(event) => setTargetUrl(event.target.value)}
                className="flex-1 bg-black border border-zinc-800 px-4 py-3 text-xs font-mono text-zinc-300 outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                onClick={onAnalyze}
                disabled={loading}
                className="px-6 py-3 bg-zinc-900 border border-zinc-800 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                 {loading ? t('common.loading') : t('competitors.analyze')}
              </button>
           </div>
           {error ? <p className="text-rose-400 text-xs font-mono mt-4">{error}</p> : null}
        </div>

        {/* Analysis Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${analysis ? '' : 'opacity-40 grayscale pointer-events-none'}`}>
           <MockCompetitorCard
             name={analysis?.brand ?? 'IKEA Business'}
             price={analysis?.pricing ?? 'medium'}
             strength={analysis?.strengths[0] ?? 'Global Brand'}
           />
           <MockCompetitorCard
             name={analysis ? 'Weakness To Exploit' : 'Informa Pro'}
             price={analysis?.pricing ?? 'premium'}
             strength={analysis?.weaknesses[0] ?? 'B2B Network'}
           />
           <MockCompetitorCard
             name={analysis ? 'Suggested Hook' : 'Custom_Workplace_ID'}
             price={analysis?.pricing ?? 'low'}
             strength={analysis?.adHooks[0] ?? 'Speed'}
           />
        </div>
      </div>
    </DashboardLayout>
  );
}

interface MockCompetitorCardProps {
  name: string;
  price: string;
  strength: string;
}

function MockCompetitorCard({ name, price, strength }: MockCompetitorCardProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h4 className="text-sm font-bold uppercase tracking-widest">{name}</h4>
        <ExternalLink className="w-4 h-4 text-zinc-700" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-zinc-600 uppercase">{t('competitors.pricing')}</span>
          <span className="text-zinc-400">{price}</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-zinc-600 uppercase">{t('competitors.strength')}</span>
          <span className="text-emerald-500">{strength}</span>
        </div>
      </div>
    </div>
  );
}
