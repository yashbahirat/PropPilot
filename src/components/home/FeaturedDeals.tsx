"use client"

import { useRef } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const featuredOffers = [
  { id: 1, firm: 'Alpha Capital', text: 'Highest Payout Speed - 15% OFF today', code: 'ALPHA15', logo: 'A' },
  { id: 2, firm: 'FTMO', text: 'Industry Standard - 10% OFF all challenges', code: 'PROPPILOT10', logo: 'F' },
  { id: 3, firm: 'Topstep', text: 'Best for Futures - 20% OFF 50K Account', code: 'PILOT20', logo: 'T' },
  { id: 4, firm: 'Funding Pips', text: '1-Step Evaluation - 5% OFF', code: 'PIPS5', logo: 'FP' },
  { id: 5, firm: 'TradeDay', text: 'End of Day Drawdown - 20% OFF', code: 'TRADEDAY20', logo: 'TD' },
]

export function FeaturedDeals() {
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse"></span>
            Featured Deals
          </h2>
          <Button variant="link" className="text-[#00D4AA] hover:text-[#00D4AA]/80 hidden sm:flex">
            View all deals &rarr;
          </Button>
        </div>

        <div className="overflow-hidden pb-6 -mx-4 px-4 sm:mx-0 sm:px-0" ref={carouselRef}>
          <m.div 
            drag="x" 
            dragConstraints={carouselRef} 
            dragElastic={0.15}
            className="flex gap-4 sm:gap-6 w-max cursor-grab active:cursor-grabbing"
          >
            {featuredOffers.map((offer, idx) => (
              <m.div
                key={offer.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="w-[280px] sm:w-[340px] shrink-0"
              >
                <Card className="glass-teal border-white/5 hover:border-[#00D4AA]/30 transition-colors pointer-events-none sm:pointer-events-auto">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#00D4AA]/10 flex items-center justify-center font-bold text-[#00D4AA] border border-[#00D4AA]/20 group-hover:bg-[#00D4AA]/20 transition-colors">
                      {offer.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{offer.firm}</h3>
                      <p className="text-sm text-slate-400 truncate">{offer.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
