import Link from 'next/link'

const footerLinks = {
  platform: [
    { href: '/compare', label: 'Compare Firms' },
    { href: '/guides', label: 'Guides' },
    { href: '/rewards', label: 'Rewards' },
    { href: '/dashboard', label: 'Dashboard' },
  ],
  legal: [
    { href: '/legal', label: 'Legal' },
    { href: '/legal/affiliate-disclosure', label: 'Affiliate Disclosure' },
    { href: '/legal/privacy', label: 'Privacy Policy' },
    { href: '/legal/terms', label: 'Terms of Use' },
  ],
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A16', borderTop: '1px solid rgba(255,255,255,0.05)' }} className="mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand column */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-xl font-bold tracking-tight mb-2"
            >
              <span className="text-white">Prop</span>
              <span style={{ color: '#00D4AA' }}>Pilot</span>
            </Link>
            <p className="text-slate-500 text-sm">Compare. Save. Trade.</p>
            <p className="text-slate-600 text-xs mt-4 leading-relaxed max-w-xs">
              The trusted comparison platform for proprietary trading firms.
              Verified data. Independent opinions.
            </p>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PropPilot. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 max-w-md">
            PropPilot earns commissions from affiliate links. All opinions are independent and based on verified data.{' '}
            <Link
              href="/legal/affiliate-disclosure"
              className="text-slate-500 hover:text-slate-400 underline"
            >
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
