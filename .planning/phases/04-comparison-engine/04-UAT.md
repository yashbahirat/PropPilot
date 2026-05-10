---
status: testing
phase: 04-comparison-engine
source:
  - 04-01-SUMMARY.md
  - 04-02-SUMMARY.md
  - 04-03-SUMMARY.md
  - 04-04-SUMMARY.md
  - 04-05-SUMMARY.md
  - 04-06-SUMMARY.md
  - 04-07-SUMMARY.md
  - 04-08-SUMMARY.md
started: 2026-05-09T19:30:00Z
updated: 2026-05-09T19:34:00Z
---

## Current Test
none

## Tests

### 1. Compare Page Loads
expected: Navigating to /compare renders a dark page with the heading "Compare Prop Firms", a result count, and a list of firm rows (desktop) or cards (mobile). No blank screen, no error, no spinner that never resolves.
result: pass

### 2. Firm Scores Visible
expected: Every firm row/card shows a colored score badge (0–100). Scores ≥80 appear in teal, 60–79 in cyan, 40–59 in amber, <40 in red.
result: pass

### 3. Discount Code Copy
expected: Clicking a discount code badge/button copies the code to clipboard and shows a toast notification confirming "Code copied!". The badge shows a check icon briefly.
result: issue
reported: "I can see the code but no toast notification at the bottom of the screen"
severity: major
fix: Moved Toaster to top-right (was hidden behind ComparisonDock fixed bar). Removed redundant NuqsAdapter.

### 4. Search Filters Firms
expected: Typing in the search box filters the visible firm list in real-time to only show firms whose names contain the search term. The result count updates. Clearing the input restores all firms.
result: issue
reported: "website becomes very laggy when I start typing in search filed of /compare"
severity: major
fix: Replaced parseAsStringEnum with parseAsString in Nuqs config to fix parsing of empty strings causing failures. Added local state to SearchBar with a 250ms debounce before pushing updates to the URL parameters.

### 5. Filter Chips (Desktop)
expected: Clicking a filter chip (e.g. "Drawdown") opens a popover with options. Selecting an option activates the chip (turns teal), filters the list, and shows an ✕ to clear. Clicking ✕ removes the filter and chip returns to default state.
result: pass

### 6. Sort Controls
expected: Clicking a sort option (Score, Cost, Discount, Drawdown, Payout) re-orders the firm list. Active sort is highlighted in teal. Switching sorts updates the order immediately.
result: issue
reported: "NO IT does not reorder the list failed"
severity: major
fix: Added params.sort to the useReactTable state memo dependency array to ensure TanStack Table re-sorts when the sort option changes.

### 7. Compare Toggle + Dock
expected: Clicking the ✓ circle on a firm row/card adds it to the comparison dock at the bottom of the page. The dock shows the firm's name and logo. Adding a second firm enables the "Compare" button. Adding a 4th firm is prevented (toggle disabled). Clicking ✕ on a dock item removes it.
result: pass

### 8. Side-by-Side Comparison View
expected: With 2–3 firms in the dock, clicking "Compare" switches the page to a side-by-side table. All 19 metric rows are visible. Cells with the best value appear in teal, differing values appear in amber, identical values in white. A "← Back to list" link returns to the firm list.
result: issue
reported: "pass but I can add maximum 2 firms not more than that"
severity: major
fix: Added a dedicated showCompare URL parameter so the view only switches when the user explicitly clicks Compare Now, allowing them to add up to 3 firms from the list.

### 9. Affiliate Disclosure Banner
expected: An amber-tinted disclosure banner appears near the top of the page stating that PropPilot may earn commissions. It includes a "Learn more" link.
result: pass

### 10. Mobile Filter Drawer
expected: On a narrow viewport (or mobile), the desktop FilterBar is hidden. A "Filters" button is visible. Tapping it opens a bottom sheet with all filter options. Selecting a filter closes the sheet and filters the list. The button shows a teal dot when any filter is active.
result: issue
reported: "clicked on the filters but no drawer can be seen only a black screen"
severity: major
fix: Added missing "side === 'bottom'" styling to src/components/ui/sheet.tsx so the Drawer slides in properly instead of rendering invisibly.

### 11. URL State Persistence
expected: Applying a filter, sort, or search and then copying/pasting the URL into a new tab restores the exact same filtered/sorted state. The URL contains query params like ?q=, ?sort=, ?drawdownType=, etc.
result: pass

### 12. Rules Badges
expected: Each firm row/card shows compact colored badges for trading rules: green ✓ for allowed (News, Weekend, EA), red ✗ for not allowed. An amber "Consistency Rule" badge appears when required.
result: pass

## Summary

total: 12
passed: 7
issues: 5
pending: 0
skipped: 0

## Gaps

- truth: "Clicking a discount code badge copies the code and shows a sonner toast notification"
  status: failed
  reason: "User reported: toast not visible — Toaster at bottom-right was hidden behind the fixed ComparisonDock (z-50)"
  severity: major
  test: 3
  fix_applied: "Moved Toaster position to top-right in root layout; removed redundant NuqsAdapter from ComparePageClient"
  artifacts: [src/app/layout.tsx, src/components/compare/ComparePageClient.tsx]
  missing: []
- truth: "Typing in the search box filters the visible firm list in real-time to only show firms whose names contain the search term."
  status: failed
  reason: "User reported: Search list doesn't update and website becomes very laggy when typing"
  severity: major
  test: 4
  fix_applied: "Fixed nuqs parameter parsing logic for empty enum values; implemented local state and a debounce hook for SearchBar input to eliminate typing lag"
  artifacts: [src/lib/compare-params.ts, src/components/compare/SearchBar.tsx]
  missing: []
- truth: "Clicking a sort option (Score, Cost, Discount, Drawdown, Payout) re-orders the firm list."
  status: failed
  reason: "User reported: NO IT does not reorder the list failed"
  severity: major
  test: 6
  fix_applied: "Added params.sort to the useReactTable state memo dependency array to ensure TanStack Table re-sorts when the sort option changes."
  artifacts: [src/components/compare/FirmList.tsx]
  missing: []
- truth: "Adding a 4th firm is prevented (toggle disabled), meaning users can add up to 3 firms for comparison."
  status: failed
  reason: "User reported: pass but I can add maximum 2 firms not more than that"
  severity: major
  test: 8
  fix_applied: "Added a dedicated showCompare URL parameter so the view only switches when the user explicitly clicks Compare Now, allowing them to add up to 3 firms from the list."
  artifacts: [src/components/compare/ComparisonDock.tsx, src/components/compare/ComparePageClient.tsx, src/lib/compare-params.ts]
  missing: []
- truth: "The mobile Filter Drawer uses the shadcn Sheet component which must include side styling for 'bottom'."
  status: failed
  reason: "User reported: clicked on the filters but no drawer can be seen only a black screen"
  severity: major
  test: 10
  fix_applied: "Added missing 'side === bottom' styling to src/components/ui/sheet.tsx so the Drawer slides in properly instead of rendering invisibly."
  artifacts: [src/components/ui/sheet.tsx]
  missing: []
