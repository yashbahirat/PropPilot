'use client';

import { useCompareParams } from '@/hooks/use-compare-params';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useRef } from 'react';

/**
 * Search bar for filtering firms by name.
 * Syncs to the `q` URL param via nuqs (shareable links).
 * Shows a clear button when the search term is non-empty.
 */
export function SearchBar() {
  const { params, setParams } = useCompareParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ q: e.target.value || null });
  };

  const handleClear = () => {
    setParams({ q: null });
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
      <Input
        ref={inputRef}
        id="firm-search"
        type="search"
        value={params.q}
        onChange={handleChange}
        placeholder="Search firms..."
        className="pl-9 pr-9 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00D4AA]/50 focus-visible:ring-0 h-9 text-sm"
        aria-label="Search prop firms by name"
      />
      {params.q && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
