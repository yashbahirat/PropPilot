/**
 * /go/[slug] — Affiliate Redirect Route Handler
 *
 * Looks up a firm by slug, fires an async AffiliateClick log event,
 * and immediately 302-redirects to the firm's affiliate URL.
 *
 * D-01: Tracking runs via after() (fires post-response). Fallback: floating promise.
 * D-02: Tracking errors NEVER propagate — always swallowed silently.
 * D-03: sessionId is null in Phase 6.
 * D-04: Logged-in DB userId captured when available (Clerk lazy-sync pattern).
 */

import { NextRequest, NextResponse } from "next/server"
import { after } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { createHash } from "crypto"
import { db } from "@/lib/db"

// Prisma requires Node.js runtime — never Edge
export const runtime = "nodejs"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Look up firm by slug with active offers
  const firm = await db.firm.findUnique({
    where: { slug },
    include: {
      offers: {
        where: { isActive: true },
        orderBy: [{ isExclusive: "desc" }, { createdAt: "desc" }],
      },
    },
  })

  if (!firm) {
    return NextResponse.json({ error: "Firm not found" }, { status: 404 })
  }

  // Resolve redirect target: best active offer → firm.affiliateUrl → website
  const featuredOffer =
    firm.offers.find((o) => o.isExclusive && o.affiliateUrl) ||
    firm.offers.find((o) => o.affiliateUrl) ||
    firm.offers[0] ||
    null

  const redirectUrl =
    featuredOffer?.affiliateUrl ||
    firm.affiliateUrl ||
    firm.websiteUrl ||
    "/"

  // Gather tracking metadata before responding
  const referrer = request.headers.get("referer") || null
  const userAgent = request.headers.get("user-agent") || null
  const forwardedFor = request.headers.get("x-forwarded-for") || null
  const clientIp = forwardedFor?.split(",")[0]?.trim() || null

  // SHA-256 hash of IP for privacy-safe correlation (D-03: sessionId null)
  const ipHash = clientIp
    ? createHash("sha256").update(clientIp).digest("hex")
    : null

  // Resolve DB userId from Clerk (D-04: lazy-sync pattern, handles anonymous)
  const resolveUserId = async (): Promise<string | null> => {
    try {
      const { userId: clerkId } = await auth()
      if (!clerkId) return null

      const dbUser = await db.user.findUnique({ where: { clerkId } })
      return dbUser?.id ?? null
    } catch {
      return null
    }
  }

  // Fire-and-forget click logging — after() fires post-response (D-01, D-02)
  const logClick = async () => {
    try {
      const userId = await resolveUserId()

      await db.affiliateClick.create({
        data: {
          firmId: firm.id,
          offerId: featuredOffer?.id ?? null,
          userId,
          sessionId: null, // D-03: deferred to Phase 7
          referrer,
          userAgent,
          ipHash,
        },
      })
    } catch {
      // Silently swallow — tracking must never break redirect (D-02)
    }
  }

  // Schedule async tracking: after() preferred, floating promise as fallback
  try {
    after(logClick)
  } catch {
    Promise.resolve().then(logClick)
  }

  // Issue the affiliate redirect
  return NextResponse.redirect(redirectUrl, { status: 302 })
}
