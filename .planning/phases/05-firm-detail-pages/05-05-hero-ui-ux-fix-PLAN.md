---
phase: 05-firm-detail-pages
plan: 05
type: execute
wave: 4
gap_closure: true
depends_on: ["01"]
files_modified:
  - src/components/firm/FirmHero.tsx
autonomous: true
requirements:
  - FIRM-01
must_haves:
  truths:
    - The hero section's visual design feels premium, satisfying user UI/UX expectations.
  artifacts:
    - path: src/components/firm/FirmHero.tsx
      provides: Enhanced Firm Hero Component
  key_links: []
---

<objective>
Fix gap in UI/UX quality for the FirmDetail Hero section.
Enhance the visual aesthetics and entrance animations to provide a more premium "Netflix-style" fintech feel, addressing user feedback that the initial implementation felt basic.
</objective>

<execution_context>
@~/.gemini/antigravity/get-shit-done/workflows/execute-plan.md
@~/.gemini/antigravity/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/05-firm-detail-pages/05-UAT.md
@.planning/phases/05-firm-detail-pages/05-UI-SPEC.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Enhance FirmHero Component UI/UX</name>
  <files>src/components/firm/FirmHero.tsx</files>
  <action>
    Convert `FirmHero.tsx` to a Client Component if needed, or wrap its contents in a Client Component (e.g., using `m.div` from Framer Motion) to add stagger entrance animations.
    Add deeper glassmorphism layering, dynamic glowing orb effects in the background (similar to the home page hero but scoped), and refine the typography scale (larger, tighter tracking) for the firm name.
    Improve the CTA button styling to feel more tactile and premium.
  </action>
  <verify>
    <automated>grep -q "m.div" src/components/firm/FirmHero.tsx || grep -q "framer-motion" src/components/firm/FirmHero.tsx</automated>
  </verify>
  <done>Hero section is visually enhanced with animations and premium styling.</done>
</task>

</tasks>

<verification>
- Navigate to `/firms/topstep`.
- Observe the entrance animation of the hero elements.
- Verify the background gradients and typography appear more premium.
</verification>

<success_criteria>
- The UI/UX gap for the hero section is closed.
</success_criteria>

<output>
After completion, create `.planning/phases/05-firm-detail-pages/05-05-SUMMARY.md`
</output>
