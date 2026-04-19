declare module 'google-trends-api' {
  interface InterestOverTimeOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    timezone?: number;
    category?: number;
    property?: '' | 'images' | 'news' | 'youtube' | 'froogle';
    hl?: string;
    timezoneOffset?: number;
    timeframe?: string;
  }

  const googleTrends: {
    interestOverTime(options: InterestOverTimeOptions): Promise<string>;
  };

  export default googleTrends;
}
