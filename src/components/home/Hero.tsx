"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/compare?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/compare')
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full overflow-hidden flex flex-col items-center justify-center min-h-[85vh] px-4 md:px-6">
        {/* Glow Gradient Mesh Background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00D4AA] opacity-[0.07] blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#6B21A8] opacity-[0.05] blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto z-10"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Compare Prop Firms.{' '}
            <span className="gradient-text-teal">Trade Smarter.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            The trusted discovery platform for proprietary trading. Find the perfect firm for your strategy, claim verified discounts, and earn rewards.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-10 group">
            <div className="absolute inset-0 -m-[1px] bg-gradient-to-r from-[#00D4AA]/30 to-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center glass-card rounded-lg p-2 border border-white/5">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <Input
                type="text"
                placeholder="Search by firm name (e.g., FTMO, Topstep)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 bg-transparent text-white placeholder:text-slate-500 text-base h-12 w-full mx-2"
              />
              <Button type="submit" size="lg" className="bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#08080F] font-semibold shrink-0">
                Compare Firms
              </Button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" size="lg" onClick={() => router.push('/compare')} className="w-full sm:w-auto border-white/10 hover:bg-white/5">
              Browse Discounts
            </Button>
            <Button variant="ghost" size="lg" onClick={() => router.push('/sign-in')} className="w-full sm:w-auto text-slate-300 hover:text-white">
              Join/Login
            </Button>
          </div>
        </m.div>

      </section>
    </LazyMotion>
  )
}
