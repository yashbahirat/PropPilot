# PropPilot

## What This Is

PropPilot is a production-ready, premium comparison and discovery platform for proprietary trading firms. Traders use PropPilot to compare prop firm rules, fees, and drawdown policies; discover verified affiliate discount codes; read educational guides; and earn rewards by submitting verified purchase proof through the site's affiliate links. The product is designed to feel like a serious, trust-first fintech product — not a generic affiliate directory.

## Core Value

Traders should be able to find the best prop firm for their needs, claim the best available discount, and trust that the information they're seeing is accurate and transparent — all in a single, premium experience.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home page with premium hero, firm search, featured deals, trust metrics, and social proof
- [ ] Comparison page with filterable/sortable firm grid and side-by-side compare (up to 3)
- [ ] Firm detail page with rules, pricing, payouts, pros/cons, reviews, FAQs, and discount CTA
- [ ] Guides / Education section with SEO-friendly article cards and clean reading experience
- [ ] Rewards / Perks system with tier levels, points tracking, and redemption UX
- [ ] Clerk authentication with email + social login; protected routes for dashboard, claims, admin
- [ ] User dashboard showing purchase history, saved firms, reward status, and claim tracking
- [ ] Purchase verification / claim flow with file upload, manual review queue, and point award
- [ ] Admin dashboard for firm/code/claim management, approvals, and analytics
- [ ] PostgreSQL + Prisma data layer with full schema (User, Firm, Offer, Claim, Reward, Analytics, etc.)
- [ ] Click, code-copy, and affiliate link tracking with admin analytics view
- [ ] Responsive, mobile-first design with excellent desktop and mobile UX
- [ ] SEO: semantic HTML, metadata, OpenGraph, JSON-LD, clean URLs
- [ ] Legal / disclaimer / affiliate disclosure pages
- [ ] Seed data for example prop firms and discount codes

### Out of Scope

- Automated purchase verification via API — too complex for v1; manual claim review only
- Real-time price feeds or data sync from prop firm APIs — static/admin-managed data only
- Native mobile apps — web-only for v1
- Multi-language / i18n — English only for v1
- Payment processing / direct checkout — affiliate model only
- Forum or community features beyond reviews — deferred to future

## Context

- **Affiliate model:** Revenue generated through affiliate links and discount codes. The site is transparent about this via disclosure banners and legal pages.
- **Competitor landscape:** Sites like Prop Firm Match and similar directories exist but are visually dated, cluttered, and not trust-optimized. PropPilot aims to be clearly superior in design and credibility.
- **Target user:** Active or aspiring funded traders who are evaluating which prop firm to join and looking for the best deal available.
- **Prop firm data is admin-managed:** There's no public API; all firm data, offers, and codes are entered/maintained by the admin.
- **Tech choices are firm:** Next.js 15+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Clerk, PostgreSQL + Prisma, Vercel deployment.

## Constraints

- **Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Clerk, PostgreSQL, Prisma — no substitutions
- **Auth:** Clerk for all authentication — no custom auth implementation
- **Design:** Dark mode first, glassmorphism accents, teal/mint/cyan/purple palette, "Bloomberg meets modern SaaS" aesthetic — no light-mode-only or generic template look
- **Deployment:** Must be deployable to Vercel without modification; env vars documented in README
- **Code quality:** No TODOs in core features; production-quality, clean, scalable, commented where complex
- **Performance:** Images optimized, skeleton loaders on data fetches, fast TTFB; Vercel-optimized

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Clerk for auth | Saves significant auth implementation time; excellent Next.js 15 integration; handles social login and session management | — Pending |
| Prisma + PostgreSQL | Type-safe ORM with excellent Next.js compatibility; widely supported on Vercel (Neon/Supabase/Railway) | — Pending |
| shadcn/ui component base | Highly customizable, unstyled primitives that align with custom dark design system; avoids fighting pre-styled component libraries | — Pending |
| Manual claim verification | Automated verification requires prop firm API access which doesn't exist; manual review is safer, more accurate, and adequate for v1 volume | — Pending |
| Fine granularity phasing | Large feature surface; fine phases allow focused, verifiable delivery with clear checkpoints | — Pending |
| App Router (Next.js 15) | Better streaming, layouts, server components, and server actions support; forward-compatible | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-03 after initialization*
