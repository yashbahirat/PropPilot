'use client';

import { useEffect, useState } from 'react';

/**
 * Returns window.innerWidth, updated on resize.
 * Returns null during SSR / before hydration.
 */
export function useWindowWidth(): number | null {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}
