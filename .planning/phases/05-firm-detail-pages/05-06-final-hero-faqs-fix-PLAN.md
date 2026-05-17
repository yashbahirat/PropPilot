---
phase: 05-firm-detail-pages
plan: 06
type: execute
wave: 5
gap_closure: true
depends_on: ["05"]
files_modified:
  - src/components/firm/FirmHero.tsx
  - prisma/seed.ts
autonomous: true
requirements:
  - FIRM-01
must_haves:
  truths:
    - The hero section UI/UX provides a definitive premium fintech experience that explicitly meets the user's aesthetic expectations.
    - The FAQs tab expands and collapses correctly using real seeded FAQ data.
  artifacts:
    - path: src/components/firm/FirmHero.tsx
      provides: Finalized Firm Hero Component
  key_links: []
---

<objective>
Address remaining UAT gaps in the Firm Detail Pages Phase.
1. Seed FAQ data into the database to allow functional testing of the Accordion component in the FAQs tab (fixes Test 10).
2. Dramatically overhaul the `FirmHero` UI/UX to ensure it meets the user's high expectations for a premium, Netflix-style fintech product (fixes Test 11).
</objective>

<execution_context>
@~/.gemini/antigravity/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@.planning/phases/05-firm-detail-pages/05-UAT.md
</context>

## User Review Required

> [!IMPORTANT]
> **Hero UI/UX Expectations**
> The previous hero iteration was rejected for not meeting expectations. Before I execute this plan, please tell me specifically what felt lacking so I can hit the mark this time:
> 1. Was it the layout/structure (e.g., do you want a full-width background image/mesh instead of just glowing orbs)?
> 2. Are the animations too subtle or too aggressive?
> 3. Does the typography need to be larger, bolder, or use a specific font style?
> 4. Any references (e.g., "make it look like the Vercel dashboard" or "more like Apple's dark mode")?

<tasks>

<task type="auto">
  <name>Task 1: Seed FAQ Data</name>
  <files>prisma/seed.ts</files>
  <action>
    Update the Prisma seed script to include at least 3-4 realistic FAQs for the seeded firms (e.g., Topstep, FTMO).
    Execute the seed script or provide a minimal script to inject this data if a full seed isn't safe.
  </action>
  <verify>
    <automated>npx prisma db seed --preview-feature (or targeted script)</automated>
  </verify>
  <done>FAQ data exists in the database for the seeded firms.</done>
</task>

<task type="auto">
  <name>Task 2: Finalize FirmHero UI/UX</name>
  <files>src/components/firm/FirmHero.tsx</files>
  <action>
    Implement the user's feedback (gathered during plan review) to drastically improve the FirmHero aesthetics.
    Apply advanced layout shifts, deeper shadows, more aggressive glassmorphism, or whatever specific changes the user requests.
  </action>
  <verify>
    <automated>grep -q "m.div" src/components/firm/FirmHero.tsx</automated>
  </verify>
  <done>Hero section is completely overhauled and aligns with the user's exact expectations.</done>
</task>

</tasks>

<verification>
- Run the app, navigate to `/firms/topstep`.
- Verify the FAQs tab displays the accordion and expands correctly.
- Verify the Hero section looks significantly better and incorporates the user's specific feedback.
</verification>

<success_criteria>
- Test 10 and Test 11 from the UAT document are fully resolved.
</success_criteria>

<output>
After completion, create `.planning/phases/05-firm-detail-pages/05-06-SUMMARY.md`
</output>
