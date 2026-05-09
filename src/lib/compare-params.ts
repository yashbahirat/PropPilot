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

export const compareParamsParsers = {
  // Search
  q: parseAsString.withDefault(''),

  // Sort
  sort: parseAsStringEnum(Object.values(SortOption) as SortOption[]).withDefault(SortOption.SCORE),

  // Filters — string enums matching Prisma enum values
  drawdownType: parseAsStringEnum([
    'BALANCE',
    'EQUITY',
    'TRAILING_BALANCE',
    'TRAILING_EQUITY',
  ] as const as unknown as string[]).withDefault(''),

  evaluationType: parseAsStringEnum([
    'ONE_STEP',
    'TWO_STEP',
    'THREE_STEP',
    'INSTANT_FUNDING',
    'FUNDED_DIRECT',
  ] as const as unknown as string[]).withDefault(''),

  fundingStyle: parseAsStringEnum([
    'CHALLENGE',
    'INSTANT',
    'FUNDED',
  ] as const as unknown as string[]).withDefault(''),

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
};

// ─── Server-Side Cache ─────────────────────────────────────────────────────

export const compareParamsCache = createSearchParamsCache(compareParamsParsers);

// ─── Inferred Types ────────────────────────────────────────────────────────

export type CompareParams = {
  q: string;
  sort: SortOption;
  drawdownType: string;
  evaluationType: string;
  fundingStyle: string;
  minFee: number;
  maxFee: number;
  hasDiscount: boolean;
  newsTrading: boolean;
  weekendHolding: boolean;
  eaAllowed: boolean;
  compare: string[];
};
