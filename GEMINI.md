<!-- GSD:project-start source:PROJECT.md -->
## Project

**PropPilot**

PropPilot is a production-ready, premium comparison and discovery platform for proprietary trading firms. Traders use PropPilot to compare prop firm rules, fees, and drawdown policies; discover verified affiliate discount codes; read educational guides; and earn rewards by submitting verified purchase proof through the site's affiliate links. The product is designed to feel like a serious, trust-first fintech product — not a generic affiliate directory.

**Core Value:** Traders should be able to find the best prop firm for their needs, claim the best available discount, and trust that the information they're seeing is accurate and transparent — all in a single, premium experience.

### Constraints

- **Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Clerk, PostgreSQL, Prisma — no substitutions
- **Auth:** Clerk for all authentication — no custom auth implementation
- **Design:** Dark mode first, glassmorphism accents, teal/mint/cyan/purple palette, "Bloomberg meets modern SaaS" aesthetic — no light-mode-only or generic template look
- **Deployment:** Must be deployable to Vercel without modification; env vars documented in README
- **Code quality:** No TODOs in core features; production-quality, clean, scalable, commented where complex
- **Performance:** Images optimized, skeleton loaders on data fetches, fast TTFB; Vercel-optimized
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Confirmed Stack (Fixed)
| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js App Router | 15+ | Use async request APIs throughout |
| Language | TypeScript | 5.x | Strict mode recommended |
| Styling | Tailwind CSS | 4.x | With @tailwindcss/typography for guides |
| UI Components | shadcn/ui | latest | Customized for dark fintech aesthetic |
| Animation | Framer Motion | 11.x | Client boundary required |
| Auth | Clerk | 6.x | clerkMiddleware() pattern |
| ORM | Prisma | 5.x | With Prisma Accelerate for Vercel |
| Database | PostgreSQL | 16 | Neon (recommended for Vercel) |
| Deployment | Vercel | — | Edge config + Neon pooling |
| File Upload | UploadThing or Vercel Blob | latest | For claim receipt uploads |
## Integration Patterns
### Next.js 15 + Clerk Auth
- Use `clerkMiddleware()` in `middleware.ts` — the legacy `withClerk` wrapper is deprecated
- All request APIs (`headers()`, `cookies()`, `params`, `searchParams`) are now **async** in Next.js 15 — must `await` them everywhere
- Use `await auth()` in Server Components (not `getAuth()` which is for Pages Router)
- Protect route groups using `createRouteMatcher()` in middleware — cleaner than per-page guards
- Sync Clerk user to Prisma via webhook (`/api/webhooks/clerk`) on `user.created` event
- Store roles in Clerk `publicMetadata` (e.g., `{ role: "admin" }`) — avoids DB round-trips for auth checks
### Prisma + PostgreSQL on Vercel
- **Recommended provider:** Neon (serverless PostgreSQL, built-in connection pooling, Vercel integration)
- Use **Prisma Accelerate** for connection pooling on Vercel to prevent "Too many connections" errors at scale
- Never use direct Prisma Client in Edge Runtime — use Node.js runtime for all DB routes (set `export const runtime = 'nodejs'`)
- Use `DATABASE_URL` for pooled connection + `DIRECT_URL` for migrations (Neon pattern)
- Singleton Prisma client pattern required for dev (prevents hot-reload connection exhaustion)
### Framer Motion in App Router
- All Framer Motion components require `"use client"` — plan component boundaries carefully
- Use `LazyMotion` + `domAnimation` for smaller bundle (40% reduction vs full import)
- Wrap animated sections in `<Suspense>` to allow SSR of surrounding content
- `AnimatePresence` must be in a client component — extract layout wrapper as client component
- For page transitions: use a `PageTransition` client component wrapping `{children}` in the root layout
### Affiliate Link Tracking
- Create a server-side redirect route at `/go/[slug]` (Route Handler)
- Use `unstable_after()` (Next.js 15) to log the click asynchronously after redirect — zero UX latency
- Track: `firmSlug`, `userId` (if logged in), `sessionId`, `referrer`, `timestamp`, `userAgent`
- For code copy events: use a Server Action that logs to `CopyEvent` table, called from a `"use client"` copy button
### File Upload on Vercel
- **Recommended: UploadThing** — serverless-native, handles chunking, works perfectly with Next.js App Router
- Alternative: Vercel Blob (simpler API, native to Vercel ecosystem)
- NEVER stream large files through Vercel Serverless Functions (4.5MB body limit)
- Sign uploads on server, upload client-to-storage directly — store only the URL in DB
## Recommended Additional Packages
| Package | Purpose | Confidence |
|---------|---------|-----------|
| `nuqs` | URL-synced filter state (replaces useState for filter params) | High |
| `@tanstack/react-table` | Comparison tables with sorting/filtering | High |
| `zod` | Schema validation for Server Actions and API routes | High |
| `uploadthing` | File uploads for claim receipts | High |
| `react-hot-toast` or `sonner` | Toast notifications (copy code, claim submitted) | High |
| `@vercel/analytics` | Page view and conversion tracking | High |
| `date-fns` | Date formatting for payout dates, claim timestamps | High |
| `@radix-ui/react-*` | Accessible primitives (via shadcn/ui) | High |
| `react-intersection-observer` | Scroll-triggered animations | Medium |
| `sharp` | Image optimization for firm logos | High |
## What NOT to Use
- **next-auth / Auth.js** — Clerk is the fixed auth choice; don't add a second auth system
- **React Query / SWR** — Server Components + Server Actions handle most data fetching; add only if needed for real-time features
- **Styled Components / CSS-in-JS** — Tailwind is the styling system; CSS-in-JS causes hydration issues with App Router
- **Prisma in Edge Runtime** — Will break; always use Node.js runtime for DB operations
- **`getServerSideProps`** — Pages Router pattern; App Router uses async Server Components
- **Full Framer Motion import** — Use `LazyMotion` with `domAnimation` to avoid 100KB+ bundle bloat
## Confidence Levels
- **High confidence:** Next.js 15 async APIs, clerkMiddleware, Neon + Prisma Accelerate, UploadThing, nuqs, LazyMotion pattern
- **Medium confidence:** `unstable_after()` for async tracking (still experimental in Next.js 15, may need fallback)
- **Low confidence:** Exact Clerk publicMetadata role sync performance at scale — verify with Clerk docs during Phase 1
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
