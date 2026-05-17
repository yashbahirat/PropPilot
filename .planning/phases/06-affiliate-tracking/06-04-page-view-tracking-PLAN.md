---
plan: 06-04
phase: 6
title: "Firm Page View Tracking"
wave: 1
depends_on: []
files_modified:
  - src/app/firms/[slug]/page.tsx
autonomous: true
requirements_addressed:
  - TRACK-03
  - TRACK-04
---

## Objective

Add non-blocking firm detail page view tracking to the firm page Server Component. After fetching the firm data, increment `ComparisonStats.pageViews` and `ComparisonStats.weekViews` for the visited firm using a Prisma `upsert`. The increment runs via `unstable_after()` with a floating-promise fallback — it must NEVER delay the page render or fail visibly to the user.

## Tasks

### Task 1: Add page view tracking to `src/app/firms/[slug]/page.tsx`

<read_first>
- `src/app/firms/[slug]/page.tsx` — Current implementation: `await params`, DB `findUnique` for firm with offers/reviews/faqs, `notFound()` if missing, JSON serialization, renders `<FirmHero>` and `<FirmDetailNav>`
- `src/lib/db.ts` — `import { db } from "@/lib/db"` (already imported in this file)
- `prisma/schema.prisma` — `ComparisonStats` model: `firmId` (unique), `pageViews` (Int default 0), `weekViews` (Int default 0), `createdAt`, `updatedAt`
</read_first>

<action>
Modify `src/app/firms/[slug]/page.tsx` to add page view tracking after the firm is found.

1. Add the `after` import at the top of the file (alongside existing `next/navigation` import):
   ```typescript
   import { after } from "next/server"
   ```

2. After the `if (!firm) { notFound() }` check (so we only track real firm visits), add the async page view increment wrapped in `after()`:

   ```typescript
   // Track page view asynchronously — fires after the page response is sent
   // D-05: Prisma upsert increment on ComparisonStats (pageViews + weekViews)
   // D-06: No bot filtering — all visits counted in Phase 6
   const trackPageView = async () => {
     try {
       await db.comparisonStats.upsert({
         where: { firmId: firm.id },
         update: {
           pageViews: { increment: 1 },
           weekViews: { increment: 1 },
         },
         create: {
           firmId: firm.id,
           pageViews: 1,
           weekViews: 1,
         },
       })
     } catch {
       // Silently swallow — tracking must never break page render (D-02)
     }
   }

   try {
     after(trackPageView)
   } catch {
     // after() not available in this runtime — fall back to floating promise
     Promise.resolve().then(trackPageView)
   }
   ```

3. Place this tracking block AFTER `if (!firm) { notFound() }` and BEFORE the `JSON.parse(JSON.stringify(firm))` serialization line.

The complete modified file should look like:
```typescript
import { notFound } from "next/navigation"
import { after } from "next/server"
import { db } from "@/lib/db"
import { FirmHero } from "@/components/firm/FirmHero"
import { FirmDetailNav } from "@/components/firm/FirmDetailNav"

interface FirmPageProps {
  params: Promise<{ slug: string }>
}

export default async function FirmPage({ params }: FirmPageProps) {
  const { slug } = await params
  const prisma = db

  const firm = await prisma.firm.findUnique({
    where: { slug },
    include: {
      offers: true,
      reviews: true,
      faqs: true,
    },
  })

  if (!firm) {
    notFound()
  }

  // Track page view asynchronously after response is sent
  const trackPageView = async () => {
    try {
      await db.comparisonStats.upsert({
        where: { firmId: firm.id },
        update: {
          pageViews: { increment: 1 },
          weekViews: { increment: 1 },
        },
        create: {
          firmId: firm.id,
          pageViews: 1,
          weekViews: 1,
        },
      })
    } catch {
      // Silently swallow — never break page render
    }
  }

  try {
    after(trackPageView)
  } catch {
    Promise.resolve().then(trackPageView)
  }

  // Serialize Prisma objects (Decimal, Date) for Client Components
  const serializedFirm = JSON.parse(JSON.stringify(firm)) as typeof firm

  return (
    <main className="flex min-h-screen flex-col bg-[#08080F]">
      <FirmHero firm={serializedFirm} />
      <div className="container mx-auto px-4 pb-20">
        <FirmDetailNav firm={serializedFirm} />
      </div>
    </main>
  )
}
```
</action>

<acceptance_criteria>
- `src/app/firms/[slug]/page.tsx` contains `import { after } from "next/server"`
- `src/app/firms/[slug]/page.tsx` contains `after(trackPageView)`
- `src/app/firms/[slug]/page.tsx` contains `Promise.resolve().then(trackPageView)` (floating-promise fallback)
- `src/app/firms/[slug]/page.tsx` contains `comparisonStats.upsert(`
- `src/app/firms/[slug]/page.tsx` contains `pageViews: { increment: 1 }`
- `src/app/firms/[slug]/page.tsx` contains `weekViews: { increment: 1 }`
- The tracking block is placed AFTER `notFound()` check (not before — we only track real firm visits)
- Tracking is wrapped in try/catch — `catch { }` block is empty (silent swallow)
- TypeScript compilation: `npx tsc --noEmit` exits 0
- Page render is NOT affected by tracking: visiting `/firms/[slug]` still returns HTML within normal response time
</acceptance_criteria>

## Security Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Tracking inflating view counts intentionally | Low | Not a security issue in v1; rate limiting deferred |
| DB write failing and crashing page render | High | Entire tracking block wrapped in try/catch with silent swallow; after() fires post-response |
| Tracking before firm existence check | Medium | Tracking placed AFTER `if (!firm) { notFound() }` — only real firms are tracked |

## Verification

```bash
# Import and after() usage
grep "after" src/app/firms/\[slug\]/page.tsx

# Upsert increment pattern
grep -A5 "comparisonStats.upsert" src/app/firms/\[slug\]/page.tsx

# Floating-promise fallback
grep "Promise.resolve" src/app/firms/\[slug\]/page.tsx

# Verify tracking is after notFound check (tracking line number > notFound line number)
echo "notFound line: $(grep -n "notFound()" src/app/firms/\[slug\]/page.tsx | head -1 | cut -d: -f1)"
echo "upsert line: $(grep -n "comparisonStats" src/app/firms/\[slug\]/page.tsx | head -1 | cut -d: -f1)"

# TypeScript clean
npx tsc --noEmit 2>&1 | grep "firms" | wc -l
```

## Manual Verification

After implementing, visit any firm detail page (e.g., `/firms/ftmo`) and then check the database:

```sql
SELECT "firmId", "pageViews", "weekViews" FROM "ComparisonStats" ORDER BY "updatedAt" DESC LIMIT 5;
```

The visited firm should have `pageViews` and `weekViews` incremented by 1 for each visit.
