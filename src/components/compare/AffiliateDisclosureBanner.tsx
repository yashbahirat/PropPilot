import { Info } from 'lucide-react';
import Link from 'next/link';

/**
 * Affiliate disclosure banner shown at the top of the compare page.
 * Required for FTC compliance and user trust transparency.
 */
export function AffiliateDisclosureBanner() {
  return (
    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-4 py-3 flex items-start gap-3 text-xs text-amber-200/70">
      <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-400/60" aria-hidden="true" />
      <p>
        <strong className="font-semibold text-amber-200/90">Affiliate Disclosure:</strong>{' '}
        PropPilot may earn a commission when you purchase through our affiliate links at no extra
        cost to you. Discount codes are verified regularly. All firm data is independently
        researched.{' '}
        <Link
          href="/legal/affiliate-disclosure"
          className="underline underline-offset-2 hover:text-amber-200 transition-colors"
        >
          Learn more
        </Link>
      </p>
    </div>
  );
}
