---
phase: 07-user-dashboard-auth-ux
plan: 01
type: execute
wave: 1
depends_on: []
files_modified: ["src/app/sign-in/[[...sign-in]]/page.tsx", "src/app/sign-up/[[...sign-up]]/page.tsx"]
autonomous: true
requirements: ["DASH-01"]
must_haves:
  truths:
    - "Clerk auth pages match the dark mode shadcn UI aesthetic perfectly"
    - "Sign-in and sign-up containers are seamless with a glow effect"
  artifacts:
    - path: "src/app/sign-in/[[...sign-in]]/page.tsx"
      provides: "Customized Clerk SignIn component"
    - path: "src/app/sign-up/[[...sign-up]]/page.tsx"
      provides: "Customized Clerk SignUp component"
  key_links: []
---

<objective>
Polish the Auth UX by deeply customizing the Clerk `appearance` prop to match the PropPilot design system.

Purpose: Implement D-04 and D-05 to ensure the auth experience feels like a native part of the app.
Output: Updated sign-in and sign-up pages.
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
@.planning/phases/07-user-dashboard-auth-ux/07-UI-SPEC.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Customize SignIn appearance</name>
  <read_first>src/app/sign-in/[[...sign-in]]/page.tsx</read_first>
  <action>Modify the `appearance` prop of `<SignIn />`. Override `elements.card` to remove the default background/border and add a subtle glow/elevation effect (seamless container per D-05). Map `formFieldInput` to the exact border and focus ring colors of shadcn dark mode (e.g. `focus:ring-[#00D4AA]`). Map `socialButtonsBlockButton` to glassmorphism styles (`bg-[#131320] border-[#1E1E30] hover:bg-[#1A1A2E]`). Refer to D-04 and the UI-SPEC colors.</action>
  <verify>
    <automated>grep -q "elements: {" src/app/sign-in/[[...sign-in]]/page.tsx</automated>
  </verify>
  <acceptance_criteria>SignIn component appearance matches shadcn dark mode seamlessly.</acceptance_criteria>
</task>

<task type="auto">
  <name>Task 2: Customize SignUp appearance</name>
  <read_first>src/app/sign-up/[[...sign-up]]/page.tsx</read_first>
  <action>Apply the exact same `appearance` prop customizations from Task 1 to the `<SignUp />` component, ensuring the same seamless container and input styles.</action>
  <verify>
    <automated>grep -q "elements: {" src/app/sign-up/[[...sign-up]]/page.tsx</automated>
  </verify>
  <acceptance_criteria>SignUp component appearance matches shadcn dark mode seamlessly.</acceptance_criteria>
</task>

</tasks>

<threat_model>
## Trust Boundaries
| Boundary | Description |
|----------|-------------|
| Client -> Clerk | User submits credentials to third-party auth |

## STRIDE Threat Register
| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-07-01 | Spoofing | Auth Pages | mitigate | Use Clerk's secure components directly |
</threat_model>

<verification>
1. Check `/sign-in` renders with dark mode inputs and seamless container glow.
2. Check `/sign-up` renders with the same aesthetic.
</verification>

<success_criteria>
Auth UX perfectly matches PropPilot branding (D-04, D-05).
</success_criteria>

<output>
After completion, create `.planning/phases/07-user-dashboard-auth-ux/07-01-SUMMARY.md`
</output>
