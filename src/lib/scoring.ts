import { DrawdownType } from '@prisma/client';

export interface ScoredFirm {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  description: string | null;
  websiteUrl: string | null;
  affiliateUrl: string | null;
  lastVerifiedAt: Date | null;
  maxAccountSize: number | null;
  minAccountSize: number | null;
  challengeFee: string | null; // Decimal serialized as string
  profitTarget: number | null;
  dailyLossLimit: number | null;
  maxDrawdown: number | null;
  drawdownType: DrawdownType | null;
  evaluationType: string | null;
  fundingStyle: string | null;
  payoutSpeed: string | null;
  profitSplit: number | null;
  minTradingDays: number | null;
  consistencyRule: boolean;
  newsTrading: boolean;
  weekendHolding: boolean;
  eaAllowed: boolean;
  scalingPlan: boolean;
  platforms: string[];
  ruleDifficultyScore: number | null;
  overallScore: number;
  bestOffer: {
    id: string;
    code: string;
    discountPercent: number | null;
    discountAmount: string | null;
    isExclusive: boolean;
    affiliateUrl: string | null;
  } | null;
}

function getDrawdownScore(type: DrawdownType | null): number {
  switch (type) {
    case 'TRAILING_EQUITY': return 25;   // most restrictive = lowest score
    case 'TRAILING_BALANCE': return 50;
    case 'EQUITY': return 75;
    case 'BALANCE': return 100;          // most lenient = highest score
    default: return 50;
  }
}

function getPayoutSpeedScore(speed: string | null): number {
  if (!speed) return 50;
  const s = speed.toLowerCase();
  if (s.includes('instant') || s.includes('same day') || s.includes('24h') || s.includes('1 day')) return 100;
  if (s.includes('1-3') || s.includes('2-3') || s.includes('48h') || s.includes('2 day')) return 80;
  if (s.includes('3-5') || s.includes('4-5') || s.includes('week')) return 60;
  if (s.includes('7') || s.includes('14') || s.includes('bi')) return 40;
  return 50;
}

/**
 * Compute an overall score (0–100) for a prop firm.
 *
 * Weights:
 *  - Drawdown leniency  25% (BALANCE=100, TRAILING_EQUITY=25)
 *  - Fee attractiveness 20% (lower fee vs $500 baseline = higher score)
 *  - Payout speed       20% (instant → 100, bi-weekly → 40)
 *  - Rule friendliness  20% (news/weekend/EA/consistency restrictions penalise)
 *  - Profit split       15% (higher split = higher score)
 */
export function computeFirmScore(firm: Omit<ScoredFirm, 'overallScore' | 'bestOffer'>): number {
  // Factor 1: Drawdown leniency (25%)
  const drawdownScore = getDrawdownScore(firm.drawdownType) * 0.25;

  // Factor 2: Fee attractiveness (20%) — baseline $500, lower fee = higher score
  const fee = firm.challengeFee ? parseFloat(firm.challengeFee) : 250;
  const feeScore = Math.max(0, Math.min(100, (1 - fee / 500) * 100)) * 0.20;

  // Factor 3: Payout speed (20%)
  const payoutScore = getPayoutSpeedScore(firm.payoutSpeed) * 0.20;

  // Factor 4: Rule friendliness (20%) — each restriction costs 20 points
  let ruleScore = 100;
  if (!firm.newsTrading) ruleScore -= 20;
  if (!firm.weekendHolding) ruleScore -= 20;
  if (!firm.eaAllowed) ruleScore -= 20;
  if (firm.consistencyRule) ruleScore -= 20;
  ruleScore = Math.max(0, ruleScore) * 0.20;

  // Factor 5: Profit split (15%)
  const splitScore = (firm.profitSplit ?? 80) * 0.15;

  const total = drawdownScore + feeScore + payoutScore + ruleScore + splitScore;
  return Math.round(Math.min(100, Math.max(0, total)));
}
