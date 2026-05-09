# Phase 3: Home Page - Context

**Gathered:** 2026-05-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Premium landing page with hero, search, featured deals, trust metrics, social proof, FAQ, and footer.
</domain>

<decisions>
## Implementation Decisions

### Hero Background
- **D-01:** Glow gradient mesh — aligns best with the premium glassmorphism aesthetic.

### Featured Deals Layout
- **D-02:** Carousel/slider — keeps the hero section compact while showing many deals.

### Search Interaction
- **D-03:** Redirect to `/compare?q=` — much simpler for v1, full search can be built later.

### Card Hover Effects
- **D-04:** Subtle glow/elevation — keeps the "Bloomberg SaaS" feel serious and not too playful.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Project vision and constraints
- `.planning/REQUIREMENTS.md` — Requirements HOME-01 through HOME-09
- `.planning/ROADMAP.md` — Phase 3 plans and success criteria

### Research Findings
- `.planning/research/STACK.md` — Confirmed stack, specifically Framer Motion for animations.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None specifically identified for the home page yet, but the `Header` and `Footer` layout wrappers from Phase 1 should be used.

### Established Patterns
- **Framer Motion:** Must use `LazyMotion` + `domAnimation`.
- **Dark Mode:** Dark mode first (`#08080F`/`#0E0E1A` base) with teal accent (`#00D4AA`).

### Integration Points
- Search bar action integrates with the `/compare` route (to be built later, but redirect path is established).
- Featured deals will need to query active `FirmOffer` records from the DB.

</code_context>

<specifics>
## Specific Ideas

- Ensure "Bloomberg meets modern SaaS" aesthetic.
- Trust metrics bar should have animated counters.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 3 scope.

</deferred>

---

*Phase: 03-home-page*
*Context gathered: 2026-05-09*
