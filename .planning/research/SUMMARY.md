# Research Summary — PropPilot

## Stack

**Confirmed:** Next.js 15 App Router + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + Clerk + PostgreSQL (Neon) + Prisma + Vercel

**Key integration decisions:**
- Use `clerkMiddleware()` + async `auth()` throughout — Next.js 15 requires awaiting all request APIs
- Neon is the recommended PostgreSQL provider for Vercel — use `DATABASE_URL` (pooled) + `DIRECT_URL` (migrations)
- UploadThing for receipt file uploads (bypasses Vercel 4.5MB limit)
- `nuqs` for URL-synced filter state on the compare page
- `unstable_after()` for async affiliate click logging (zero UX latency on redirect)
- `LazyMotion` + `domAnimation` for Framer Motion (smaller bundle, no SSR conflicts)

## Table Stakes

- Filterable/sortable firm comparison table (capital size, drawdown type, rules, price, platform)
- Firm detail pages with full rule breakdown + discount code copy CTA
- Affiliate redirect tracking via `/go/[slug]` route
- Code copy event tracking
- Clear affiliate disclosure on all comparison pages
- "Last verified" timestamps on all firm data
- Mobile card view for comparison (tables fail on mobile)
- Side-by-side comparison (URL state: `?compare=firm-a,firm-b`)
- Claim submission flow with file upload
- Admin claim review + approval interface
- Points/reward system triggered by admin approval

## Watch Out For

1. **Async request APIs:** All `params`, `searchParams`, `headers()`, `cookies()` must be `await`ed in Next.js 15 — establish pattern in Phase 1, enforce via ESLint
2. **Prisma in Edge Runtime:** Will crash — always set `runtime = 'nodejs'` on DB routes
3. **Missing connection pooling on Vercel:** Will hit "Too many clients" under any real traffic — configure Neon pooler + Prisma Accelerate in Phase 1
4. **Clerk webhook sync gaps:** If webhook fails, User record won't exist in DB — use `upsert` + lazy sync fallback
5. **Framer Motion in Server Components:** Every file using Framer Motion MUST be `"use client"` — hydration errors otherwise
6. **Stale firm data:** Display "Last verified: [date]" on every card — trust-critical
7. **FTC disclosure:** Affiliate disclosure must be above the fold, not buried in footer

## Differentiators to Build

- **Rule Difficulty Score:** Weighted proprietary score (drawdown type, consistency rules, profit target, restrictions) — no competitor does this clearly
- **Drawdown type badge:** Balance-based vs Equity-based — traders care deeply; no site clearly labels this
- **PropPilot Points:** Earn points for verified purchases through affiliate links — creates return visits and brand loyalty
- **Manual claim + reward verification:** No other comparison site has this — builds strong trust loop
- **Design quality:** Bloomberg/modern SaaS aesthetic vs competitor's WordPress affiliate blog look

## Architecture Decisions

- Route groups: `(marketing)` public, `(dashboard)` user-protected, `(admin)` admin-only
- Affiliate tracking: `/go/[slug]` Route Handler + async DB write via `unstable_after()`
- Rewards: Event-driven — admin approval triggers Prisma transaction (point award + tier check)
- Caching: ISR (1h) for firm pages + `React cache()` for request deduplication + on-demand revalidation after admin updates
- Auth roles: Clerk `publicMetadata.role = 'admin'` checked in middleware

## Build Order

Phase 1 → Foundation (schema, auth, layout)  
Phase 2 → Admin (firm/code management, seed data)  
Phase 3 → Core public pages (Home, Compare, Firm Detail)  
Phase 4 → Affiliate tracking (/go/[slug], click/copy events)  
Phase 5 → User dashboard (profile, saved firms, history)  
Phase 6 → Claims + Rewards (submission, file upload, admin review, points)  
Phase 7 → Guides + SEO (content, metadata, JSON-LD)  
Phase 8 → Polish + Analytics (animations, skeletons, admin analytics, legal)
