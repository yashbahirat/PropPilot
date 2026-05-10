import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'PropPilot — Compare Prop Firms & Earn Rewards',
    template: '%s — PropPilot',
  },
  description:
    'Compare proprietary trading firms, discover verified discount codes, and earn rewards for verified purchases. The trusted prop firm comparison platform.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://proppilot.com'),
  openGraph: {
    type: 'website',
    siteName: 'PropPilot',
    title: 'PropPilot — Compare Prop Firms & Earn Rewards',
    description:
      'Compare proprietary trading firms, discover verified discount codes, and earn rewards.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PropPilot — Compare Prop Firms',
    description: 'The trusted prop firm comparison platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
        <body className="font-sans antialiased min-h-screen" style={{ backgroundColor: '#08080F', color: 'hsl(210 40% 95%)' }} suppressHydrationWarning>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
            style={{ backgroundColor: '#00D4AA', color: '#08080F' }}
          >
            Skip to main content
          </a>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
          <Toaster
            theme="dark"
            position="top-right"
            toastOptions={{
              style: {
                background: '#0E0E1A',
                border: '1px solid #1E1E30',
                color: '#F1F5F9',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
