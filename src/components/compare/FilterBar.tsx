'use client';

import { useCompareParams } from '@/hooks/use-compare-params';
import { X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// ─── Label maps ────────────────────────────────────────────────────────────

const DRAWDOWN_LABELS: Record<string, string> = {
  BALANCE: 'Balance',
  EQUITY: 'Equity',
  TRAILING_BALANCE: 'Trailing Balance',
  TRAILING_EQUITY: 'Trailing Equity',
};

const EVAL_LABELS: Record<string, string> = {
  ONE_STEP: '1-Step',
  TWO_STEP: '2-Step',
  THREE_STEP: '3-Step',
  INSTANT_FUNDING: 'Instant Funding',
  FUNDED_DIRECT: 'Funded Direct',
};

const FUNDING_LABELS: Record<string, string> = {
  CHALLENGE: 'Challenge',
  INSTANT: 'Instant',
  FUNDED: 'Pre-Funded',
};

// ─── FilterChip with popover ───────────────────────────────────────────────

interface FilterChipProps {
  label: string;
  activeValue?: string;
  onClear: () => void;
  children: (close: () => void) => React.ReactNode;
}

function FilterChip({ label, activeValue, onClear, children }: FilterChipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const isActive = Boolean(activeValue);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 whitespace-nowrap ${
          isActive
            ? 'bg-[#00D4AA] border-[#00D4AA] text-[#08080F]'
            : 'bg-transparent border-white/20 text-white/70 hover:border-white/40 hover:text-white'
        }`}
      >
        {isActive ? activeValue : label}
        {isActive ? (
          <span
            role="button"
            aria-label={`Clear ${label} filter`}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
              setOpen(false);
            }}
            className="ml-0.5 rounded-full hover:bg-black/10 p-0.5"
          >
            <X className="h-3 w-3" />
          </span>
        ) : (
          <ChevronDown className="h-3 w-3 opacity-60" />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 min-w-[190px] rounded-xl border border-white/10 bg-[#0E0E1A] shadow-2xl shadow-black/50 p-2">
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
        selected
          ? 'bg-[#00D4AA]/10 text-[#00D4AA]'
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

// ─── Toggle chip (no popover) ──────────────────────────────────────────────

interface ToggleChipProps {
  label: string;
  active: boolean;
  onToggle: () => void;
  onClear: () => void;
}

function ToggleChip({ label, active, onToggle, onClear }: ToggleChipProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 whitespace-nowrap ${
        active
          ? 'bg-[#00D4AA] border-[#00D4AA] text-[#08080F]'
          : 'bg-transparent border-white/20 text-white/70 hover:border-white/40 hover:text-white'
      }`}
    >
      {label}
      {active && (
        <span
          role="button"
          aria-label={`Clear ${label} filter`}
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          className="ml-0.5 rounded-full hover:bg-black/10 p-0.5"
        >
          <X className="h-3 w-3" />
        </span>
      )}
    </button>
  );
}

// ─── FilterBar ────────────────────────────────────────────────────────────

/**
 * Sticky horizontal filter chip bar for desktop.
 * Each chip shows the active value and a ✕ to clear when active.
 * Inactive chips open a popover with filter options.
 */
export function FilterBar() {
  const { params, setParams, clearFilter, clearAllFilters, hasActiveFilters } = useCompareParams();

  return (
    <div className="sticky top-16 z-40 bg-[#08080F]/95 backdrop-blur border-b border-white/5 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
        {/* Drawdown Type */}
        <FilterChip
          label="Drawdown"
          activeValue={
            params.drawdownType ? DRAWDOWN_LABELS[params.drawdownType] : undefined
          }
          onClear={() => clearFilter('drawdownType')}
        >
          {(close) => (
            <>
              {Object.entries(DRAWDOWN_LABELS).map(([value, label]) => (
                <OptionButton
                  key={value}
                  label={label}
                  selected={params.drawdownType === value}
                  onClick={() => {
                    setParams({ drawdownType: value as typeof params.drawdownType });
                    close();
                  }}
                />
              ))}
            </>
          )}
        </FilterChip>

        {/* Evaluation Type */}
        <FilterChip
          label="Evaluation"
          activeValue={
            params.evaluationType ? EVAL_LABELS[params.evaluationType] : undefined
          }
          onClear={() => clearFilter('evaluationType')}
        >
          {(close) => (
            <>
              {Object.entries(EVAL_LABELS).map(([value, label]) => (
                <OptionButton
                  key={value}
                  label={label}
                  selected={params.evaluationType === value}
                  onClick={() => {
                    setParams({ evaluationType: value as typeof params.evaluationType });
                    close();
                  }}
                />
              ))}
            </>
          )}
        </FilterChip>

        {/* Funding Style */}
        <FilterChip
          label="Funding"
          activeValue={
            params.fundingStyle ? FUNDING_LABELS[params.fundingStyle] : undefined
          }
          onClear={() => clearFilter('fundingStyle')}
        >
          {(close) => (
            <>
              {Object.entries(FUNDING_LABELS).map(([value, label]) => (
                <OptionButton
                  key={value}
                  label={label}
                  selected={params.fundingStyle === value}
                  onClick={() => {
                    setParams({ fundingStyle: value as typeof params.fundingStyle });
                    close();
                  }}
                />
              ))}
            </>
          )}
        </FilterChip>

        {/* Toggle chips */}
        <ToggleChip
          label="Has Discount"
          active={params.hasDiscount}
          onToggle={() => setParams({ hasDiscount: params.hasDiscount ? null : true })}
          onClear={() => clearFilter('hasDiscount')}
        />
        <ToggleChip
          label="News Trading"
          active={params.newsTrading}
          onToggle={() => setParams({ newsTrading: params.newsTrading ? null : true })}
          onClear={() => clearFilter('newsTrading')}
        />
        <ToggleChip
          label="EA Allowed"
          active={params.eaAllowed}
          onToggle={() => setParams({ eaAllowed: params.eaAllowed ? null : true })}
          onClear={() => clearFilter('eaAllowed')}
        />
        <ToggleChip
          label="Weekend Holding"
          active={params.weekendHolding}
          onToggle={() => setParams({ weekendHolding: params.weekendHolding ? null : true })}
          onClear={() => clearFilter('weekendHolding')}
        />

        {/* Clear all */}
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-colors whitespace-nowrap"
          >
            <X className="h-3 w-3" /> Clear all
          </button>
        )}
      </div>
    </div>
  );
}
