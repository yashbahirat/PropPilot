---
plan: 06-03
status: complete
completed_at: 2026-05-20
---

# Summary: CopyCodeButton Wiring

## What Was Built

Added `firmId: string` and `offerId: string` as required props to both `CopyCodeButton` components, and wired `logCopyEvent` as a fire-and-forget call inside `handleCopy()` — after the clipboard write succeeds.

## Files Modified

### CopyCodeButton components (prop interface + logCopyEvent call)
- `src/components/firm/CopyCodeButton.tsx` — added `firmId`, `offerId` props + `logCopyEvent(firmId, offerId).catch(() => {})`
- `src/components/compare/CopyCodeButton.tsx` — same changes, same pattern

### Parent components (prop threading)
- `src/components/firm/FirmHero.tsx` — passes `firmId={firm.id}` and `offerId={featuredOffer.id}`
- `src/components/compare/FirmRow.tsx` — passes `firmId={firm.id}` and `offerId={firm.bestOffer.id}`
- `src/components/compare/FirmCard.tsx` — passes `firmId={firm.id}` and `offerId={firm.bestOffer.id}`
- `src/components/compare/ComparisonView.tsx` — passes `firmId={firm.id}` and `offerId={firm.bestOffer.id}`
- `src/components/firm/tabs/PricingTab.tsx` — passes `firmId={firm.id}` and `offerId={offer.id}`

## Key Decisions Applied

- D-08: `logCopyEvent` called fire-and-forget (`.catch(() => {})`) — never awaited
- D-09: `firmId` and `offerId` added as new required props; `code` prop unchanged
- All 5 parent components (FirmHero, FirmRow, FirmCard, ComparisonView, PricingTab) updated

## Verification

- TypeScript: `npx tsc --noEmit` — ✅ 0 errors (all 7 files)
- All CopyCodeButton usages in the codebase now pass firmId + offerId
