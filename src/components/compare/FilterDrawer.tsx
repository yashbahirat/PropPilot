'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { useCompareParams } from '@/hooks/use-compare-params';
import { useState } from 'react';

// ─── Option lists ──────────────────────────────────────────────────────────

const DRAWDOWN_OPTIONS = [
  { value: 'BALANCE', label: 'Balance (Most Lenient)' },
  { value: 'EQUITY', label: 'Equity' },
  { value: 'TRAILING_BALANCE', label: 'Trailing Balance' },
  { value: 'TRAILING_EQUITY', label: 'Trailing Equity (Strictest)' },
];

const EVAL_OPTIONS = [
  { value: 'ONE_STEP', label: '1-Step Challenge' },
  { value: 'TWO_STEP', label: '2-Step Challenge' },
  { value: 'THREE_STEP', label: '3-Step Challenge' },
  { value: 'INSTANT_FUNDING', label: 'Instant Funding' },
  { value: 'FUNDED_DIRECT', label: 'Funded Direct' },
];

const FUNDING_OPTIONS = [
  { value: 'CHALLENGE', label: 'Challenge-Based' },
  { value: 'INSTANT', label: 'Instant' },
  { value: 'FUNDED', label: 'Pre-Funded' },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
      {children}
    </p>
  );
}

function OptionButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30'
          : 'text-white/60 border border-white/5 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function ToggleButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30'
          : 'text-white/60 border border-white/5 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

// ─── FilterDrawer ─────────────────────────────────────────────────────────

/**
 * Mobile filter drawer using shadcn Sheet (slides from bottom).
 * Contains all filter options in a scrollable panel.
 * Shows a teal dot indicator on the trigger button when filters are active.
 */
export function FilterDrawer() {
  const { params, setParams, clearAllFilters, hasActiveFilters } = useCompareParams();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative border-white/20 text-white/70 hover:text-white hover:border-white/40 bg-transparent"
          aria-label="Open filters"
        >
          <SlidersHorizontal className="h-4 w-4 mr-1.5" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#00D4AA]" />
          )}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="bg-[#0E0E1A] border-t border-white/10 rounded-t-2xl max-h-[85vh] overflow-y-auto"
      >
        <SheetHeader className="flex flex-row items-center justify-between mb-6">
          <SheetTitle className="text-white text-lg font-semibold">Filters</SheetTitle>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-[#00D4AA] hover:text-[#00D4AA]/80 flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </SheetHeader>

        <div className="space-y-6 pb-8">
          {/* Drawdown Type */}
          <div>
            <SectionTitle>Drawdown Type</SectionTitle>
            <div className="space-y-2">
              {DRAWDOWN_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  active={params.drawdownType === opt.value}
                  onClick={() =>
                    setParams({
                      drawdownType:
                        params.drawdownType === opt.value
                          ? null
                          : (opt.value as typeof params.drawdownType),
                    })
                  }
                />
              ))}
            </div>
          </div>

          {/* Evaluation Type */}
          <div>
            <SectionTitle>Evaluation Type</SectionTitle>
            <div className="space-y-2">
              {EVAL_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  active={params.evaluationType === opt.value}
                  onClick={() =>
                    setParams({
                      evaluationType:
                        params.evaluationType === opt.value
                          ? null
                          : (opt.value as typeof params.evaluationType),
                    })
                  }
                />
              ))}
            </div>
          </div>

          {/* Funding Style */}
          <div>
            <SectionTitle>Funding Style</SectionTitle>
            <div className="space-y-2">
              {FUNDING_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  active={params.fundingStyle === opt.value}
                  onClick={() =>
                    setParams({
                      fundingStyle:
                        params.fundingStyle === opt.value
                          ? null
                          : (opt.value as typeof params.fundingStyle),
                    })
                  }
                />
              ))}
            </div>
          </div>

          {/* Feature toggles */}
          <div>
            <SectionTitle>Features</SectionTitle>
            <div className="flex flex-wrap gap-2">
              <ToggleButton
                label="Has Discount"
                active={params.hasDiscount}
                onClick={() => setParams({ hasDiscount: params.hasDiscount ? null : true })}
              />
              <ToggleButton
                label="News Trading"
                active={params.newsTrading}
                onClick={() => setParams({ newsTrading: params.newsTrading ? null : true })}
              />
              <ToggleButton
                label="EA Allowed"
                active={params.eaAllowed}
                onClick={() => setParams({ eaAllowed: params.eaAllowed ? null : true })}
              />
              <ToggleButton
                label="Weekend Holding"
                active={params.weekendHolding}
                onClick={() =>
                  setParams({ weekendHolding: params.weekendHolding ? null : true })
                }
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
