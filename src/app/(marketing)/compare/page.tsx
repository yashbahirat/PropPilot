export const runtime = 'nodejs';

import { Suspense } from 'react';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { computeFirmScore, ScoredFirm } from '@/lib/scoring';
import { ComparePageClient } from '@/components/compare/ComparePageClient';

export const metadata: Metadata = {
  title: 'Compare Prop Firms | PropPilot',
  description:
    'Compare the best proprietary trading firms side by side. Filter by drawdown type, account size, fees, and more. Find your perfect prop firm with verified discount codes.',
  openGraph: {
    title: 'Compare Prop Firms | PropPilot',
    description: 'Filter, sort, and compare prop firms with live verified discount codes.',
    type: 'website',
  },
};

async function getFirmsWithScores(): Promise<ScoredFirm[]> {
  const firms = await db.firm.findMany({
    where: { isActive: true },
    include: {
      offers: {
        where: { isActive: true },
        orderBy: [{ discountPercent: 'desc' }, { discountAmount: 'desc' }],
        take: 1,
      },
    },
    orderBy: { name: 'asc' },
  });

  return firms.map((firm) => {
    const firmData = {
      ...firm,
      challengeFee: firm.challengeFee?.toString() ?? null,
    };
    const score = computeFirmScore(firmData);
    const bestOffer = firm.offers[0]
      ? {
          id: firm.offers[0].id,
          code: firm.offers[0].code,
          discountPercent: firm.offers[0].discountPercent,
          discountAmount: firm.offers[0].discountAmount?.toString() ?? null,
          isExclusive: firm.offers[0].isExclusive,
          affiliateUrl: firm.offers[0].affiliateUrl,
        }
      : null;

    return { ...firmData, overallScore: score, bestOffer };
  });
}

export default async function ComparePage() {
  const firms = await getFirmsWithScores();
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08080F] flex items-center justify-center">
          <div className="text-white/40 text-sm animate-pulse">Loading firms…</div>
        </div>
      }
    >
      <ComparePageClient firms={firms} />
    </Suspense>
  );
}
