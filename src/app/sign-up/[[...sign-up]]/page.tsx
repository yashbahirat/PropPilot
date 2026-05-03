import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join PropPilot — Compare Prop Firms & Earn Rewards',
  description:
    'Compare prop firms, copy verified discount codes, and earn rewards for verified purchases.',
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#08080F]">
      {/* Subtle teal radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md px-4">
        <Link href="/" className="flex flex-col items-center mb-8">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-white">Prop</span>
            <span style={{ color: '#00D4AA' }}>Pilot</span>
          </span>
          <span className="text-slate-500 text-sm mt-1">Compare. Save. Trade.</span>
        </Link>

        <SignUp
          appearance={{
            variables: {
              colorBackground: '#0E0E1A',
              colorInputBackground: '#131320',
              colorInputText: '#F1F5F9',
              colorText: '#F1F5F9',
              colorTextSecondary: '#94A3B8',
              colorPrimary: '#00D4AA',
              colorDanger: '#F87171',
              borderRadius: '0.625rem',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            elements: {
              card: 'shadow-card border border-[#1E1E30]',
              headerTitle: 'text-white font-semibold',
              headerSubtitle: 'text-slate-400',
              formButtonPrimary:
                'bg-[#00D4AA] hover:bg-[#00A882] text-[#08080F] font-medium transition-all duration-200',
              formFieldInput:
                'bg-[#131320] border-[#1E1E30] text-white focus:border-[#00D4AA] focus:ring-1 focus:ring-[#00D4AA]',
              footerActionLink: 'text-[#00D4AA] hover:text-[#00A882]',
              dividerLine: 'bg-[#1E1E30]',
              dividerText: 'text-slate-500',
              socialButtonsBlockButton:
                'border-[#1E1E30] bg-[#131320] text-white hover:bg-[#1A1A2E] transition-colors',
            },
          }}
        />
      </div>
    </main>
  )
}
