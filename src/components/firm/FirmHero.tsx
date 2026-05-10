import Image from 'next/image';
import Link from 'next/link';
import { Prisma } from '@prisma/client';
import RuleDifficultyScore from './RuleDifficultyScore';

// Type for firm with included relations
type FirmWithRelations = Prisma.FirmGetPayload<{
  include: {
    offers: true;
    reviews: true;
    faqs: true;
  };
}>;

interface FirmHeroProps {
  firm: FirmWithRelations;
}

function computeBreakdown(firm: FirmWithRelations) {
  // Drawdown type score (higher = more lenient)
  const drawdownMap: Record<string, number> = {
    BALANCE: 100,
    EQUITY: 75,
    TRAILING_BALANCE: 50,
    TRAILING_EQUITY: 25,
  };
  const drawdownType = firm.drawdownType
    ? (drawdownMap[firm.drawdownType] ?? 50)
    : 50;

  // Consistency rule (no rule = 100, has rule = 30)
  const consistencyRule = firm.consistencyRule ? 30 : 100;

  // Profit target (lower target = higher score)
  const profitTarget = firm.profitTarget
    ? Math.max(0, Math.min(100, Math.round((1 - firm.profitTarget / 20) * 100)))
    : 50;

  // Restrictions (each negative: no news, no weekend, no EA)
  let restrictions = 100;
  if (!firm.newsTrading) restrictions -= 34;
  if (!firm.weekendHolding) restrictions -= 33;
  if (!firm.eaAllowed) restrictions -= 33;
  restrictions = Math.max(0, restrictions);

  return { drawdownType, consistencyRule, profitTarget, restrictions };
}

export default function FirmHero({ firm }: FirmHeroProps) {
  const bestOffer = firm.offers[0] ?? null;
  const score = firm.ruleDifficultyScore ?? 50;
  const breakdown = computeBreakdown(firm);

  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0E1A] via-[#0A0A14] to-[#08080F] pointer-events-none" />
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,170,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-[#1E1E30] border border-[#2E2E45] flex items-center justify-center overflow-hidden">
              {firm.logoUrl ? (
                <Image
                  src={firm.logoUrl}
                  alt={`${firm.name} logo`}
                  width={96}
                  height={96}
                  className="object-contain w-full h-full"
                  priority
                />
              ) : (
                <span className="text-2xl font-bold text-[#00D4AA]">
                  {firm.name.charAt(0)}
                </span>
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex flex-wrap items-start gap-3 mb-4">
              {bestOffer?.isExclusive && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30">
                  ★ EXCLUSIVE
                </span>
              )}
              {bestOffer?.discountPercent && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                  {bestOffer.discountPercent}% OFF
                </span>
              )}
            </div>

            <h1 className="text-[36px] font-semibold text-white leading-tight mb-2">
              {firm.name}
            </h1>

            {firm.description && (
              <p className="text-base text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                {firm.description}
              </p>
            )}

            {/* Rule Difficulty Score */}
            <div className="mb-6 max-w-xs">
              <RuleDifficultyScore score={score} breakdown={breakdown} />
            </div>

            {/* Discount code chip */}
            {bestOffer?.code && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Discount Code:
                </span>
                <span className="font-mono text-sm font-semibold text-[#00D4AA] bg-[#1E1E30] border border-[#2E2E45] rounded-md px-3 py-1 tracking-wider">
                  {bestOffer.code}
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/go/${firm.slug}`}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#00D4AA] text-black text-sm font-semibold hover:bg-[#00D4AA]/90 transition-colors"
              >
                Visit Site →
              </Link>
              {/* Copy Code placeholder — replaced in Plan 03 */}
              <button
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-[#00D4AA] text-[#00D4AA] text-sm font-semibold bg-transparent hover:bg-[#00D4AA]/10 transition-colors disabled:opacity-50"
                disabled={!bestOffer?.code}
              >
                Copy Code
              </button>
            </div>

            {/* Affiliate Disclosure */}
            <p className="text-xs text-muted-foreground mt-5">
              PropPilot may earn a commission when you click affiliate links.{' '}
              <Link
                href="/legal/affiliate-disclosure"
                className="underline hover:text-white transition-colors"
              >
                Learn more
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
