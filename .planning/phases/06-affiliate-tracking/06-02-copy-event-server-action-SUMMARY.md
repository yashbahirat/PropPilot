---
plan: 06-02
status: complete
completed_at: 2026-05-20
---

# Summary: Copy Event Server Action

## What Was Built

Created `src/app/actions/tracking.ts` — a `"use server"` file exporting:

```typescript
export async function logCopyEvent(firmId: string, offerId: string): Promise<void>
```

The function:
1. Validates inputs with Zod (`copyEventSchema`)
2. Resolves DB userId from Clerk auth (lazy-sync, handles anonymous)
3. Inserts a `CopyEvent` row with `sessionId: null` (Phase 6 scope)
4. Swallows all errors silently — tracking never breaks the copy UX

## Key Decisions Applied

- `"use server"` directive + Zod validation per established Server Action pattern
- Clerk → DB userId resolution per D-04, graceful for anonymous users (D-03)
- Fire-and-forget design — callers must NOT await (D-08)
- `sessionId: null` per D-03

## Files Created

- `src/app/actions/tracking.ts` (62 lines)

## Verification

- TypeScript: `npx tsc --noEmit` — ✅ 0 errors
- All acceptance criteria met ("use server", logCopyEvent, Zod, copyEvent.create, sessionId: null)
