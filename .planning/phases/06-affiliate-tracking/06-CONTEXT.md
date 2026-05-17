# Phase 6: Affiliate Tracking - Context

**Gathered:** 2026-05-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement all affiliate click and code-copy event tracking: the `/go/[slug]` redirect Route Handler, the `logCopyEvent` Server Action, and the firm detail page view increment. Tracking must never block or break UX — all logging is fire-and-forget. Phase 6 does NOT include user dashboard, bookmarking, or rewards — those are Phase 7.

</domain>

<decisions>
## Implementation Decisions

### Async Logging Strategy (`/go/[slug]` Route Handler)
- **D-01:** Use `unstable_after()` as the primary mechanism to log `AffiliateClick` after the 302 redirect response is sent. Wrap in a `try/catch`; on failure, fall back to a floating promise (`Promise.resolve().then(() => logClick(...))`) so the log attempt still fires on any runtime that doesn't support `unstable_after`.
- **D-02:** Tracking errors (DB down, invalid firmId, etc.) must NEVER propagate to the user — always catch and swallow; the redirect itself is the critical path.

### Session Identity for Anonymous Users
- **D-03:** `sessionId` is left `null` for all users (logged in and logged out) in Phase 6. Anonymous events are correlated via `ipHash` (SHA-256 of client IP) + `userAgent` — both already captured by the schema. Cookie-based anonymous sessions are deferred.
- **D-04:** Logged-in user's DB `userId` (not Clerk ID) is captured in `AffiliateClick` and `CopyEvent` when available. Use the lazy-sync pattern from `reviews.ts` to resolve Clerk ID → DB User ID before inserting.

### Firm Page View Tracking
- **D-05:** Firm detail page visits increment `ComparisonStats.pageViews` and `ComparisonStats.weekViews` using a Prisma `upsert` with `increment: 1`. This runs server-side in the firm page Server Component (non-blocking — use `unstable_after()` with floating-promise fallback, same as D-01).
- **D-06:** No bot/crawler filtering in Phase 6 — all visits are counted. Analytics accuracy is acceptable for v1 scale.

### Copy Code Tracking Scope
- **D-07:** Both `CopyCodeButton` components are wired for tracking in Phase 6:
  - `src/components/firm/CopyCodeButton.tsx` (firm detail page)
  - `src/components/compare/CopyCodeButton.tsx` (comparison table)
- **D-08:** Both components receive `firmId` and `offerId` as new required props. The `logCopyEvent()` Server Action is called inside `handleCopy()` after `navigator.clipboard.writeText()` succeeds. Tracking call is fire-and-forget — do not `await` it, and catch any errors silently.
- **D-09:** The existing `code` prop on both `CopyCodeButton` components stays unchanged. Only `firmId` and `offerId` are added.

### Agent's Discretion
- Exact IP hashing implementation (`ipHash` field) — agent may use `crypto.subtle.digest` or the Node `crypto` module, whichever is available in the Route Handler runtime.
- Whether to extract a shared `logAffiliateClick` utility function or inline the DB call in the Route Handler (either is fine, agent decides based on complexity).
- Exact Zod schema shape for tracking payloads (validate before insert).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Vision, constraints, non-negotiables
- `.planning/REQUIREMENTS.md` — Requirements TRACK-01 through TRACK-04
- `.planning/ROADMAP.md` — Phase 6 plans and success criteria

### Stack Decisions
- `.planning/research/STACK.md` — `unstable_after()` pattern, Node.js runtime requirement for Prisma (never Edge), affiliate tracking Route Handler pattern

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Auth patterns, DB singleton, Clerk → DB user ID resolution
- `.planning/phases/05-firm-detail-pages/05-CONTEXT.md` — CopyCodeButton usage, "Visit Site" link already pointing to `/go/[slug]`

### Key Source Files (read before editing)
- `src/components/firm/CopyCodeButton.tsx` — Existing firm detail copy button (no tracking yet)
- `src/components/compare/CopyCodeButton.tsx` — Existing compare page copy button (no tracking yet)
- `src/components/firm/FirmHero.tsx` — Already links "Get Funded Now" to `/go/${firm.slug}` — Route Handler must handle this slug
- `src/app/actions/reviews.ts` — Reference implementation for Server Actions with Clerk → DB user ID lazy sync pattern
- `prisma/schema.prisma` — `AffiliateClick`, `CopyEvent`, `ComparisonStats` model definitions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/db.ts` — Prisma singleton client, import as `db`
- `src/app/actions/reviews.ts` — Pattern for Server Actions: `auth()` → Clerk ID → lazy DB user sync → validated insert with Zod
- `src/components/firm/CopyCodeButton.tsx` — Client component with `handleCopy` async function; tracking call slots in here
- `src/components/compare/CopyCodeButton.tsx` — Same pattern, same slot

### Established Patterns
- **Server Actions:** `"use server"` + `auth()` + Zod validation + Prisma insert — see `reviews.ts`
- **Runtime:** All Prisma operations must run in Node.js runtime (`export const runtime = 'nodejs'` on Route Handlers)
- **Error handling:** Try/catch → return `{ success: false, error: string }` from Server Actions; swallow silently for fire-and-forget tracking
- **Framer Motion:** `LazyMotion + domAnimation` (no full import) — not needed for tracking but applies to any UI touches

### Integration Points
- `/go/[slug]` Route Handler: look up `Firm` by slug → look up active `FirmOffer` → log `AffiliateClick` async → `redirect()` to `offer.affiliateUrl` (fallback: `firm.affiliateUrl`)
- `CopyCodeButton` in both locations: add `firmId: string` and `offerId: string` props → call `logCopyEvent(firmId, offerId)` inside `handleCopy` (fire-and-forget)
- Firm detail page Server Component: after fetching firm data → call `upsert` on `ComparisonStats` async (fire-and-forget via `unstable_after` + fallback)

</code_context>

<specifics>
## Specific Ideas

- The `/go/[slug]` route already has traffic from `FirmHero.tsx` — it needs to work immediately after Phase 6 ships. The redirect fallback (if no active offer found) should go to `firm.affiliateUrl` directly rather than returning 404.
- `CopyCodeButton` in `FirmRow.tsx` and `ComparisonView.tsx` on the compare page — check if these components pass `code` down; `firmId` and `offerId` likely need to be threaded through from those parent components too.

</specifics>

<deferred>
## Deferred Ideas

- Cookie-based anonymous session ID for cross-visit dedup — deferred, not needed for v1 analytics
- Bot/crawler UA filtering for page view accuracy — deferred to a future analytics pass
- Admin analytics dashboard (ADMN-06: clicks, copies, sign-ins, claims) — Phase 8 or later

</deferred>

---

*Phase: 06-affiliate-tracking*
*Context gathered: 2026-05-17*
