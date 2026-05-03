'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { useAuth, SignInButton, UserButton } from '@clerk/nextjs'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'

type NavLink = { href: string; label: string }

type MobileDrawerProps = {
  open: boolean
  onClose: () => void
  navLinks: NavLink[]
  rewardPoints: number | null
}

export function MobileDrawer({ open, onClose, navLinks, rewardPoints }: MobileDrawerProps) {
  const pathname = usePathname()
  const { isSignedIn } = useAuth()

  // Close drawer on route change
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer-panel"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-[280px] z-50 lg:hidden flex flex-col glass-modal border-l"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {/* Drawer header */}
            <div
              className="flex items-center justify-between p-5 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">Prop</span>
                <span style={{ color: '#00D4AA' }}>Pilot</span>
              </span>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors rounded-md"
                aria-label="Close navigation menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-6" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href || pathname.startsWith(link.href + '/')
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex items-center py-3 px-3 rounded-md text-base font-medium transition-colors duration-200 border-l-2"
                        style={{
                          color: isActive ? '#00D4AA' : '#CBD5E1',
                          borderColor: isActive ? '#00D4AA' : 'transparent',
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer — auth actions */}
            <div
              className="p-5 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  {rewardPoints !== null && (
                    <Link
                      href="/dashboard/rewards"
                      className="glass-teal px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ color: '#00D4AA' }}
                    >
                      ⟐ {rewardPoints.toLocaleString()} pts
                    </Link>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-slate-400 text-sm">Account</span>
                    <UserButton />
                  </div>
                </div>
              ) : (
                <>
                  <SignInButton mode="redirect">
                    <button
                      className="w-full flex items-center justify-center font-medium py-2.5 px-4 rounded-lg text-sm transition-all duration-200"
                      style={{ backgroundColor: '#00D4AA', color: '#08080F' }}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <Link
                    href="/sign-up"
                    className="mt-2 w-full flex items-center justify-center border font-medium py-2.5 px-4 rounded-lg text-sm transition-all duration-200"
                    style={{ borderColor: 'rgba(0,212,170,0.3)', color: '#00D4AA' }}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
