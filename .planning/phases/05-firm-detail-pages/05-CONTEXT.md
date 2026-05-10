# Phase 5: Firm Detail Pages - Context

**Gathered:** 2026-05-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Build premium firm detail pages with tabbed rule breakdown, discount code CTA, reviews, FAQs, and Rule Difficulty Score. Includes the core UI for the detail page, but tracking on clicks (Phase 6) and bookmarking (Phase 7) are separate.

</domain>

<decisions>
## Implementation Decisions

### Tab Navigation Layout
- **D-01:** Netflix-style immersive hero section at the top (Firm logo, Name, Score, key metrics, and primary CTAs) set against a dark gradient background.
- **D-02:** Horizontal tabs below the hero for content sections (Overview, Rules, Pricing, Payouts, Pros & Cons, Reviews, FAQs).
- **D-03:** On mobile screens, the tabs convert into vertical accordions (using `accordion.tsx`) to improve mobile UX.

### Rule Difficulty Score Visualization
- **D-04:** Displayed as a sleek horizontal progress bar within the hero section.
- **D-05:** Detailed score breakdown is visible via a tooltip or popover on hover over the progress bar.

### Missing Data Handling
- **D-06:** Always show all tabs even if empty.
- **D-07:** Use an empty state within the tab to encourage user interaction (e.g., "Be the first to review" or "No FAQs yet") instead of hiding or disabling the tab.

### Review Submission UX
- **D-08:** Logged-in users will click "Write a Review" which opens a modal overlay, separating the writing experience from the reading experience and keeping the Reviews tab clean.

### the agent's Discretion
- Exact gradient styling and layout spacing for the Netflix-style hero section.
- Design of the empty state illustrations/text.
- Form fields and layout within the review submission modal.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Project vision and constraints (Bloomberg-SaaS aesthetic, dark mode)
- `.planning/REQUIREMENTS.md` — Requirements FIRM-01 through FIRM-09
- `.planning/ROADMAP.md` — Phase 5 plans and success criteria

### Stack Decisions
- `.planning/research/STACK.md` — Confirmed stack; LazyMotion + domAnimation constraint

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Auth patterns, design system tokens
- `.planning/phases/03-home-page/03-CONTEXT.md` — Subtle glow/elevation hover effects, no playful animations
- `.planning/phases/04-comparison-engine/04-CONTEXT.md` — Rule difficulty score calculation context
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/tabs.tsx` — For the desktop tab navigation.
- `src/components/ui/accordion.tsx` — For the mobile accordion view.
- `src/components/ui/button.tsx` — For CTAs (Visit Site, Copy Code, Write Review).
- `src/components/ui/card.tsx` — For rendering individual reviews or pros/cons.

### Established Patterns
- **Dark mode first:** `#08080F`/`#0E0E1A` background, teal accent `#00D4AA`.
- **Framer Motion:** Always `LazyMotion` + `domAnimation`.
- **Server Components:** Use async Server Components for DB queries; client components only where interactivity requires it (e.g., tabs, modal).

### Integration Points
- Firm data: query `Firm`, `FirmOffer`, `Review`, `FAQ` models from Prisma.
- Review Submission: Server Action to validate and insert a new `Review` record.
- "Copy Code" & "Visit Site" CTAs: Follow patterns established in Phase 4 (with stubs for tracking to be built in Phase 6).

</code_context>

<specifics>
## Specific Ideas

- "Netflix-style immersive hero" — the hero should feel expansive and premium, dominating the top of the screen before the user scrolls into the dense tabs.
- "Bloomberg meets modern SaaS" — typography and spacing must feel tight, serious, and authoritative, especially in the Rules and Pricing tabs.

</specifics>

<deferred>
## Deferred Ideas

- Affiliate tracking on "Visit Site" clicks — Phase 6
- Bookmarking/saving a firm from this page — Phase 7

</deferred>

---

*Phase: 05-firm-detail-pages*
*Context gathered: 2026-05-10*
