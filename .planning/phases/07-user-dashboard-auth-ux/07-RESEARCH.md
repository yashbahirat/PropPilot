# Phase 7: User Dashboard & Auth UX - Research

## 1. Domain Overview
The user dashboard provides a protected area for authenticated users to view their profile, saved firms, claims history, and reward status. Additionally, the Clerk authentication UI requires a deep visual integration to match the "Bloomberg SaaS" aesthetic.

## 2. Technical Approach
### Dashboard Layout
- **Desktop Sidebar:** `src/app/(dashboard)/layout.tsx` will be updated to include a collapsible sidebar navigation component. It will have links to: Profile (`/dashboard`), Claims (`/dashboard/claims`), Rewards (`/dashboard/rewards`), and Saved Firms (`/dashboard/saved-firms`).
- **Mobile Navigation:** `src/components/layout/MobileDrawer.tsx` already handles the drawer logic. It will be updated to inject the dashboard links when the user is signed in.
- **Sign Out:** The `UserButton` or a custom `SignOutButton` will be placed at the bottom of the sidebar.

### Auth UX Polish
- `src/app/sign-in/[[...sign-in]]/page.tsx` and `src/app/sign-up/[[...sign-up]]/page.tsx` will be modified.
- The Clerk `<SignIn>` and `<SignUp>` components will have their `appearance` prop deeply customized.
- **Elements to override:** `card` (seamless background, glow effect), `formFieldInput` (match shadcn UI borders/focus rings), `socialButtonsBlockButton` (glassmorphism style).

### Data & Components
- **Saved Firms:** Fetch from `db.savedFirm.findMany({ where: { userId }, include: { firm: true } })`. Display as a grid of firm cards. Include an inline remove button (Server Action) and a bulk "Compare Selected" CTA that links to `/compare?compare=...`.
- **Claims History:** Fetch from `db.purchaseClaim.findMany({ where: { userId } })`. Display in a clean table with `ClaimStatus` badges.
- **Reward Status:** Fetch from `db.userRewardPoints.findUnique({ where: { userId } })`. Display points balance, current tier (`RewardTierName`), and a linear progress bar calculating distance to the next tier threshold (which requires fetching `RewardTier` data).
- **Profile:** Basic info derived from Clerk's `currentUser()` and the local `User` model.

## 3. Integration Points
- **Clerk Auth:** `clerkMiddleware` handles route protection for `/dashboard`.
- **Database:** Server components in the `(dashboard)` route group will use the Prisma client to read user-specific data.
- **Tailwind/shadcn:** The UI will heavily rely on shadcn UI components (Card, Progress, Table, Button) and custom Framer Motion animations.

## 4. Validation Architecture
- Check route protection: unauthorized access to `/dashboard` must redirect to `/sign-in`.
- Check Sidebar visibility: sidebar should collapse and expand on desktop.
- Check Mobile Drawer: dashboard links must appear only when signed in.
- Check Data Rendering: Saved Firms, Claims, and Rewards must correctly reflect the database state for the logged-in user.
- Check Actions: Removing a saved firm must instantly reflect in the UI.
