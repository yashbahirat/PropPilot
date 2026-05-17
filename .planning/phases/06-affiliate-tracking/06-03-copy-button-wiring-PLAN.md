---
plan: 06-03
phase: 6
title: "Wire CopyCodeButton Tracking"
wave: 2
depends_on:
  - "06-02"
files_modified:
  - src/components/firm/CopyCodeButton.tsx
  - src/components/compare/CopyCodeButton.tsx
  - src/components/firm/FirmHero.tsx
  - src/components/firm/tabs/PricingTab.tsx
  - src/components/compare/FirmRow.tsx
  - src/components/compare/FirmCard.tsx
autonomous: true
requirements_addressed:
  - TRACK-02
---

## Objective

Wire the `logCopyEvent` Server Action into both `CopyCodeButton` components (firm detail and compare page). Add `firmId` and `offerId` props to each button and thread them through all parent components that render a `CopyCodeButton`. The tracking call must be fire-and-forget — never awaited, errors swallowed — so copying never blocks or fails due to tracking.

## Tasks

### Task 1: Update `src/components/firm/CopyCodeButton.tsx`

<read_first>
- `src/components/firm/CopyCodeButton.tsx` — Current implementation: accepts `code`, `className`, `variant` props; `handleCopy` does clipboard write + sonner toast
- `src/app/actions/tracking.ts` — The `logCopyEvent(firmId, offerId)` Server Action created in Plan 06-02
</read_first>

<action>
Modify `src/components/firm/CopyCodeButton.tsx` to:

1. Add two new props to the `CopyCodeButtonProps` interface:
   ```typescript
   firmId: string
   offerId: string | null
   ```

2. Add the import at the top of the file (after existing imports):
   ```typescript
   import { logCopyEvent } from "@/app/actions/tracking"
   ```

3. Destructure the new props in the component signature:
   ```typescript
   export function CopyCodeButton({ code, className, variant = "outline", firmId, offerId }: CopyCodeButtonProps)
   ```

4. Inside `handleCopy`, after the `toast.success(...)` call and BEFORE the `setTimeout`, add the fire-and-forget tracking call:
   ```typescript
   // Fire-and-forget tracking — do NOT await (must never block UX)
   logCopyEvent(firmId, offerId).catch(() => {})
   ```

The final `handleCopy` function should look like:
```typescript
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    toast.success("Discount code copied to clipboard!")
    // Fire-and-forget tracking — do NOT await
    logCopyEvent(firmId, offerId).catch(() => {})
    setTimeout(() => setIsCopied(false), 2000)
  } catch (err) {
    toast.error("Failed to copy code.")
  }
}
```
</action>

<acceptance_criteria>
- `src/components/firm/CopyCodeButton.tsx` contains `firmId: string`
- `src/components/firm/CopyCodeButton.tsx` contains `offerId: string | null`
- `src/components/firm/CopyCodeButton.tsx` contains `import { logCopyEvent } from "@/app/actions/tracking"`
- `src/components/firm/CopyCodeButton.tsx` contains `logCopyEvent(firmId, offerId).catch(() => {})`
- `src/components/firm/CopyCodeButton.tsx` does NOT contain `await logCopyEvent` (must be fire-and-forget)
</acceptance_criteria>

---

### Task 2: Update `src/components/compare/CopyCodeButton.tsx`

<read_first>
- `src/components/compare/CopyCodeButton.tsx` — Current implementation: accepts `code`, `discountPercent`, `compact` props; two render modes (compact inline badge, full Button); `handleCopy` does clipboard write + sonner toast
- `src/app/actions/tracking.ts` — The `logCopyEvent(firmId, offerId)` Server Action
</read_first>

<action>
Modify `src/components/compare/CopyCodeButton.tsx` to:

1. Add two new props to the `CopyCodeButtonProps` interface:
   ```typescript
   firmId: string
   offerId: string | null
   ```

2. Add the import (after existing imports):
   ```typescript
   import { logCopyEvent } from "@/app/actions/tracking"
   ```

3. Destructure the new props in the component signature:
   ```typescript
   export function CopyCodeButton({ code, discountPercent, compact = false, firmId, offerId }: CopyCodeButtonProps)
   ```

4. Inside `handleCopy`, after the `toast.success(...)` call and BEFORE the `setTimeout(() => setCopied(false), 2000)`, add:
   ```typescript
   // Fire-and-forget tracking — do NOT await
   logCopyEvent(firmId, offerId).catch(() => {})
   ```

The final `handleCopy` function should look like:
```typescript
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success(`Code "${code}" copied!`, {
      description: discountPercent ? `${discountPercent}% discount applied` : undefined,
      duration: 3000,
    })
    // Fire-and-forget tracking — do NOT await
    logCopyEvent(firmId, offerId).catch(() => {})
    setTimeout(() => setCopied(false), 2000)
  } catch {
    toast.error('Failed to copy code')
  }
}
```
</action>

<acceptance_criteria>
- `src/components/compare/CopyCodeButton.tsx` contains `firmId: string`
- `src/components/compare/CopyCodeButton.tsx` contains `offerId: string | null`
- `src/components/compare/CopyCodeButton.tsx` contains `import { logCopyEvent } from "@/app/actions/tracking"`
- `src/components/compare/CopyCodeButton.tsx` contains `logCopyEvent(firmId, offerId).catch(() => {})`
- `src/components/compare/CopyCodeButton.tsx` does NOT contain `await logCopyEvent`
</acceptance_criteria>

---

### Task 3: Thread `firmId` and `offerId` through firm detail components

<read_first>
- `src/components/firm/FirmHero.tsx` — Renders `<CopyCodeButton code={featuredOffer.code} .../>` — needs `firmId` and `offerId` added
- `src/components/firm/tabs/PricingTab.tsx` — Renders `<CopyCodeButton code={offer.code} .../>` in a loop — needs `firmId` and `offerId` added (offerId = offer.id)
</read_first>

<action>
**In `src/components/firm/FirmHero.tsx`:**

Find the `<CopyCodeButton` JSX element (currently only has `code={featuredOffer.code}`).

Add `firmId` and `offerId` props:
```tsx
<CopyCodeButton
  code={featuredOffer.code}
  firmId={firm.id}
  offerId={featuredOffer.id}
  className="w-full h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium backdrop-blur-md"
/>
```

Note: `firm.id` is already on the `firm` prop; `featuredOffer` is the selected offer from `firm.offers`.

**In `src/components/firm/tabs/PricingTab.tsx`:**

Find the `<CopyCodeButton` JSX element inside the offers loop (currently only has `code={offer.code}`).

Add `firmId` and `offerId` props:
```tsx
<CopyCodeButton
  code={offer.code}
  firmId={firm.id}
  offerId={offer.id}
  className="w-full"
/>
```

Note: `firm.id` must be available — check if `PricingTab` receives the full `firm` object or just `offers`. If it only receives `offers`, also pass `firmId: string` as a prop to `PricingTab` and thread it from the parent `FirmDetailNav`.
</action>

<acceptance_criteria>
- `src/components/firm/FirmHero.tsx` CopyCodeButton JSX contains `firmId={firm.id}`
- `src/components/firm/FirmHero.tsx` CopyCodeButton JSX contains `offerId={featuredOffer.id}`
- `src/components/firm/tabs/PricingTab.tsx` CopyCodeButton JSX contains `firmId=` and `offerId=`
- TypeScript compilation: `npx tsc --noEmit` exits 0 (no prop type mismatches)
</acceptance_criteria>

---

### Task 4: Thread `firmId` and `offerId` through compare page components

<read_first>
- `src/components/compare/FirmRow.tsx` — Renders `<CopyCodeButton code={firm.bestOffer.code} discountPercent={...}/>` — needs firmId and offerId
- `src/components/compare/FirmCard.tsx` — Renders `<CopyCodeButton code={firm.bestOffer.code} discountPercent={...}/>` — needs firmId and offerId
</read_first>

<action>
**In `src/components/compare/FirmRow.tsx`:**

Find the `<CopyCodeButton` JSX element. Add `firmId` and `offerId` props:
```tsx
<CopyCodeButton
  code={firm.bestOffer.code}
  discountPercent={firm.bestOffer.discountPercent}
  firmId={firm.id}
  offerId={firm.bestOffer.id}
  compact
/>
```

The `firm` object already has `firm.id` and `firm.bestOffer.id` available (bestOffer is the featured offer object with an `id` field from Prisma).

**In `src/components/compare/FirmCard.tsx`:**

Find the `<CopyCodeButton` JSX element. Add `firmId` and `offerId` props:
```tsx
<CopyCodeButton
  code={firm.bestOffer.code}
  discountPercent={firm.bestOffer.discountPercent}
  firmId={firm.id}
  offerId={firm.bestOffer.id}
/>
```

If `firm.bestOffer` is a derived/computed field (not directly from Prisma), check if `id` is included in its type. If not, verify in the parent component where the firm data is assembled and ensure `bestOffer.id` is present.
</action>

<acceptance_criteria>
- `src/components/compare/FirmRow.tsx` CopyCodeButton JSX contains `firmId={firm.id}` and `offerId={firm.bestOffer.id}`
- `src/components/compare/FirmCard.tsx` CopyCodeButton JSX contains `firmId={firm.id}` and `offerId={firm.bestOffer.id}`
- TypeScript compilation: `npx tsc --noEmit` exits 0 (no prop type mismatches)
- No runtime errors when rendering compare page: copying a code does not throw
</acceptance_criteria>

## Security Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Client-side firmId/offerId spoofing | Low | IDs come from server-fetched firm data; validation in Server Action's Zod schema |
| Tracking blocking clipboard copy | High | `logCopyEvent` is fire-and-forget (`.catch(() => {})`); clipboard write happens before tracking call |

## Verification

```bash
# Both components have firmId prop
grep "firmId: string" src/components/firm/CopyCodeButton.tsx
grep "firmId: string" src/components/compare/CopyCodeButton.tsx

# Fire-and-forget pattern (no await on logCopyEvent)
grep "logCopyEvent" src/components/firm/CopyCodeButton.tsx | grep -v "await"
grep "logCopyEvent" src/components/compare/CopyCodeButton.tsx | grep -v "await"

# Parent components pass firmId and offerId
grep "firmId=" src/components/firm/FirmHero.tsx
grep "firmId=" src/components/compare/FirmRow.tsx
grep "firmId=" src/components/compare/FirmCard.tsx

# TypeScript clean
npx tsc --noEmit 2>&1 | grep -E "CopyCodeButton|tracking" | wc -l
```
