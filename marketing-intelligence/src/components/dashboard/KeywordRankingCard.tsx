'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Search } from 'lucide-react';
import { t } from '@/lib/translations';

interface RankingData {
  competitorBrand: string;
  competitorUrl: string;
  position: number;
  previousPos: number | null;
  changePercent: number | null;
}

interface RankingStats {
  totalKeywordsTracked: number;
  topRankedCompetitor: { brand: string; avgPosition: number } | null;
  improvingKeywords: number;
  decliningKeywords: number;
}

export default function KeywordRankingCard() {
  const [stats, setStats] = useState<RankingStats | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState('ergonomic chair');
  const [rankings, setRankings] = useState<RankingData[]>([]);
  const [loading, setLoading] = useState(false);

  // Load stats when component mounts
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/intelligence/keyword-rankings?action=stats');
        const data = await res.json();
        setStats(data.stats);
      } catch (error) {
        console.error('Failed to load ranking stats:', error);
      }
    };

    loadStats();
  }, []);

  // Load rankings for selected keyword
  useEffect(() => {
    const loadRankings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/intelligence/keyword-rankings?keyword=${encodeURIComponent(selectedKeyword)}`);
        const data = await res.json();
        setRankings(data.rankings || []);
      } catch (error) {
        console.error('Failed to load rankings:', error);
        setRankings([]);
      } finally {
        setLoading(false);
      }
    };

    loadRankings();
  }, [selectedKeyword]);

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Keywords Tracked
            </span>
            <Search className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats?.totalKeywordsTracked ?? 0}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {t('common.daily_updates') || 'Daily updates'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Top Ranked Competitor
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {stats?.topRankedCompetitor?.brand || 'N/A'}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Avg Position: {stats?.topRankedCompetitor?.avgPosition.toFixed(1) || '-'}
          </p>
        </div>
      </div>

      {/* Keyword Selector */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Track Keyword Rankings</h3>

        <div className="mb-4">
          <input
            type="text"
            value={selectedKeyword}
            onChange={(e) => setSelectedKeyword(e.target.value)}
            placeholder="Enter keyword to track (e.g., ergonomic chair)"
            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
          />
        </div>

        {/* Rankings Table */}
        {loading ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t('common.loading') || 'Loading...'}
          </div>
        ) : rankings.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No ranking data available for this keyword yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Competitor
                  </th>
                  <th className="text-center py-3 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Position
                  </th>
                  <th className="text-center py-3 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Previous
                  </th>
                  <th className="text-center py-3 px-3 text-gray-600 dark:text-gray-400 font-medium">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((ranking) => {
                  const hasChange = ranking.previousPos !== null && ranking.changePercent !== null;
                  const improved = hasChange && ranking.previousPos !== null && ranking.position < ranking.previousPos;

                  return (
                    <tr
                      key={ranking.competitorBrand}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {ranking.competitorBrand}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
                            {ranking.competitorUrl}
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-3 px-3">
                        <div className="font-bold text-gray-900 dark:text-white">
                          #{ranking.position}
                        </div>
                      </td>
                      <td className="text-center py-3 px-3 text-gray-600 dark:text-gray-400">
                        {ranking.previousPos ? `#${ranking.previousPos}` : '-'}
                      </td>
                      <td className="text-center py-3 px-3">
                        {hasChange ? (
                          <div className="flex items-center justify-center gap-1">
                            {improved ? (
                              <>
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                  {Math.abs(ranking.changePercent!).toFixed(1)}%
                                </span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="w-4 h-4 text-red-500" />
                                <span className="text-red-600 dark:text-red-400 font-medium">
                                  {Math.abs(ranking.changePercent!).toFixed(1)}%
                                </span>
                              </>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rank Change Summary */}
      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-900 p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Improving
              </span>
            </div>
            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              {stats.improvingKeywords}
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-900 p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-700 dark:text-red-300">Declining</span>
            </div>
            <div className="text-2xl font-bold text-red-900 dark:text-red-100">
              {stats.decliningKeywords}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
