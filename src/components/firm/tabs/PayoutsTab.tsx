import { Prisma } from '@prisma/client';

type FirmWithRelations = Prisma.FirmGetPayload<{
  include: {
    offers: true;
    reviews: true;
    faqs: true;
  };
}>;

interface PayoutsTabProps {
  firm: FirmWithRelations;
}

function PayoutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[#2E2E45] last:border-0">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-white text-right">{value}</span>
    </div>
  );
}

export default function PayoutsTab({ firm }: PayoutsTabProps) {
  const hasData = firm.profitSplit != null || firm.payoutSpeed != null;

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-base font-semibold text-white mb-1">No payout data yet</p>
        <p className="text-sm text-muted-foreground">Payout information is being verified. Check the firm&apos;s website for the latest details.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payout overview */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Payout Structure
        </h2>

        {/* Profit split highlight */}
        {firm.profitSplit != null && (
          <div className="mb-6 p-4 rounded-lg bg-[#00D4AA]/5 border border-[#00D4AA]/20">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Profit Split</p>
            <p className="text-4xl font-semibold text-[#00D4AA]">{firm.profitSplit}%</p>
            <p className="text-sm text-muted-foreground mt-1">of profits go to the trader</p>
          </div>
        )}

        <div>
          {firm.payoutSpeed && (
            <PayoutRow label="Payout Speed" value={firm.payoutSpeed} />
          )}
          {firm.profitTarget != null && (
            <PayoutRow label="Profit Target Required" value={`${firm.profitTarget}%`} />
          )}
          {firm.minTradingDays != null && (
            <PayoutRow label="Min Trading Days" value={`${firm.minTradingDays} days`} />
          )}
        </div>
      </div>

      {/* Account sizes */}
      {(firm.minAccountSize != null || firm.maxAccountSize != null) && (
        <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Account Sizes
          </h2>
          <div>
            {firm.minAccountSize != null && (
              <PayoutRow label="Minimum Account" value={`$${firm.minAccountSize.toLocaleString()}`} />
            )}
            {firm.maxAccountSize != null && (
              <PayoutRow label="Maximum Account" value={`$${firm.maxAccountSize.toLocaleString()}`} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
