import { useState, useEffect } from 'react';
import { DefectJsonTypes } from '../types';

export const useFetchDefects = (url: string) => {
  const [defects, setDefects] = useState<DefectJsonTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setDefects(data);
        setLoading(false);
      } catch (err) {
        const message = (err as Error).message; // Type assertion
        setError(message);
        setLoading(false);
      }

    };

    fetchData();
  }, [url]);

  return { defects, loading, error };
};
