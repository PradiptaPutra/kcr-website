"use client";

import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  MousePointerClick, 
  Eye, 
  Percent, 
  Hash, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  AlertCircle,
  RefreshCcw
} from 'lucide-react';
import { getGSCData } from '@/services/google-search-console-service';
import type { GSCData } from '@/lib/types/marketing';
import { t } from '@/lib/translations';

export default function SearchPerformanceCard() {
  const [data, setData] = useState<GSCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const gscData = await getGSCData();
      setData(gscData);
    } catch (err) {
      console.error('Failed to fetch GSC data:', err);
      setError('Failed to load search console data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col items-center justify-center min-h-[400px] animate-pulse">
        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm mb-4" />
        <div className="h-4 bg-zinc-900 w-48 mb-2" />
        <div className="h-3 bg-zinc-900 w-32" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
        <h3 className="text-white font-bold uppercase tracking-widest mb-2">{t('common.error') || 'Error'}</h3>
        <p className="text-zinc-500 text-xs font-mono mb-6 max-w-xs">{error || 'Unknown error occurred'}</p>
        <button 
          onClick={fetchData}
          className="flex items-center gap-2 px-6 py-2 bg-zinc-900 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors"
        >
          <RefreshCcw className="w-3 h-3" />
          {t('common.retry') || 'Retry'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricSmallCard 
          title="Total Clicks" 
          value={data.overview.totalClicks.toLocaleString()} 
          icon={<MousePointerClick className="w-4 h-4 text-emerald-400" />} 
          label="Last 30 Days"
        />
        <MetricSmallCard 
          title="Total Impressions" 
          value={data.overview.totalImpressions.toLocaleString()} 
          icon={<Eye className="w-4 h-4 text-blue-400" />} 
          label="Last 30 Days"
        />
        <MetricSmallCard 
          title="Avg. CTR" 
          value={`${data.overview.avgCtr.toFixed(2)}%`} 
          icon={<Percent className="w-4 h-4 text-amber-400" />} 
          label="Click-through rate"
        />
        <MetricSmallCard 
          title="Avg. Position" 
          value={data.overview.avgPosition.toFixed(1)} 
          icon={<Hash className="w-4 h-4 text-purple-400" />} 
          label="Search visibility"
        />
      </div>

      {/* Keywords Table */}
      <div className="bg-zinc-950 border border-zinc-800 p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <BarChart3 className="w-24 h-24" />
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold tracking-widest uppercase italic flex items-center gap-2">
            <Search className="w-4 h-4 text-zinc-500" />
            Top Performing Keywords
          </h3>
          <span className="text-[10px] font-mono text-zinc-600 uppercase">
            Data via Google Search Console
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <th className="pb-4 font-normal">Keyword</th>
                <th className="pb-4 font-normal text-right">Clicks</th>
                <th className="pb-4 font-normal text-right">Impr.</th>
                <th className="pb-4 font-normal text-right">CTR</th>
                <th className="pb-4 font-normal text-right">Pos.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {data.keywords.map((kw, i) => (
                <tr key={i} className="group/row hover:bg-zinc-900/30 transition-colors">
                  <td className="py-4">
                    <div className="text-xs font-bold text-white uppercase group-hover/row:text-emerald-400 transition-colors">
                      {kw.keyword}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-xs font-mono text-zinc-300">{kw.clicks.toLocaleString()}</span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-xs font-mono text-zinc-400">{kw.impressions.toLocaleString()}</span>
                  </td>
                  <td className="py-4 text-right">
                    <span className="text-xs font-mono text-amber-500">{kw.ctr.toFixed(1)}%</span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className={`text-xs font-bold ${kw.position <= 3 ? 'text-emerald-400' : 'text-zinc-500'}`}>
                        {kw.position.toFixed(1)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-900 flex justify-between items-center">
           <div className="text-[10px] font-mono text-zinc-600 uppercase">
             Last synced: {new Date(data.scannedAt).toLocaleTimeString()}
           </div>
           <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 underline underline-offset-4">
             View Full Report
           </button>
        </div>
      </div>
    </div>
  );
}

function MetricSmallCard({ title, value, icon, label }: { title: string; value: string; icon: React.ReactNode; label: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-5 hover:border-zinc-700 transition-colors group">
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-sm group-hover:bg-zinc-800 transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">{title}</h3>
        <div className="text-xl font-bold tracking-tight text-white italic">{value}</div>
        <p className="text-zinc-700 text-[9px] font-mono mt-1 uppercase">{label}</p>
      </div>
    </div>
  );
}
