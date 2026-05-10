'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when the viewport is narrower than the md breakpoint (768px).
 * Uses matchMedia so it only fires on breakpoint crosses, not every resize pixel.
 * Returns null during SSR / before hydration to avoid layout flash.
 */
export function useIsMobile(): boolean | null {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
