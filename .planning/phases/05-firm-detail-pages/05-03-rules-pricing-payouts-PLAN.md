---
phase: 05-firm-detail-pages
plan: 03
type: execute
wave: 3
depends_on: ["02"]
files_modified:
  - src/components/firm/tabs/RulesTab.tsx
  - src/components/firm/tabs/PricingTab.tsx
  - src/components/firm/tabs/PayoutsTab.tsx
  - src/components/firm/CopyCodeButton.tsx
  - src/components/firm/FirmDetailNav.tsx
autonomous: true
requirements:
  - FIRM-03
must_haves:
  truths:
    - User can see detailed rules, pricing, and payouts in respective tabs
    - User can click a "Copy Code" button and see an animated confirmation
  artifacts:
    - path: src/components/firm/tabs/RulesTab.tsx
      provides: Rules breakdown content
    - path: src/components/firm/tabs/PricingTab.tsx
      provides: Pricing and true cost breakdown
    - path: src/components/firm/tabs/PayoutsTab.tsx
      provides: Payout info and profit split
    - path: src/components/firm/CopyCodeButton.tsx
      provides: Interactive clipboard copy button
  key_links:
    - from: src/components/firm/CopyCodeButton.tsx
      to: navigator.clipboard
      via: writeText
---

<objective>
Implement the Rules, Pricing, and Payouts tabs, and build the interactive Copy Code button.

Purpose: Populates the dense, data-heavy sections of the detail page, maintaining the authoritative fintech aesthetic, and delivers the micro-interaction for copying discount codes (FIRM-03).
Output: RulesTab, PricingTab, PayoutsTab, CopyCodeButton components.
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
  <name>Task 1: Build Copy Code Micro-interaction</name>
  <files>src/components/firm/CopyCodeButton.tsx, src/components/firm/FirmHero.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-CONTEXT.md
  </read_first>
  <action>
    Create `CopyCodeButton.tsx` as a Client Component.
    Takes `code` (string) as a prop.
    Implement `navigator.clipboard.writeText(code)`.
    Use Framer Motion (`import { m } from "framer-motion"`) to animate a checkmark icon appearing and the text changing to "Copied!" for 2 seconds.
    Also trigger a `sonner` toast confirmation.
    Update `FirmHero.tsx` to use this new `CopyCodeButton` instead of the placeholder for the secondary CTA.
  </action>
  <verify>
    <automated>grep -q "clipboard.writeText" src/components/firm/CopyCodeButton.tsx</automated>
  </verify>
  <done>Button copies to clipboard, animates state, and triggers toast.</done>
</task>

<task type="auto">
  <name>Task 2: Build Rules and Payouts Tabs</name>
  <files>src/components/firm/tabs/RulesTab.tsx, src/components/firm/tabs/PayoutsTab.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-UI-SPEC.md
  </read_first>
  <action>
    Create `RulesTab.tsx`: Render a grid or list of rules (Drawdown type, consistency rule, news trading, weekend holding, EA policy, minimum days, scaling). Use clear labels (14px, weight 600) and values.
    Create `PayoutsTab.tsx`: Render profit split %, payout frequency, payout speed, withdrawal methods.
    Use `shadcn/ui` Card for grouping information.
  </action>
  <verify>
    <automated>grep -q "RulesTab" src/components/firm/tabs/RulesTab.tsx && grep -q "PayoutsTab" src/components/firm/tabs/PayoutsTab.tsx</automated>
  </verify>
  <done>Both tabs are built with data-dense, readable layouts.</done>
</task>

<task type="auto">
  <name>Task 3: Build Pricing Tab and Wire Navigation</name>
  <files>src/components/firm/tabs/PricingTab.tsx, src/components/firm/FirmDetailNav.tsx</files>
  <read_first>
    - src/components/firm/CopyCodeButton.tsx
  </read_first>
  <action>
    Create `PricingTab.tsx`: Render challenge fees, list of available discount codes (using `<CopyCodeButton />` for each), and calculate the "true cost" after the best discount.
    Update `FirmDetailNav.tsx`: Import `RulesTab`, `PricingTab`, and `PayoutsTab`. Replace the placeholder divs with these actual components, passing the firm data.
  </action>
  <verify>
    <automated>grep -q "PricingTab" src/components/firm/FirmDetailNav.tsx</automated>
  </verify>
  <done>Pricing tab renders with copy buttons, and all three new tabs are wired into the main navigation.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Client | Clipboard API access |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-05-03 | Information Disclosure | `CopyCodeButton.tsx` | accept | Copying to clipboard is a deliberate user action; standard browser permissions apply. |
</threat_model>

<verification>
- Clicking Copy Code button changes text to "Copied!" and copies to clipboard.
- Rules, Pricing, and Payouts tabs display accurate data when clicked.
</verification>

<success_criteria>
- FIRM-03 is complete.
- Data-dense tabs are navigable and populated.
</success_criteria>

<output>
After completion, create `.planning/phases/05-firm-detail-pages/05-03-SUMMARY.md`
</output>
