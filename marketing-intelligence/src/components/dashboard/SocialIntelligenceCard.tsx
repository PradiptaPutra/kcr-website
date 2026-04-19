'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Users, HeartPulse, Siren } from 'lucide-react';
import { t } from '@/lib/translations';

interface SocialOverviewResponse {
  summary: {
    accountsTracked: number;
    avgEngagementRate: number;
    avgSentimentScore: number;
    fastestGrowingBrand: string | null;
  };
  alerts: Array<{
    competitorBrand: string;
    platform: 'instagram' | 'tiktok';
    severity: 'high' | 'medium' | 'low';
    message: string;
  }>;
  latest: Array<{
    platform: 'instagram' | 'tiktok';
    competitorBrand: string;
    engagementRate: number;
    followers: number;
    topContentType: string;
  }>;
}

export default function SocialIntelligenceCard() {
  const [data, setData] = useState<SocialOverviewResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/intelligence/social-monitoring?action=overview');
      const json = (await res.json()) as SocialOverviewResponse;
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOverview();
  }, []);

  const runTracking = async () => {
    setRefreshing(true);
    try {
      await fetch('/api/intelligence/social-monitoring?action=track');
      await loadOverview();
    } catch {
      // keep UI resilient
    } finally {
      setRefreshing(false);
    }
  };

  const topRows = (data?.latest ?? []).slice(0, 6);

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold tracking-wider uppercase italic">{t('dashboard.socialMonitoring') || 'Social Monitoring'}</h3>
        <button
          type="button"
          onClick={runTracking}
          disabled={refreshing}
          className="text-[10px] uppercase tracking-[0.2em] px-3 py-2 border border-zinc-700 hover:border-emerald-400 hover:text-emerald-300 transition-colors disabled:opacity-60"
        >
          {refreshing ? 'Syncing...' : t('dashboard.syncSocialData') || 'Sync Social Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Metric icon={<Users className="w-4 h-4 text-cyan-400" />} label="Accounts" value={`${data?.summary.accountsTracked ?? 0}`} />
        <Metric
          icon={<Activity className="w-4 h-4 text-emerald-400" />}
          label="Avg Engagement"
          value={`${data?.summary.avgEngagementRate ?? 0}%`}
        />
        <Metric
          icon={<HeartPulse className="w-4 h-4 text-amber-400" />}
          label="Avg Sentiment"
          value={`${data?.summary.avgSentimentScore ?? 0}`}
        />
        <Metric
          icon={<Siren className="w-4 h-4 text-rose-400" />}
          label="Fastest Brand"
          value={data?.summary.fastestGrowingBrand ?? 'N/A'}
        />
      </div>

      {loading ? (
        <div className="text-zinc-400 text-sm">Loading social metrics...</div>
      ) : topRows.length === 0 ? (
        <div className="text-zinc-500 text-sm">Belum ada data sosial. Jalankan sync untuk mulai tracking.</div>
      ) : (
        <div className="space-y-3">
          {topRows.map((row, index) => (
            <div key={`${row.competitorBrand}-${row.platform}-${index}`} className="border border-zinc-800 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase text-white">{row.competitorBrand}</span>
                <span className="text-[10px] uppercase text-zinc-400">{row.platform}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] text-zinc-300">
                <span>Eng: {row.engagementRate}%</span>
                <span>Followers: {Intl.NumberFormat('en-US', { notation: 'compact' }).format(row.followers)}</span>
                <span>Top: {row.topContentType}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {(data?.alerts?.length ?? 0) > 0 ? (
        <div className="mt-6 border-t border-zinc-800 pt-4">
          <h4 className="text-xs uppercase tracking-widest text-zinc-400 mb-3">{t('dashboard.socialAlerts') || 'Social Alerts'}</h4>
          <div className="space-y-2">
            {data?.alerts.slice(0, 4).map((alert, idx) => (
              <p key={`${alert.competitorBrand}-${idx}`} className="text-xs text-zinc-300">
                {alert.message}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="border border-zinc-800 p-3">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{label}</span>
      </div>
      <p className="text-sm font-bold text-white truncate">{value}</p>
    </div>
  );
}
