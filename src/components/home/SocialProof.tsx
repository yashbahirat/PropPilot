"use client"

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function SocialProof() {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden glass-card border border-[#00D4AA]/20 p-8 md:p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/10 via-transparent to-purple-500/10" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get Rewarded for Trading
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Join the <span className="text-[#00D4AA] font-semibold">PropPilot Points</span> program. 
              Submit your verified purchase receipts through our affiliate links and earn points towards 
              free challenges, cash back, and exclusive trader resources.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#08080F] font-bold w-full sm:w-auto">
                Join Now for Free
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 w-full sm:w-auto">
                Learn How It Works
              </Button>
            </div>
          </div>
        </m.div>
      </section>
    </LazyMotion>
  )
}
