---
status: complete
phase: 06-affiliate-tracking
source:
  - 06-01-affiliate-redirect-route-SUMMARY.md
  - 06-02-copy-event-server-action-SUMMARY.md
  - 06-03-copy-button-wiring-SUMMARY.md
  - 06-04-page-view-tracking-SUMMARY.md
started: 2026-05-20T15:02:00Z
updated: 2026-05-20T15:29:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Affiliate Redirect — basic redirect works
expected: Visiting `/go/ftmo` (or any seeded firm slug) in the browser redirects you to the firm's real affiliate/website URL. No 404, no error page.
result: pass

### 2. Affiliate Redirect — unknown slug returns 404
expected: Visiting `/go/nonexistent-firm-xyz` returns a JSON `{ "error": "Firm not found" }` response with HTTP 404 status.
result: pass

### 3. Copy Code button still works — firm detail page
expected: On a firm detail page (e.g. `/firms/ftmo`), clicking the "Copy Code" button in the hero panel copies the discount code to clipboard and shows the toast "Discount code copied to clipboard!" — the button animation plays (icon switches to checkmark). No errors in the browser console.
result: pass

### 4. Copy Code button still works — compare page
expected: On the `/compare` page, clicking a discount code badge (inline monospace button) in any firm row copies the code and shows the toast. No errors, no console warnings.
result: pass

### 5. Copy Code button still works — comparison view
expected: Opening side-by-side comparison (select 2 firms → compare), clicking the copy code button in the comparison header works normally — copies code, shows toast.
result: pass

### 6. Copy Code button still works — pricing tab
expected: On a firm detail page → Pricing tab, clicking the "Copy Code" button on any offer card copies the code and shows the success toast. No console errors.
result: issue
reported: "copy code text not visible — buttons render as dark rectangles with no visible label"
severity: cosmetic

### 7. Firm detail page loads without error
expected: Visiting any firm detail page (e.g. `/firms/ftmo`) loads normally — hero, tabs, content all render. No runtime error, no white screen, no "Application error" message.
result: pass

### 8. AffiliateClick record created after redirect
expected: After clicking "Visit Site" / "Get Funded Now" on a firm (which goes through `/go/[slug]`), check the database. An `AffiliateClick` row exists with the correct `firmId`.
result: pass

### 9. CopyEvent record created after copy
expected: After clicking a "Copy Code" button on any firm, check the database. A `CopyEvent` row exists with the correct `firmId` and `offerId`.
result: pass

### 10. ComparisonStats updated after firm page visit
expected: After visiting a firm detail page (e.g. `/firms/ftmo`), check the database. The `ComparisonStats` row for that firm has `pageViews` and `weekViews` incremented.
result: pass

## Summary

total: 10
passed: 9
issues: 1
skipped: 0
pending: 0

## Gaps

- truth: "Copy Code button on Pricing tab offer cards shows visible label text and copies code on click"
  status: failed
  reason: "User reported: copy code text not visible — buttons render as dark rectangles with no visible label"
  severity: cosmetic
  test: 6
  artifacts: [src/components/firm/tabs/PricingTab.tsx, src/components/firm/CopyCodeButton.tsx]
  missing: []
