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

interface FirmCardProps {
  firm: ScoredFirm;
}

function DataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-xs text-white/40">{label}</span>
      <span className="text-sm font-medium text-white/80">{value ?? '—'}</span>
    </div>
  );
}

const DRAWDOWN_LABELS: Record<string, string> = {
  BALANCE: 'Balance',
  EQUITY: 'Equity',
  TRAILING_BALANCE: 'Trailing Balance',
  TRAILING_EQUITY: 'Trailing Equity',
};

/**
 * Mobile card view for a single prop firm.
 * Stacks all metrics vertically in a rounded card.
 * Shows the same data as FirmRow but in a touch-friendly layout.
 */
export function FirmCard({ firm }: FirmCardProps) {
  const { addToCompare, removeFromCompare, isInCompare, params } = useCompareParams();
  const inCompare = isInCompare(firm.slug);
  const compareCount = params.compare.length;

  const trueCost =
    firm.challengeFee && firm.bestOffer?.discountPercent
      ? parseFloat(firm.challengeFee) * (1 - firm.bestOffer.discountPercent / 100)
      : null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0E0E1A] hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
            {firm.logoUrl ? (
              <Image
                src={firm.logoUrl}
                alt={`${firm.name} logo`}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : (
              <span className="text-sm font-bold text-white/40">{firm.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <Link
              href={`/firms/${firm.slug}`}
              className="font-semibold text-white hover:text-[#00D4AA] transition-colors"
            >
              {firm.name}
            </Link>
            {firm.evaluationType && (
              <p className="text-xs text-white/40">
                {firm.evaluationType
                  .replace(/_/g, ' ')
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <ScoreBadge score={firm.overallScore} size="lg" />
          <button
            onClick={() =>
              inCompare ? removeFromCompare(firm.slug) : addToCompare(firm.slug)
            }
            disabled={!inCompare && compareCount >= 3}
            className="text-xs text-white/40 hover:text-[#00D4AA] flex items-center gap-1 transition-colors disabled:opacity-30"
            aria-label={inCompare ? `Remove ${firm.name} from comparison` : `Compare ${firm.name}`}
          >
            <CheckCircle2
              className={`h-3.5 w-3.5 ${inCompare ? 'text-[#00D4AA]' : ''}`}
            />
            {inCompare ? 'In compare' : 'Compare'}
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="px-4 py-1">
        <DataRow
          label="Challenge Fee"
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
        <DataRow
          label="Max Drawdown"
          value={
            firm.maxDrawdown
              ? `${firm.maxDrawdown}% (${firm.drawdownType ? (DRAWDOWN_LABELS[firm.drawdownType] ?? firm.drawdownType) : ''})`
              : '—'
          }
        />
        <DataRow
          label="Daily Loss Limit"
          value={firm.dailyLossLimit ? `${firm.dailyLossLimit}%` : '—'}
        />
        <DataRow label="Payout Speed" value={firm.payoutSpeed ?? '—'} />
        <DataRow
          label="Profit Split"
          value={firm.profitSplit ? `${firm.profitSplit}%` : '—'}
        />
      </div>

      {/* Rules */}
      <div className="px-4 pb-3">
        <p className="text-[10px] text-white/30 uppercase tracking-wider mb-2">
          Trading Rules
        </p>
        <RulesBadges
          newsTrading={firm.newsTrading}
          weekendHolding={firm.weekendHolding}
          eaAllowed={firm.eaAllowed}
          consistencyRule={firm.consistencyRule}
        />
      </div>

      {/* Last Verified */}
      {firm.lastVerifiedAt && (
        <div className="px-4 pb-3 flex items-center gap-1 text-xs text-white/30">
          <Calendar className="h-3 w-3" />
          Verified {format(new Date(firm.lastVerifiedAt), 'MMM d, yyyy')}
        </div>
      )}

      {/* CTAs */}
      <div className="p-4 pt-0 flex flex-col gap-2">
        {firm.bestOffer && (
          <CopyCodeButton
            code={firm.bestOffer.code}
            discountPercent={firm.bestOffer.discountPercent}
          />
        )}
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#08080F] font-semibold text-xs"
          >
            <Link href={`/firms/${firm.slug}`}>View Details</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-white/15 text-white/60 hover:text-white text-xs"
          >
            <a
              href={firm.affiliateUrl ?? firm.websiteUrl ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${firm.name} website`}
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
