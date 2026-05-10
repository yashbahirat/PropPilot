---
phase: 05-firm-detail-pages
plan: 02
type: execute
wave: 2
depends_on: ["01"]
files_modified:
  - src/components/firm/FirmDetailNav.tsx
  - src/components/firm/tabs/OverviewTab.tsx
  - src/components/firm/tabs/ProsConsTab.tsx
  - src/app/firms/[slug]/page.tsx
autonomous: true
requirements:
  - FIRM-02
  - FIRM-09
must_haves:
  truths:
    - User can navigate content via horizontal tabs on desktop
    - User can navigate content via vertical accordions on mobile
    - Overview tab displays firm summary and verdict
    - Pros & Cons tab displays admin-curated lists
    - Empty states are shown for tabs with no data
  artifacts:
    - path: src/components/firm/FirmDetailNav.tsx
      provides: Responsive Tab/Accordion navigation
    - path: src/components/firm/tabs/OverviewTab.tsx
      provides: Overview content component
    - path: src/components/firm/tabs/ProsConsTab.tsx
      provides: Pros and Cons list component
  key_links:
    - from: src/app/firms/[slug]/page.tsx
      to: src/components/firm/FirmDetailNav.tsx
      via: React component render
---

<objective>
Implement the responsive Tab/Accordion navigation system and build the first two content sections (Overview, Pros & Cons).

Purpose: Creates the core content consumption UX, fulfilling D-02 (desktop tabs) and D-03 (mobile accordions), while establishing the pattern for empty states (D-06, D-07).
Output: FirmDetailNav component, OverviewTab component, ProsConsTab component.
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
  <name>Task 1: Build Overview and Pros/Cons Tabs</name>
  <files>src/components/firm/tabs/OverviewTab.tsx, src/components/firm/tabs/ProsConsTab.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-CONTEXT.md
  </read_first>
  <action>
    Create `OverviewTab.tsx` taking firm data as props. Render the firm description, key metrics summary, and the "verdict" section (FIRM-09).
    Create `ProsConsTab.tsx` taking firm data. Render lists of pros and cons using `shadcn/ui` Card.
    Implement D-07: If Pros/Cons list is empty, show an empty state message ("No pros/cons added yet.") instead of hiding the content area.
    Use dark mode typography: `#1E1E30` for card backgrounds, 16px body text.
  </action>
  <verify>
    <automated>grep -q "OverviewTab" src/components/firm/tabs/OverviewTab.tsx</automated>
  </verify>
  <done>Both tab content components are created and handle empty states.</done>
</task>

<task type="auto">
  <name>Task 2: Build Responsive Navigation System</name>
  <files>src/components/firm/FirmDetailNav.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-CONTEXT.md
  </read_first>
  <action>
    Create `FirmDetailNav.tsx` as a Client Component.
    Implement D-02 and D-03:
    - On desktop (`md:block`), use `shadcn/ui` Tabs (`<Tabs>`, `<TabsList>`, `<TabsTrigger>`, `<TabsContent>`).
    - On mobile (`md:hidden`), use `shadcn/ui` Accordion (`<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>`).
    Sections: Overview, Rules, Pricing, Payouts, Pros & Cons, Reviews, FAQs.
    Implement D-06: Always show all section triggers/headers, even if data is empty.
    For Overview and Pros & Cons, use the components from Task 1. For the others, render placeholder divs (`<div className="p-4 text-muted-foreground">Content coming soon</div>`).
  </action>
  <verify>
    <automated>grep -q "TabsList" src/components/firm/FirmDetailNav.tsx && grep -q "Accordion" src/components/firm/FirmDetailNav.tsx</automated>
  </verify>
  <done>FirmDetailNav renders both Tabs and Accordions controlled by Tailwind responsive classes.</done>
</task>

<task type="auto">
  <name>Task 3: Integrate Navigation into Page</name>
  <files>src/app/firms/[slug]/page.tsx</files>
  <read_first>
    - src/components/firm/FirmDetailNav.tsx
  </read_first>
  <action>
    Update `src/app/firms/[slug]/page.tsx`.
    Replace the placeholder comment `{/* TODO: FirmDetailNav */}` with the `<FirmDetailNav firm={firm} />` component.
    Pass the necessary firm data to the navigation component.
  </action>
  <verify>
    <automated>grep -q "FirmDetailNav" src/app/firms/\[slug\]/page.tsx</automated>
  </verify>
  <done>Page successfully renders the FirmDetailNav component below the hero.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| DB → Client | Rendering user-generated or admin-generated rich text |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-05-02 | Spoofing/XSS | `OverviewTab.tsx` | mitigate | Ensure React automatically escapes all string outputs. If rendering markdown or HTML for description/verdict, use a safe sanitizer (e.g., `DOMPurify` or rely on React's built-in text escaping if plain text). |
</threat_model>

<verification>
- Resizing browser window switches between Tabs and Accordion views.
- Clicking/expanding Overview and Pros & Cons shows the correct data.
- Empty states appear when a firm has no pros/cons.
</verification>

<success_criteria>
- Responsive navigation contract (D-02, D-03, D-06) is fully functional.
</success_criteria>

<output>
After completion, create `.planning/phases/05-firm-detail-pages/05-02-SUMMARY.md`
</output>
