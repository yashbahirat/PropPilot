---
plan: 06-04
status: complete
completed_at: 2026-05-20
---

# Summary: Firm Page View Tracking

## What Was Built

Modified `src/app/firms/[slug]/page.tsx` to track page views after the response is sent:

1. Imports `after` from `"next/server"`
2. After the `if (!firm) { notFound() }` check (real firms only), defines `trackPageView()`
3. `trackPageView` upserts `ComparisonStats` — increments `pageViews` and `weekViews` by 1 (or creates the row with 1 if it doesn't exist yet)
4. Schedules via `after(trackPageView)` with a `Promise.resolve().then(trackPageView)` fallback
5. All errors silently swallowed in a try/catch

## Key Decisions Applied

- D-05: `comparisonStats.upsert` with `pageViews: { increment: 1 }` and `weekViews: { increment: 1 }`
- D-06: No bot/crawler filtering in Phase 6
- D-01/D-02: `after()` + floating-promise fallback; tracking never blocks or breaks render
- Placed AFTER `notFound()` check — only real firm visits are tracked

## Files Modified

- `src/app/firms/[slug]/page.tsx` (30 lines added)

## Verification

- TypeScript: `npx tsc --noEmit` — ✅ 0 errors
- All acceptance criteria met (import after, after(trackPageView), comparisonStats.upsert, increment, fallback, post-notFound placement)
