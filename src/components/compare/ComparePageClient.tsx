'use client';

import { ScoredFirm } from '@/lib/scoring';
import { FilterBar } from './FilterBar';
import { FilterDrawer } from './FilterDrawer';
import { SearchBar } from './SearchBar';
import { SortControls } from './SortControls';
import { FirmList } from './FirmList';
import { ComparisonDock } from './ComparisonDock';
import { ComparisonView } from './ComparisonView';
import { AffiliateDisclosureBanner } from './AffiliateDisclosureBanner';
import { useCompareParams } from '@/hooks/use-compare-params';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ComparePageInnerProps {
  firms: ScoredFirm[];
}

function ComparePageInner({ firms }: ComparePageInnerProps) {
  const { params, setParams } = useCompareParams();
  const router = useRouter();
  const isComparisonView = params.showCompare;

  // Firms selected for side-by-side comparison
  const comparedFirms = params.compare
    .map((slug) => firms.find((f) => f.slug === slug))
    .filter((f): f is ScoredFirm => Boolean(f));

  // Auto-close comparison if too few firms remain
  useEffect(() => {
    if (isComparisonView && comparedFirms.length < 2) {
      setParams({ showCompare: null });
    }
  }, [comparedFirms.length, isComparisonView, setParams]);

  const handleBackToList = () => {
    setParams({ showCompare: null });
  };

  return (
    <div className="min-h-screen bg-[#08080F]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-col gap-1 mb-6">
          <h1 className="text-2xl font-bold text-white">Compare Prop Firms</h1>
          <p className="text-sm text-white/50">
            {firms.length} firms &bull; verified data &bull; live discount codes
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <AffiliateDisclosureBanner />
      </div>

      {/* Desktop Filter Bar — sticky (hidden on mobile) */}
      <div className="hidden md:block">
        <FilterBar />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search + Sort + Mobile Filter Button */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="w-full sm:w-auto sm:flex-none sm:min-w-[220px]">
            <SearchBar />
          </div>

          {/* Mobile filter trigger */}
          <div className="md:hidden">
            <FilterDrawer />
          </div>

          <div className="ml-auto hidden md:block">
            <SortControls />
          </div>
        </div>

        {/* Mobile Sort Controls */}
        <div className="md:hidden mb-4">
          <SortControls />
        </div>

        {/* Comparison View (full-page side-by-side) */}
        {isComparisonView && comparedFirms.length >= 2 ? (
          <div className="bg-[#0E0E1A] rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Side-by-Side Comparison
                </h2>
                <p className="text-xs text-white/40 mt-0.5">
                  {comparedFirms.length} firms selected &mdash; differences highlighted in amber, best values in teal
                </p>
              </div>
              <button
                onClick={handleBackToList}
                className="text-xs text-white/40 hover:text-white/70 transition-colors shrink-0 flex items-center gap-1"
              >
                ← Back to list
              </button>
            </div>
            <ComparisonView firms={comparedFirms} />
          </div>
        ) : (
          /* Firm List */
          <div className="bg-[#0E0E1A] rounded-2xl border border-white/10 overflow-hidden">
            <FirmList firms={firms} />
          </div>
        )}
      </div>

      {/* Comparison Dock — sticky bottom (appears when 1+ firms selected) */}
      <ComparisonDock firms={firms} />

      {/* Bottom padding so dock doesn't overlap content */}
      <div className="h-24" />
    </div>
  );
}

interface ComparePageClientProps {
  firms: ScoredFirm[];
}

/**
 * Root client component for the /compare page.
 * NuqsAdapter is provided by the root layout — no wrapper needed here.
 */
export function ComparePageClient({ firms }: ComparePageClientProps) {
  return <ComparePageInner firms={firms} />;
}
