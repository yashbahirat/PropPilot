---
plan: 05-06-final-hero-faqs-fix
phase: 05-firm-detail-pages
status: complete
completed: 2026-05-17T04:32:00Z
commit: 1a4b4fb1494f7f0beb231bb08fbf9b91d7963d00
---

## One-Liner

Ultra-premium FirmHero redesign (Netflix/Apple style) + FAQ seed data — closes the last 2 UAT gaps in Phase 05.

## What Was Built

### Task 1: FAQ Seed Data
- Added realistic FAQ entries for Apex Trader Funding and Topstep in `prisma/seed.ts`
- FAQs cover topics like drawdown rules, payout schedules, and account restrictions
- Enables functional testing of the Accordion component in the FAQs tab (resolves Test 10)

### Task 2: FirmHero Ultra-Premium Overhaul
- **Layout**: Full-bleed background image with Netflix-style heavy bottom gradient
- **Typography**: Massive `text-8xl font-black tracking-tighter` firm name — dominant and cinematic
- **Logo**: Dark glass container with hover glow effect
- **CTAs**: White Apple-style primary button + glass-bordered copy button
- **Animations**: Subtle scale/fade entrance animations via Framer Motion `LazyMotion`/`domAnimation`
- **Glassmorphism**: CTA panel with backdrop-blur and semi-transparent border
- Also fixed `submitReview` lazy DB user sync and Decimal serialization in `page.tsx`

## Key Files

- `src/components/firm/FirmHero.tsx` — Finalized hero component
- `prisma/seed.ts` — FAQ data added for seeded firms

## Self-Check: PASSED

- [x] FAQ data seeded and Accordion tab functional
- [x] FirmHero passes premium fintech bar (Netflix/Apple aesthetic)
- [x] UAT: 11/11 tests passed (chore commit: e6a0069)
- [x] No regressions — build clean
