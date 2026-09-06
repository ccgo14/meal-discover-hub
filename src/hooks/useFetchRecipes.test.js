import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useFetchRecipes } from './useFetchRecipes';

describe('useFetchRecipes hook', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with loading true when a URL is provided', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    const { result } = renderHook(() =>
      useFetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should handle successful fetch (happy path)', async () => {
    const mockData = {
      meals: [
        {
          idMeal: '52772',
          strMeal: 'Spaghetti Teriyaki',
          strMealThumb: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
        },
      ],
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() =>
      useFetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=Spaghetti')
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('should handle network/HTTP error edge case', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() =>
      useFetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=Invalid')
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toContain('Failed to fetch recipes (Status: 404)');
  });

  it('should handle fetch rejection / network failure edge case', async () => {
    fetch.mockRejectedValueOnce(new Error('Network connection failed'));

    const { result } = renderHook(() =>
      useFetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=Error')
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('Network connection failed');
  });

  it('should ignore AbortError when request is cancelled', async () => {
    const abortError = new Error('The operation was aborted');
    abortError.name = 'AbortError';
    fetch.mockRejectedValueOnce(abortError);

    const { result } = renderHook(() =>
      useFetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=Aborted')
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Abort errors should not set error state
    expect(result.current.error).toBeNull();
  });

  it('should handle empty search results (null meals returned from API)', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: null }),
    });

    const { result } = renderHook(() =>
      useFetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=NonExistentFood')
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ meals: null });
    expect(result.current.error).toBeNull();
  });

  it('should handle invalid meal ID lookup (null meals from API)', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ meals: null }),
    });

    const { result } = renderHook(() =>
      useFetchRecipes('https://www.themealdb.com/api/json/v1/1/lookup.php?i=invalidid')
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual({ meals: null });
    expect(result.current.error).toBeNull();
  });

  it('should return null data and not loading when url is falsy', () => {
    const { result } = renderHook(() => useFetchRecipes(null));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
