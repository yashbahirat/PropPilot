import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { db } from '@/lib/db'

// Required: Node.js runtime — Prisma cannot run in Edge Runtime
export const runtime = 'nodejs'

type ClerkUserEventData = {
  id: string
  email_addresses: Array<{ email_address: string; id: string }>
  first_name: string | null
  last_name: string | null
  image_url: string | null
  primary_email_address_id: string
}

type ClerkUserEvent = {
  type: 'user.created' | 'user.updated' | 'user.deleted'
  data: ClerkUserEventData
}

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('[Clerk Webhook] CLERK_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  // Get Svix signature headers
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: 'Missing Svix signature headers' }, { status: 400 })
  }

  // Verify webhook signature (prevents spoofed events)
  const body = await request.text()
  const wh = new Webhook(WEBHOOK_SECRET)

  let event: ClerkUserEvent

  try {
    event = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkUserEvent
  } catch (_err) {
    console.error('[Clerk Webhook] Signature verification failed')
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 })
  }

  // ── user.created: upsert User + initialize UserRewardPoints ─────────────
  if (event.type === 'user.created') {
    const primaryEmail = event.data.email_addresses.find(
      (e) => e.id === event.data.primary_email_address_id
    )

    if (!primaryEmail) {
      console.error('[Clerk Webhook] No primary email found for user:', event.data.id)
      return NextResponse.json({ error: 'No primary email' }, { status: 400 })
    }

    try {
      await db.$transaction(async (tx) => {
        // Upsert user record
        const user = await tx.user.upsert({
          where: { clerkId: event.data.id },
          update: {
            email: primaryEmail.email_address,
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            imageUrl: event.data.image_url,
          },
          create: {
            clerkId: event.data.id,
            email: primaryEmail.email_address,
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            imageUrl: event.data.image_url,
          },
        })

        // Initialize reward points (BRONZE tier, 0 balance) — atomic with user creation
        await tx.userRewardPoints.upsert({
          where: { userId: user.id },
          update: {},
          create: {
            userId: user.id,
            balance: 0,
            tier: 'BRONZE',
          },
        })
      })

      console.log('[Clerk Webhook] user.created synced:', event.data.id)
    } catch (err) {
      console.error('[Clerk Webhook] DB error on user.created:', err)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
  }

  // ── user.updated: sync profile changes ──────────────────────────────────
  if (event.type === 'user.updated') {
    const primaryEmail = event.data.email_addresses.find(
      (e) => e.id === event.data.primary_email_address_id
    )

    if (primaryEmail) {
      try {
        await db.user.updateMany({
          where: { clerkId: event.data.id },
          data: {
            email: primaryEmail.email_address,
            firstName: event.data.first_name,
            lastName: event.data.last_name,
            imageUrl: event.data.image_url,
          },
        })
        console.log('[Clerk Webhook] user.updated synced:', event.data.id)
      } catch (err) {
        console.error('[Clerk Webhook] DB error on user.updated:', err)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
