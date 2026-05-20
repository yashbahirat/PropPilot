---
phase: 07-user-dashboard-auth-ux
plan: 03
type: execute
wave: 2
depends_on: ["02"]
files_modified: ["src/app/(dashboard)/page.tsx", "src/components/dashboard/RewardProgress.tsx", "src/components/dashboard/ProfileSummary.tsx"]
autonomous: true
requirements: ["DASH-01", "DASH-04"]
must_haves:
  truths:
    - "User can view their profile summary (name, email, join date)"
    - "User can view their current reward tier and points balance"
    - "Reward progress bar visually indicates distance to next tier"
  artifacts:
    - path: "src/app/(dashboard)/page.tsx"
      provides: "Main dashboard overview page"
    - path: "src/components/dashboard/RewardProgress.tsx"
      provides: "Visual progress bar for reward tiers"
  key_links:
    - from: "src/app/(dashboard)/page.tsx"
      to: "prisma.userRewardPoints"
      via: "Server Component fetch"
      pattern: "db\\.userRewardPoints\\.findUnique"
---

<objective>
Build the main dashboard overview page displaying the user's profile summary and detailed reward status.

Purpose: Implement DASH-01 and DASH-04, incorporating decisions D-09, D-10, and D-11.
Output: Dashboard overview page and reward progress components.
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
  <name>Task 1: Create ProfileSummary component</name>
  <read_first>src/components/dashboard/ProfileSummary.tsx</read_first>
  <action>Create a component that displays the user's name, email, and a premium tier badge. Use metallic/gem gradients for the badge (D-10) based on the `RewardTierName` enum (BRONZE, SILVER, GOLD, PLATINUM).</action>
  <verify>
    <automated>test -f src/components/dashboard/ProfileSummary.tsx</automated>
  </verify>
  <acceptance_criteria>Profile summary component handles rendering tier badges correctly.</acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Create RewardProgress component</name>
  <read_first>src/components/dashboard/RewardProgress.tsx</read_first>
  <action>Create a component that visualizes tier progress. Render a linear progress bar (D-09) showing current points vs. the threshold for the next tier. If the user has 0 points, display a clear "How to earn points" CTA (D-11).</action>
  <verify>
    <automated>test -f src/components/dashboard/RewardProgress.tsx</automated>
  </verify>
  <acceptance_criteria>Reward progress component renders the bar and the 0-points empty state.</acceptance_criteria>
</task>

<task type="auto">
  <name>Task 3: Assemble Dashboard Overview Page</name>
  <read_first>src/app/(dashboard)/page.tsx</read_first>
  <action>In this Server Component, fetch the `User` and `UserRewardPoints` records for the authenticated Clerk user. Fetch the `RewardTier` thresholds to calculate progress. Render `<ProfileSummary />` and `<RewardProgress />` side-by-side or stacked on mobile. If the user isn't in the DB, gracefully redirect to a generic error or handle syncing if needed (though webhook should handle it).</action>
  <verify>
    <automated>grep -q "db.userRewardPoints.findUnique" src/app/(dashboard)/page.tsx</automated>
  </verify>
  <acceptance_criteria>Dashboard page correctly fetches and passes data to profile and reward components.</acceptance_criteria>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| Database -> UI | Rendering user-specific reward data |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-07-03 | Info Disclosure | Dashboard Page | mitigate | Ensure Prisma query strictly filters by the authenticated user's clerkId |
</threat_model>

<verification>
1. User profile data renders correctly.
2. Reward tier badge uses a premium gradient.
3. Progress bar accurately reflects points towards the next tier.
</verification>

<success_criteria>
Main dashboard fulfills DASH-01 and DASH-04 with the required visual polish.
</success_criteria>

<output>
After completion, create `.planning/phases/07-user-dashboard-auth-ux/07-03-SUMMARY.md`
</output>
