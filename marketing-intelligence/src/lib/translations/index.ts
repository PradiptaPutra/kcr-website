import translations from './id.json';

export function useTranslation() {
  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let value: Record<string, unknown> | unknown = translations;
      
      for (const k of keys) {
        if (typeof value === 'object' && value !== null) {
          value = (value as Record<string, unknown>)[k];
        }
      }
      
      return (typeof value === 'string' ? value : key) as string;
    }
  };
}

export const t = (key: string): string => {
  const keys = key.split('.');
  let value: Record<string, unknown> | unknown = translations;
  
  for (const k of keys) {
    if (typeof value === 'object' && value !== null) {
      value = (value as Record<string, unknown>)[k];
    }
  }
  
  return (typeof value === 'string' ? value : key) as string;
};
