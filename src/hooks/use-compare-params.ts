'use client';

import { useQueryStates } from 'nuqs';
import { compareParamsParsers, CompareParams } from '@/lib/compare-params';

export function useCompareParams() {
  const [params, setParams] = useQueryStates(compareParamsParsers, {
    shallow: true,   // Don't trigger full page re-render on filter changes
    history: 'replace', // Replace instead of push to avoid polluting browser history
  });

  const clearFilter = (key: keyof typeof compareParamsParsers) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setParams({ [key]: null } as any);
  };

  const clearAllFilters = () => {
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
  };

  const addToCompare = (slug: string) => {
    if (params.compare.length >= 3 || params.compare.includes(slug)) return;
    setParams({ compare: [...params.compare, slug] });
  };

  const removeFromCompare = (slug: string) => {
    setParams({ compare: params.compare.filter((s) => s !== slug) });
  };

  const isInCompare = (slug: string) => params.compare.includes(slug);

  const hasActiveFilters =
    params.q !== '' ||
    (params.drawdownType !== '' && params.drawdownType !== null) ||
    (params.evaluationType !== '' && params.evaluationType !== null) ||
    (params.fundingStyle !== '' && params.fundingStyle !== null) ||
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
