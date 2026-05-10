'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X, GitCompare } from 'lucide-react';
import { ScoredFirm } from '@/lib/scoring';
import { useCompareParams } from '@/hooks/use-compare-params';
import { createSerializer } from 'nuqs/server';
import { compareParamsParsers } from '@/lib/compare-params';

interface ComparisonDockProps {
  firms: ScoredFirm[];
}

const serializeParams = createSerializer(compareParamsParsers);

/**
 * Sticky bottom dock that shows firms selected for comparison.
 * Appears when 1+ firms are in the compare list.
 * "Compare Now" navigates to /compare with the compare param set.
 */
export function ComparisonDock({ firms }: ComparisonDockProps) {
  const router = useRouter();
  const { params, removeFromCompare, setParams } = useCompareParams();

  const selectedFirms = params.compare
    .map((slug) => firms.find((f) => f.slug === slug))
    .filter((f): f is ScoredFirm => Boolean(f));

  if (selectedFirms.length === 0) return null;

  const handleCompareNow = () => {
    if (selectedFirms.length < 2) return;
    setParams({ showCompare: true });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Backdrop blur bar */}
      <div className="bg-[#0A0A15]/90 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Selected firms */}
          <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-hide">
            {selectedFirms.map((firm) => (
              <div
                key={firm.id}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 shrink-0"
              >
                {/* Firm logo / initial */}
                <div className="h-5 w-5 rounded bg-white/10 flex items-center justify-center overflow-hidden">
                  {firm.logoUrl ? (
                    <Image
                      src={firm.logoUrl}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-white/50">
                      {firm.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-white/80 max-w-[100px] truncate">
                  {firm.name}
                </span>
                <button
                  onClick={() => removeFromCompare(firm.slug)}
                  className="text-white/30 hover:text-white/70 transition-colors ml-0.5"
                  aria-label={`Remove ${firm.name} from comparison`}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: Math.max(0, 2 - selectedFirms.length) }).map((_, i) => (
              <div
                key={`slot-${i}`}
                className="h-8 w-20 rounded-lg border border-dashed border-white/15 flex items-center justify-center shrink-0"
              >
                <span className="text-[10px] text-white/20">Select firm</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <p className="text-xs text-white/40 hidden sm:block">
              {selectedFirms.length}/3 selected
            </p>

            <Button
              onClick={handleCompareNow}
              disabled={selectedFirms.length < 2}
              className="bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-[#08080F] font-semibold text-sm h-9 px-4 disabled:opacity-40"
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Compare {selectedFirms.length > 0 ? `(${selectedFirms.length})` : ''}
            </Button>

            <button
              onClick={() => setParams({ compare: null })}
              className="text-white/30 hover:text-white/60 transition-colors"
              aria-label="Clear all firms from comparison"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
