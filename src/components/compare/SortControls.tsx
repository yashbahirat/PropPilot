'use client';

import { useCompareParams } from '@/hooks/use-compare-params';
import { SortOption } from '@/lib/compare-params';
import { cn } from '@/lib/utils';

const SORT_OPTIONS: { value: SortOption; label: string; shortLabel: string }[] = [
  { value: SortOption.SCORE, label: 'Best Score', shortLabel: 'Score' },
  { value: SortOption.COST, label: 'Lowest Cost', shortLabel: 'Cost' },
  { value: SortOption.DISCOUNT, label: 'Best Discount', shortLabel: 'Discount' },
  { value: SortOption.DRAWDOWN, label: 'Lowest Drawdown', shortLabel: 'Drawdown' },
  { value: SortOption.PAYOUT, label: 'Fastest Payout', shortLabel: 'Payout' },
];

/**
 * Sort option pill bar — 5 sort dimensions.
 * Active option highlighted in teal. Shows full label on desktop, short label on mobile.
 */
export function SortControls() {
  const { params, setParams } = useCompareParams();

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs text-white/40 mr-1 whitespace-nowrap">Sort by:</span>
      {SORT_OPTIONS.map((opt) => {
        const isActive = params.sort === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setParams({ sort: opt.value })}
            className={cn(
              'px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap',
              isActive
                ? 'bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30'
                : 'text-white/50 border border-white/10 hover:text-white/80 hover:border-white/20'
            )}
          >
            <span className="hidden sm:inline">{opt.label}</span>
            <span className="sm:hidden">{opt.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
