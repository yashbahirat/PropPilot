import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
  createSearchParamsCache,
} from 'nuqs/server';

// ─── Sort Options ───────────────────────────────────────────────────────────

export const SortOption = {
  SCORE: 'score',
  COST: 'cost',
  DISCOUNT: 'discount',
  DRAWDOWN: 'drawdown',
  PAYOUT: 'payout',
} as const;

export type SortOption = (typeof SortOption)[keyof typeof SortOption];

// ─── Param Parsers ──────────────────────────────────────────────────────────
//
// IMPORTANT: enum filter params use parseAsString (not parseAsStringEnum) with
// null default. parseAsStringEnum rejects '' as invalid and causes nuqs to
// silently fail the entire useQueryStates hook when the value doesn't match
// the allowed set. We validate values in the filter function instead.

export const compareParamsParsers = {
  // Search
  q: parseAsString.withDefault(''),

  // Sort — uses enum since all values are valid sort options
  sort: parseAsStringEnum(Object.values(SortOption) as SortOption[]).withDefault(SortOption.SCORE),

  // Filters — plain strings with null default (validated in FirmList filter fn)
  drawdownType: parseAsString,   // null = no filter
  evaluationType: parseAsString, // null = no filter
  fundingStyle: parseAsString,   // null = no filter

  // Fee range
  minFee: parseAsFloat.withDefault(0),
  maxFee: parseAsFloat.withDefault(0), // 0 = no upper limit

  // Boolean filters
  hasDiscount: parseAsBoolean.withDefault(false),
  newsTrading: parseAsBoolean.withDefault(false),
  weekendHolding: parseAsBoolean.withDefault(false),
  eaAllowed: parseAsBoolean.withDefault(false),

  // Side-by-side comparison slugs (up to 3)
  compare: parseAsArrayOf(parseAsString).withDefault([]),

  // Toggle for full-page comparison view
  showCompare: parseAsBoolean.withDefault(false),
};

// ─── Server-Side Cache ─────────────────────────────────────────────────────

export const compareParamsCache = createSearchParamsCache(compareParamsParsers);

// ─── Inferred Types ────────────────────────────────────────────────────────

export type CompareParams = {
  q: string;
  sort: SortOption;
  drawdownType: string | null;
  evaluationType: string | null;
  fundingStyle: string | null;
  minFee: number;
  maxFee: number;
  hasDiscount: boolean;
  newsTrading: boolean;
  weekendHolding: boolean;
  eaAllowed: boolean;
  compare: string[];
  showCompare: boolean;
};
