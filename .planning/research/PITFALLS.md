# Pitfalls Research — PropPilot

## Critical Pitfalls (Must Avoid — Will Break the Build)

### Next.js 15 Async Request APIs
- **Pitfall:** Accessing `headers()`, `cookies()`, `params`, or `searchParams` synchronously will throw runtime errors in Next.js 15 — they are now async
- **Warning sign:** TypeScript errors about Promise types on request APIs
- **Prevention:** Always `await params`, `await searchParams`, `await headers()`, `await cookies()` — establish this pattern in Phase 1 and enforce via ESLint
- **Phase:** Phase 1 (Foundation)

### Clerk + Next.js 15 Middleware
- **Pitfall:** Using legacy `withClerkMiddleware` or `authMiddleware` causes auth bypass or infinite redirect loops in Next.js 15
- **Warning sign:** Protected routes accessible without login; redirect loops on login page
- **Prevention:** Use `clerkMiddleware()` with `createRouteMatcher()` exclusively. Test all protected routes in Phase 1
- **Phase:** Phase 1 (Foundation)

### Prisma in Edge Runtime
- **Pitfall:** Standard Prisma Client cannot run in Next.js Edge Runtime — throws "PrismaClient is unable to run in this browser environment" error
- **Warning sign:** Build errors or runtime crashes on DB-adjacent routes
- **Prevention:** Explicitly set `export const runtime = 'nodejs'` on all route handlers that use Prisma. Never use Prisma in middleware (edge only)
- **Phase:** Phase 1 (Foundation)

### Vercel File Upload Limit
- **Pitfall:** Vercel Serverless Functions have a hard 4.5MB request body limit — direct file upload through a Next.js API route will fail for larger receipts
- **Warning sign:** 413 errors on file upload, silently failed uploads
- **Prevention:** Use UploadThing or Vercel Blob for direct client-to-cloud uploads. Never stream files through Next.js API routes
- **Phase:** Phase 6 (Claims)

### Missing Prisma Connection Pooling
- **Pitfall:** Using a direct Prisma connection string (without Accelerate or Neon pooling) on Vercel leads to "Too many clients" PostgreSQL errors under any real traffic
- **Warning sign:** DB errors in production but not in local dev
- **Prevention:** Use `DATABASE_URL` = pooled connection (PgBouncer/Neon pooler/Accelerate) + `DIRECT_URL` = direct connection for migrations. Configure in Phase 1 and test with Vercel preview deployment
- **Phase:** Phase 1 (Foundation)

## Important Pitfalls (Will Hurt Quality/Trust)

### Framer Motion SSR Hydration Errors
- **Pitfall:** Using Framer Motion components in Server Components causes hydration mismatches and "Warning: Extra attributes from the server" errors
- **Warning sign:** Console hydration warnings; animations flicker on first load
- **Prevention:** Every file using Framer Motion must have `"use client"`. Use `LazyMotion` + `domAnimation` to minimize bundle size. Wrap with `<Suspense>` where needed
- **Phase:** Phase 3 and 8 (all UI phases)

### `unstable_after()` Fallback Needed
- **Pitfall:** `unstable_after()` is still experimental in Next.js 15 and may not be available on all Vercel plans or may change API
- **Warning sign:** TypeScript errors importing from `next/server`; function undefined at runtime
- **Prevention:** Wrap affiliate click logging in a try/catch; provide fallback to `waitUntil()` or background queue. Don't let tracking failures break redirects
- **Phase:** Phase 4 (Affiliate Tracking)

### Stale Firm Data Trust Problem
- **Pitfall:** Showing outdated firm rules (drawdown %, fees, restrictions) is the #1 trust killer for comparison sites — traders make financial decisions based on this data
- **Warning sign:** User reports of incorrect data; firm rule changes not reflected
- **Prevention:** Display "Last verified: [date]" on every firm card and detail page. Build admin workflow to periodically re-verify data. Make timestamp prominent in UI
- **Phase:** Phase 2 (Admin/Firms) + Phase 3 (Public Pages)

### Clerk → Prisma User Sync Gaps
- **Pitfall:** If the Clerk webhook (`user.created`) fails, a User record won't be created in Prisma — subsequent DB operations referencing userId will fail
- **Warning sign:** Foreign key constraint errors on first user action after signup
- **Prevention:** Add idempotent `upsert` logic in the webhook handler. Add a "lazy sync" fallback in protected Server Components that creates the User record if not found
- **Phase:** Phase 1 (Foundation)

### "use client" Sprawl
- **Pitfall:** Marking too many components as `"use client"` defeats the SSR/SEO benefits of App Router and inflates the JS bundle
- **Warning sign:** Lighthouse score drop; bundle analyzer shows large client components
- **Prevention:** Only mark components as client if they use hooks, browser APIs, or Framer Motion. Keep data fetching in Server Components. Pass data as props to client components
- **Phase:** All UI phases

## Minor Gotchas (Nice to Know)

### shadcn/ui Dark Mode Setup
- Requires `class` dark mode strategy in Tailwind config (not `media`) to work with manual dark mode toggle
- Add `darkMode: 'class'` to `tailwind.config.ts` in Phase 1

### nuqs with Next.js 15 App Router
- Requires `NuqsAdapter` wrapped around the app in the root layout — missing this causes `useQueryState` to silently fail
- Add in Phase 1 root layout

### Prisma Hot-Reload Memory Leak
- In development, Next.js hot-reload creates new Prisma Client instances on each reload — causes connection exhaustion
- Prevention: Use the standard singleton pattern `globalThis.__prisma` in `lib/db.ts`

### TypeScript + Prisma Generated Types
- Always run `npx prisma generate` after schema changes — stale generated types cause confusing type errors
- Add to development workflow / README

### Clerk `auth()` in Layouts
- Calling `auth()` in a shared layout re-runs on every request — use sparingly; prefer checking auth in individual pages/Server Components

## Legal / Compliance Pitfalls

### FTC Affiliate Disclosure
- **Pitfall:** Insufficient affiliate disclosure → FTC violation risk; search engine penalties
- **Requirement:** Disclosure must be "clear and conspicuous" — above the fold, not buried in footer
- **Prevention:** Add persistent disclosure banner or inline text near every affiliate link/CTA. Add a `/legal/affiliate-disclosure` page. Reference in footer

### Prop Firm Data Accuracy
- **Pitfall:** Publishing incorrect drawdown rules or fees that cause a trader financial loss → legal liability and reputation damage
- **Prevention:** Add clear "data is for informational purposes only" disclaimer. Include "verify with firm directly before purchasing" language. Show last-verified date

### Discount Code Claims
- **Pitfall:** Advertising a discount code that's expired or incorrect → misleads users, breaks trust
- **Prevention:** Admin interface for managing code expiry dates. Show expiry date on codes. Mark expired codes clearly rather than removing them

### Reward Claim Fraud
- **Pitfall:** Users submitting fake purchase receipts to earn points
- **Prevention:** Require order ID, purchase email, amount, date, and receipt screenshot. Admin manual review for all claims. Flag suspicious patterns (same receipt submitted twice)

## Checklist for Each Phase

- [ ] All `params`/`searchParams` are awaited (Next.js 15 async APIs)
- [ ] All Framer Motion files have `"use client"`
- [ ] No Prisma calls in Edge Runtime files
- [ ] All affiliate links route through `/go/[slug]` (tracked)
- [ ] All firm cards show "Last verified" date
- [ ] Affiliate disclosure visible on all comparison/firm pages
- [ ] File uploads use UploadThing (not Next.js API route body)
- [ ] Clerk webhook handler uses `upsert` not `create`
- [ ] Prisma singleton pattern used in `lib/db.ts`
- [ ] `NuqsAdapter` added to root layout
