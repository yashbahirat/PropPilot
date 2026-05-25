import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { FeaturedDeals } from '@/components/home/FeaturedDeals'
import { SavingsCards } from '@/components/home/SavingsCards'
import { TrustMetrics } from '@/components/home/TrustMetrics'
import { SocialProof } from '@/components/home/SocialProof'
import { HomeFAQ } from '@/components/home/HomeFAQ'

export const metadata: Metadata = {
  title: 'PropPilot — Compare Prop Firms & Earn Rewards',
  description:
    'Compare proprietary trading firms, discover verified discount codes, and earn rewards for verified purchases.',
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturedDeals />
      <SavingsCards />
      <TrustMetrics />
      <SocialProof />
      <HomeFAQ />
    </div>
  )
}


