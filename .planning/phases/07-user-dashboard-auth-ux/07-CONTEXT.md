# Phase 07: User Dashboard & Auth UX - Context

**Gathered:** 2026-05-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the protected user dashboard with profile, saved firms, reward status, claim history, and polished auth UX.
</domain>

<decisions>
## Implementation Decisions

### Dashboard Layout
- **D-01:** Desktop sidebar will be collapsible (showing icons only when collapsed) to maximize data space.
- **D-02:** The "Sign Out" action will live at the bottom of the sidebar, following the standard SaaS pattern.
- **D-03:** Mobile navigation will add dashboard links to the existing global mobile drawer.

### Auth UX Polish
- **D-04:** Deeply customize Clerk's `appearance` prop to match our exact shadcn UI input borders, colors, and shadows.
- **D-05:** The main sign-in/sign-up container will be seamless, with a subtle glow/elevation effect against the page background.

### Saved Firms View
- **D-06:** Saved firms will be displayed as a grid of firm cards (highly visual and easy to scan).
- **D-07:** Users can remove a firm from their saved list via a "Remove" button directly on the card.
- **D-08:** A prominent bulk "Compare Selected" action will be included to launch the side-by-side comparison.

### Reward Status Display
- **D-09:** Progress to the next reward tier will be visualized using a linear progress bar.
- **D-10:** Tier badges will feature premium metallic/gem gradients (Bronze, Silver, Gold, Platinum) with a subtle glow.
- **D-11:** For brand new users with 0 points, display a clear CTA outlining "How to earn points".
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Project vision and constraints (Bloomberg-SaaS aesthetic, dark mode).
- `.planning/REQUIREMENTS.md` — Requirements DASH-01 through DASH-05.
- `.planning/ROADMAP.md` — Phase 7 plans and success criteria.

### Stack Decisions
- `.planning/research/STACK.md` — Confirmed stack; clerkMiddleware pattern.

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Auth patterns, design system tokens, Post-login redirect to `/dashboard`, dark layout wrapper for Clerk.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/(dashboard)/layout.tsx` — Exists, but needs to be updated to add the dashboard sidebar.
- `src/components/layout/MobileDrawer.tsx` — Add dashboard links to this existing drawer.

### Established Patterns
- **Dark mode first:** `#08080F`/`#0E0E1A` background, teal accent `#00D4AA`.
- **Clerk customization:** Clerk components at `/sign-in` and `/sign-up` already sit inside PropPilot's dark layout wrapper.

### Integration Points
- Sidebar should integrate with the existing `(dashboard)` layout.
- Saved Firms data connects to Prisma `SavedFirm` schema.
- Reward Status connects to Prisma `UserRewardPoints` schema.
</code_context>

<specifics>
## Specific Ideas

- The Clerk auth container should feel completely integrated, like it's a native part of the PropPilot site, rather than a widget injected by a third party.
- Tier badges should look premium (metallic/gem gradients) and rewarding.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.
</deferred>

---

*Phase: 07-user-dashboard-auth-ux*
*Context gathered: 2026-05-20*
