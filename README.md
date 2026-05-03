# PropPilot

> The trusted comparison platform for proprietary trading firms.

Compare prop firms, discover verified discount codes, and earn rewards for verified purchases.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | Clerk |
| Database | PostgreSQL (Neon) + Prisma 7 |
| Animations | Framer Motion |
| Deployment | Vercel |

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd PropPilot
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

| Variable | Source | Description |
|----------|--------|-------------|
| `DATABASE_URL` | Neon Dashboard | Pooled connection (pgBouncer) |
| `DIRECT_URL` | Neon Dashboard | Direct connection for migrations |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk Dashboard | Public Clerk key |
| `CLERK_SECRET_KEY` | Clerk Dashboard | Secret Clerk key |
| `CLERK_WEBHOOK_SECRET` | Clerk Webhooks | Svix signing secret |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | — | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | — | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | — | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | — | `/dashboard` |
| `UPLOADTHING_SECRET` | UploadThing Dashboard | File upload secret |
| `UPLOADTHING_APP_ID` | UploadThing Dashboard | App ID |
| `NEXT_PUBLIC_APP_URL` | — | `http://localhost:3000` in dev |

### 3. Set up the database

Push the Prisma schema to Neon:

```bash
npx prisma db push
npx prisma generate
```

### 4. Configure Clerk webhook

1. Go to [Clerk Dashboard](https://clerk.com) → Webhooks → Add Endpoint
2. URL: `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to: `user.created`, `user.updated`
4. Copy the Signing Secret → set as `CLERK_WEBHOOK_SECRET`

### 5. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel

1. Push to GitHub
2. Connect repo at [vercel.com](https://vercel.com) → New Project
3. Add all environment variables from the table above
4. Deploy
5. Update Clerk Authorized Origins with the Vercel URL
6. Update Clerk webhook URL to `https://your-vercel-url.vercel.app/api/webhooks/clerk`

## Project Structure

```
src/
├── app/
│   ├── (marketing)/        # Public pages (home, compare, guides, rewards)
│   ├── (dashboard)/        # Authenticated user pages
│   ├── (admin)/            # Admin-only pages
│   ├── api/webhooks/clerk/ # Clerk → Prisma user sync
│   ├── sign-in/            # Embedded Clerk sign-in
│   └── sign-up/            # Embedded Clerk sign-up
├── components/
│   └── layout/             # Header, Footer, MobileDrawer
└── lib/
    ├── db.ts               # Prisma client singleton
    └── utils.ts            # cn() helper
prisma/
└── schema.prisma           # 15 models, 5 enums
middleware.ts               # Clerk route protection
prisma.config.ts            # Prisma 7 connection config
```

## Architecture Decisions

- **Route protection:** `clerkMiddleware()` in `middleware.ts` protects `/dashboard` (auth) and `/admin` (admin role)
- **User sync:** Clerk webhook at `/api/webhooks/clerk` creates `User` + `UserRewardPoints` atomically on sign-up
- **Prisma 7:** Connection URLs live in `prisma.config.ts` (not `schema.prisma`) — Prisma 7 pattern
- **Design system:** PropPilot palette (teal `#00D4AA`, purple `#8B5CF6`) on deep dark base (`#08080F`)
- **Glassmorphism:** `.glass-card`, `.glass-nav`, `.glass-modal`, `.glass-teal` utility classes

## License

MIT
