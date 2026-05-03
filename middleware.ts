import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Public routes — accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/compare(.*)',
  '/firms(.*)',
  '/guides(.*)',
  '/rewards',
  '/go(.*)',           // affiliate redirect — must be public
  '/legal(.*)',
  '/api/webhooks(.*)', // Clerk webhook — verified by Svix signature, not Clerk session
])

// Admin routes — require authentication AND admin role in publicMetadata
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, request) => {
  // Admin routes: require authentication AND admin role
  if (isAdminRoute(request)) {
    // auth.protect() will redirect unauthenticated users to sign-in automatically
    const { userId, sessionClaims } = await auth.protect()

    // Check admin role stored in Clerk publicMetadata
    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // All non-public routes require authentication (auto-redirects to sign-in)
  if (!isPublicRoute(request)) {
    await auth.protect()
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
