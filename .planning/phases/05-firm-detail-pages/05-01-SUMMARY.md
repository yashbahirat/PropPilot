---
plan: 05-01
status: complete
key-files:
  created:
    - src/components/firm/RuleDifficultyScore.tsx
    - src/components/firm/FirmHero.tsx
    - src/app/firms/[slug]/page.tsx
  shadcn-added:
    - src/components/ui/hover-card.tsx
    - src/components/ui/dialog.tsx
    - src/components/ui/select.tsx
    - src/components/ui/progress.tsx
---

# Plan 05-01: Hero and Score — SUMMARY

## What was built

- **RuleDifficultyScore** (`src/components/firm/RuleDifficultyScore.tsx`): Client component rendering a teal `#00D4AA` progress bar with a `shadcn/ui` HoverCard that shows a 4-factor breakdown: Drawdown Type, Consistency Rule, Profit Target, Restrictions.
- **FirmHero** (`src/components/firm/FirmHero.tsx`): Server component with a Netflix-style immersive dark gradient hero (`from-[#0E0E1A] to-[#08080F]`). Includes firm logo, name (h1, 36px), offer badges, discount code chip, Visit Site / Copy Code CTAs, and inline affiliate disclosure.
- **Firm Detail Page** (`src/app/firms/[slug]/page.tsx`): Async Server Component using Next.js 15 `await params` pattern. Queries Prisma with `findUnique` including `offers`, `reviews`, and `faqs` relations. Returns 404 via `notFound()` when firm is not found.

## Deviations

- Added `computeBreakdown()` utility directly in `FirmHero.tsx` to derive the 4-axis breakdown from existing Firm model fields (drawdownType, consistencyRule, profitTarget, newsTrading/weekendHolding/eaAllowed). The plan left this as agent discretion.
- Installed 4 additional `shadcn/ui` components (hover-card, dialog, select, progress) that will be required by later plans.

## Self-Check: PASSED

- [x] RuleDifficultyScore renders a `#00D4AA` progress bar with HoverCard tooltip breakdown
- [x] FirmHero has dark gradient background and Netflix-style layout
- [x] Firm detail page queries Prisma with correct model relations
- [x] Next.js 15 `await params` pattern used correctly
- [x] `export const runtime = 'nodejs'` set to prevent Prisma/Edge runtime conflicts
- [x] TypeScript compiles clean (`npx tsc --noEmit` exits 0)
- [x] All tasks committed atomically
