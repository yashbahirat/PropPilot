"use client"

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const mockDeals = [
  { id: 1, firm: 'FTMO', logo: 'F', discount: '10% OFF', code: 'PROPPILOT10', originalPrice: '$155', discountedPrice: '$139', features: ['Bi-weekly Payouts', 'No Time Limit'] },
  { id: 2, firm: 'Topstep', logo: 'T', discount: '20% OFF', code: 'PILOT20', originalPrice: '$49', discountedPrice: '$39', features: ['End of Day Drawdown', 'Fast Funding'] },
  { id: 3, firm: 'Funding Pips', logo: 'FP', discount: '5% OFF', code: 'PIPS5', originalPrice: '$39', discountedPrice: '$37', features: ['1 Step Eval', 'No Daily Drawdown'] },
  { id: 4, firm: 'Alpha Capital', logo: 'A', discount: '15% OFF', code: 'ALPHA15', originalPrice: '$200', discountedPrice: '$170', features: ['No Minimum Days', 'Scaling Plan'] },
]

export function SavingsCards() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Verified <span className="gradient-text-teal">Savings</span>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Claim exclusive discounts on top proprietary trading firms. Verified daily by the PropPilot community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockDeals.map((deal, idx) => (
            <m.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="glass-card h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 overflow-hidden group">
                <div className="h-1 bg-gradient-to-r from-[#00D4AA] to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xl border border-white/10">
                      {deal.logo}
                    </div>
                    <span className="bg-[#00D4AA]/10 text-[#00D4AA] border border-[#00D4AA]/20 text-xs font-semibold px-2 py-1 rounded">
                      {deal.discount}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{deal.firm}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-slate-500 line-through text-sm">{deal.originalPrice}</span>
                    <span className="text-white font-semibold">{deal.discountedPrice}</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-1">
                    {deal.features.map(feat => (
                      <li key={feat} className="text-sm text-slate-400 flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#00D4AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 mt-auto">
                    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded px-3 py-2">
                      <span className="font-mono text-sm text-slate-300 tracking-wider">{deal.code}</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs text-[#00D4AA] hover:text-[#00D4AA] hover:bg-[#00D4AA]/10 px-2">
                        Copy
                      </Button>
                    </div>
                    <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  )
}
