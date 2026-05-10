import { Prisma } from '@prisma/client';

type FirmWithRelations = Prisma.FirmGetPayload<{
  include: {
    offers: true;
    reviews: true;
    faqs: true;
  };
}>;

interface ProsConsTabProps {
  firm: FirmWithRelations;
}

// Derive pros/cons dynamically from firm data
function derivePros(firm: FirmWithRelations): string[] {
  const pros: string[] = [];
  if (firm.newsTrading) pros.push('News trading allowed');
  if (firm.weekendHolding) pros.push('Weekend holding allowed');
  if (firm.eaAllowed) pros.push('Expert Advisors (EA) allowed');
  if (firm.scalingPlan) pros.push('Scaling plan available');
  if (!firm.consistencyRule) pros.push('No consistency rule');
  if (firm.profitSplit && firm.profitSplit >= 85) pros.push(`${firm.profitSplit}% profit split`);
  if (firm.drawdownType === 'BALANCE' || firm.drawdownType === 'EQUITY') {
    pros.push('Lenient drawdown structure');
  }
  if (firm.payoutSpeed?.toLowerCase().includes('instant') || firm.payoutSpeed?.toLowerCase().includes('1 day')) {
    pros.push('Fast payouts');
  }
  return pros;
}

function deriveCons(firm: FirmWithRelations): string[] {
  const cons: string[] = [];
  if (!firm.newsTrading) cons.push('News trading not allowed');
  if (!firm.weekendHolding) cons.push('No weekend holding');
  if (!firm.eaAllowed) cons.push('No Expert Advisors (EA)');
  if (firm.consistencyRule) cons.push('Consistency rule applies');
  if (firm.drawdownType === 'TRAILING_EQUITY' || firm.drawdownType === 'TRAILING_BALANCE') {
    cons.push('Trailing drawdown structure — more restrictive');
  }
  if (firm.minTradingDays && firm.minTradingDays >= 5) {
    cons.push(`Minimum ${firm.minTradingDays} trading days required`);
  }
  return cons;
}

export default function ProsConsTab({ firm }: ProsConsTabProps) {
  const pros = derivePros(firm);
  const cons = deriveCons(firm);
  const isEmpty = pros.length === 0 && cons.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-base font-semibold text-white mb-1">No pros/cons added yet</p>
        <p className="text-sm text-muted-foreground">
          Firm data is still being reviewed. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pros */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          ✓ Pros
        </h2>
        {pros.length > 0 ? (
          <ul className="space-y-2.5">
            {pros.map((pro, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#00D4AA]/15 text-[#00D4AA] flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <span className="text-sm text-white/90">{pro}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No notable pros identified.</p>
        )}
      </div>

      {/* Cons */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          ✗ Cons
        </h2>
        {cons.length > 0 ? (
          <ul className="space-y-2.5">
            {cons.map((con, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xs font-bold">
                  ✗
                </span>
                <span className="text-sm text-white/90">{con}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No notable cons identified.</p>
        )}
      </div>
    </div>
  );
}
