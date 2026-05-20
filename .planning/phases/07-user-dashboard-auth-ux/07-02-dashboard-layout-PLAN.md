---
phase: 07-user-dashboard-auth-ux
plan: 02
type: execute
wave: 1
depends_on: []
files_modified: ["src/app/(dashboard)/layout.tsx", "src/components/layout/DashboardSidebar.tsx", "src/components/layout/MobileDrawer.tsx"]
autonomous: true
requirements: ["DASH-01"]
must_haves:
  truths:
    - "Dashboard has a collapsible desktop sidebar"
    - "Sidebar contains a Sign Out button at the bottom"
    - "Mobile drawer includes dashboard links for signed-in users"
  artifacts:
    - path: "src/app/(dashboard)/layout.tsx"
      provides: "Dashboard layout incorporating the sidebar"
    - path: "src/components/layout/DashboardSidebar.tsx"
      provides: "Desktop sidebar component"
  key_links: []
---

<objective>
Build the Dashboard layout, including a collapsible desktop sidebar and integrating dashboard links into the existing mobile drawer.

Purpose: Implement D-01, D-02, and D-03.
Output: Dashboard layout structure and navigation components.
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
  <name>Task 1: Create DashboardSidebar component</name>
  <files>src/components/layout/DashboardSidebar.tsx</files>
  <action>Create a new client component `DashboardSidebar`. Use Framer Motion for a collapsible state (`w-64` vs `w-16`). Include navigation links: Profile (`/dashboard`), Claims (`/dashboard/claims`), Rewards (`/dashboard/rewards`), Saved Firms (`/dashboard/saved`). When collapsed, show only Lucide icons (User, FileText, Gift, Bookmark). At the bottom, place the Clerk `<SignOutButton />` (D-02).</action>
  <verify>
    <automated>test -f src/components/layout/DashboardSidebar.tsx</automated>
  </verify>
  <done>Sidebar component exists with collapsible behavior and Sign Out button.</done>
</task>

<task type="auto">
  <name>Task 2: Integrate sidebar into Dashboard layout</name>
  <files>src/app/(dashboard)/layout.tsx</files>
  <action>Update the layout to render `<DashboardSidebar />` on desktop (`hidden md:block`). Ensure the main content area adjusts its margin/padding appropriately when the sidebar collapses/expands.</action>
  <verify>
    <automated>grep -q "DashboardSidebar" src/app/(dashboard)/layout.tsx</automated>
  </verify>
  <done>Sidebar is integrated into the dashboard layout.</done>
</task>

<task type="auto">
  <name>Task 3: Update MobileDrawer with dashboard links</name>
  <files>src/components/layout/MobileDrawer.tsx</files>
  <action>Update `MobileDrawer.tsx` to conditionally render dashboard links when `isSignedIn` is true (D-03). The links should map to the same routes as the desktop sidebar. Append them below the main marketing links or replace them entirely in the dashboard context.</action>
  <verify>
    <automated>grep -q "dashboard" src/components/layout/MobileDrawer.tsx</automated>
  </verify>
  <done>Mobile drawer shows dashboard links for authenticated users.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| Client -> UI | UI elements render based on auth state |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-07-02 | Info Disclosure | DashboardSidebar | accept | Layout only shows navigation links; sensitive data protected by Server Components |
</threat_model>

<verification>
1. Sidebar renders on desktop and can be collapsed.
2. Sign out button exists at the bottom.
3. Mobile drawer shows dashboard links when signed in.
</verification>

<success_criteria>
Dashboard navigation structure is fully functional across devices.
</success_criteria>

<output>
After completion, create `.planning/phases/07-user-dashboard-auth-ux/07-02-SUMMARY.md`
</output>
