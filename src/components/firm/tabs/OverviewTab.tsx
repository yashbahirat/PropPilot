import { Prisma } from '@prisma/client';

type FirmWithRelations = Prisma.FirmGetPayload<{
  include: {
    offers: true;
    reviews: true;
    faqs: true;
  };
}>;

interface OverviewTabProps {
  firm: FirmWithRelations;
}

const metricRows = [
  { label: 'Max Drawdown', key: 'maxDrawdown', format: (v: number) => `${v}%` },
  { label: 'Daily Loss Limit', key: 'dailyLossLimit', format: (v: number) => `${v}%` },
  { label: 'Profit Target', key: 'profitTarget', format: (v: number) => `${v}%` },
  { label: 'Profit Split', key: 'profitSplit', format: (v: number) => `${v}%` },
  { label: 'Min Trading Days', key: 'minTradingDays', format: (v: number) => `${v} days` },
  { label: 'Payout Speed', key: 'payoutSpeed', format: (v: string) => v },
  { label: 'Max Account Size', key: 'maxAccountSize', format: (v: number) => `$${v.toLocaleString()}` },
] as const;

export default function OverviewTab({ firm }: OverviewTabProps) {
  const approvedReviews = firm.reviews.filter((r) => r.isApproved);
  const avgRating =
    approvedReviews.length > 0
      ? (
          approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
          approvedReviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="space-y-8">
      {/* Firm description / verdict */}
      {firm.description && (
        <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Overview
          </h2>
          <p className="text-base text-white/90 leading-relaxed">{firm.description}</p>
        </div>
      )}

      {/* Key metrics */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Key Metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {metricRows.map(({ label, key, format }) => {
            const raw = firm[key as keyof typeof firm];
            if (raw == null) return null;
            return (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">{label}</span>
                <span className="text-base font-semibold text-white">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(format as (v: any) => string)(raw)}
                </span>
              </div>
            );
          })}

          {/* Drawdown type */}
          {firm.drawdownType && (
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-muted-foreground">Drawdown Type</span>
              <span className="text-base font-semibold text-white">
                {firm.drawdownType.replace(/_/g, ' ')}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Verdict / review summary */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Community Verdict
        </h2>
        {avgRating ? (
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-[#00D4AA]">{avgRating}</span>
            <div>
              <div className="flex items-center gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.round(parseFloat(avgRating))
                        ? 'text-[#00D4AA]'
                        : 'text-muted-foreground/30'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {approvedReviews.length} verified{' '}
                {approvedReviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No reviews yet. Be the first to share your experience.
          </p>
        )}
      </div>
    </div>
  );
}
