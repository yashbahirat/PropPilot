---
phase: 07-user-dashboard-auth-ux
plan: 05
type: execute
wave: 2
depends_on: ["02"]
files_modified: ["src/app/(dashboard)/claims/page.tsx", "src/components/dashboard/ClaimsTable.tsx"]
autonomous: true
requirements: ["DASH-02"]
must_haves:
  truths:
    - "User can view a table of their submitted purchase claims"
    - "Claims display their current status (PENDING, APPROVED, REJECTED)"
  artifacts:
    - path: "src/app/(dashboard)/claims/page.tsx"
      provides: "Claims history page"
    - path: "src/components/dashboard/ClaimsTable.tsx"
      provides: "Table component for claim history"
  key_links:
    - from: "src/app/(dashboard)/claims/page.tsx"
      to: "prisma.purchaseClaim"
      via: "Server Component fetch"
      pattern: "db\\.purchaseClaim\\.findMany"
---

<objective>
Build the Claims History view in the user dashboard.

Purpose: Implement DASH-02 so users can track the status of their purchase claims.
Output: Claims history page and data table.
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
  <name>Task 1: Create ClaimsTable component</name>
  <read_first>src/components/dashboard/ClaimsTable.tsx</read_first>
  <action>Create a shadcn UI `<Table>` component to display `PurchaseClaim` data. Columns should include: Date, Firm Name, Amount Paid, Discount Code, Status. Use a `<Badge>` for the status (PENDING = yellow/neutral, APPROVED = green/teal, REJECTED = red). Display the rejection reason if status is REJECTED.</action>
  <verify>
    <automated>test -f src/components/dashboard/ClaimsTable.tsx</automated>
  </verify>
  <acceptance_criteria>Table component accurately maps claim data and status badges.</acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Assemble Claims History Page</name>
  <read_first>src/app/(dashboard)/claims/page.tsx</read_first>
  <action>In this Server Component, fetch all `PurchaseClaim` records for the authenticated user, ordered by `createdAt` descending. Include the `firm` relation to display the firm name. Render the `<ClaimsTable />`. Show a helpful empty state if no claims exist.</action>
  <verify>
    <automated>grep -q "db.purchaseClaim.findMany" src/app/(dashboard)/claims/page.tsx</automated>
  </verify>
  <acceptance_criteria>Page successfully queries DB and renders the claims table.</acceptance_criteria>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| Database -> UI | Rendering user-specific claim history |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-07-05 | Info Disclosure | Claims Page | mitigate | Filter Prisma query strictly by the authenticated user's clerkId |
</threat_model>

<verification>
1. Table renders correct columns for claims.
2. Badges display accurate colors for PENDING/APPROVED/REJECTED.
3. Users only see their own claims.
</verification>

<success_criteria>
Claim history tracking is fully visible to the user (DASH-02).
</success_criteria>

<output>
After completion, create `.planning/phases/07-user-dashboard-auth-ux/07-05-SUMMARY.md`
</output>
