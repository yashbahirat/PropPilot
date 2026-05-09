import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-[#00D4AA] border-[#00D4AA]/40 bg-[#00D4AA]/10';
  if (score >= 60) return 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10';
  if (score >= 40) return 'text-amber-400 border-amber-400/40 bg-amber-400/10';
  return 'text-red-400 border-red-400/40 bg-red-400/10';
}

/**
 * Prominent score badge displaying the firm's PropPilot score (0–100).
 * Color shifts from red → amber → cyan → teal as score improves.
 */
export function ScoreBadge({ score, size = 'md', className }: ScoreBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 min-w-[2rem]',
    md: 'text-sm px-2 py-1 min-w-[2.5rem]',
    lg: 'text-base px-2.5 py-1.5 min-w-[3rem]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md border font-bold tabular-nums',
        getScoreColor(score),
        sizeClasses[size],
        className
      )}
      title={`PropPilot Score: ${score}/100`}
    >
      {score}
    </span>
  );
}
