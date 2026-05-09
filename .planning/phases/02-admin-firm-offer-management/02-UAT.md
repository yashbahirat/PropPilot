---
status: testing
phase: 02-admin-firm-offer-management
source: [02-01-SUMMARY.md, 02-02-SUMMARY.md, 02-03-SUMMARY.md, 02-04-SUMMARY.md, 02-05-SUMMARY.md, 02-06-SUMMARY.md, 02-07-SUMMARY.md]
started: 2026-05-04T00:33:00Z
updated: 2026-05-04T15:11:00Z
session: retest-after-db-fix
---

## Current Test
<!-- OVERWRITE each test - shows where we are -->

number: 3
name: Firm Data Table
expected: |
  Navigate to `/admin/firms`. You should see a data table listing the seeded firms (like Apex Trader Funding, Topstep, FTMO).
awaiting: user response

## Tests

### 1. Cold Start Smoke Test
expected: Kill any running server/service. Clear ephemeral state. Start the application from scratch. Server boots without errors, seed completes, and navigating to `/admin` loads the dashboard.
result: pass

### 2. Admin Layout & Routing
expected: Navigate to `/admin`. You should see the Admin Sidebar with links to Dashboard, Firms, Reviews, and Guides, and placeholder metrics cards on the dashboard.
result: pass

### 3. Firm Data Table
expected: Navigate to `/admin/firms`. You should see a data table listing the seeded firms (like Apex Trader Funding, Topstep, FTMO).
result: [pending]

### 4. Firm Create/Edit Form
expected: Click "Add Firm" or edit an existing firm from the table. You should see a tabbed form (General, Metrics, Settings). Modify a field and save it. The table should reflect the updated data.
result: [pending]

### 5. Offer Management
expected: Edit an existing firm and click the "Offers" tab. Add a new promotional offer (e.g. "SUMMER50"). It should appear in the firm's active offers list.
result: [pending]

### 6. Guide Post Management
expected: Navigate to `/admin/guides`. Click "Add Guide", fill in the Markdown content and title, toggle "Published", and save. It should appear in the list view as "Published".
result: [pending]

### 7. Review Moderation
expected: Navigate to `/admin/reviews`. You should see a data table of user reviews. Click "Approve" on a pending review. Its status should change to "Approved" with a green indicator.
result: [pending]

## Summary

total: 7
passed: 2
issues: 0
pending: 5
skipped: 0

## Gaps

[none yet — retesting after fixes]
