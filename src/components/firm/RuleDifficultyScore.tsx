'use client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

export interface RuleDifficultyBreakdown {
  drawdownType: number;    // 0-100, higher = more lenient
  consistencyRule: number; // 0-100, higher = more lenient
  profitTarget: number;    // 0-100, higher = easier target
  restrictions: number;    // 0-100, higher = fewer restrictions
}

interface RuleDifficultyScoreProps {
  score: number; // 0-100
  breakdown?: RuleDifficultyBreakdown;
}

const BREAKDOWN_LABELS: Record<keyof RuleDifficultyBreakdown, string> = {
  drawdownType: 'Drawdown Type',
  consistencyRule: 'Consistency Rule',
  profitTarget: 'Profit Target',
  restrictions: 'Restrictions',
};

function getDifficultyLabel(score: number): { label: string; color: string } {
  if (score >= 75) return { label: 'Easy', color: 'text-[#00D4AA]' };
  if (score >= 50) return { label: 'Moderate', color: 'text-yellow-400' };
  if (score >= 25) return { label: 'Hard', color: 'text-orange-400' };
  return { label: 'Very Hard', color: 'text-red-400' };
}

export default function RuleDifficultyScore({
  score,
  breakdown,
}: RuleDifficultyScoreProps) {
  const { label, color } = getDifficultyLabel(score);

  const bar = (
    <div className="flex items-center gap-3 w-full cursor-help">
      <div className="flex-1 bg-[#1E1E30] rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-[#00D4AA] rounded-full transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-white tabular-nums whitespace-nowrap">
        {score}
        <span className="text-muted-foreground font-normal">/100</span>
      </span>
      <span className={`text-xs font-semibold ${color} whitespace-nowrap`}>
        {label}
      </span>
    </div>
  );

  if (!breakdown) {
    return (
      <div className="w-full">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          Rule Difficulty Score
        </p>
        {bar}
      </div>
    );
  }

  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
        Rule Difficulty Score
      </p>
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div className="w-full">{bar}</div>
        </HoverCardTrigger>
        <HoverCardContent
          className="w-64 bg-[#1E1E30] border-[#2E2E45] text-white p-4"
          side="bottom"
          align="start"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Score Breakdown
          </p>
          <div className="space-y-2.5">
            {(Object.entries(breakdown) as [keyof RuleDifficultyBreakdown, number][]).map(
              ([key, value]) => (
                <div key={key} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {BREAKDOWN_LABELS[key]}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-[#08080F] rounded-full h-1.5">
                      <div
                        className="h-full bg-[#00D4AA] rounded-full"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-white tabular-nums w-8 text-right">
                      {value}
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
