import { useState, useEffect } from 'react';

// Shared in-memory response cache across hook instances
const apiCache = new Map();

/**
 * Custom hook to fetch recipe data from TheMealDB API.
 * @param {string|null} url - The full API URL to fetch from.
 * @returns {{ data: any, isLoading: boolean, error: string|null }}
 */
export function useFetchRecipes(url) {
  const [data, setData] = useState(() => (url && apiCache.has(url) ? apiCache.get(url) : null));
  const [isLoading, setIsLoading] = useState(() => Boolean(url) && !apiCache.has(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      setData(null);
      setError(null);
      return;
    }

    if (apiCache.has(url)) {
      setData(apiCache.get(url));
      setIsLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes (Status: ${response.status})`);
        }
        const result = await response.json();
        apiCache.set(url, result);
        setData(result);
        setIsLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected network error occurred');
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
}

export default useFetchRecipes;
