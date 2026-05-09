'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScoreBadge } from './ScoreBadge';
import { RulesBadges } from './RulesBadges';
import { CopyCodeButton } from './CopyCodeButton';
import { ExternalLink, CheckCircle2, Calendar } from 'lucide-react';
import { ScoredFirm } from '@/lib/scoring';
import { useCompareParams } from '@/hooks/use-compare-params';
import { format } from 'date-fns';

interface FirmRowProps {
  firm: ScoredFirm;
}

function MetricCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-white/30 uppercase tracking-wider leading-none mb-0.5">
        {label}
      </span>
      <span className="text-sm font-medium text-white/80">{value ?? '—'}</span>
    </div>
  );
}

const DRAWDOWN_LABELS: Record<string, string> = {
  BALANCE: 'Balance',
  EQUITY: 'Equity',
  TRAILING_BALANCE: 'Trail. Bal.',
  TRAILING_EQUITY: 'Trail. Eq.',
};

/**
 * Dense desktop table row for a single prop firm.
 * Shows all key metrics inline in an 8-column grid.
 * Uses @tanstack/react-table data model from parent FirmList.
 */
export function FirmRow({ firm }: FirmRowProps) {
  const { addToCompare, removeFromCompare, isInCompare, params } = useCompareParams();
  const inCompare = isInCompare(firm.slug);
  const compareCount = params.compare.length;

  const trueCost =
    firm.challengeFee && firm.bestOffer?.discountPercent
      ? parseFloat(firm.challengeFee) * (1 - firm.bestOffer.discountPercent / 100)
      : null;

  return (
    <div className="group grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1.5fr_auto] gap-4 items-center px-4 py-3.5 border-b border-white/5 hover:bg-white/[0.02] transition-colors">
      {/* Firm Identity */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Compare toggle */}
        <button
          onClick={() =>
            inCompare ? removeFromCompare(firm.slug) : addToCompare(firm.slug)
          }
          disabled={!inCompare && compareCount >= 3}
          className="shrink-0 text-white/25 hover:text-[#00D4AA] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title={
            inCompare
              ? 'Remove from comparison'
              : compareCount >= 3
              ? 'Max 3 firms selected'
              : 'Add to comparison'
          }
          aria-label={inCompare ? `Remove ${firm.name} from comparison` : `Compare ${firm.name}`}
        >
          <CheckCircle2
            className={`h-4 w-4 ${inCompare ? 'text-[#00D4AA] fill-[#00D4AA]/20' : ''}`}
          />
        </button>

        {/* Logo */}
        <div className="shrink-0 h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
          {firm.logoUrl ? (
            <Image
              src={firm.logoUrl}
              alt={`${firm.name} logo`}
              width={32}
              height={32}
              className="object-contain"
            />
          ) : (
            <span className="text-xs font-bold text-white/40">
              {firm.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Name + eval type */}
        <div className="min-w-0">
          <Link
            href={`/firms/${firm.slug}`}
            className="text-sm font-semibold text-white hover:text-[#00D4AA] transition-colors truncate block"
          >
            {firm.name}
          </Link>
          {firm.evaluationType && (
            <span className="text-[11px] text-white/35 block">
              {firm.evaluationType
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          )}
        </div>
      </div>

      {/* Fee / True Cost */}
      <MetricCell
        label="Fee / True Cost"
        value={
          firm.challengeFee ? (
            <span>
              ${parseFloat(firm.challengeFee).toFixed(0)}
              {trueCost !== null && (
                <span className="ml-1 text-[#00D4AA] text-xs">
                  → ${trueCost.toFixed(0)}
                </span>
              )}
            </span>
          ) : (
            '—'
          )
        }
      />

      {/* Drawdown */}
      <MetricCell
        label="Drawdown"
        value={
          firm.maxDrawdown ? (
            <span>
              {firm.maxDrawdown}%
              {firm.drawdownType && (
                <span className="block text-[10px] text-white/35">
                  {DRAWDOWN_LABELS[firm.drawdownType] ?? firm.drawdownType}
                </span>
              )}
            </span>
          ) : (
            '—'
          )
        }
      />

      {/* Daily Loss */}
      <MetricCell
        label="Daily Loss"
        value={firm.dailyLossLimit ? `${firm.dailyLossLimit}%` : '—'}
      />

      {/* Payout Speed */}
      <MetricCell label="Payout" value={firm.payoutSpeed ?? '—'} />

      {/* Rules Badges */}
      <div>
        <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
          Rules
        </span>
        <RulesBadges
          newsTrading={firm.newsTrading}
          weekendHolding={firm.weekendHolding}
          eaAllowed={firm.eaAllowed}
          consistencyRule={firm.consistencyRule}
          compact
        />
      </div>

      {/* Score + Discount Code + Last Verified */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <ScoreBadge score={firm.overallScore} size="md" />
          {firm.bestOffer && (
            <CopyCodeButton
              code={firm.bestOffer.code}
              discountPercent={firm.bestOffer.discountPercent}
              compact
            />
          )}
        </div>
        {firm.lastVerifiedAt && (
          <span className="flex items-center gap-1 text-[10px] text-white/30">
            <Calendar className="h-2.5 w-2.5" />
            {format(new Date(firm.lastVerifiedAt), 'MMM d, yyyy')}
          </span>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-1.5 shrink-0">
        <Button
          asChild
          size="sm"
          className="bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#08080F] font-semibold text-xs h-7 px-3"
        >
          <Link href={`/firms/${firm.slug}`}>Details</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="border-white/15 text-white/60 hover:text-white hover:border-white/30 text-xs h-7 px-3"
        >
          <a
            href={firm.affiliateUrl ?? firm.websiteUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-3 w-3 mr-1" /> Visit
          </a>
        </Button>
      </div>
    </div>
  );
}
