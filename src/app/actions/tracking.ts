"use server"

/**
 * Affiliate Tracking Server Actions
 *
 * logCopyEvent — logs a CopyEvent when a user copies a discount code.
 *
 * D-04: Clerk ID → DB userId lazy-sync (handles anonymous users gracefully)
 * D-08: Callers must NOT await this — fire-and-forget
 * D-03: sessionId is null in Phase 6
 * D-09: Accepts firmId and offerId as params
 */

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { z } from "zod"

// Zod schema for copy event input validation
const copyEventSchema = z.object({
  firmId: z.string().min(1, "firmId is required"),
  offerId: z.string().min(1, "offerId is required"),
})

/**
 * Log a discount code copy event to the database.
 *
 * This action is fire-and-forget — callers must NOT await it.
 * All errors are swallowed silently; tracking must never interrupt the UI.
 */
export async function logCopyEvent(
  firmId: string,
  offerId: string
): Promise<void> {
  try {
    // Validate inputs
    const result = copyEventSchema.safeParse({ firmId, offerId })
    if (!result.success) return

    // Resolve DB userId from Clerk (D-04: lazy-sync, anonymous-safe)
    let userId: string | null = null
    try {
      const { userId: clerkId } = await auth()
      if (clerkId) {
        const dbUser = await db.user.findUnique({ where: { clerkId } })
        userId = dbUser?.id ?? null
      }
    } catch {
      // Anonymous user or auth unavailable — proceed without userId
    }

    await db.copyEvent.create({
      data: {
        firmId: result.data.firmId,
        offerId: result.data.offerId,
        userId,
        sessionId: null, // D-03: deferred to Phase 7
      },
    })
  } catch {
    // Silently swallow — tracking must NEVER break the copy UX (D-02)
  }
}
