# Architecture Research — PropPilot

## System Components

| Component | Technology | Pattern |
|-----------|-----------|--------|
| Routing & Pages | Next.js 15 App Router | Route groups for marketing/dashboard/admin |
| Auth | Clerk | Middleware + publicMetadata roles |
| Database | PostgreSQL (Neon) | Prisma ORM with Accelerate |
| File Storage | UploadThing | Client-to-cloud with server-signed URLs |
| Caching | ISR + React cache() | Firm pages ISR, request-level deduplication |
| State (filters) | nuqs | URL-synced search params |
| State (comparison) | URL query params | `?compare=firm-a,firm-b` shareable links |

## Recommended Project Structure

```
/app
  /(marketing)              # Public pages — SEO-first, Server Components
    /page.tsx               # Home
    /compare/page.tsx       # Compare page
    /firms/[slug]/page.tsx  # Firm detail
    /guides/page.tsx        # Guides list
    /guides/[slug]/page.tsx # Guide article
    /rewards/page.tsx       # Rewards info
  /(dashboard)              # Protected user area
    /dashboard/page.tsx
    /dashboard/claims/
    /dashboard/rewards/
  /(admin)                  # Protected admin area
    /admin/firms/
    /admin/claims/
    /admin/analytics/
  /go/[slug]/route.ts       # Affiliate redirect + click tracking
  /api/webhooks/clerk/      # Clerk user sync

/components
  /ui/         # shadcn/ui customized
  /marketing/  # Home, hero, cards
  /compare/    # Filter bar, firm table, firm card
  /firm/       # Detail tabs, code copy, CTA
  /dashboard/  # Claim form, reward display
  /admin/      # Admin tables, review panel
  /layout/     # Header, footer, nav

/lib
  /db.ts       # Prisma singleton
  /auth.ts     # Clerk helpers
  /scoring.ts  # Rule Difficulty Score

/prisma
  /schema.prisma
  /seed.ts
```

## Data Architecture

### Core Models & Relationships

- **User** → PurchaseClaim[], UserRewardPoints, SavedFirm[], Review[]
- **Firm** → FirmOffer[], FirmMetrics, Review[], FAQ[], AffiliateClick[]
- **FirmOffer** → code, affiliateUrl, discountPercent, isExclusive, CopyEvent[]
- **PurchaseClaim** → userId, firmId, offerId, status (PENDING|APPROVED|REJECTED), receiptUrl, AdminActionLog[]
- **UserRewardPoints** → balance, tier (BRONZE|SILVER|GOLD|PLATINUM), PointTransaction[]
- **AffiliateClick** → firmId, offerId, userId (nullable), sessionId, createdAt
- **CopyEvent** → offerId, userId (nullable), createdAt
- **Review** → userId, firmId, rating (1-5), content, status (PENDING|APPROVED|REJECTED)
- **GuidePost** → slug, title, content, relatedFirms[], publishedAt
- **AdminActionLog** → adminId, action, targetId, createdAt

### Affiliate Tracking Pattern

1. User clicks "Visit Site" → navigates to `/go/[firmSlug]?offer=[offerId]`
2. Route Handler: look up firm, log `AffiliateClick` via `unstable_after()` (async, zero UX latency), then 302 redirect
3. User clicks "Copy Code" → Server Action logs `CopyEvent`, returns success → clipboard + toast

### Rewards / Points Pattern

1. User submits `PurchaseClaim` (status: PENDING, receiptUrl stored)
2. Admin reviews in `/admin/claims`
3. Admin approves → Prisma transaction: update claim status, create `PointTransaction`, increment balance, check tier upgrade, log to `AdminActionLog`, send email

## Caching Strategy

- **Firm list/detail pages:** ISR `revalidate: 3600` + on-demand `revalidatePath()` after admin updates
- **Dashboard/admin:** No caching — always fresh
- **Shared request data:** `React cache()` to deduplicate within a single request

## File Upload Pattern

- **UploadThing:** Client uploads directly to CDN (bypasses Vercel 4.5MB limit)
- Store only the `fileUrl` in the `PurchaseClaim` record
- Admin accesses receipt via the stored URL in the review panel

## Auth Architecture

```
middleware.ts (clerkMiddleware)
  ├── Public: /, /compare, /firms/*, /guides/*, /go/*, /api/webhooks/*
  ├── Protected: /dashboard/*
  └── Admin: /admin/* — check publicMetadata.role === 'admin'

Clerk webhook (user.created) → create User + UserRewardPoints in Prisma
```

## Build Order (Phase Dependencies)

1. Foundation — project setup, Prisma schema, Clerk auth, layout/nav
2. Admin: firm/code management — CRUD, seed data
3. Core public pages — Home, Compare (with filters), Firm detail
4. Affiliate tracking — /go/[slug], click/copy events
5. User dashboard — saved firms, profile, history
6. Claims + Rewards — submission flow, file upload, admin review, points
7. Guides + SEO — content, metadata, JSON-LD
8. Polish + Analytics — animations, skeletons, admin analytics, legal pages
