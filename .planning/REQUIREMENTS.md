# Requirements: PropPilot

**Defined:** 2026-05-03
**Core Value:** Traders can find the best prop firm for their needs, claim the best available discount, and trust that the information is accurate and transparent — all in a single premium experience.

## v1 Requirements

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password via Clerk
- [ ] **AUTH-02**: User can sign in with social login (Google) via Clerk
- [ ] **AUTH-03**: User can reset password via email link
- [ ] **AUTH-04**: User session persists across browser refresh
- [ ] **AUTH-05**: User profile synced to PostgreSQL on first sign-in (Clerk webhook)
- [ ] **AUTH-06**: Protected routes (dashboard, claims, admin) redirect unauthenticated users to sign-in
- [ ] **AUTH-07**: Admin role enforced via Clerk publicMetadata — admin routes inaccessible to non-admins

### Home Page

- [ ] **HOME-01**: Home page displays a premium hero section with headline, subheadline, and search bar
- [ ] **HOME-02**: Hero includes CTA buttons: Compare Firms, Browse Discounts, Join/Login
- [ ] **HOME-03**: Home page displays a "Live Deals / Featured Firms" section with active discount codes
- [ ] **HOME-04**: Home page displays trust metrics (e.g., number of firms compared, verified deals, community members)
- [ ] **HOME-05**: Home page displays a polished "Verified Savings" or "Active Deals" section with card layout
- [ ] **HOME-06**: Home page includes social proof and a PropPilot Points/community section
- [ ] **HOME-07**: Home page includes a clean FAQ section
- [ ] **HOME-08**: Home page includes a footer with legal/disclaimer links and affiliate transparency notice
- [ ] **HOME-09**: Home page has subtle motion and card animations (Framer Motion)

### Comparison Engine

- [ ] **COMP-01**: Compare page displays all firms in a card/table hybrid layout
- [ ] **COMP-02**: Filter bar supports: challenge type, account size, evaluation type, drawdown type, daily loss, fee range, discount availability, funding style (instant/funded/challenge)
- [ ] **COMP-03**: Sorting options: lowest cost, best discount, lowest drawdown, highest payout speed, best overall score
- [ ] **COMP-04**: Each firm card/row shows: logo, name, program type, account size, challenge fee, discount code, true cost after discount, drawdown %, daily loss %, payout speed, rules badges, score
- [ ] **COMP-05**: Each firm card has CTA buttons: View Details, Copy Code, Visit Site
- [ ] **COMP-06**: Side-by-side comparison for up to 3 firms (URL state: `?compare=slug1,slug2`)
- [ ] **COMP-07**: Sticky filter bar on desktop; mobile-friendly filter drawer on mobile
- [ ] **COMP-08**: Search bar to search firms by name on compare page
- [ ] **COMP-09**: "Last verified" date shown on each firm entry

### Firm Detail Page

- [ ] **FIRM-01**: Firm detail page shows hero summary with logo, rating/score, featured offer, discount code, and CTA buttons
- [ ] **FIRM-02**: Page includes tabbed sections: Overview, Rules, Pricing, Payouts, Pros & Cons, Reviews, FAQs
- [ ] **FIRM-03**: "Copy discount code" interaction with animated confirmation
- [ ] **FIRM-04**: "Visit Site" CTA routes through tracked `/go/[slug]` affiliate redirect route
- [ ] **FIRM-05**: Affiliate disclosure displayed inline on firm detail page
- [ ] **FIRM-06**: Rule Difficulty Score displayed (weighted score: drawdown type, consistency rules, profit target, restrictions)
- [ ] **FIRM-07**: Reviews section shows user-submitted reviews with ratings
- [ ] **FIRM-08**: FAQs section with expandable answers
- [ ] **FIRM-09**: Structured comparison summary and verdict section

### Affiliate & Click Tracking

- [ ] **TRACK-01**: Affiliate redirect route `/go/[slug]` logs click event asynchronously and redirects to firm's affiliate URL
- [ ] **TRACK-02**: "Copy Code" action logs copy event to database (Server Action)
- [ ] **TRACK-03**: Firm detail page visit is logged for analytics
- [ ] **TRACK-04**: Click and copy events capture: firmId, offerId, userId (if logged in), timestamp

### Guides / Education

- [ ] **GUIDE-01**: Guides page displays educational content in premium article card layout
- [ ] **GUIDE-02**: Guide topics cover: drawdown types, evaluation structures, payout rules, common mistakes, rule breakdowns
- [ ] **GUIDE-03**: Individual guide article page with clean reading experience
- [ ] **GUIDE-04**: Guide articles link internally to relevant firm pages
- [ ] **GUIDE-05**: Guide pages are SEO-optimized with proper heading structure, metadata, and slug-based URLs

### Rewards / Perks

- [ ] **RWRD-01**: Rewards page explains how the PropPilot Points system works with tier levels and progress indicators
- [ ] **RWRD-02**: Tier levels shown (Bronze, Silver, Gold, Platinum) with point thresholds and benefits
- [ ] **RWRD-03**: Rewards page includes claim and redemption UX explanation
- [ ] **RWRD-04**: Logged-in users can view their current point balance and tier on the rewards page and dashboard
- [ ] **RWRD-05**: Points are awarded automatically when admin approves a purchase claim

### User Dashboard

- [ ] **DASH-01**: User dashboard shows current profile summary (name, email, tier, points balance)
- [ ] **DASH-02**: User can view their purchase claim history (all submitted claims with status)
- [ ] **DASH-03**: User can view their saved/bookmarked firms
- [ ] **DASH-04**: User can view their reward status (points balance, tier, tier progress)
- [ ] **DASH-05**: User can save/bookmark a firm from the compare or detail page

### Purchase Claim / Verification

- [ ] **CLAM-01**: Logged-in user can submit a purchase claim with: firm name, order ID, purchase email, amount paid, purchase date, discount code used, receipt screenshot or PDF upload
- [ ] **CLAM-02**: Receipt/PDF upload uses file storage service (UploadThing) — not routed through Next.js API body
- [ ] **CLAM-03**: Claim is stored with status: PENDING on submission
- [ ] **CLAM-04**: User receives on-screen confirmation after claim submission
- [ ] **CLAM-05**: Claim includes audit trail with timestamps for all status changes
- [ ] **CLAM-06**: Admin can view all pending/approved/rejected claims in admin dashboard
- [ ] **CLAM-07**: Admin can approve a claim → triggers automatic point award to user balance
- [ ] **CLAM-08**: Admin can reject a claim with a rejection reason
- [ ] **CLAM-09**: Claim submission requires user to be logged in (redirect to sign-in if not)
- [ ] **CLAM-10**: Claim submission records which discount code was used

### Admin Dashboard

- [ ] **ADMN-01**: Admin can add, edit, and delete prop firm records (name, logo, rules, metrics, offers)
- [ ] **ADMN-02**: Admin can add, edit, and deactivate discount codes / affiliate offers per firm
- [ ] **ADMN-03**: Admin can review claim submissions with full detail view (receipt, order info, user info)
- [ ] **ADMN-04**: Admin can approve or reject claims from the review interface
- [ ] **ADMN-05**: Admin can manage reward tier thresholds and point values
- [ ] **ADMN-06**: Admin analytics view shows: affiliate link clicks, code copies, sign-ins, claim submissions, approved claims
- [ ] **ADMN-07**: Admin action log records all admin actions with timestamp and actor
- [ ] **ADMN-08**: Admin can manage user reviews (approve/reject)
- [ ] **ADMN-09**: Admin can manage guide posts (create, edit, publish)

### Database Schema

- [ ] **DB-01**: Prisma schema defines all core models: User, Firm, FirmOffer/DiscountCode, ComparisonStats, AffiliateClick, CopyEvent, PurchaseClaim, UserRewardPoints, PointTransaction, RewardTier, Review, GuidePost, FAQ, AdminActionLog
- [ ] **DB-02**: Database migrations run cleanly on fresh PostgreSQL instance
- [ ] **DB-03**: Seed data provides at least 8 realistic example prop firms with offers, rules, and FAQs
- [ ] **DB-04**: Connection pooling configured for Vercel deployment (Neon pooler or Prisma Accelerate)

### SEO & Performance

- [ ] **SEO-01**: Every page has unique title tag and meta description
- [ ] **SEO-02**: OpenGraph and Twitter Card meta tags on all public pages
- [ ] **SEO-03**: JSON-LD structured data on firm detail pages (Product + AggregateRating schema)
- [ ] **SEO-04**: Clean, semantic HTML with proper heading hierarchy
- [ ] **SEO-05**: Firm and guide pages use slug-based URLs
- [ ] **SEO-06**: Images are optimized via Next.js Image component
- [ ] **SEO-07**: Skeleton loaders shown during data fetching states
- [ ] **SEO-08**: Responsive design — excellent mobile and desktop experience

### Legal & Compliance

- [ ] **LEGL-01**: Affiliate disclosure visible on all comparison and firm pages
- [ ] **LEGL-02**: Legal / disclaimer page at `/legal`
- [ ] **LEGL-03**: Affiliate disclosure page at `/legal/affiliate-disclosure`
- [ ] **LEGL-04**: Footer includes links to legal pages and affiliate transparency statement
- [ ] **LEGL-05**: Firm data shows "last verified" date to communicate data freshness

### Setup & Deployment

- [ ] **DEPL-01**: README includes complete setup instructions (env vars, DB setup, Clerk config, UploadThing config)
- [ ] **DEPL-02**: All required environment variables documented with examples
- [ ] **DEPL-03**: Project is deployable to Vercel without modification
- [ ] **DEPL-04**: No TODOs remaining in core feature code

## v2 Requirements

### Notifications
- **NOTF-01**: User receives email notification when claim is approved or rejected
- **NOTF-02**: User receives email for reward tier upgrades

### Reviews
- **REVW-01**: User can submit a review with star rating and written content
- **REVW-02**: Reviews require admin approval before display

### Referral Program
- **REFL-01**: User can refer other traders and earn bonus points
- **REFL-02**: Referral tracking via unique referral links

### Advanced Analytics
- **ANLT-01**: Admin can view conversion funnel (visit → copy code → affiliate click → claim)
- **ANLT-02**: Per-firm analytics breakdown in admin

## Out of Scope

| Feature | Reason |
|---------|--------|
| Automated purchase verification via API | Prop firm APIs don't exist; manual review is safer and more accurate for v1 |
| Real-time price feeds from prop firms | No public API; admin-managed data is the right v1 approach |
| Native mobile apps | Web-first; mobile web covered by responsive design |
| Multi-language / i18n | English-only for v1 |
| Payment processing / direct checkout | Affiliate model only; no direct purchases through PropPilot |
| Forum or community features | Scope creep; Reddit/Discord serve this need; link out instead |
| Automated scraped firm data | Risk of stale/incorrect data; admin-managed is more accurate |
| Paid unverified placements | Against trust model; all featured spots must be disclosed |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 – AUTH-07 | Phase 1 | Pending |
| DB-01 – DB-04 | Phase 1 | Pending |
| HOME-01 – HOME-09 | Phase 3 | Pending |
| COMP-01 – COMP-09 | Phase 3 | Pending |
| FIRM-01 – FIRM-09 | Phase 3 | Pending |
| TRACK-01 – TRACK-04 | Phase 4 | Pending |
| ADMN-01 – ADMN-09 | Phase 2 | Pending |
| DASH-01 – DASH-05 | Phase 5 | Pending |
| CLAM-01 – CLAM-10 | Phase 6 | Pending |
| RWRD-01 – RWRD-05 | Phase 6 | Pending |
| GUIDE-01 – GUIDE-05 | Phase 7 | Pending |
| SEO-01 – SEO-08 | Phase 7–8 | Pending |
| LEGL-01 – LEGL-05 | Phase 8 | Pending |
| DEPL-01 – DEPL-04 | Phase 8 | Pending |

**Coverage:**
- v1 requirements: 73 total
- Mapped to phases: 73
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-03*
*Last updated: 2026-05-03 after initial definition*
