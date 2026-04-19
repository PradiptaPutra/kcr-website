"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { getTrendingProducts, TrendData } from '@/services/marketing-service';
import { Search, TrendingUp, Globe, ShoppingBag, Zap, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { t } from '@/lib/translations';

interface FilterItemProps {
  label: string;
  value: string;
}

interface PlatformStatProps {
  icon: React.ReactNode;
  label: string;
  status: string;
  color: string;
}

export default function ResearchPage() {
  const [trends, setTrends] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async (deepScan = false) => {
    setLoading(true);
    try {
      const data = await getTrendingProducts({ deepScan });
      setTrends(data);
    } finally {
      setLoading(false);
    }
  };

  const startScan = async () => {
    setScanning(true);
    try {
      await fetchTrends(true);
    } finally {
      setScanning(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">{t('research.title')}</h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm tracking-wider">{t('research.subtitle')}</p>
          </div>
          <button 
            onClick={startScan}
            disabled={scanning}
            className={`
              px-8 py-3 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3
              ${scanning ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-emerald-500 text-black hover:bg-emerald-400'}
            `}
          >
            {scanning ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                {t('research.scanning')}
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                {t('research.initialize')}
              </>
            )}
          </button>
        </header>

        {/* Filters/Toolbar */}
        <div className="flex justify-between items-center py-4 border-y border-zinc-900">
           <div className="flex gap-6">
              <FilterItem label={t('research.filters.platform')} value={t('research.filters.allPlatforms')} />
              <FilterItem label={t('research.filters.category')} value={t('research.filters.officeFurniture')} />
              <FilterItem label={t('research.filters.timeframe')} value={t('research.filters.last7Days')} />
           </div>
           <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
              <ArrowUpDown className="w-3 h-3" />
              {t('research.sortBy')} <span className="text-zinc-300 underline cursor-pointer">{t('research.growthRate')}</span>
           </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <AnimatePresence>
             {loading ? (
               [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
             ) : (
               trends.map((trend, i) => (
                 <motion.div
                   key={trend.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                 >
                   <TrendCard trend={trend} />
                 </motion.div>
               ))
             )}
           </AnimatePresence>
        </div>

        {/* Platform Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
           <PlatformStat icon={<Globe className="w-4 h-4" />} label={t('research.platforms.googleSearch')} status={t('research.status.optimized')} color="text-blue-400" />
           <PlatformStat icon={<ShoppingBag className="w-4 h-4" />} label={t('research.platforms.tokopedia')} status={t('research.status.highCompetition')} color="text-emerald-400" />
           <PlatformStat icon={<ShoppingBag className="w-4 h-4" />} label={t('research.platforms.shopee')} status={t('research.status.priceWar')} color="text-orange-400" />
           <PlatformStat icon={<Zap className="w-4 h-4" />} label={t('research.platforms.tiktokShop')} status={t('research.status.viralPotential')} color="text-rose-400" />
        </div>
      </div>
    </DashboardLayout>
  );
}

function FilterItem({ label, value }: FilterItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{label}</span>
      <span className="text-xs font-bold text-zinc-300 cursor-pointer hover:text-white transition-colors">{value}</span>
    </div>
  );
}

function TrendCard({ trend }: { trend: TrendData }) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 hover:border-emerald-500/50 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <TrendingUp className="w-24 h-24" />
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${trend.status === 'viral' ? 'bg-rose-500 animate-ping' : trend.status === 'rising' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{trend.status}</span>
          </div>
          <h3 className="text-xl font-black italic tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors">{trend.keyword}</h3>
          <p className="text-zinc-600 text-[10px] font-mono uppercase mt-1">{trend.category}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-white italic">+{trend.growth}%</div>
          <div className="text-[10px] font-mono text-zinc-600 uppercase">Growth Velocity</div>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex gap-2">
           {trend.platforms.map(p => (
             <div key={p} className="px-2 py-1 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">
               {p}
             </div>
           ))}
        </div>
        <button className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 underline underline-offset-4">
          Analyze Opportunity
        </button>
      </div>
    </div>
  );
}

function PlatformStat({ icon, label, status, color }: PlatformStatProps) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-4 flex items-center gap-4">
      <div className={`p-2 bg-zinc-900 rounded-sm ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{label}</div>
        <div className="text-[10px] font-bold text-zinc-300 uppercase">{status}</div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 animate-pulse">
      <div className="h-4 bg-zinc-900 w-1/4 mb-4" />
      <div className="h-8 bg-zinc-900 w-3/4 mb-2" />
      <div className="h-4 bg-zinc-900 w-1/2 mb-8" />
      <div className="flex justify-between">
        <div className="h-6 bg-zinc-900 w-1/3" />
        <div className="h-6 bg-zinc-900 w-1/4" />
      </div>
    </div>
  );
}
