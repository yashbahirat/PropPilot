# Phase 4: Comparison Engine - Context

**Gathered:** 2026-05-10
**Status:** Ready for planning

<domain>
## Phase Boundary

A filterable, sortable firm comparison page with side-by-side comparison and mobile-responsive design. This phase delivers the core discovery and comparison experience — the primary value surface of PropPilot.

Scope anchor: `/compare` page with filter/sort, firm list (hybrid layout), and a side-by-side comparison flow. No firm detail pages (Phase 5), no affiliate tracking (Phase 6).
</domain>

<decisions>
## Implementation Decisions

### Layout & Data Density
- **D-01:** Hybrid layout — dense table-style rows on desktop (using `@tanstack/react-table` for data logic with custom row rendering), card stack on mobile.
- **D-02:** Maximum data density — all metrics visible inline in every desktop row: logo, name, fee, discount code badge, true cost after discount, drawdown %, daily loss %, payout speed, rules badges (news/weekend/EA), overall score badge, and CTAs (View Details / Copy Code / Visit Site).
- **D-03:** Mobile card view shows the same firm but in a stacked card format — no data is hidden.

### Filter UI
- **D-04:** Sticky horizontal chip/pill bar on desktop — each chip opens a small popover/dropdown for its filter options (challenge type, account size, evaluation type, drawdown type, daily loss, fee range, discount availability, funding style).
- **D-05:** Active filters display as filled teal chips showing the selected value with an ✕ to clear. Unselected chips are outlined/ghost style.
- **D-06:** On mobile, all filters collapse into a single "Filters" button that opens a Sheet drawer (shadcn `Sheet` component already installed).
- **D-07:** A "Clear all" control should appear in the chip bar when any filters are active.

### Side-by-Side Comparison
- **D-08:** Sticky comparison dock bar at the bottom of the screen — appears as soon as ≥1 firm is selected for comparison (checkbox or "Add to Compare" button on each row/card). Shows up to 3 firm thumbnails + a "Compare (N)" CTA button.
- **D-09:** Clicking "Compare" navigates to the full compare page using URL state: `/compare?compare=slug1,slug2,slug3`. This view is a dedicated full-page layout with a rule-by-rule comparison table.
- **D-10:** In the comparison table, identical values across all selected firms are rendered normally. Cells where values *differ* across firms are highlighted in amber/teal — this focuses the user's attention on what actually matters.

### Firm Scoring
- **D-11:** Weighted scoring formula computed server-side — agent defines the weights based on: drawdown type strictness, fee-to-payout ratio, payout speed rating, and rule restrictions (news/weekend/EA booleans). Score normalized to 0–100.
- **D-12:** Score badge displayed prominently on every row/card — e.g., a teal `87` or `87/100` badge. This is a primary UI element, not a subtle footnote.
- **D-13:** "Best Overall Score" is the default sort on the `/compare` page (no filters applied).

### URL State & Default View
- **D-14:** Full filter + sort state synced to URL via `nuqs`. Every active filter, sort selection, and search term is reflected in the URL — links are fully shareable (e.g., `/compare?drawdown=trailing&fee=0-200&sort=score`).
- **D-15:** Default `/compare` page (no URL params): all firms visible, sorted by best overall score descending.
- **D-16:** `?compare=slug1,slug2` URL param drives the side-by-side comparison view state.
- **D-17:** `?q=` search term (from home page hero search bar) pre-fills the search bar on the compare page and filters immediately.

### the Agent's Discretion
- Exact scoring weights (the agent defines a sensible formula from existing DB fields)
- Popover component choice for filter dropdowns (Radix Dialog is installed; agent may use a lightweight Popover pattern)
- Exact breakpoint where desktop table switches to mobile card view
- Animation specifics for filter chip selection (within Framer Motion LazyMotion + domAnimation constraint)
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Vision, constraints, non-negotiables (dark mode, Bloomberg-SaaS aesthetic)
- `.planning/REQUIREMENTS.md` — Requirements COMP-01 through COMP-09
- `.planning/ROADMAP.md` — Phase 4 plans and success criteria

### Stack Decisions
- `.planning/research/STACK.md` — Confirmed stack; nuqs URL state pattern, LazyMotion + domAnimation, @tanstack/react-table usage

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Auth patterns, design system tokens
- `.planning/phases/03-home-page/03-CONTEXT.md` — Hover effects (subtle glow/elevation), Framer Motion constraints, dark theme tokens
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/ui/card.tsx` — shadcn Card, usable for mobile firm cards
- `src/components/ui/badge.tsx` — shadcn Badge, usable for score badge, rules badges, discount badge
- `src/components/ui/button.tsx` — shadcn Button for CTAs (View Details, Copy Code, Visit Site)
- `src/components/ui/sheet.tsx` — shadcn Sheet, already used in `MobileDrawer.tsx` — reuse pattern for filter drawer
- `src/components/ui/table.tsx` — shadcn Table primitives for desktop row layout
- `src/components/ui/input.tsx` — shadcn Input for search bar on compare page
- `src/components/ui/tabs.tsx` — Available if comparison view needs tab navigation
- `@tanstack/react-table` — Installed (`^8.21.3`), use for data/sort/filter logic with custom row rendering
- `nuqs` — Installed (`^2.8.9`), use `useQueryStates` for all URL-synced filter state
- `sonner` — Installed, use for "Code copied!" toast on Copy Code action
- `framer-motion` — Use `LazyMotion` + `domAnimation` for all animations

### Established Patterns
- **Dark mode first:** `#08080F`/`#0E0E1A` background, teal accent `#00D4AA`
- **Framer Motion:** Always `LazyMotion` + `domAnimation` (never full Framer import)
- **Hover effects:** Subtle glow/elevation — not playful animations
- **Server Components:** Use async Server Components for DB queries; client components only where interactivity requires it
- **Node.js runtime:** All DB routes need `export const runtime = 'nodejs'`

### Integration Points
- Firm data: query `Firm` + `FirmOffer` models from Prisma — firm list page needs all fields defined in the Firm schema
- Search input on compare page connects to the `?q=` nuqs param — home page already routes here
- Copy Code: will call a Server Action (Phase 6 will add analytics tracking — for now, just copy + toast)
- "Visit Site" CTA: routes to `/go/[slug]` affiliate redirect (Phase 6 implements tracking — stub the redirect route now or just link directly to firm URL)
- Score calculation: computed in a server utility function, stored or computed at query time
</code_context>

<specifics>
## Specific Ideas

- Bloomberg-meets-SaaS aesthetic: the comparison table should feel like a financial data terminal — tight, information-dense, authoritative.
- The score badge (`87/100` in teal) should be one of the most visually prominent elements on each row.
- The sticky comparison dock bar at the bottom should animate in smoothly when a first firm is selected (Framer Motion slide-up).
- Filter chip bar should feel like a filter bar in a premium fintech product — not generic dropdown menus.
- "Last verified" date must be shown on each card/row (COMP-09 requirement).
</specifics>

<deferred>
## Deferred Ideas

- Empty state design (no firms match filters) — left to agent's discretion; a simple "No firms match your filters" with a "Clear filters" CTA is sufficient
- Affiliate click tracking on "Visit Site" — deferred to Phase 6
- Copy Code analytics logging — deferred to Phase 6
- Bookmarking/saving firms from compare page — Phase 7 (DASH-05)
- Review ratings visible on compare page — Phase 5 (firm detail) and Phase 7

None surfaced as scope creep during discussion.
</deferred>

---

*Phase: 04-comparison-engine*
*Context gathered: 2026-05-10*
