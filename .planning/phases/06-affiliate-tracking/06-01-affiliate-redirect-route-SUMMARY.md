---
plan: 06-01
status: complete
completed_at: 2026-05-20
---

# Summary: Affiliate Redirect Route Handler

## What Was Built

Created `src/app/go/[slug]/route.ts` — a Next.js Route Handler that:

1. **Looks up a firm** by slug (including active offers, ordered exclusive-first)
2. **Resolves the redirect target**: best exclusive offer → any offer with affiliateUrl → firm.affiliateUrl → websiteUrl → "/"
3. **Issues a 302 redirect** immediately (critical path — zero DB latency added to the response)
4. **Logs AffiliateClick asynchronously** after the redirect using `after()` from `next/server`, with a floating-promise fallback for unsupported runtimes

## Key Decisions Applied

- `export const runtime = 'nodejs'` — Prisma requires Node.js runtime (never Edge)
- IP hashed via Node `crypto.createHash('sha256')` for privacy-safe correlation
- `sessionId: null` per D-03 (Phase 6 scope)
- Clerk → DB userId lazy-sync per D-04 (anonymous users handled gracefully)
- All tracking errors silently swallowed per D-02

## Files Created

- `src/app/go/[slug]/route.ts` (110 lines)

## Verification

- TypeScript: `npx tsc --noEmit` — ✅ 0 errors
- All acceptance criteria met (runtime, after(), affiliateClick.create, redirect, fallback)
