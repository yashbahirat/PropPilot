---
phase: 07-user-dashboard-auth-ux
plan: 04
type: execute
wave: 2
depends_on: ["02"]
files_modified: ["src/app/(dashboard)/saved/page.tsx", "src/components/dashboard/SavedFirmCard.tsx", "src/app/actions/savedFirms.ts", "src/components/firms/SaveFirmButton.tsx"]
autonomous: true
requirements: ["DASH-03", "DASH-05"]
must_haves:
  truths:
    - "User can save a firm from the UI"
    - "User can view a grid of their saved firms"
    - "User can remove a firm directly from the grid card"
  artifacts:
    - path: "src/app/(dashboard)/saved/page.tsx"
      provides: "Saved firms overview page"
    - path: "src/app/actions/savedFirms.ts"
      provides: "Server actions for toggling save status"
  key_links:
    - from: "src/app/(dashboard)/saved/page.tsx"
      to: "prisma.savedFirm"
      via: "Server Component fetch"
      pattern: "db\\.savedFirm\\.findMany"
---

<objective>
Build the Saved Firms view in the dashboard and the global action to bookmark a firm.

Purpose: Implement DASH-03, DASH-05, and decisions D-06, D-07, D-08.
Output: Saved firms page, firm card component, and Server Actions.
</objective>

<execution_context>
@~/.gemini/antigravity/get-shit-done/workflows/execute-plan.md
@~/.gemini/antigravity/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/07-user-dashboard-auth-ux/07-CONTEXT.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Saved Firms Server Actions</name>
  <read_first>src/app/actions/savedFirms.ts</read_first>
  <action>Create Server Actions `toggleSavedFirm(firmId: string)` and `removeSavedFirm(firmId: string)`. They must authenticate the user, query Prisma `SavedFirm` table, toggle/delete the record, and call `revalidatePath` to update the UI.</action>
  <verify>
    <automated>grep -q "revalidatePath" src/app/actions/savedFirms.ts</automated>
  </verify>
  <acceptance_criteria>Server actions successfully manage SavedFirm records.</acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Create SaveFirmButton and SavedFirmCard components</name>
  <read_first>src/components/firms/SaveFirmButton.tsx, src/components/dashboard/SavedFirmCard.tsx</read_first>
  <action>Create `<SaveFirmButton />` (for use on compare/detail pages) that calls `toggleSavedFirm`. Create `<SavedFirmCard />` to display the firm's basic info (logo, name, challenge fee) and include an inline "Remove" button (D-07) that calls `removeSavedFirm`.</action>
  <verify>
    <automated>test -f src/components/dashboard/SavedFirmCard.tsx</automated>
  </verify>
  <acceptance_criteria>UI components for interacting with saved firms are created.</acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Assemble Saved Firms Page</name>
  <read_first>src/app/(dashboard)/saved/page.tsx</read_first>
  <action>In this Server Component, fetch all `SavedFirm` records for the user, including the `firm` relation. Render the results in a grid layout (D-06). If empty, show a specific "No Saved Firms" empty state. Include a prominent bulk "Compare Selected" CTA button (D-08) that links to `/compare?compare=slug1,slug2`.</action>
  <verify>
    <automated>grep -q "db.savedFirm.findMany" src/app/(dashboard)/saved/page.tsx</automated>
  </verify>
  <acceptance_criteria>Saved firms page renders the grid and bulk compare action.</acceptance_criteria>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| Client -> API | User invoking Server Actions to mutate DB |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-07-04 | Tampering | Server Actions | mitigate | Ensure action explicitly checks `userId` matches the authenticated user before deleting `SavedFirm` |
</threat_model>

<verification>
1. `SavedFirm` records can be created via the button.
2. The `/dashboard/saved` page renders the grid of cards.
3. The inline remove button successfully deletes the record and updates the UI.
4. The "Compare Selected" CTA is visible.
</verification>

<success_criteria>
Users can seamlessly bookmark and manage their saved firms (DASH-03, DASH-05).
</success_criteria>

<output>
After completion, create `.planning/phases/07-user-dashboard-auth-ux/07-04-SUMMARY.md`
</output>
