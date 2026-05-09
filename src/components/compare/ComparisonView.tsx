'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScoredFirm } from '@/lib/scoring';
import { ScoreBadge } from './ScoreBadge';
import { CopyCodeButton } from './CopyCodeButton';
import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface ComparisonViewProps {
  firms: ScoredFirm[];
}

// ─── Metric rows to compare ────────────────────────────────────────────────

type MetricExtractor = (firm: ScoredFirm) => string;

const DRAWDOWN_LABELS: Record<string, string> = {
  BALANCE: 'Balance',
  EQUITY: 'Equity',
  TRAILING_BALANCE: 'Trailing Balance',
  TRAILING_EQUITY: 'Trailing Equity',
};

interface MetricSpec {
  label: string;
  getValue: MetricExtractor;
  /** True if a higher value is better (for coloring). False if lower = better. */
  higherBetter?: boolean;
  /** If true, values are compared numerically for highlighting. */
  numeric?: boolean;
}

const METRICS: MetricSpec[] = [
  {
    label: 'PropPilot Score',
    getValue: (f) => `${f.overallScore}`,
    higherBetter: true,
    numeric: true,
  },
  {
    label: 'Challenge Fee',
    getValue: (f) =>
      f.challengeFee ? `$${parseFloat(f.challengeFee).toFixed(0)}` : '—',
    higherBetter: false,
    numeric: true,
  },
  {
    label: 'Drawdown Limit',
    getValue: (f) => (f.maxDrawdown ? `${f.maxDrawdown}%` : '—'),
    higherBetter: true,
    numeric: true,
  },
  {
    label: 'Drawdown Type',
    getValue: (f) =>
      f.drawdownType ? (DRAWDOWN_LABELS[f.drawdownType] ?? f.drawdownType) : '—',
  },
  {
    label: 'Daily Loss Limit',
    getValue: (f) => (f.dailyLossLimit ? `${f.dailyLossLimit}%` : '—'),
    higherBetter: true,
    numeric: true,
  },
  {
    label: 'Profit Split',
    getValue: (f) => (f.profitSplit ? `${f.profitSplit}%` : '—'),
    higherBetter: true,
    numeric: true,
  },
  {
    label: 'Payout Speed',
    getValue: (f) => f.payoutSpeed ?? '—',
  },
  {
    label: 'Profit Target',
    getValue: (f) => (f.profitTarget ? `${f.profitTarget}%` : '—'),
    higherBetter: false,
    numeric: true,
  },
  {
    label: 'Min Trading Days',
    getValue: (f) => (f.minTradingDays ? `${f.minTradingDays} days` : '—'),
    higherBetter: false,
    numeric: true,
  },
  {
    label: 'Evaluation Type',
    getValue: (f) =>
      f.evaluationType
        ? f.evaluationType
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : '—',
  },
  {
    label: 'Funding Style',
    getValue: (f) =>
      f.fundingStyle
        ? f.fundingStyle.charAt(0) + f.fundingStyle.slice(1).toLowerCase()
        : '—',
  },
  {
    label: 'News Trading',
    getValue: (f) => (f.newsTrading ? '✓ Allowed' : '✗ Not Allowed'),
  },
  {
    label: 'Weekend Holding',
    getValue: (f) => (f.weekendHolding ? '✓ Allowed' : '✗ Not Allowed'),
  },
  {
    label: 'EA/Bots Allowed',
    getValue: (f) => (f.eaAllowed ? '✓ Allowed' : '✗ Not Allowed'),
  },
  {
    label: 'Consistency Rule',
    getValue: (f) => (f.consistencyRule ? '⚠ Required' : '✓ None'),
  },
  {
    label: 'Scaling Plan',
    getValue: (f) => (f.scalingPlan ? '✓ Available' : '—'),
  },
  {
    label: 'Platforms',
    getValue: (f) => (f.platforms.length > 0 ? f.platforms.join(', ') : '—'),
  },
  {
    label: 'Account Range',
    getValue: (f) => {
      if (f.minAccountSize && f.maxAccountSize)
        return `$${f.minAccountSize.toLocaleString()} – $${f.maxAccountSize.toLocaleString()}`;
      if (f.maxAccountSize) return `Up to $${f.maxAccountSize.toLocaleString()}`;
      return '—';
    },
  },
  {
    label: 'Last Verified',
    getValue: (f) =>
      f.lastVerifiedAt ? format(new Date(f.lastVerifiedAt), 'MMM d, yyyy') : '—',
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function isDifferent(values: string[]): boolean {
  if (values.length <= 1) return false;
  return !values.every((v) => v === values[0]);
}

function getCellClass(value: string, allValues: string[], spec: MetricSpec): string {
  if (!isDifferent(allValues)) return 'text-white/70';
  if (!spec.numeric) return 'text-amber-300'; // different but not numeric → just highlight

  const numVals = allValues.map((v) =>
    parseFloat(v.replace(/[^0-9.]/g, ''))
  );
  const thisNum = parseFloat(value.replace(/[^0-9.]/g, ''));

  if (isNaN(thisNum)) return 'text-amber-300';

  const bestVal = spec.higherBetter ? Math.max(...numVals) : Math.min(...numVals);
  const worstVal = spec.higherBetter ? Math.min(...numVals) : Math.max(...numVals);

  if (thisNum === bestVal) return 'text-[#00D4AA] font-semibold';
  if (thisNum === worstVal) return 'text-amber-400';
  return 'text-amber-300';
}

// ─── ComparisonView ────────────────────────────────────────────────────────

/**
 * Full side-by-side comparison table.
 * Shows all metrics in rows, with cells highlighted when values differ.
 * Best value shown in teal, worst in amber.
 */
export function ComparisonView({ firms }: ComparisonViewProps) {
  const firmCount = firms.length;
  const colClass =
    firmCount === 2
      ? 'grid-cols-[200px_1fr_1fr]'
      : 'grid-cols-[200px_1fr_1fr_1fr]';

  return (
    <div className="overflow-x-auto">
      {/* Firm headers */}
      <div className={`grid ${colClass} border-b border-white/10`}>
        <div className="p-4" /> {/* empty label column */}
        {firms.map((firm) => (
          <div
            key={firm.id}
            className="p-4 border-l border-white/10 flex flex-col items-center gap-2 text-center"
          >
            {firm.logoUrl ? (
              <Image
                src={firm.logoUrl}
                alt={`${firm.name} logo`}
                width={48}
                height={48}
                className="object-contain h-12"
              />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="text-xl font-bold text-white/40">
                  {firm.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p className="font-semibold text-white text-sm">{firm.name}</p>
              <ScoreBadge score={firm.overallScore} size="sm" className="mt-1" />
            </div>
            {firm.bestOffer && (
              <CopyCodeButton
                code={firm.bestOffer.code}
                discountPercent={firm.bestOffer.discountPercent}
                compact
              />
            )}
            <div className="flex gap-1.5 mt-1">
              <Button asChild size="sm" className="bg-[#00D4AA] text-[#08080F] font-semibold text-xs h-7 px-2.5">
                <Link href={`/firms/${firm.slug}`}>Details</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/15 text-white/60 text-xs h-7 px-2">
                <a href={firm.affiliateUrl ?? firm.websiteUrl ?? '#'} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Metric rows */}
      {METRICS.map((spec, idx) => {
        const values = firms.map((f) => spec.getValue(f));
        const different = isDifferent(values);

        return (
          <div
            key={spec.label}
            className={`grid ${colClass} border-b border-white/5 ${
              different ? 'bg-amber-500/[0.03]' : ''
            } ${idx % 2 === 0 ? 'bg-white/[0.01]' : ''}`}
          >
            {/* Label */}
            <div className="px-4 py-3 flex items-center">
              <span className="text-xs font-medium text-white/40">{spec.label}</span>
              {different && (
                <span className="ml-2 text-[9px] text-amber-400/60 uppercase tracking-wider">
                  diff
                </span>
              )}
            </div>

            {/* Values per firm */}
            {firms.map((firm, fi) => {
              const val = values[fi];
              const cellClass = getCellClass(val, values, spec);

              return (
                <div
                  key={firm.id}
                  className="px-4 py-3 border-l border-white/5 flex items-center"
                >
                  <span className={`text-sm ${cellClass}`}>{val}</span>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
