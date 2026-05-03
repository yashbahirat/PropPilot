# Phase 1: Foundation - Context

**Gathered:** 2026-05-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the entire PropPilot project: Next.js 15 App Router with TypeScript, Tailwind CSS, shadcn/ui (full design system), Clerk auth (embedded full-page), Prisma schema (all 14 models), Neon PostgreSQL, application shell (route groups, layout, header, footer, mobile nav), and first Vercel deployment. No UI pages yet — this phase delivers the working skeleton every subsequent phase builds on.

</domain>

<decisions>
## Implementation Decisions

### Design System & Theming
- **D-01:** Font: **Inter** — clean, modern, used throughout (headings and body). Load via `next/font/google`.
- **D-02:** Color palette: **Agent's discretion** within the dark fintech aesthetic. Must include deep black/charcoal base, teal primary, cyan/mint highlights, purple accent. Calibrate toward "Bloomberg meets modern SaaS" — sophisticated, not neon-loud.
- **D-03:** shadcn/ui customization: **Full design system in Phase 1** — all shadcn tokens overridden (colors, border radius, shadows, ring colors) to match PropPilot brand. Do not ship with shadcn defaults.
- **D-04:** Tailwind dark mode strategy: `class` (not `media`) — required for shadcn/ui dark mode to work correctly. App is dark-mode-only; no light mode toggle needed for v1.

### Navigation Structure
- **D-05:** Guest header (logged-out): Logo + Compare + Guides + Rewards + Sign In — minimal, no clutter.
- **D-06:** Signed-in header: Same as guest + **reward points pill** (shows current points balance, links to `/dashboard/rewards`). No other extra nav items.
- **D-07:** Mobile navigation: **Hamburger icon → slide-out drawer** from the right. Drawer contains all nav links, sign-in/profile CTA, and reward points for signed-in users.
- **D-08:** Admin nav: Separate sidebar layout within the `(admin)` route group — does not share the marketing header.

### Auth UX Flow
- **D-09:** Clerk integration style: **Embedded full-page** — Clerk `<SignIn>` component rendered at `/sign-in` and `<SignUp>` at `/sign-up` within PropPilot's own layout/design. No redirect to Clerk-hosted domain.
- **D-10:** Post-login redirect: **Always `/dashboard`** — `afterSignInUrl="/dashboard"` and `afterSignUpUrl="/dashboard"` configured in Clerk.
- **D-11:** Clerk `<SignIn>` and `<SignUp>` pages use PropPilot's dark layout wrapper (not the default Clerk card on white background). Match the PropPilot dark theme visually.

### Database Provider & Schema
- **D-12:** PostgreSQL provider: **Neon** — serverless Postgres with native Vercel integration. Use Neon's built-in connection pooler for `DATABASE_URL` + direct connection for `DIRECT_URL` (migrations).
- **D-13:** Prisma schema: **Agent designs the full schema** — implement all 14 models (User, Firm, FirmOffer, AffiliateClick, CopyEvent, PurchaseClaim, UserRewardPoints, PointTransaction, RewardTier, Review, GuidePost, FAQ, AdminActionLog, SavedFirm) with proper field types, relations, indexes, and enums. User does not need to review before first migration.
- **D-14:** Prisma singleton pattern in `lib/db.ts` using `globalThis.__prisma` to prevent hot-reload connection exhaustion in dev.
- **D-15:** All DB route handlers must include `export const runtime = 'nodejs'` — never use Prisma in Edge Runtime.

### Environment & Repository Setup
- **D-16:** Git branching: **Main-only** — all phase work committed directly to `main`. No feature branches for now.
- **D-17:** Vercel deployment: **Include in Phase 1** — phase ends with a live Vercel preview URL where auth (sign-in, sign-up, protected routes) is working end-to-end. Validates the full stack before any UI is built.
- **D-18:** `.env.example` must document every required env var: `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CLERK_WEBHOOK_SECRET`, `NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`, `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`.

### Agent's Discretion
- Exact hex values for the PropPilot palette (within teal/cyan/purple on dark base direction)
- Specific border radius values, shadow styles, and glassmorphism CSS patterns
- Internal Prisma field naming conventions (camelCase as per Prisma standard)
- Specific shadcn/ui components to install in Phase 1 vs defer to later phases
- Clerk webhook signature verification implementation details

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Project vision, core value, constraints, key decisions
- `.planning/REQUIREMENTS.md` — All 73 v1 requirements; Phase 1 covers AUTH-01–07, DB-01, DB-02, DB-04
- `.planning/ROADMAP.md` — Phase 1 plans (9 plans), success criteria

### Research Findings
- `.planning/research/STACK.md` — Confirmed stack, integration patterns, recommended packages, what NOT to use
- `.planning/research/ARCHITECTURE.md` — Project structure, data architecture, build order
- `.planning/research/PITFALLS.md` — Critical pitfalls to avoid (especially: async Next.js 15 APIs, Prisma edge runtime, Clerk middleware pattern, connection pooling)

### No external ADRs — all decisions captured above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — this is a greenfield project. Phase 1 creates all foundational assets.

### Established Patterns (to establish in this phase)
- **Prisma singleton:** `globalThis.__prisma` pattern in `lib/db.ts`
- **Route groups:** `(marketing)` / `(dashboard)` / `(admin)` with separate layouts
- **Async request APIs:** All `params`, `searchParams`, `headers()`, `cookies()` must be `await`ed — establish this pattern from the first route
- **"use client" discipline:** Only mark components client when using hooks, browser APIs, or Framer Motion

### Integration Points
- Clerk middleware wraps all routes; public/protected/admin route matchers defined in `middleware.ts`
- Clerk webhook at `/api/webhooks/clerk` connects Clerk user creation to Prisma User + UserRewardPoints initialization
- `NuqsAdapter` goes in root layout (required for nuqs URL state management in later phases)

</code_context>

<specifics>
## Specific Ideas

- Header reward points pill: compact badge showing "⟐ 1,240 pts" or similar — links to `/dashboard/rewards`
- Sign-in/sign-up pages: Clerk components rendered inside a centered dark card on a subtle gradient/mesh background — matching PropPilot's premium aesthetic, NOT the default white Clerk card
- Admin sidebar: sleek, minimal left sidebar (not a header) — separate from marketing header; collapsible on smaller screens
- The app shell (Header + Footer) should already feel premium at this stage — not placeholder-looking

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 1 scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-05-03*
