'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileDrawer } from './MobileDrawer'

const navLinks = [
  { href: '/compare', label: 'Compare' },
  { href: '/guides', label: 'Guides' },
  { href: '/rewards', label: 'Rewards' },
]

export function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useUser()

  // Reward points from Clerk publicMetadata — populated by webhook/dashboard in later phases
  const rewardPoints = (user?.publicMetadata?.rewardPoints as number | undefined) ?? null

  return (
    <>
      <header className="glass-nav sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center text-xl font-bold tracking-tight flex-shrink-0"
            >
              <span className="text-white">Prop</span>
              <span style={{ color: '#00D4AA' }}>Pilot</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Reward points pill — signed in only, desktop only */}
              <SignedIn>
                {rewardPoints !== null && (
                  <Link
                    href="/dashboard/rewards"
                    className="hidden lg:flex items-center gap-1.5 glass-teal px-3 py-1.5 rounded-full text-xs font-semibold hover:brightness-110 transition-all duration-200"
                    style={{ color: '#00D4AA' }}
                    title={`${rewardPoints.toLocaleString()} PropPilot Points — View rewards`}
                  >
                    <span aria-hidden="true">⟐</span>
                    <span>{rewardPoints.toLocaleString()} pts</span>
                  </Link>
                )}
                <UserButton
                  appearance={{
                    elements: { avatarBox: 'w-8 h-8' },
                  }}
                />
              </SignedIn>

              {/* Sign in — signed out, desktop only */}
              <SignedOut>
                <SignInButton mode="redirect">
                  <button
                    className="hidden lg:flex items-center border px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      borderColor: 'rgba(0,212,170,0.35)',
                      color: '#00D4AA',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#00D4AA'
                      e.currentTarget.style.color = '#08080F'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#00D4AA'
                    }}
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              {/* Hamburger — mobile only */}
              <button
                className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-navigation"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile slide-out drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        navLinks={navLinks}
        rewardPoints={rewardPoints}
      />
    </>
  )
}
