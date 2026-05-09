import { cn } from '@/lib/utils';

interface RulesBadgesProps {
  newsTrading: boolean;
  weekendHolding: boolean;
  eaAllowed: boolean;
  consistencyRule: boolean;
  compact?: boolean;
}

interface RuleBadgeProps {
  label: string;
  allowed: boolean;
  compact?: boolean;
}

function RuleBadge({ label, allowed, compact }: RuleBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium border',
        allowed
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-red-500/10 border-red-500/30 text-red-400/70',
        compact ? 'text-[10px] px-1 py-0.5' : ''
      )}
      title={allowed ? `${label}: Allowed` : `${label}: Not Allowed`}
    >
      {allowed ? '✓' : '✗'}{compact ? '' : ' '}{compact ? label.charAt(0) : label}
    </span>
  );
}

/**
 * Displays trading rule badges (News, Weekend, EA, Consistency Rule).
 * Green = allowed, Red = not allowed, Amber = restricted (consistency rule).
 */
export function RulesBadges({
  newsTrading,
  weekendHolding,
  eaAllowed,
  consistencyRule,
  compact = false,
}: RulesBadgesProps) {
  return (
    <div className="flex flex-wrap gap-1">
      <RuleBadge label="News" allowed={newsTrading} compact={compact} />
      <RuleBadge label="Weekend" allowed={weekendHolding} compact={compact} />
      <RuleBadge label="EA" allowed={eaAllowed} compact={compact} />
      {consistencyRule && (
        <span
          className={cn(
            'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium border',
            'bg-amber-500/10 border-amber-500/30 text-amber-400',
            compact ? 'text-[10px] px-1 py-0.5' : ''
          )}
          title="Consistency Rule Required"
        >
          {compact ? 'CR' : 'Consistency Rule'}
        </span>
      )}
    </div>
  );
}
