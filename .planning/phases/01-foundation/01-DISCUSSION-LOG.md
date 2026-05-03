# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-03
**Phase:** 01-foundation
**Areas discussed:** Design System & Theming, Navigation Structure, Auth UX Flow, Database Provider & Schema, Environment & Repository Setup

---

## Design System & Theming

| Option | Description | Selected |
|--------|-------------|----------|
| Agent decides palette | Agent picks exact values within dark fintech direction | ✓ |
| User defines hex values | User provides specific hex/HSL values | |
| Reference sites | User describes reference sites for the vibe | |

**Colors:** Agent's discretion within teal/cyan/purple on deep black direction.

| Option | Description | Selected |
|--------|-------------|----------|
| Inter | Clean, modern, widely used in fintech/SaaS | ✓ |
| Outfit | Geometric, great for headings | |
| Geist | Vercel's font, very sharp | |

**Font:** Inter — "need it clean and modern"

| Option | Description | Selected |
|--------|-------------|----------|
| Full design system | All shadcn tokens overridden in Phase 1 | ✓ |
| Minimal base | Deep customization deferred to Phase 3 | |

**shadcn/ui customization:** Full design system in Phase 1.

---

## Navigation Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal | Logo, Compare, Guides, Rewards, Sign In | ✓ |
| Full | Logo, Compare, Firms, Guides, Rewards, Discounts, Sign In | |

**Guest header:** Minimal. **Additional for signed-in:** Reward points pill in header.

| Option | Description | Selected |
|--------|-------------|----------|
| Hamburger / slide-out drawer | Standard drawer from right on mobile | ✓ |
| Bottom tab bar | Fixed bottom bar with icon tabs | |

**Mobile nav:** Hamburger menu / slide-out drawer.

---

## Auth UX Flow

| Option | Description | Selected |
|--------|-------------|----------|
| Clerk-hosted pages | Redirect to accounts.clerk.dev | |
| Embedded modal | Clerk SignIn modal in PropPilot app | |
| Embedded full-page | Clerk components at /sign-in and /sign-up routes | ✓ |

**Clerk integration:** Embedded full-page within PropPilot's dark layout.

| Option | Description | Selected |
|--------|-------------|----------|
| Always dashboard | afterSignInUrl="/dashboard" | ✓ |
| Back to where they were | Preserve return URL | |

**Post-login redirect:** Always `/dashboard`.

---

## Database Provider & Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Neon | Serverless Postgres, native Vercel integration | ✓ |
| Supabase | More features but overhead for this use case | |
| Railway | Simple DX, more expensive at scale | |

**Database provider:** Neon PostgreSQL.

| Option | Description | Selected |
|--------|-------------|----------|
| Agent designs full schema | Agent implements all fields, relations, indexes | ✓ |
| Review before migrate | Agent drafts, user reviews before push | |
| Field-by-field | Walk through schema decisions together | |

**Schema:** Agent designs the full schema.

---

## Environment & Repository Setup

| Option | Description | Selected |
|--------|-------------|----------|
| Main-only | All work to main, no feature branches | ✓ |
| Feature branches | Each phase on its own branch | |

**Git strategy:** Main-only for now.

| Option | Description | Selected |
|--------|-------------|----------|
| Deploy from Phase 1 | Live Vercel preview URL at end of Phase 1 | ✓ |
| Defer to Phase 12 | Vercel setup as final polish step | |

**Vercel:** Deploy from Phase 1 — phase ends with a working live preview.

---

## Agent's Discretion

- Exact hex values for PropPilot color palette
- Border radius, shadow styles, glassmorphism CSS patterns
- Prisma field naming conventions and index choices
- Which shadcn/ui components to install in Phase 1 vs later phases
- Clerk webhook implementation details

## Deferred Ideas

None — discussion stayed within Phase 1 scope.
