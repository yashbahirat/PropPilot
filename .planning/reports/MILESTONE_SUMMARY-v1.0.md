# Milestone v1.0 — Project Summary

**Generated:** 2026-05-17
**Purpose:** Team onboarding and project review

---

## 1. Project Overview

PropPilot is a production-ready, premium comparison and discovery platform for proprietary trading firms. Traders use PropPilot to compare prop firm rules, fees, and drawdown policies; discover verified affiliate discount codes; read educational guides; and earn rewards by submitting verified purchase proof through the site's affiliate links. The product is designed to feel like a serious, trust-first fintech product — not a generic affiliate directory.

**Core Value:** Traders should be able to find the best prop firm for their needs, claim the best available discount, and trust that the information they're seeing is accurate and transparent — all in a single, premium experience.

*Note: Milestone 1.0 is currently in-progress. Phases 1-4 are complete, and Phase 5 is executing.*

## 2. Architecture & Technical Decisions

- **Decision:** Clerk for Auth
  - **Why:** Embedded full-page style. Fast implementation, Next.js 15 integration.
  - **Phase:** 01-foundation
- **Decision:** Prisma + PostgreSQL (Neon)
  - **Why:** Type-safe ORM, serverless Postgres with native Vercel integration, connection pooling.
  - **Phase:** 01-foundation
- **Decision:** shadcn/ui Component Base
  - **Why:** Highly customizable, unstyled primitives to match dark fintech aesthetic.
  - **Phase:** 01-foundation
- **Decision:** Next.js 15 App Router
  - **Why:** Better streaming, layouts, and server components. All DB routes use Node.js runtime.
  - **Phase:** 01-foundation
- **Decision:** URL-synced filter state via `nuqs`
  - **Why:** Ensures all filter, sort, and search states on the compare page are fully shareable.
  - **Phase:** 04-comparison-engine

## 3. Phases Delivered

| Phase | Name | Status |
|-------|------|--------|
| 1 | Foundation | ✅ Complete |
| 2 | Admin: Firm & Offer Management | ✅ Complete |
| 3 | Home Page | ✅ Complete |
| 4 | Comparison Engine | ✅ Complete |
| 5 | Firm Detail Pages | 🔄 In-Progress |
| 6 | Affiliate Tracking | ⏳ Planned |
| 7 | User Dashboard & Auth UX | ⏳ Planned |
| 8 | Claims & Rewards System | ⏳ Planned |
| 9 | Admin: Claims, Analytics & Action Log | ⏳ Planned |
| 10 | Guides & Education | ⏳ Planned |
| 11 | SEO & Performance | ⏳ Planned |
| 12 | Polish, Legal & Deployment | ⏳ Planned |

## 4. Requirements Coverage

*V1 Requirements (73 total):*
- ✅ **Foundation (Phase 1):** AUTH-01–07, DB-01, DB-02, DB-04
- ✅ **Admin (Phase 2):** ADMN-01, ADMN-02, ADMN-09, DB-03
- ✅ **Home Page (Phase 3):** HOME-01–09
- ✅ **Comparison Engine (Phase 4):** COMP-01–09
- ⏳ **Remaining:** FIRM-01–09, TRACK-01–04, DASH-01–05, CLAM-01–10, RWRD-01–05, GUIDE-01–05, SEO-01–08, LEGL-01–05, DEPL-01–04

## 5. Key Decisions Log

- **D-01 (Ph 1):** Font is Inter. Dark mode first with teal/cyan/purple highlights.
- **D-12 (Ph 1):** PostgreSQL via Neon. Prisma singleton pattern in `lib/db.ts` to prevent hot-reload connection exhaustion.
- **D-01 (Ph 4):** Hybrid layout for data density — table-style rows on desktop, card stack on mobile.
- **D-11 (Ph 4):** Weighted scoring formula computed server-side to normalize firm scores to 0-100.

## 6. Tech Debt & Deferred Items

- Empty state design (no firms match filters) deferred to agent's discretion.
- Affiliate click tracking and copy code logging deferred to Phase 6.
- Bookmarking/saving firms from compare page deferred to Phase 7.
- UploadThing integration for logos deferred (using direct URL input for v1).

## 7. Getting Started

- **Run the project:** `npm run dev`
- **Key directories:** `src/app/` for routes, `src/components/` for UI, `src/lib/` for utils/DB.
- **Database:** Prisma with Neon Postgres connection pool. Use `npx prisma db push` or `seed` for local dev.
- **Where to look first:** `.planning/PROJECT.md`, `.planning/ROADMAP.md`

---

## Stats

- **Timeline:** 2026-05-03 → 2026-05-17
- **Phases:** 4 / 12 complete
- **Commits:** 76
- **Files changed:** 193 (+30046 / -3)
- **Contributors:** Yash Bahirat
