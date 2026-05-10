# Phase 5: Firm Detail Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-10
**Phase:** 05-firm-detail-pages
**Areas discussed:** Tab Navigation Layout, Rule Difficulty Score Visualization, Missing Data Handling, Review Submission UX

---

## Tab Navigation Layout

| Option | Description | Selected |
|--------|-------------|----------|
| 1 | Standard horizontal tabs | |
| 2 | Long-scroll page with sticky spy navigation | |
| 3 | Other (Netflix-style layout) | ✓ |

**User's choice:** Netflix-style immersive hero with horizontal tabs below it. On mobile, tabs convert to vertical accordions.
**Notes:** User specifically requested "something like a netflix page. Like netflix has each page when we click on a particular movie/series. It should be detailed and explain everything to the user." Also selected vertical accordions for mobile layout.

---

## Rule Difficulty Score Visualization

| Option | Description | Selected |
|--------|-------------|----------|
| 1 | Radial Gauge / Circular Chart | |
| 2 | Horizontal Progress Bar | ✓ |
| 3 | Simple Colored Badge | |
| 4 | Other | |

**User's choice:** 2 progress bar
**Notes:** Decided on a horizontal progress bar in the hero section. Also agreed to show the detailed score breakdown in a Tooltip / Popover on hover.

---

## Missing Data Handling

| Option | Description | Selected |
|--------|-------------|----------|
| 1 | Show the tab with an Empty State | ✓ |
| 2 | Hide the tab completely | |
| 3 | Disable the tab | |
| 4 | Other | |

**User's choice:** 1
**Notes:** Decided to always show tabs even if empty, using an empty state to encourage interaction (e.g. "Be the first to review").

---

## Review Submission UX

| Option | Description | Selected |
|--------|-------------|----------|
| 1 | Modal overlay | ✓ |
| 2 | Inline form within the Reviews tab | |
| 3 | Dedicated page | |
| 4 | Other | |

**User's choice:** 1
**Notes:** Decided to use a modal overlay for logged-in users to submit reviews, separating reading from writing.

---

## the agent's Discretion

- Exact gradient styling and layout spacing for the Netflix-style hero section.
- Design of the empty state illustrations/text.
- Form fields and layout within the review submission modal.

## Deferred Ideas

- Affiliate tracking on "Visit Site" clicks (belongs in Phase 6)
- Bookmarking/saving a firm (belongs in Phase 7)
