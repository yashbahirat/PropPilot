---
status: complete
phase: 02-admin-firm-offer-management
source: [02-01-SUMMARY.md, 02-02-SUMMARY.md, 02-03-SUMMARY.md, 02-04-SUMMARY.md, 02-05-SUMMARY.md, 02-06-SUMMARY.md, 02-07-SUMMARY.md]
started: 2026-05-04T00:33:00Z
updated: 2026-05-04T14:40:45Z
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

[testing complete]

## Tests

### 1. Cold Start Smoke Test
expected: Kill any running server/service. Clear ephemeral state (temp DBs, caches, lock files). Start the application from scratch (e.g. `npx prisma db seed` and `npm run dev`). Server boots without errors, the seed completes successfully, and navigating to `/admin` loads the dashboard with the new sidebar layout and seeded data.
result: pass

### 2. Admin Layout & Routing
expected: Navigate to `/admin`. You should see the Admin Sidebar with links to Dashboard, Firms, Reviews, and Guides, and placeholder metrics cards on the dashboard.
result: pass

### 3. Firm Data Table
expected: Navigate to `/admin/firms`. You should see a data table listing the seeded firms (like Apex Trader Funding, Topstep).
result: issue
reported: "not loading giving error"
severity: blocker

### 4. Firm Create/Edit Form
expected: Click "Add Firm" or edit an existing firm from the table. You should see a tabbed form (General, Metrics, Settings). Modify a field and save it. The table should reflect the updated data.
result: issue
reported: "gives me an error"
severity: blocker

### 5. Offer Management
expected: Edit an existing firm and click the "Offers" tab. Add a new promotional offer (e.g. "SUMMER50"). It should appear in the firm's active offers list.
result: issue
reported: "throws error"
severity: blocker

### 6. Guide Post Management
expected: Navigate to `/admin/guides`. Click "Add Guide", fill in the Markdown content and title, toggle "Published", and save. It should appear in the list view as "Published".
result: issue
reported: "cant do it gives error maybe in routing"
severity: blocker

### 7. Review Moderation
expected: Navigate to `/admin/reviews`. You should see a data table of user reviews. Click "Approve" on a pending review. Its status should change to "Approved" with a green indicator.
result: issue
reported: "get an error"
severity: blocker

## Summary

total: 7
passed: 2
issues: 5
pending: 0
skipped: 0

## Gaps

- truth: "Navigate to `/admin/firms`. You should see a data table listing the seeded firms (like Apex Trader Funding, Topstep)."
  status: failed
  reason: "User reported: not loading giving error"
  severity: blocker
  test: 3
  artifacts: []
  missing: []

- truth: "Click \"Add Firm\" or edit an existing firm from the table. You should see a tabbed form (General, Metrics, Settings). Modify a field and save it. The table should reflect the updated data."
  status: failed
  reason: "User reported: gives me an error"
  severity: blocker
  test: 4
  artifacts: []
  missing: []

- truth: "Edit an existing firm and click the \"Offers\" tab. Add a new promotional offer (e.g. \"SUMMER50\"). It should appear in the firm's active offers list."
  status: failed
  reason: "User reported: throws error"
  severity: blocker
  test: 5
  artifacts: []
  missing: []

- truth: "Navigate to `/admin/guides`. Click \"Add Guide\", fill in the Markdown content and title, toggle \"Published\", and save. It should appear in the list view as \"Published\"."
  status: failed
  reason: "User reported: cant do it gives error maybe in routing"
  severity: blocker
  test: 6
  artifacts: []
  missing: []

- truth: "Navigate to `/admin/reviews`. You should see a data table of user reviews. Click \"Approve\" on a pending review. Its status should change to \"Approved\" with a green indicator."
  status: failed
  reason: "User reported: get an error"
  severity: blocker
  test: 7
  artifacts: []
  missing: []
