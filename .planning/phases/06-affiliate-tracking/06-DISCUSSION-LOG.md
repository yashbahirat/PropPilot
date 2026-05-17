# Phase 6: Affiliate Tracking - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-17
**Phase:** 06-affiliate-tracking
**Areas discussed:** Async Logging Strategy, Session Identity, Page View Tracking, Copy Code Scope

---

## Async Logging Strategy (`unstable_after()`)

| Option | Description | Selected |
|--------|-------------|----------|
| `unstable_after()` + floating-promise fallback | Try experimental API; on error fall back to fire-and-forget floating promise | ✓ |
| `unstable_after()` only | Trust the experimental API, no fallback | |
| Plain floating promise | Skip `unstable_after()` entirely; simpler but less correct on Vercel | |

**User's choice:** A — `unstable_after()` primary with try/catch floating-promise fallback
**Notes:** STACK.md rates `unstable_after()` as medium confidence/experimental. Fallback ensures logs land even if Vercel runtime doesn't support the API.

---

## Session Identity for Anonymous Users

| Option | Description | Selected |
|--------|-------------|----------|
| Cookie-based anonymous session ID | UUID in 90-day cookie, read in Route Handler | |
| Skip sessionId — rely on ipHash + userAgent | Leave sessionId null; use existing schema fields | ✓ |
| IP hash only | Hash IP, store in ipHash field; no cookie | |

**User's choice:** B — Skip `sessionId`, leave null. Use `ipHash` + `userAgent` for anonymous dedup signal.
**Notes:** Avoids cookie-consent surface area. `ipHash` and `userAgent` are already first-class fields in the schema. Anonymous session cookies deferred.

---

## Firm Page View Tracking Granularity

| Option | Description | Selected |
|--------|-------------|----------|
| DB upsert increment + basic bot UA filtering | Increment on every visit, filter common bots | |
| DB upsert increment, no bot filtering | Increment on every visit, count all traffic | ✓ |
| Skip page view tracking for Phase 6 | Defer to later analytics pass | |

**User's choice:** B — DB upsert increment, no bot filtering.
**Notes:** Acceptable for v1 scale. Bot filtering deferred. `weekViews` increment logic is agent's discretion (e.g., reset weekly via a separate job or accept imprecision for now).

---

## Copy Code Button Tracking Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Both CopyCodeButton components | Wire firm detail + compare page | ✓ |
| Firm detail page only | Skip compare page copy events | |
| Defer to Phase 7 | No copy tracking in Phase 6 | |

**User's choice:** A — Wire both `CopyCodeButton` components.
**Notes:** Compare page is a high-conversion surface; skipping it would leave a meaningful analytics gap. Both components follow the same pattern — minimal additional effort.

---

## Agent's Discretion

- IP hashing implementation (crypto.subtle vs Node crypto module)
- Whether to extract a shared tracking utility or inline DB calls
- Exact Zod schema shape for tracking payloads
- `weekViews` reset/rolling window strategy

## Deferred Ideas

- Cookie-based anonymous session ID (cross-visit dedup)
- Bot/crawler UA filtering for page view analytics
- Admin analytics dashboard (ADMN-06)
