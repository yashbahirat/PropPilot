import { Prisma, DrawdownType } from '@prisma/client';

type FirmWithRelations = Prisma.FirmGetPayload<{
  include: {
    offers: true;
    reviews: true;
    faqs: true;
  };
}>;

interface RulesTabProps {
  firm: FirmWithRelations;
}

const DRAWDOWN_LABELS: Record<DrawdownType, { label: string; description: string; severity: 'easy' | 'moderate' | 'hard' | 'very-hard' }> = {
  BALANCE: { label: 'Balance-Based', description: 'Calculated on account balance only. Most lenient.', severity: 'easy' },
  EQUITY: { label: 'Equity-Based', description: 'Calculated on current equity including open trades.', severity: 'moderate' },
  TRAILING_BALANCE: { label: 'Trailing Balance', description: 'Trails your balance as it grows. More restrictive.', severity: 'hard' },
  TRAILING_EQUITY: { label: 'Trailing Equity', description: 'Trails your highest equity including open positions. Most restrictive.', severity: 'very-hard' },
};

const SEVERITY_COLORS = {
  easy: 'text-[#00D4AA] bg-[#00D4AA]/10 border-[#00D4AA]/20',
  moderate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  hard: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'very-hard': 'text-red-400 bg-red-400/10 border-red-400/20',
};

function RuleRow({ label, value, positive }: { label: string; value: string; positive?: boolean | null }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[#2E2E45] last:border-0">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {positive !== null && positive !== undefined && (
          <span className={`text-xs ${positive ? 'text-[#00D4AA]' : 'text-red-400'}`}>
            {positive ? '✓' : '✗'}
          </span>
        )}
        <span className="text-sm font-semibold text-white text-right">{value}</span>
      </div>
    </div>
  );
}

export default function RulesTab({ firm }: RulesTabProps) {
  const drawdownInfo = firm.drawdownType ? DRAWDOWN_LABELS[firm.drawdownType] : null;

  return (
    <div className="space-y-6">
      {/* Drawdown Type */}
      {drawdownInfo && (
        <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Drawdown Structure
          </h2>
          <div className="flex items-start gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${SEVERITY_COLORS[drawdownInfo.severity]}`}>
              {drawdownInfo.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">{drawdownInfo.description}</p>
          {firm.maxDrawdown != null && (
            <p className="text-sm font-semibold text-white mt-2">
              Max drawdown: <span className="text-[#00D4AA]">{firm.maxDrawdown}%</span>
            </p>
          )}
          {firm.dailyLossLimit != null && (
            <p className="text-sm font-semibold text-white mt-1">
              Daily loss limit: <span className="text-[#00D4AA]">{firm.dailyLossLimit}%</span>
            </p>
          )}
        </div>
      )}

      {/* Trading Rules */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Trading Rules
        </h2>
        <div>
          <RuleRow label="News Trading" value={firm.newsTrading ? 'Allowed' : 'Not Allowed'} positive={firm.newsTrading} />
          <RuleRow label="Weekend Holding" value={firm.weekendHolding ? 'Allowed' : 'Not Allowed'} positive={firm.weekendHolding} />
          <RuleRow label="Expert Advisors (EA)" value={firm.eaAllowed ? 'Allowed' : 'Not Allowed'} positive={firm.eaAllowed} />
          <RuleRow label="Consistency Rule" value={firm.consistencyRule ? 'Required' : 'Not Required'} positive={!firm.consistencyRule} />
          {firm.consistencyRuleNote && (
            <p className="text-xs text-muted-foreground mt-3 italic">
              Note: {firm.consistencyRuleNote}
            </p>
          )}
        </div>
      </div>

      {/* Challenge Parameters */}
      <div className="bg-[#1E1E30] rounded-lg border border-[#2E2E45] p-6">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Challenge Parameters
        </h2>
        <div>
          {firm.profitTarget != null && (
            <RuleRow label="Profit Target" value={`${firm.profitTarget}%`} />
          )}
          {firm.minTradingDays != null && (
            <RuleRow label="Min Trading Days" value={`${firm.minTradingDays} days`} />
          )}
          {firm.scalingPlan && (
            <RuleRow label="Scaling Plan" value="Available" positive={true} />
          )}
          {firm.evaluationType && (
            <RuleRow label="Evaluation Type" value={firm.evaluationType.replace(/_/g, ' ')} />
          )}
          {firm.fundingStyle && (
            <RuleRow label="Funding Style" value={firm.fundingStyle.replace(/_/g, ' ')} />
          )}
          {firm.platforms.length > 0 && (
            <RuleRow label="Platforms" value={firm.platforms.join(', ')} />
          )}
        </div>
      </div>
    </div>
  );
}
