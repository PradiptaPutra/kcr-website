"use client";

import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Building2, TrendingUp, Handshake, RefreshCcw, Download, BadgeCheck, PhoneCall, Trophy, XCircle } from 'lucide-react';
import { t } from '@/lib/translations';
import type { QualifiedLeadItem } from '@/lib/types/marketing';

interface MarketPayload {
  summary: {
    totalTrendKeywords: number;
    avgOpportunityScore: number;
    leadsReady: number;
  };
  opportunities: Array<{
    keyword: string;
    opportunityScore: number;
    recommendedSegment: 'B2B' | 'PROJECT' | 'WHOLESALE';
  }>;
}

export default function LeadsPage() {
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [market, setMarket] = useState<MarketPayload | null>(null);
  const [leads, setLeads] = useState<QualifiedLeadItem[]>([]);
  const [segmentFilter, setSegmentFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const visibleCities = ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Semarang', 'Makassar'];
  const visibleStatuses = ['NEW', 'QUALIFIED', 'CONTACTED', 'WON', 'LOST'];
  const visibleSegments = ['B2B', 'PROJECT', 'WHOLESALE'];

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '40');
      if (segmentFilter) params.set('segment', segmentFilter);
      if (cityFilter) params.set('city', cityFilter);
      if (statusFilter) params.set('status', statusFilter);

      const [marketRes, leadsRes] = await Promise.all([
        fetch('/api/intelligence/indonesia-market', { cache: 'no-store' }),
        fetch(`/api/leads/qualified?${params.toString()}`, { cache: 'no-store' }),
      ]);

      const marketPayload = (await marketRes.json()) as MarketPayload;
      const leadsPayload = (await leadsRes.json()) as { leads: QualifiedLeadItem[] };
      setMarket(marketPayload);
      setLeads(leadsPayload.leads ?? []);
    } finally {
      setLoading(false);
    }
  }, [segmentFilter, cityFilter, statusFilter]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const generateLeads = async () => {
    setGenerating(true);
    try {
      await fetch('/api/leads/qualified', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: 20 }),
      });
      await loadData();
    } finally {
      setGenerating(false);
    }
  };

  const exportCsv = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      params.set('limit', '100');
      params.set('export', 'csv');
      if (segmentFilter) params.set('segment', segmentFilter);
      if (cityFilter) params.set('city', cityFilter);
      if (statusFilter) params.set('status', statusFilter);

      const response = await fetch(`/api/leads/qualified?${params.toString()}`, { cache: 'no-store' });
      const csv = await response.text();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'qualified-leads.csv';
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const updateLead = async (id: string, status: 'NEW' | 'QUALIFIED' | 'CONTACTED' | 'WON' | 'LOST') => {
    await fetch('/api/leads/qualified', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });
    await loadData();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white uppercase italic">{t('leads.title')}</h1>
            <p className="text-zinc-400 mt-1 font-mono text-sm tracking-wider">
              {t('leads.subtitle')}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-end">
            <button
              onClick={exportCsv}
              disabled={exporting}
              className="px-5 py-2 border border-zinc-800 text-white font-bold text-xs uppercase tracking-widest hover:border-cyan-400 transition-colors duration-300 disabled:opacity-60 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {exporting ? t('common.loading') : t('leads.exportCsv')}
            </button>
            <button
              onClick={generateLeads}
              disabled={generating}
              className="px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors duration-300 disabled:opacity-60"
            >
              {generating ? t('common.loading') : t('leads.generateQualifiedLeads')}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-950 border border-zinc-800 p-4">
          <FilterSelect label={t('leads.filterSegment')} value={segmentFilter} onChange={setSegmentFilter} options={visibleSegments} />
          <FilterSelect label={t('leads.filterCity')} value={cityFilter} onChange={setCityFilter} options={visibleCities} />
          <FilterSelect label={t('leads.filterStatus')} value={statusFilter} onChange={setStatusFilter} options={visibleStatuses} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
            label={t('leads.opportunityScore')}
            value={market ? market.summary.avgOpportunityScore.toFixed(2) : '0.00'}
          />
          <MetricCard
            icon={<Handshake className="w-4 h-4 text-cyan-400" />}
            label={t('leads.leadsQualified')}
            value={market ? String(market.summary.leadsReady) : '0'}
          />
          <MetricCard
            icon={<Building2 className="w-4 h-4 text-amber-400" />}
            label={t('leads.trendKeywords')}
            value={market ? String(market.summary.totalTrendKeywords) : '0'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-950 border border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-widest">Top Opportunities</h3>
              <button onClick={loadData} className="text-zinc-500 hover:text-white">
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {(market?.opportunities ?? []).slice(0, 10).map((item) => (
                <div key={item.keyword} className="border border-zinc-800 p-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold uppercase text-white">{item.keyword}</span>
                    <span className="text-zinc-400">{item.recommendedSegment}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">Opportunity Score: {item.opportunityScore.toFixed(2)}</div>
                </div>
              ))}
              {!loading && (market?.opportunities?.length ?? 0) === 0 ? (
                <p className="text-sm text-zinc-500">Belum ada peluang terhitung. Jalankan pengumpulan data trend dan score terlebih dulu.</p>
              ) : null}
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Qualified Lead Pipeline</h3>
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {leads.map((lead) => (
                <div key={lead.id} className="border border-zinc-800 p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white uppercase">{lead.companyName}</span>
                    <span className="text-[10px] text-zinc-400">{lead.segment}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                    <span>Kota: {lead.city}</span>
                    <span>Status: {lead.status}</span>
                    <span>Intent: {lead.intentScore}</span>
                    <span>Budget: {lead.budgetEstimate ? `Rp ${Intl.NumberFormat('id-ID').format(lead.budgetEstimate)}` : '-'}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <LeadActionButton icon={<BadgeCheck className="w-3 h-3" />} label={t('leads.markQualified')} onClick={() => updateLead(lead.id, 'QUALIFIED')} />
                    <LeadActionButton icon={<PhoneCall className="w-3 h-3" />} label={t('leads.markContacted')} onClick={() => updateLead(lead.id, 'CONTACTED')} />
                    <LeadActionButton icon={<Trophy className="w-3 h-3" />} label={t('leads.markWon')} onClick={() => updateLead(lead.id, 'WON')} />
                    <LeadActionButton icon={<XCircle className="w-3 h-3" />} label={t('leads.markLost')} onClick={() => updateLead(lead.id, 'LOST')} />
                  </div>
                </div>
              ))}
              {!loading && leads.length === 0 ? (
                <p className="text-sm text-zinc-500">Belum ada lead. Klik Generate Qualified Leads untuk membuat batch pertama.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-xs uppercase tracking-widest text-zinc-500">
      <span className="mb-2 block">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-black border border-zinc-800 px-3 py-2 text-zinc-300 outline-none focus:border-emerald-500"
      >
        <option value="">{t('leads.all')}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LeadActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest border border-zinc-800 px-2 py-1 text-zinc-300 hover:border-emerald-400 hover:text-emerald-300 transition-colors"
    >
      {icon}
      {label}
    </button>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}
