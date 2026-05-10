---
phase: 05-firm-detail-pages
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/firms/[slug]/page.tsx
  - src/components/firm/FirmHero.tsx
  - src/components/firm/RuleDifficultyScore.tsx
autonomous: true
requirements:
  - FIRM-01
  - FIRM-04
  - FIRM-05
  - FIRM-06
must_haves:
  truths:
    - User can visit /firms/[slug] and see the firm's hero section
    - User can see the Rule Difficulty Score progress bar and hover for a detailed breakdown
    - Affiliate disclosure is visible
    - Visit Site button links to /go/[slug]
  artifacts:
    - path: src/app/firms/[slug]/page.tsx
      provides: Server Component page shell fetching firm data
    - path: src/components/firm/FirmHero.tsx
      provides: Netflix-style immersive hero section
    - path: src/components/firm/RuleDifficultyScore.tsx
      provides: Visual progress bar and tooltip
  key_links:
    - from: src/app/firms/[slug]/page.tsx
      to: prisma.firm
      via: findUnique by slug
---

<objective>
Build the Firm Detail Page shell and the Netflix-style immersive hero section, including the Rule Difficulty Score visualization.

Purpose: Establishes the premium, data-dense entry point for the firm detail pages, setting the visual tone (D-01) and displaying the most critical metrics immediately (D-04, D-05).
Output: Page route, FirmHero component, RuleDifficultyScore component.
</objective>

<execution_context>
@~/.gemini/antigravity/get-shit-done/workflows/execute-plan.md
@~/.gemini/antigravity/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/05-firm-detail-pages/05-CONTEXT.md
@.planning/phases/05-firm-detail-pages/05-UI-SPEC.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Rule Difficulty Score Component</name>
  <files>src/components/firm/RuleDifficultyScore.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-CONTEXT.md
  </read_first>
  <action>
    Create a Client Component (`RuleDifficultyScore.tsx`) that takes a `score` (0-100) and `breakdown` (object) as props.
    Implement D-04: Display as a sleek horizontal progress bar (using `shadcn/ui` Progress or custom div). Use the accent color `#00D4AA` for the bar fill.
    Implement D-05: Wrap the progress bar in a `shadcn/ui` Tooltip or HoverCard. On hover, display the detailed breakdown (Drawdown Type, Consistency Rule, Profit Target, Restrictions).
    Styling must match the "Bloomberg meets modern SaaS" tight typography (14px labels, 600 weight).
  </action>
  <verify>
    <automated>grep -q "Tooltip" src/components/firm/RuleDifficultyScore.tsx</automated>
  </verify>
  <done>Component exports RuleDifficultyScore, renders a progress bar, and uses Tooltip/HoverCard for breakdown.</done>
</task>

<task type="auto">
  <name>Task 2: Build Netflix-Style Hero Section</name>
  <files>src/components/firm/FirmHero.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-CONTEXT.md
    - .planning/phases/05-firm-detail-pages/05-UI-SPEC.md
  </read_first>
  <action>
    Create `FirmHero.tsx` as a Client or Server component.
    Implement D-01: Create an immersive hero section set against a dark gradient background (`#08080F` to `#1E1E30`).
    Include:
    - Firm Logo (using Next.js Image) and Name
    - `RuleDifficultyScore` component
    - Featured Offer badge (if available)
    - CTA Buttons: "Visit Site" (primary, accent color, links to `/go/[slug]`) and "Copy Code" (secondary outline, placeholder for now).
    - Inline Affiliate Disclosure (small text below CTAs).
  </action>
  <verify>
    <automated>grep -q "Visit Site" src/components/firm/FirmHero.tsx</automated>
  </verify>
  <done>FirmHero component exports correctly and includes all required visual elements and CTAs.</done>
</task>

<task type="auto">
  <name>Task 3: Implement Detail Page Route</name>
  <files>src/app/firms/[slug]/page.tsx</files>
  <read_first>
    - src/components/firm/FirmHero.tsx
  </read_first>
  <action>
    Create the dynamic route `page.tsx` for `/firms/[slug]`.
    Make it an async Server Component.
    Use `await params` (Next.js 15 requirement) to get the `slug`.
    Fetch the firm from Prisma (`prisma.firm.findUnique`) using the slug, including `offers`, `reviews`, and `faqs`.
    If firm is not found, call `notFound()`.
    Render `<FirmHero />` passing the fetched firm data.
    Leave a placeholder comment `{/* TODO: FirmDetailNav */}` below the hero.
  </action>
  <verify>
    <automated>grep -q "prisma.firm.findUnique" src/app/firms/\[slug\]/page.tsx</automated>
  </verify>
  <done>Page successfully queries Prisma, handles 404, and renders FirmHero.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Client → Server | URL param `slug` from untrusted client |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-05-01 | Tampering | `page.tsx` DB query | mitigate | Parameterize `findUnique` query by using Prisma's built-in escaping (Prisma handles SQL injection prevention). Return 404 cleanly on mismatch. |
</threat_model>

<verification>
- `npx prisma generate` runs successfully.
- Visiting `/firms/existing-slug` renders the Hero section with correct data.
- Hovering over the score bar shows the breakdown.
- "Visit Site" button points to `/go/[slug]`.
</verification>

<success_criteria>
- Firm detail page shell exists and connects to the database.
- Hero visual contract (D-01, D-04, D-05) is met.
</success_criteria>

<output>
After completion, create `.planning/phases/05-firm-detail-pages/05-01-SUMMARY.md`
</output>
