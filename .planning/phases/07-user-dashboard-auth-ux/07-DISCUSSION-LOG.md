# Phase 7: User Dashboard & Auth UX - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-20
**Phase:** 07-user-dashboard-auth-ux
**Areas discussed:** Dashboard Layout, Auth UX Polish, Saved Firms View, Reward Status Display

---

## Dashboard Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Collapsible sidebar | (Recommended) Collapsible sidebar (icons only when collapsed) to maximize data space | ✓ |
| Fixed width sidebar | Fixed width sidebar (always shows text labels) | |
| Top navigation bar | Top navigation bar instead of a sidebar | |

**User's choice:** (Recommended) Collapsible sidebar (icons only when collapsed) to maximize data space

| Option | Description | Selected |
|--------|-------------|----------|
| At bottom of sidebar | (Recommended) At the bottom of the sidebar (standard SaaS pattern) | ✓ |
| In user profile dropdown | In a user profile dropdown menu at the top right | |
| Dedicated settings page | On a dedicated "Settings" page | |

**User's choice:** (Recommended) At the bottom of the sidebar (standard SaaS pattern)

| Option | Description | Selected |
|--------|-------------|----------|
| Existing global mobile drawer | (Recommended) Add dashboard links to the existing global mobile drawer | ✓ |
| Separate bottom tab bar | Create a separate bottom tab bar for dashboard navigation on mobile | |
| Separate hamburger menu | Use a separate hamburger menu just for the dashboard | |

**User's choice:** (Recommended) Add dashboard links to the existing global mobile drawer

---

## Auth UX Polish

| Option | Description | Selected |
|--------|-------------|----------|
| Deep customization | (Recommended) Yes, deeply customize Clerk's appearance prop to match our exact input borders, colors, and shadows | ✓ |
| Background only | No, just ensuring the background is dark is enough | |

**User's choice:** (Recommended) Yes, deeply customize Clerk's appearance prop to match our exact input borders, colors, and shadows

| Option | Description | Selected |
|--------|-------------|----------|
| Seamless with subtle glow | (Recommended) Seamless, with a subtle glow/elevation effect against the page background | ✓ |
| Distinct card with border | A distinct card with a visible stroke/border | |

**User's choice:** (Recommended) Seamless, with a subtle glow/elevation effect against the page background

---

## Saved Firms View

| Option | Description | Selected |
|--------|-------------|----------|
| Grid of firm cards | (Recommended) Grid of firm cards (visual, easy to scan) | ✓ |
| Dense table rows | Dense table rows (similar to the desktop compare page) | |

**User's choice:** (Recommended) Grid of firm cards (visual, easy to scan)

| Option | Description | Selected |
|--------|-------------|----------|
| Remove button directly on card | (Recommended) A "Remove" button directly on the card/row | ✓ |
| Heart/bookmark toggle icon | A heart/bookmark toggle icon to unsave | |

**User's choice:** (Recommended) A "Remove" button directly on the card/row

| Option | Description | Selected |
|--------|-------------|----------|
| Bulk compare button | (Recommended) Yes, a prominent button to launch the side-by-side comparison with selected saved firms | ✓ |
| Link to detail page only | No, just link to the firm's detail page | |

**User's choice:** (Recommended) Yes, a prominent button to launch the side-by-side comparison with selected saved firms

---

## Reward Status Display

| Option | Description | Selected |
|--------|-------------|----------|
| Linear progress bar | (Recommended) Linear progress bar showing points to next tier | ✓ |
| Circular gauge widget | Circular gauge widget | |
| Step-by-step timeline | Step-by-step timeline of all tiers | |

**User's choice:** (Recommended) Linear progress bar showing points to next tier

| Option | Description | Selected |
|--------|-------------|----------|
| Metallic/gem gradients | (Recommended) Premium metallic/gem gradients (Bronze, Silver, Gold, Platinum) with subtle glow | ✓ |
| Flat minimal colors | Flat minimal colors matching the brand palette | |

**User's choice:** (Recommended) Premium metallic/gem gradients (Bronze, Silver, Gold, Platinum) with subtle glow

| Option | Description | Selected |
|--------|-------------|----------|
| Clear CTA "How to earn" | (Recommended) Display a "0 pts" state with a clear CTA outlining "How to earn points" | ✓ |
| Hide progress bar | Hide the progress bar until they earn their first points | |

**User's choice:** (Recommended) Display a "0 pts" state with a clear CTA outlining "How to earn points"
