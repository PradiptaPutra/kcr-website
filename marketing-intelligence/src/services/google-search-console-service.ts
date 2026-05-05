import { GSCData } from '@/lib/types/marketing';

/**
 * Mock data for Google Search Console to simulate API response.
 * Follows the structure of a real GSC API response for search analytics.
 */
const MOCK_GSC_DATA: GSCData = {
  overview: {
    totalClicks: 1250,
    totalImpressions: 45000,
    avgCtr: 2.78,
    avgPosition: 12.4,
  },
  keywords: [
    {
      keyword: 'modular workstation indonesia',
      clicks: 450,
      impressions: 5000,
      ctr: 9.0,
      position: 1.2,
    },
    {
      keyword: 'office furniture jakarta',
      clicks: 320,
      impressions: 12000,
      ctr: 2.67,
      position: 4.5,
    },
    {
      keyword: 'ergonomic chair price',
      clicks: 180,
      impressions: 15000,
      ctr: 1.2,
      position: 8.9,
    },
    {
      keyword: 'custom workstation design',
      clicks: 120,
      impressions: 3000,
      ctr: 4.0,
      position: 3.1,
    },
    {
      keyword: 'luxury office desk',
      clicks: 85,
      impressions: 2500,
      ctr: 3.4,
      position: 5.7,
    },
  ],
  scannedAt: new Date().toISOString(),
};

/**
 * Options for fetching Google Search Console data.
 */
export interface GSCFetchOptions {
  siteUrl?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
}

/**
 * Fetches data from Google Search Console.
 * Currently returns mock data to simulate the API response.
 * Follows the pattern of providing fallback/mock data as seen in marketing-service.ts.
 * 
 * @param options - Configuration for the GSC query
 * @returns Promise<GSCData>
 */
export const fetchGSCData = async (options?: GSCFetchOptions): Promise<GSCData> => {
  try {
    // In a real implementation, this would use the googleapis library:
    // 1. Initialize Google Auth with service account or OAuth2
    // 2. Call searchconsole.searchanalytics.query()
    // 3. Transform the response to match GSCData interface
    
    // Simulate a brief network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Return mock data for now
    return {
      ...MOCK_GSC_DATA,
      scannedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching GSC data:', error);
    // Return mock data as a fallback in case of errors
    return MOCK_GSC_DATA;
  }
};

/**
 * Frontend-compatible function to get Search Console data via our internal API.
 * Follows the patterns used in marketing-service.ts (async, fetch, fallback).
 * 
 * @param options - Query parameters for the search console data
 * @returns Promise<GSCData>
 */
export const getGSCData = async (options?: GSCFetchOptions): Promise<GSCData> => {
  try {
    const params = new URLSearchParams();
    if (options?.siteUrl) params.append('siteUrl', options.siteUrl);
    if (options?.startDate) params.append('startDate', options.startDate);
    if (options?.endDate) params.append('endDate', options.endDate);

    const response = await fetch(`/api/research/search-console?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`GSC Request failed with status ${response.status}`);
    }

    return (await response.json()) as GSCData;
  } catch (error) {
    console.error('getGSCData frontend error:', error);
    // Return mock data as fallback, following marketing-service.ts pattern
    return MOCK_GSC_DATA;
  }
};
