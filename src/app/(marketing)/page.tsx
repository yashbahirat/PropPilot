import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PropPilot — Compare Prop Firms & Earn Rewards',
  description:
    'Compare proprietary trading firms, discover verified discount codes, and earn rewards for verified purchases.',
}

export default function HomePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="gradient-text-teal text-5xl md:text-7xl font-bold mb-4 tracking-tight">
          PropPilot
        </h1>
        <p className="text-slate-400 text-xl mb-2">Compare. Save. Trade.</p>
        <p className="text-slate-600 text-sm">
          Full home page coming in Phase 3 — foundation is live ✓
        </p>
      </div>
    </div>
  )
}
