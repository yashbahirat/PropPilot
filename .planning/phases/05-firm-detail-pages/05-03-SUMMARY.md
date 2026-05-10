---
plan: 05-03
status: complete
key-files:
  created:
    - src/components/firm/CopyCodeButton.tsx
    - src/components/firm/tabs/RulesTab.tsx
    - src/components/firm/tabs/PayoutsTab.tsx
    - src/components/firm/tabs/PricingTab.tsx
  modified:
    - src/components/firm/FirmHero.tsx
    - src/components/firm/FirmDetailNav.tsx
---

# Plan 05-03: Rules, Pricing, Payouts + Copy Code — SUMMARY

## What was built

- **CopyCodeButton** (`src/components/firm/CopyCodeButton.tsx`): Client component using `navigator.clipboard.writeText`. Framer Motion `AnimatePresence` animates between Copy/Copied states. `sonner` toast confirms success. Shows for 2 seconds then reverts.
- **RulesTab** (`src/components/firm/tabs/RulesTab.tsx`): Displays drawdown type with severity badge (easy/moderate/hard/very-hard color coded), trading rules matrix (news/weekend/EA/consistency with ✓/✗ indicators), and challenge parameters grid.
- **PayoutsTab** (`src/components/firm/tabs/PayoutsTab.tsx`): Highlighted profit split % in large accent text, payout speed, and account size breakdown. Empty state when no payout data.
- **PricingTab** (`src/components/firm/tabs/PricingTab.tsx`): Challenge fee with strikethrough and "true cost" after best discount. Lists all active discount codes with `CopyCodeButton` for each.
- **FirmHero updated**: Placeholder button replaced with real `CopyCodeButton` (only shown when offer.code exists).
- **FirmDetailNav updated**: Rules, Pricing, and Payouts cases wired into `TabContent` switch.

## Deviations

- None — all tasks completed as specified.

## Self-Check: PASSED

- [x] CopyCodeButton copies to clipboard and animates state with Framer Motion
- [x] RulesTab shows all trading rules with visual severity indicators
- [x] PricingTab shows true cost after discount with CopyCodeButton for each offer
- [x] PayoutsTab shows profit split as a headline metric
- [x] FirmHero uses real CopyCodeButton (not placeholder)
- [x] TypeScript compiles clean
- [x] All tasks committed atomically
