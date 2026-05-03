# Roadmap: PropPilot

**Milestone:** v1.0 — Full Launch
**Granularity:** Fine
**Total Phases:** 12
**Requirements Coverage:** 73/73 v1 requirements

---

## Phase 1: Foundation

**Goal:** Scaffold the Next.js 15 project with full TypeScript, Tailwind, shadcn/ui, Clerk auth, Prisma schema, and application shell (layout, nav, route groups).
**Requirements:** AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07, DB-01, DB-02, DB-04
**Depends on:** —
**UI hint:** yes

### Plans

1. Next.js 15 project initialization — create-next-app with TypeScript, Tailwind CSS, App Router, ESLint
2. Install and configure core dependencies — shadcn/ui, Framer Motion, Clerk, Prisma, nuqs, zod, uploadthing, sonner
3. Prisma schema — define all 14 core models (User, Firm, FirmOffer, AffiliateClick, CopyEvent, PurchaseClaim, UserRewardPoints, PointTransaction, RewardTier, Review, GuidePost, FAQ, AdminActionLog, SavedFirm)
4. Database setup — configure Neon PostgreSQL, connection pooling (DATABASE_URL + DIRECT_URL), run initial migration
5. Clerk integration — configure clerkMiddleware, route protection (dashboard/admin), publicMetadata role pattern
6. Clerk webhook — `/api/webhooks/clerk` route to sync user.created to Prisma (upsert + UserRewardPoints init)
7. App shell — root layout, route groups `(marketing)`, `(dashboard)`, `(admin)`, shared Header and Footer components
8. Design system setup — Tailwind config (dark mode: class, custom colors: teal/mint/cyan/purple palette), global CSS, typography, font (Inter/Outfit)
9. Environment configuration — `.env.example` with all required vars documented

### Success Criteria

1. `npx prisma db push` runs cleanly and all 14 models exist in the database
2. Visiting `/dashboard` while logged out redirects to Clerk sign-in
3. Visiting `/admin` while logged in as non-admin shows unauthorized — admin only accessible with `publicMetadata.role === 'admin'`
4. New user sign-up via Clerk creates a User + UserRewardPoints record in the database (webhook working)
5. App renders with correct dark theme, custom palette, and Inter/Outfit typography

---

## Phase 2: Admin — Firm & Offer Management

**Goal:** Build the admin interface for managing prop firms and discount codes, and seed the database with realistic example firms.
**Requirements:** ADMN-01, ADMN-02, ADMN-09, DB-03
**Depends on:** Phase 1

### Plans

1. Admin dashboard layout — sidebar nav, stats overview cards, admin-only route guard
2. Firm management UI — data table of all firms with add/edit/delete actions
3. Firm create/edit form — all fields: name, slug, logo, description, website, affiliate URL, metrics (drawdown, profit target, payout speed, etc.), rules flags (news allowed, weekend holding, EA allowed, consistency rule), last verified date
4. Discount code / offer management — per-firm offer list, create/edit/deactivate, fields: code, discount %, is_exclusive, expires_at, affiliate URL
5. Guide post management — create/edit/publish guide articles (title, slug, content, related firms)
6. Review moderation — list pending reviews, approve/reject
7. Seed script — 8+ realistic prop firms (FTMO-style, Apex-style, MFF-style) with full metrics, offers, FAQs, and rules data

### Success Criteria

1. Admin can create a new firm via the admin UI and it appears in the database
2. Admin can create a discount code linked to a firm with expiry date and exclusive flag
3. Seed script runs with `npx prisma db seed` and populates 8+ firms with complete data
4. Admin can publish a guide article that appears at its slug URL

---

## Phase 3: Home Page

**Goal:** Build the premium home page with hero, search, featured deals, trust metrics, social proof, FAQ, and footer.
**Requirements:** HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09
**Depends on:** Phase 1, Phase 2 (seed data)
**UI hint:** yes

### Plans

1. Hero section — headline, subheadline, search bar (routes to /compare?q=), CTA buttons (Compare Firms, Browse Discounts, Join/Login), glassmorphism background with subtle gradient mesh
2. Featured / Live Deals section — fetches active discount offers from DB, displays in premium card layout with firm logo, code, discount amount, CTA
3. Trust metrics bar — animated counters (firms compared, verified deals, community size, total savings)
4. Verified Savings / Active Deals section — card grid with motion animations, code copy buttons
5. Social proof + PropPilot Points teaser — community stats, how rewards work overview, tier preview
6. FAQ section — expandable accordion with clean animation
7. Footer — links to all pages, legal/disclaimer links, affiliate transparency notice, social links
8. Home page metadata — title, description, OpenGraph, Twitter Card

### Success Criteria

1. Home page loads with premium hero, visible featured deals pulled from seed data, and correct CTAs
2. Search bar redirects to `/compare?q=[term]` with the search pre-filled
3. Trust metrics section shows animated numbers
4. FAQ accordion opens/closes with smooth animation
5. Footer contains affiliate disclosure link and all required legal links
6. Page looks and feels premium — dark theme, glassmorphism, subtle gradient, strong typography

---

## Phase 4: Comparison Engine

**Goal:** Build the filterable, sortable firm comparison page with side-by-side comparison and mobile-responsive design.
**Requirements:** COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09
**Depends on:** Phase 2 (firm data), Phase 3
**UI hint:** yes

### Plans

1. Compare page layout — sticky filter bar (desktop), filter drawer (mobile), firm list area, URL-synced state via nuqs
2. Filter bar components — challenge type, account size, evaluation type, drawdown type, daily loss, fee range, discount availability, funding style selectors
3. Sort controls — lowest cost, best discount, lowest drawdown, highest payout speed, best overall score
4. Firm card component — logo, name, program type, account size, challenge fee, discount code badge, true cost after discount, drawdown %, daily loss %, payout speed, rules badges (news/weekend/EA), rule difficulty score, View Details / Copy Code / Visit Site CTAs
5. Firm table hybrid — desktop shows richer row-based layout with all metrics; mobile shows card view
6. Side-by-side comparison — URL state `?compare=slug1,slug2,slug3`, comparison drawer/modal with rule-by-rule diff, up to 3 firms
7. Search bar on compare page — instant filter by firm name
8. Compare page metadata + affiliate disclosure banner

### Success Criteria

1. Compare page renders all seeded firms with correct data (fees, drawdown, codes)
2. Filtering by drawdown type correctly narrows the firm list
3. Sorting by "lowest cost" reorders firms correctly
4. Selecting 2 firms and clicking "Compare" opens side-by-side view with correct data
5. Filter drawer opens on mobile and closes on overlay tap
6. "Last verified" date shown on each card
7. Copy Code button works and shows toast confirmation

---

## Phase 5: Firm Detail Pages

**Goal:** Build premium firm detail pages with tabbed rule breakdown, discount code CTA, reviews, FAQs, and Rule Difficulty Score.
**Requirements:** FIRM-01, FIRM-02, FIRM-03, FIRM-04, FIRM-05, FIRM-06, FIRM-07, FIRM-08, FIRM-09
**Depends on:** Phase 4
**UI hint:** yes

### Plans

1. Firm detail page layout — hero section (logo, name, score, featured offer, discount code, CTA buttons), breadcrumb
2. Tab navigation — Overview, Rules, Pricing, Payouts, Pros & Cons, Reviews, FAQs tabs with smooth transition
3. Overview tab — firm summary, key metrics at a glance, affiliate disclosure, verdict section
4. Rules tab — full rule breakdown (drawdown type, consistency rule, news/weekend/EA policy, minimum trading days, scaling plan)
5. Pricing tab — challenge fee breakdown, discount code interaction (animated copy), true cost, comparison to competitors
6. Payouts tab — profit split %, payout frequency, payout speed, withdrawal methods, proof gallery
7. Pros & Cons tab — admin-curated list with visual badges
8. Reviews tab — paginated user reviews with star ratings, review submission form (logged-in only)
9. FAQs tab — expandable FAQ list from DB
10. Rule Difficulty Score component — visual score with weighted breakdown tooltip

### Success Criteria

1. Firm detail page loads with hero, correct score, and active discount code
2. All 7 tabs render correct content from seed data
3. Copy Code button copies code to clipboard and shows animated confirmation
4. "Visit Site" button links to `/go/[slug]` (tracked redirect)
5. Rule Difficulty Score renders with correct weighted breakdown
6. Affiliate disclosure visible on page
7. Page works correctly on mobile (tabs collapse to scrollable, hero responsive)

---

## Phase 6: Affiliate Tracking

**Goal:** Implement the affiliate redirect route and all click/copy event tracking.
**Requirements:** TRACK-01, TRACK-02, TRACK-03, TRACK-04
**Depends on:** Phase 4, Phase 5
**UI hint:** no

### Plans

1. Affiliate redirect route — `/go/[slug]/route.ts` Route Handler: look up firm + offer, log AffiliateClick async via `unstable_after()`, 302 redirect to affiliate URL; fallback logging if unstable_after unavailable
2. Code copy Server Action — `logCopyEvent()` Server Action called by Copy Code button, logs CopyEvent to DB with firmId, offerId, userId (nullable), timestamp
3. Firm page view tracking — log firm detail page visits to ComparisonStats (server-side, non-blocking)
4. Tracking data validation — zod schema for all tracking payloads, graceful failure (tracking errors never break UX)

### Success Criteria

1. Clicking "Visit Site" navigates to the firm's real affiliate URL via `/go/[slug]`
2. AffiliateClick record created in DB after redirect (check DB after clicking)
3. Copying a code creates a CopyEvent record in DB
4. Tracking failures (DB down, etc.) do not break the redirect or copy UX
5. Logged-in user's userId is captured in tracking events when available

---

## Phase 7: User Dashboard & Auth UX

**Goal:** Build the protected user dashboard with profile, saved firms, reward status, claim history, and polished auth UX.
**Requirements:** DASH-01, DASH-02, DASH-03, DASH-04, DASH-05
**Depends on:** Phase 1, Phase 6
**UI hint:** yes

### Plans

1. User dashboard layout — sidebar nav (Profile, Claims, Rewards, Saved Firms), responsive layout
2. Profile section — display name, email, join date, tier badge, points balance
3. Reward status section — current tier, points balance, tier progress bar, next tier threshold
4. Saved firms — grid of bookmarked firms with quick remove; save/bookmark action from compare/detail pages
5. Claim history — table of submitted claims with status badges (PENDING/APPROVED/REJECTED), claim details view
6. Auth UI polish — customize Clerk sign-in/sign-up appearance to match dark PropPilot theme

### Success Criteria

1. Logged-in user can view their dashboard with correct profile data
2. User can save a firm from the compare page and it appears in their saved firms list
3. User can view all submitted claims with correct status
4. Reward tier progress bar reflects current points vs next tier threshold
5. Clerk sign-in page visually matches PropPilot dark theme

---

## Phase 8: Claims & Rewards System

**Goal:** Build the full purchase claim submission flow, file upload, and reward points system.
**Requirements:** CLAM-01, CLAM-02, CLAM-03, CLAM-04, CLAM-05, CLAM-06, CLAM-07, CLAM-08, CLAM-09, CLAM-10, RWRD-01, RWRD-02, RWRD-03, RWRD-04, RWRD-05
**Depends on:** Phase 7
**UI hint:** yes

### Plans

1. Claim submission form — firm selector, order ID, purchase email, amount paid, date, discount code used, receipt upload (UploadThing), validation with zod
2. UploadThing integration — configure file upload endpoint, accept image/PDF, store URL in claim record
3. Claim submission Server Action — validate input, create PurchaseClaim (status: PENDING), return confirmation
4. Claim confirmation page — success state with claim reference, instructions for review timeline
5. Rewards page — explain points system, tier levels (Bronze/Silver/Gold/Platinum), thresholds, benefits, how to earn and redeem
6. Tier display components — animated tier badge, progress bar to next tier
7. Points award Server Action — triggered by admin approval: Prisma transaction (create PointTransaction, update balance, check/upgrade tier)
8. User rewards dashboard section — live balance, tier, transaction history table

### Success Criteria

1. Logged-out user attempting to submit a claim is redirected to sign-in
2. Claim form validates all required fields before submission
3. Receipt upload succeeds (file appears in UploadThing dashboard, URL stored in DB)
4. Submitted claim appears in database with PENDING status
5. Rewards page renders tier levels with correct point thresholds
6. After admin approves a claim (tested manually), user's point balance increases correctly
7. Tier upgrades correctly when balance crosses a threshold

---

## Phase 9: Admin — Claims, Analytics & Action Log

**Goal:** Build the admin claim review interface, analytics view, and action audit log.
**Requirements:** ADMN-03, ADMN-04, ADMN-05, ADMN-06, ADMN-07, ADMN-08
**Depends on:** Phase 8
**UI hint:** yes

### Plans

1. Admin claims queue — table of all claims (pending/approved/rejected) with filters by status, date, firm
2. Claim detail view — full claim info (user, firm, amount, date, code, receipt preview), approve/reject buttons
3. Approve/reject Server Actions — approve triggers point award transaction; reject stores reason; both create AdminActionLog entry
4. Admin analytics dashboard — cards/charts: affiliate link clicks, code copies, sign-ins, claim submissions, approved claims (by time period)
5. Admin action log — chronological table of all admin actions with actor, action type, target, timestamp
6. Reward tier management — admin UI to configure tier thresholds and point values

### Success Criteria

1. Admin can view all pending claims and click into a claim to see full detail including receipt
2. Approving a claim updates its status to APPROVED and awards points to the user
3. Rejecting a claim with a reason updates status and stores the reason
4. Analytics dashboard shows correct counts for each metric from real data
5. Action log shows the approve/reject action with timestamp and admin identity

---

## Phase 10: Guides & Education

**Goal:** Build the guides section with article list, reading experience, SEO structure, and internal firm links.
**Requirements:** GUIDE-01, GUIDE-02, GUIDE-03, GUIDE-04, GUIDE-05
**Depends on:** Phase 2 (admin guide creation), Phase 5
**UI hint:** yes

### Plans

1. Guides list page — card grid layout, article title/excerpt/category, premium reading aesthetic, category filters
2. Guide article page — clean reading experience (max-width prose, generous spacing, typography), related firms sidebar
3. Guide content rendering — render guide content from DB (rich text or MDX), proper heading hierarchy
4. Internal linking — "Firms with this rule" links from guide articles to filtered compare view
5. Seed guide content — 5+ guide articles on key trader topics (drawdown types, evaluation structures, consistency rules, payout guide, prop firm mistakes)

### Success Criteria

1. Guides page renders all published guide articles with correct titles and excerpts
2. Clicking a guide card navigates to the article page with full content rendered
3. Guide article has correct heading hierarchy (h1 for title, h2 for sections)
4. "Firms with no consistency rule" link in a guide article opens the compare page with that filter pre-applied
5. Guide pages have SEO-friendly URLs (e.g., `/guides/understanding-drawdown-rules`)

---

## Phase 11: SEO & Performance

**Goal:** Implement comprehensive SEO metadata, JSON-LD structured data, image optimization, and ISR caching across all public pages.
**Requirements:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08
**Depends on:** Phase 10
**UI hint:** no

### Plans

1. Metadata API — implement `generateMetadata()` for all dynamic pages (firm detail, guide articles); static metadata for fixed pages
2. OpenGraph + Twitter Card — og:title, og:description, og:image (auto-generated or firm logo), twitter:card on all pages
3. JSON-LD structured data — Product + AggregateRating schema on firm detail pages; Article schema on guide pages
4. ISR configuration — `revalidate: 3600` on firm list and detail pages; `revalidate: 86400` on guide pages; on-demand revalidation via admin trigger
5. Image optimization — Next.js Image component on all firm logos and guide images, proper width/height, priority on above-fold images
6. Skeleton loaders — implement loading.tsx skeleton screens for compare page, firm detail, dashboard sections
7. Sitemap + robots.txt — auto-generated sitemap.xml including all firm and guide URLs

### Success Criteria

1. Firm detail page has unique title, description, OG image tag in `<head>`
2. JSON-LD `<script>` with Product + AggregateRating schema present on firm detail pages (verify via View Source)
3. Firm list page loads with ISR — subsequent requests served from cache without DB hit
4. Skeleton loaders appear on compare page during data loading state
5. `/sitemap.xml` returns all firm and guide URLs
6. Lighthouse performance score ≥ 85 on home page

---

## Phase 12: Polish, Legal & Deployment

**Goal:** Apply motion polish, implement legal/disclaimer pages, finalize error/empty states, and prepare for Vercel deployment with README.
**Requirements:** LEGL-01, LEGL-02, LEGL-03, LEGL-04, LEGL-05, DEPL-01, DEPL-02, DEPL-03, DEPL-04
**Depends on:** Phase 11
**UI hint:** yes

### Plans

1. Framer Motion polish — page transition wrapper, card hover animations, compare filter change animations, tab change transitions, copy code success animation — all with `LazyMotion` + `domAnimation`
2. Micro-interactions — button press feedback, filter chip selection, bookmark toggle, tier progress animation
3. Legal pages — `/legal` (disclaimer, data policy, terms of use), `/legal/affiliate-disclosure` (full FTC-compliant disclosure)
4. Affiliate disclosure banner — persistent, non-intrusive notice on all comparison and firm pages
5. Error states — custom `error.tsx` for all route groups, friendly error UI with retry action
6. Empty states — empty compare results (no matching filters), empty claims history, empty saved firms — all with helpful CTAs
7. 404 page — custom `not-found.tsx` matching dark PropPilot aesthetic
8. README — complete setup guide: prerequisites, env vars, DB setup, Clerk config, UploadThing config, seed data, local dev, Vercel deployment
9. Final review — remove all console.logs, verify no TODOs in core feature code, check all env vars documented

### Success Criteria

1. All Framer Motion animations run without hydration warnings in browser console
2. Legal pages render with full affiliate disclosure text
3. Affiliate disclosure banner visible on `/compare` and all `/firms/[slug]` pages
4. Error state shows correctly when DB is unavailable
5. Empty state shows on compare page when no firms match active filters
6. README contains complete setup instructions a developer can follow from scratch
7. Project deploys to Vercel without build errors with all env vars set
8. No TODOs in core feature files (grep check)

---

## Requirements Traceability

| Phase | Requirements Covered |
|-------|-------------------|
| 1 — Foundation | AUTH-01–07, DB-01, DB-02, DB-04 |
| 2 — Admin: Firm & Offer Management | ADMN-01, ADMN-02, ADMN-09, DB-03 |
| 3 — Home Page | HOME-01–09 |
| 4 — Comparison Engine | COMP-01–09 |
| 5 — Firm Detail Pages | FIRM-01–09 |
| 6 — Affiliate Tracking | TRACK-01–04 |
| 7 — User Dashboard & Auth UX | DASH-01–05 |
| 8 — Claims & Rewards System | CLAM-01–10, RWRD-01–05 |
| 9 — Admin: Claims, Analytics & Action Log | ADMN-03–08 |
| 10 — Guides & Education | GUIDE-01–05 |
| 11 — SEO & Performance | SEO-01–08 |
| 12 — Polish, Legal & Deployment | LEGL-01–05, DEPL-01–04 |

**Total v1 requirements: 73 / 73 covered ✓**
