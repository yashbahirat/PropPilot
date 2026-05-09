# Phase 4: Comparison Engine - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-10
**Phase:** 04-comparison-engine
**Areas discussed:** Layout & Data Density, Filter UI Style, Side-by-Side Comparison UX, Firm Scoring, URL State & Shareability

---

## Layout & Data Density

### Q1: How should firms be displayed on the compare page?

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid | Desktop table rows + mobile card stack; uses @tanstack/react-table for data logic with custom rendering | ✓ |
| Cards only | Rich card grid (2-col desktop, 1-col mobile); more visual breathing room | |
| Pure table | Classic spreadsheet-style; maximum density but harder to make premium | |

**User's choice:** Hybrid
**Notes:** @tanstack/react-table is already installed. Chosen for density and power-user appeal.

### Q2: How much data should be visible inline vs. behind "View Details"?

| Option | Description | Selected |
|--------|-------------|----------|
| Max density | All metrics visible inline: fee, drawdown, daily loss, payout speed, badges, score, CTAs | ✓ |
| Essentials only | Fee, best discount, drawdown %, score badge, CTAs visible; others on hover/detail | |
| You decide | Agent picks the right balance | |

**User's choice:** Max density — everything inline.

---

## Filter UI Style

### Q1: How should the 8+ filters be presented?

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky chip bar | Horizontal pill bar on desktop, popover per filter; Sheet drawer on mobile | ✓ |
| Left sidebar panel | Fixed 240px column, all filters visible at once | |
| Collapsible header | Accordion that expands when needed | |

**User's choice:** Sticky chip bar.

### Q2: How should active filters be indicated?

| Option | Description | Selected |
|--------|-------------|----------|
| Filled teal chip with ✕ | Selected value shown on chip, click ✕ to clear | ✓ |
| Count badge | "Drawdown (1)" badge style — cleaner, shows count not value | |
| You decide | | |

**User's choice:** Filled teal chip with ✕ to clear.

---

## Side-by-Side Comparison UX

### Q1: How should the 3-firm comparison flow work?

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky bottom bar + full-page view | Bar docks at bottom, Compare button opens dedicated URL page | ✓ |
| Inline slide-up drawer | Sheet slides up from bottom without leaving page | |
| Modal overlay | Large dialog opens over compare page | |

**User's choice:** Sticky bottom bar → full-page comparison view.

### Q2: How should differences be highlighted in the comparison table?

| Option | Description | Selected |
|--------|-------------|----------|
| Color-coded cells | Green = best, red = worst | |
| Highlight differences only | Identical values normal; differing values highlighted in amber/teal | ✓ |
| No color coding | Monochrome, user interprets numbers | |
| You decide | | |

**User's choice:** Highlight differences only — focus on what actually differs.

---

## Firm Scoring

### Q1 (Formula): What drives the best overall score?

| Option | Description | Selected |
|--------|-------------|----------|
| Weighted formula, agent defines | Score from drawdown, fee-to-payout ratio, payout speed, rule restrictions; normalized 0–100 | ✓ |
| Simple rank | Composite of fee + discount only | |
| User defines weights | Explicit factor weights provided | |

**User's choice:** Agent-defined weighted formula.

### Q2 (Visibility): Should score badge appear on every card/row?

| Option | Description | Selected |
|--------|-------------|----------|
| Prominent badge | "87/100" in teal, primary UI element on every row | ✓ |
| Subtle badge | Small corner badge, not primary focus | |
| No badge | Score used for sorting only, not displayed | |

**User's choice:** Prominent teal score badge on every row.

---

## URL State & Shareability

### Q1: How should filters be encoded in the URL?

| Option | Description | Selected |
|--------|-------------|----------|
| Full URL state | Every filter, sort, search term in URL via nuqs — fully shareable links | ✓ |
| Minimal URL state | Only search term + compare slugs in URL | |
| You decide | | |

**User's choice:** Full URL state via nuqs.

### Q2: What does /compare show by default?

| Option | Description | Selected |
|--------|-------------|----------|
| All firms, sorted by best overall score | Power users see ranked list immediately | ✓ |
| All firms, no sort | Neutral starting point | |
| Curated recommended preset | Pre-filtered to most popular challenge type | |

**User's choice:** All firms, sorted by best overall score descending.

---

## the Agent's Discretion

- Exact scoring weights
- Popover component choice for filter dropdowns
- Exact breakpoint for desktop-to-mobile layout switch
- Animation specifics for filter chip selection

## Deferred Ideas

- Empty state design — agent's discretion (simple "No results" + clear CTA)
- Affiliate tracking on Visit Site — Phase 6
- Copy Code analytics — Phase 6
- Firm bookmarking from compare page — Phase 7
