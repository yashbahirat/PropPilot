---
plan: 06-02
phase: 6
title: "Copy Event Server Action"
wave: 1
depends_on: []
files_modified:
  - src/app/actions/tracking.ts
autonomous: true
requirements_addressed:
  - TRACK-02
  - TRACK-04
---

## Objective

Create a `logCopyEvent` Server Action in `src/app/actions/tracking.ts` that records a `CopyEvent` to the database when a user copies a discount code. The action is fire-and-forget: it returns `void`, catches all errors silently, and never surfaces failures to the UI. It follows the exact auth pattern from `reviews.ts` for Clerk → DB user ID resolution.

## Tasks

### Task 1: Create `src/app/actions/tracking.ts`

<read_first>
- `src/app/actions/reviews.ts` — Reference implementation: `"use server"`, `auth()` from `@clerk/nextjs/server`, Clerk ID → DB user lazy-sync pattern, Zod validation, error handling
- `prisma/schema.prisma` — `CopyEvent` model: `firmId`, `offerId`, `userId`, `sessionId`, `createdAt`; `User` model: `clerkId` field
- `src/lib/db.ts` — `import { db } from "@/lib/db"` pattern
</read_first>

<action>
Create `src/app/actions/tracking.ts` with the following implementation:

```typescript
"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { z } from "zod"

// Input validation schema
const copyEventSchema = z.object({
  firmId: z.string().min(1, "firmId is required"),
  offerId: z.string().nullable(),
})

/**
 * Log a discount code copy event to the database.
 *
 * Fire-and-forget: this function returns void and swallows all errors.
 * It must NEVER throw or surface failures to the calling UI component.
 *
 * Called from CopyCodeButton.handleCopy() — do NOT await in the caller.
 */
export async function logCopyEvent(
  firmId: string,
  offerId: string | null
): Promise<void> {
  try {
    // Validate inputs
    const parsed = copyEventSchema.safeParse({ firmId, offerId })
    if (!parsed.success) {
      // Invalid input — skip logging silently
      return
    }

    // Resolve DB user ID from Clerk session (anonymous users are allowed)
    let dbUserId: string | null = null
    try {
      const { userId: clerkId } = await auth()
      if (clerkId) {
        // Lazy sync: look up DB user by Clerk ID
        // (mirrors pattern from src/app/actions/reviews.ts)
        const dbUser = await db.user.findUnique({ where: { clerkId } })
        dbUserId = dbUser?.id ?? null
      }
    } catch {
      // Auth resolution failure — proceed as anonymous
    }

    // Insert CopyEvent record
    await db.copyEvent.create({
      data: {
        firmId: parsed.data.firmId,
        offerId: parsed.data.offerId,
        userId: dbUserId,
        sessionId: null, // Deferred per D-03
      },
    })
  } catch {
    // Silently swallow all errors — tracking must never break UX (D-02)
  }
}
```

Key implementation notes:
- `"use server"` directive at the top (Server Action)
- No `return` value needed in the caller — the function is `void`
- `sessionId: null` is intentional per D-03
- The outer try/catch wraps EVERYTHING including auth resolution and DB insert
- `ipHash` is NOT captured in Server Actions — it's only available in Route Handlers via request headers. This is acceptable; `userId` is the primary identifier here.
</action>

<acceptance_criteria>
- File exists: `src/app/actions/tracking.ts`
- `tracking.ts` starts with `"use server"`
- `tracking.ts` contains `export async function logCopyEvent(`
- `tracking.ts` contains `sessionId: null`
- `tracking.ts` contains `db.copyEvent.create(`
- `tracking.ts` contains a top-level `try { ... } catch { }` block that wraps ALL logic
- `tracking.ts` contains `auth()` from `@clerk/nextjs/server`
- `tracking.ts` does NOT contain `throw` (errors must never surface)
- `tracking.ts` does NOT contain `return { error:` or `return { success:` (void return type)
- TypeScript compilation: `npx tsc --noEmit` exits 0
</acceptance_criteria>

## Security Threat Model

| Threat | Severity | Mitigation |
|--------|----------|------------|
| Unauthenticated copy event spam | Low | Anonymous events allowed by design (userId: null); rate limiting deferred |
| firmId injection with invalid value | Medium | Zod validation rejects empty strings and non-string values before DB insert |
| Server Action exposed to CSRF | Low | Next.js Server Actions include built-in CSRF protection via origin checking |
| Auth errors surfacing to user | High | Auth block wrapped in inner try/catch; any failure resolves to anonymous |

## Verification

```bash
# File exists
ls src/app/actions/tracking.ts

# "use server" directive present
grep '"use server"' src/app/actions/tracking.ts

# Core export present
grep "export async function logCopyEvent" src/app/actions/tracking.ts

# sessionId null per D-03
grep "sessionId: null" src/app/actions/tracking.ts

# No throws (fire-and-forget)
! grep -n "\bthrow\b" src/app/actions/tracking.ts

# No TypeScript errors
npx tsc --noEmit 2>&1 | grep -c "actions/tracking" || echo "0 errors"
```
