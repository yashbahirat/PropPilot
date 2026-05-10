'use client';

import { useDeferredValue, useMemo, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  createColumnHelper,
  type FilterFn,
  type SortingFn,
} from '@tanstack/react-table';
import { ScoredFirm } from '@/lib/scoring';
import { useCompareParams } from '@/hooks/use-compare-params';
import { SortOption } from '@/lib/compare-params';
import { FirmRow } from './FirmRow';
import { FirmCard } from './FirmCard';
import { useIsMobile } from '@/hooks/use-window-width';

interface FirmListProps {
  firms: ScoredFirm[];
}

// ─── Custom filter function ────────────────────────────────────────────────

interface FilterValue {
  q: string;
  drawdownType: string | null;
  evaluationType: string | null;
  fundingStyle: string | null;
  minFee: number;
  maxFee: number;
  hasDiscount: boolean;
  newsTrading: boolean;
  weekendHolding: boolean;
  eaAllowed: boolean;
}

const firmFilterFn: FilterFn<ScoredFirm> = (row, _columnId, filterValue: FilterValue) => {
  const firm = row.original;

  if (filterValue.q && !firm.name.toLowerCase().includes(filterValue.q.toLowerCase()))
    return false;
  if (filterValue.drawdownType != null && firm.drawdownType !== filterValue.drawdownType)
    return false;
  if (filterValue.evaluationType != null && firm.evaluationType !== filterValue.evaluationType)
    return false;
  if (filterValue.fundingStyle != null && firm.fundingStyle !== filterValue.fundingStyle)
    return false;
  if (
    filterValue.minFee > 0 &&
    firm.challengeFee &&
    parseFloat(firm.challengeFee) < filterValue.minFee
  )
    return false;
  if (
    filterValue.maxFee > 0 &&
    firm.challengeFee &&
    parseFloat(firm.challengeFee) > filterValue.maxFee
  )
    return false;
  if (filterValue.hasDiscount && !firm.bestOffer) return false;
  if (filterValue.newsTrading && !firm.newsTrading) return false;
  if (filterValue.weekendHolding && !firm.weekendHolding) return false;
  if (filterValue.eaAllowed && !firm.eaAllowed) return false;

  return true;
};

// ─── Sort functions ────────────────────────────────────────────────────────

function getPayoutSortValue(speed: string | null): number {
  if (!speed) return 999;
  const s = speed.toLowerCase();
  if (s.includes('instant') || s.includes('same day') || s.includes('24h') || s.includes('1 day'))
    return 1;
  if (s.includes('1-3') || s.includes('2-3') || s.includes('48h')) return 2;
  if (s.includes('3-5') || s.includes('4-5')) return 3;
  if (s.includes('7')) return 7;
  if (s.includes('14')) return 14;
  return 30;
}

const sortByScore: SortingFn<ScoredFirm> = (a, b) =>
  b.original.overallScore - a.original.overallScore;

const sortByCost: SortingFn<ScoredFirm> = (a, b) => {
  const fa = a.original.challengeFee ? parseFloat(a.original.challengeFee) : 9999;
  const fb = b.original.challengeFee ? parseFloat(b.original.challengeFee) : 9999;
  return fa - fb;
};

const sortByDiscount: SortingFn<ScoredFirm> = (a, b) => {
  const da = a.original.bestOffer?.discountPercent ?? 0;
  const db = b.original.bestOffer?.discountPercent ?? 0;
  return db - da;
};

const sortByDrawdown: SortingFn<ScoredFirm> = (a, b) => {
  const da = a.original.maxDrawdown ?? 100;
  const db = b.original.maxDrawdown ?? 100;
  return da - db;
};

const sortByPayout: SortingFn<ScoredFirm> = (a, b) =>
  getPayoutSortValue(a.original.payoutSpeed) - getPayoutSortValue(b.original.payoutSpeed);

const SORT_FN_MAP: Record<SortOption, SortingFn<ScoredFirm>> = {
  [SortOption.SCORE]: sortByScore,
  [SortOption.COST]: sortByCost,
  [SortOption.DISCOUNT]: sortByDiscount,
  [SortOption.DRAWDOWN]: sortByDrawdown,
  [SortOption.PAYOUT]: sortByPayout,
};

// ─── Column helper ────────────────────────────────────────────────────────

const columnHelper = createColumnHelper<ScoredFirm>();

// ─── Table header labels ─────────────────────────────────────────────────

const TABLE_HEADERS = [
  'Firm',
  'Fee / True Cost',
  'Drawdown',
  'Daily Loss',
  'Payout',
  'Rules',
  'Score / Code',
  'Actions',
];

// ─── FirmList Component ────────────────────────────────────────────────────

/**
 * Client component that renders the filterable, sortable firm list.
 * Owns the compare state subscription (useCompareParams called once here,
 * NOT in each row — prevents N re-renders per URL update).
 * Uses @tanstack/react-table for data logic.
 * Renders FirmRow (desktop) or FirmCard (mobile < 768px).
 */
export function FirmList({ firms }: FirmListProps) { console.log("FirmList render");
  const { params, addToCompare, removeFromCompare, isInCompare } = useCompareParams();
  const isMobile = useIsMobile();

  // Defer the search query so typing doesn't block rendering the row list
  const deferredQ = useDeferredValue(params.q);

  const compareCount = params.compare.length;
  const compareDisabled = compareCount >= 3;

  const filterValue: FilterValue = useMemo(
    () => ({
      q: deferredQ,
      drawdownType: params.drawdownType,
      evaluationType: params.evaluationType,
      fundingStyle: params.fundingStyle,
      minFee: params.minFee,
      maxFee: params.maxFee,
      hasDiscount: params.hasDiscount,
      newsTrading: params.newsTrading,
      weekendHolding: params.weekendHolding,
      eaAllowed: params.eaAllowed,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      deferredQ,
      params.drawdownType,
      params.evaluationType,
      params.fundingStyle,
      params.minFee,
      params.maxFee,
      params.hasDiscount,
      params.newsTrading,
      params.weekendHolding,
      params.eaAllowed,
    ]
  );

  const sortingFn = SORT_FN_MAP[params.sort] ?? sortByScore;

  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'firm',
        filterFn: firmFilterFn,
        sortingFn: sortingFn,
        enableSorting: true,
      }),
    ],
    [sortingFn]
  );

  const tableState = useMemo(
    () => ({
      columnFilters: [{ id: 'firm', value: filterValue }],
      sorting: [{ id: 'firm', desc: false }],
    }),
    [filterValue, params.sort]
  );

  const table = useReactTable({
    data: firms,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: tableState,
  });

  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <p className="text-white/60 font-medium mb-2">No firms match your filters</p>
        <p className="text-white/30 text-sm">Try adjusting or clearing your filters</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Result count */}
      <p className="text-xs text-white/30 px-4 py-2.5 border-b border-white/5">
        {rows.length} firm{rows.length !== 1 ? 's' : ''} found
      </p>

      {/* Desktop table header */}
      {!isMobile && (
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1.5fr_auto] gap-4 px-4 py-2 border-b border-white/5">
          {TABLE_HEADERS.map((h) => (
            <span
              key={h}
              className="text-[10px] font-semibold text-white/30 uppercase tracking-wider"
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {/* Rows or Cards — compare state passed as props, not subscribed per-row */}
      {isMobile ? (
        <div className="grid grid-cols-1 gap-4 p-4">
          {rows.map((row) => (
            <FirmCard
              key={row.original.id}
              firm={row.original}
              inCompare={isInCompare(row.original.slug)}
              compareDisabled={compareDisabled}
              addToCompare={addToCompare}
              removeFromCompare={removeFromCompare}
            />
          ))}
        </div>
      ) : (
        <div>
          {rows.map((row) => (
            <FirmRow
              key={row.original.id}
              firm={row.original}
              inCompare={isInCompare(row.original.slug)}
              compareDisabled={compareDisabled}
              addToCompare={addToCompare}
              removeFromCompare={removeFromCompare}
            />
          ))}
        </div>
      )}
    </div>
  );
}
