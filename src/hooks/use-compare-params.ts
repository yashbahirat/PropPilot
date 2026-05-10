'use client';
import { useCallback } from 'react';

import { useQueryStates, UseQueryStatesOptions } from 'nuqs';
import { compareParamsParsers, CompareParams } from '@/lib/compare-params';

const queryOptions = {
  shallow: true,
  history: 'replace' as const,
  throttleMs: 250,
};

export function useCompareParams() {
  const [params, setParams] = useQueryStates(compareParamsParsers, queryOptions);

  const clearFilter = useCallback((key: keyof typeof compareParamsParsers) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setParams({ [key]: null } as any);
  }, [setParams]);

  const clearAllFilters = useCallback(() => {
    setParams({
      q: null,
      sort: null,
      drawdownType: null,
      evaluationType: null,
      fundingStyle: null,
      minFee: null,
      maxFee: null,
      hasDiscount: null,
      newsTrading: null,
      weekendHolding: null,
      eaAllowed: null,
      compare: null,
    });
  }, [setParams]);

  const addToCompare = useCallback((slug: string) => {
    setParams((prev) => {
      const current = prev.compare || [];
      if (current.length >= 3 || current.includes(slug)) return {}; // Return empty object instead of prev to avoid unnecessary updates
      return { compare: [...current, slug] };
    });
  }, [setParams]);

  const removeFromCompare = useCallback((slug: string) => {
    setParams((prev) => {
      const current = prev.compare || [];
      return { compare: current.filter((s) => s !== slug) };
    });
  }, [setParams]);

  const isInCompare = useCallback((slug: string) => params.compare.includes(slug), [params.compare]);

  // A filter is active when it's non-null/non-default
  const hasActiveFilters =
    params.q !== '' ||
    params.drawdownType !== null ||
    params.evaluationType !== null ||
    params.fundingStyle !== null ||
    params.minFee > 0 ||
    params.maxFee > 0 ||
    params.hasDiscount ||
    params.newsTrading ||
    params.weekendHolding ||
    params.eaAllowed;

  return {
    params: params as CompareParams,
    setParams,
    clearFilter,
    clearAllFilters,
    addToCompare,
    removeFromCompare,
    isInCompare,
    hasActiveFilters,
  };
}
