---
phase: 1
slug: foundation
status: draft
shadcn_initialized: true
preset: none
created: 2026-05-03
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for the PropPilot design system and app shell. Generated for Phase 1: Foundation.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | shadcn/ui |
| Preset | none (full custom override) |
| Component library | Radix UI (via shadcn/ui) |
| Icon library | lucide-react |
| Font | Inter (next/font/google, variable font) |

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing, icon-text gaps |
| md | 16px | Default element spacing, card padding |
| lg | 24px | Section padding, form groups |
| xl | 32px | Layout gaps, section separation |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Page-level spacing, hero sections |
| 4xl | 96px | Large section separators |

Exceptions: none

---

## Typography

All text uses Inter (loaded via `next/font/google`). Dark-mode-first. Tight tracking on display sizes for premium feel.

| Role | Tailwind Class | Size | Weight | Line Height | Letter Spacing | Usage |
|------|---------------|------|--------|-------------|---------------|-------|
| display-2xl | `text-7xl font-extrabold` | 72px | 800 | 1.05 | -0.04em | Hero headlines |
| display-xl | `text-5xl font-bold` | 48px | 700 | 1.1 | -0.03em | Section heroes |
| display-lg | `text-4xl font-bold` | 36px | 700 | 1.15 | -0.02em | Page titles |
| heading-xl | `text-2xl font-semibold` | 24px | 600 | 1.25 | -0.01em | Card headers |
| heading-md | `text-xl font-semibold` | 20px | 600 | 1.3 | -0.01em | Sub-headers |
| heading-sm | `text-lg font-semibold` | 18px | 600 | 1.4 | 0 | Section labels |
| body-lg | `text-base font-normal` | 16px | 400 | 1.6 | 0 | Primary body text |
| body-md | `text-sm font-normal` | 14px | 400 | 1.5 | 0 | Secondary text, nav links |
| body-sm | `text-xs font-normal` | 12px | 400 | 1.4 | 0 | Captions, meta info |
| label | `text-sm font-medium` | 14px | 500 | 1 | 0.01em | Buttons, badges, form labels |
| label-sm | `text-xs font-medium` | 12px | 500 | 1 | 0.02em | Small badges, status chips |
| mono | `font-mono text-sm` | 14px | 400 | 1.4 | 0 | Discount codes, IDs, amounts |

---

## Color Palette

### Base Colors (deep dark fintech — "Bloomberg meets modern SaaS")

| CSS Variable | Hex | HSL | Role |
|-------------|-----|-----|------|
| `--background` | `#08080F` | `240 43% 4%` | Page background (near-black with blue undertone) |
| `--surface` | `#0E0E1A` | `240 33% 8%` | Card / panel background |
| `--surface-2` | `#131320` | `240 30% 10%` | Nested surface (inputs, table rows, hover state) |
| `--surface-3` | `#1A1A2E` | `240 27% 14%` | Elevated surfaces, popovers |
| `--border` | `#1E1E30` | `240 24% 15%` | Default border color |
| `--border-subtle` | `#161625` | `240 28% 11%` | Subtle dividers between sections |
| `--border-accent` | `rgba(0,212,170,0.15)` | — | Teal-tinted borders on cards, focus states |

### Brand Colors

| CSS Variable | Hex | Role |
|-------------|-----|------|
| `--teal-primary` | `#00D4AA` | Primary brand — CTAs, active states, primary buttons |
| `--teal-dim` | `#00A882` | Hover states, secondary teal, filled chips |
| `--teal-deep` | `#007A5E` | Active/pressed states |
| `--teal-glow` | `rgba(0,212,170,0.2)` | Glow/shadow color for teal elements |
| `--teal-subtle` | `rgba(0,212,170,0.08)` | Teal-tinted surfaces, selected states |
| `--cyan-accent` | `#22D3EE` | Highlight accents, info badges, link hover |
| `--mint-accent` | `#6EE7B7` | Success states, verified badges, positive indicators |
| `--purple-accent` | `#8B5CF6` | Secondary accent — tier badges, premium features, score |
| `--purple-dim` | `#6D28D9` | Purple hover, dark purple use |
| `--purple-subtle` | `rgba(139,92,246,0.12)` | Purple-tinted surfaces |

### Semantic Colors

| CSS Variable | Hex | Role |
|-------------|-----|------|
| `--text-primary` | `#F1F5F9` | Primary text (near white, slightly cool) |
| `--text-secondary` | `#94A3B8` | Secondary text (muted slate) |
| `--text-muted` | `#475569` | Tertiary text, disabled, placeholder |
| `--text-on-teal` | `#001A14` | Text on teal primary backgrounds |
| `--destructive` | `#F87171` | Errors, destructive actions, rejected claims |
| `--destructive-bg` | `rgba(248,113,113,0.1)` | Destructive state backgrounds |
| `--warning` | `#FBBF24` | Warnings, expiring codes |
| `--warning-bg` | `rgba(251,191,36,0.1)` | Warning state backgrounds |
| `--success` | `#6EE7B7` | Approved claims, verified data (= mint-accent) |
| `--success-bg` | `rgba(110,231,183,0.1)` | Success state backgrounds |

### Glassmorphism Surfaces

| Pattern | CSS Properties | Usage |
|---------|---------------|-------|
| `glass-card` | `background: rgba(14,14,26,0.6); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);` | Premium feature cards, comparison cards |
| `glass-nav` | `background: rgba(8,8,15,0.8); border-bottom: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);` | Sticky header |
| `glass-modal` | `background: rgba(13,13,25,0.95); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(24px);` | Modals, drawer |
| `glass-teal` | `background: rgba(0,212,170,0.06); border: 1px solid rgba(0,212,170,0.15); backdrop-filter: blur(12px);` | Featured/highlighted cards |

---

## shadcn/ui Theme Tokens (globals.css)

```css
/* globals.css — PropPilot Design System */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 240 43% 4%;         /* #08080F */
    --foreground: 210 40% 95%;        /* #F1F5F9 */
    --card: 240 33% 8%;               /* #0E0E1A */
    --card-foreground: 210 40% 95%;
    --popover: 240 30% 10%;           /* #131320 */
    --popover-foreground: 210 40% 95%;
    --primary: 167 100% 42%;          /* #00D4AA teal */
    --primary-foreground: 168 100% 5%; /* #001A14 */
    --secondary: 240 24% 15%;         /* #1E1E30 */
    --secondary-foreground: 210 40% 75%;
    --muted: 240 27% 14%;             /* #1A1A2E */
    --muted-foreground: 215 20% 55%;  /* #94A3B8 */
    --accent: 167 100% 42%;           /* #00D4AA */
    --accent-foreground: 168 100% 5%;
    --destructive: 0 91% 71%;         /* #F87171 */
    --destructive-foreground: 210 40% 98%;
    --border: 240 24% 15%;            /* #1E1E30 */
    --input: 240 27% 14%;             /* #1A1A2E */
    --ring: 167 100% 42%;             /* #00D4AA teal focus ring */
    --radius: 0.625rem;               /* 10px — slightly more rounded than default */
  }
}

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-feature-settings: 'cv11', 'ss01';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html { color-scheme: dark; }
}

/* Glassmorphism utilities */
@layer utilities {
  .glass-card {
    background: rgba(14, 14, 26, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .glass-nav {
    background: rgba(8, 8, 15, 0.8);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  .glass-teal {
    background: rgba(0, 212, 170, 0.06);
    border: 1px solid rgba(0, 212, 170, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .teal-glow {
    box-shadow: 0 0 20px rgba(0, 212, 170, 0.25), 0 0 60px rgba(0, 212, 170, 0.08);
  }
  .teal-glow-sm {
    box-shadow: 0 0 10px rgba(0, 212, 170, 0.2);
  }
  .gradient-text-teal {
    background: linear-gradient(135deg, #00D4AA 0%, #22D3EE 50%, #6EE7B7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .gradient-text-brand {
    background: linear-gradient(135deg, #00D4AA 0%, #8B5CF6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

---

## Tailwind Config Extensions

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // PropPilot brand palette
        teal: {
          primary: '#00D4AA',
          dim: '#00A882',
          deep: '#007A5E',
          subtle: 'rgba(0,212,170,0.08)',
          glow: 'rgba(0,212,170,0.20)',
        },
        cyan: {
          accent: '#22D3EE',
        },
        mint: {
          accent: '#6EE7B7',
        },
        purple: {
          accent: '#8B5CF6',
          dim: '#6D28D9',
          subtle: 'rgba(139,92,246,0.12)',
        },
        // Dark surfaces
        surface: {
          DEFAULT: '#0E0E1A',
          2: '#131320',
          3: '#1A1A2E',
        },
        // Semantic
        'prop-bg': '#08080F',
        'prop-border': '#1E1E30',
        'prop-border-subtle': '#161625',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'teal-glow': '0 0 20px rgba(0,212,170,0.25), 0 0 60px rgba(0,212,170,0.08)',
        'teal-glow-sm': '0 0 10px rgba(0,212,170,0.20)',
        'glass': 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
        'glass-teal': 'inset 0 1px 0 0 rgba(0,212,170,0.1)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,170,0.1)',
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-out-right': 'slideOutRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-out': 'fadeOut 0.15s ease-in',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-teal': 'pulseTeal 2s ease-in-out infinite',
      },
      keyframes: {
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideOutRight: {
          from: { transform: 'translateX(0)', opacity: '1' },
          to: { transform: 'translateX(100%)', opacity: '0' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        scaleIn: {
          from: { transform: 'scale(0.96)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        pulseTeal: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
```

---

## Component Contracts

### Header

| Property | Spec |
|---------|------|
| Height | 64px desktop / 56px mobile |
| Position | `sticky top-0 z-50` |
| Background | `glass-nav` (rgba(8,8,15,0.8) + backdrop-blur-xl + bottom border rgba(255,255,255,0.06)) |
| Max width container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Logo | PropPilot wordmark — `text-white font-bold text-xl tracking-tight`. "Prop" in white, "Pilot" in `#00D4AA`. Link to `/` |
| Nav links (guest) | Compare, Guides, Rewards, Sign In — `text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200` |
| Sign In link | Styled as outlined button: `border border-teal-primary/30 text-teal-primary hover:bg-teal-primary hover:text-prop-bg px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200` |
| Active nav link | `text-white` (current page) |
| Reward points pill (signed-in) | `⟐ [N] pts` — `glass-teal` background, `text-teal-primary text-xs font-semibold px-3 py-1.5 rounded-full`. Links to `/dashboard/rewards`. Shows animated count |
| Avatar/profile (signed-in) | Clerk `<UserButton>` — customized with dark appearance. Position: right of reward pill |
| Hamburger icon | `Menu` from lucide-react. Visible below `lg` breakpoint (1024px). `text-slate-400 hover:text-white` |
| Border bottom | `border-b border-white/[0.06]` |

### Mobile Drawer

| Property | Spec |
|---------|------|
| Width | `280px` fixed, full height |
| Slide direction | Right → Left (from right edge) |
| Animation | `slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)` |
| Background | `glass-modal` (rgba(13,13,25,0.97) + backdrop-blur-2xl) |
| Border left | `border-l border-white/[0.08]` |
| Overlay | `bg-black/60 backdrop-blur-sm` — covers remaining screen |
| Close action | X icon (top-right of drawer) + tap overlay |
| Close icon | `X` from lucide-react, `text-slate-400 hover:text-white` |
| Drawer content | PropPilot logo (top), nav links (Compare, Guides, Rewards), divider, Sign In button OR reward pill + UserButton |
| Nav links in drawer | `text-base font-medium text-slate-300 hover:text-teal-primary py-3 border-b border-white/[0.04] flex items-center gap-3` |
| Transition | `AnimatePresence` from Framer Motion — requires `"use client"` |

### Sign-in / Sign-up Pages

| Property | Spec |
|---------|------|
| Page layout | Full viewport, dark gradient background |
| Page background | `bg-prop-bg` with subtle radial gradient: `radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.05) 0%, transparent 60%)` |
| Content layout | Vertically + horizontally centered: `min-h-screen flex flex-col items-center justify-center` |
| PropPilot logo | Above the Clerk card. Logo + wordmark, `mb-8`. Links to `/` |
| Clerk card wrapper | `max-w-md w-full` — Clerk renders its component here |
| Clerk appearance tokens | Background: `#0E0E1A`, border: `#1E1E30`, text: `#F1F5F9`, label: `#94A3B8`, input bg: `#131320`, input border: `#1E1E30`, primary (button): `#00D4AA`, primary text: `#001A14`, border-radius: `10px` |
| Background decoration | Subtle grid pattern (CSS `background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)`) at 40px intervals |

### Footer (App Shell)

| Property | Spec |
|---------|------|
| Background | `#0A0A16` (slightly different from page bg, subtle separation) |
| Border top | `border-t border-white/[0.06]` |
| Padding | `py-12 px-4` |
| Max width | `max-w-7xl mx-auto` |
| Layout (desktop) | 3-column: Logo+tagline left, links center, legal right |
| Layout (mobile) | Single column, stacked |
| Logo | PropPilot wordmark (same as header) + tagline: "Compare. Save. Trade." in `text-slate-500 text-sm mt-1` |
| Link columns | Compare, Guides, Rewards, Dashboard / About, Legal, Affiliate Disclosure, Privacy |
| Link style | `text-sm text-slate-400 hover:text-slate-200 transition-colors` |
| Copyright | `© 2026 PropPilot. All rights reserved.` — `text-xs text-slate-500` |
| Affiliate notice | One-line: "PropPilot earns commissions from affiliate links. All opinions are independent." — `text-xs text-slate-600 mt-4` |

---

## Interaction Patterns

| Interaction | Pattern |
|------------|---------|
| Hover: nav links | `text-slate-400 → text-white`, `transition-colors duration-200` |
| Hover: primary button (teal) | `brightness-110 + teal-glow-sm shadow`, `transition-all duration-200` |
| Hover: outlined button | `bg-teal-primary/10 border-teal-primary/60`, `transition-all duration-200` |
| Active: nav item (current page) | `text-white` — no underline, no background |
| Active: mobile drawer item | `text-teal-primary` left border indicator `border-l-2 border-teal-primary pl-3` |
| Reward pill: hover | Slight `brightness-110`, cursor-pointer |
| Drawer: open | `slideInRight 0.3s` + overlay `fadeIn 0.2s` |
| Drawer: close | `slideOutRight 0.25s` + overlay fade out |
| Focus: all inputs | `ring-2 ring-teal-primary/50 border-teal-primary/50 outline-none` |
| Focus: all buttons | `ring-2 ring-teal-primary/50 ring-offset-2 ring-offset-prop-bg` |
| Clerk sign-in form submit | Default Clerk behavior; button appears teal |

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Site name | PropPilot |
| Logo tagline | "Compare. Save. Trade." |
| Sign In nav link | Sign In |
| Get started CTA | Get Started |
| Sign-in page headline | "Welcome back." |
| Sign-in page subheadline | "Sign in to track your rewards and compare prop firms." |
| Sign-up page headline | "Join PropPilot." |
| Sign-up page subheadline | "Compare prop firms, copy verified discount codes, and earn rewards." |
| Post-sign-in loading | "Taking you to your dashboard…" |
| Auth error (generic) | "Something went wrong. Please try again." |
| Reward pill tooltip | "[N] PropPilot Points — View rewards" |
| Mobile drawer close | "Close menu" (sr-only) |

---

## Accessibility

| Requirement | Implementation |
|------------|---------------|
| Color contrast | All body text (`#F1F5F9` on `#08080F`) = 17.5:1 — exceeds WCAG AAA |
| Secondary text contrast | `#94A3B8` on `#08080F` = 5.9:1 — passes WCAG AA |
| Focus indicators | Visible teal ring (`ring-2 ring-teal-primary/50`) on all interactive elements |
| Skip link | `<a href="#main-content">Skip to main content</a>` as first DOM element, visually hidden until focused |
| Aria labels | All icon-only buttons have `aria-label` (hamburger: "Open navigation menu", X: "Close navigation menu") |
| Keyboard nav | All nav items reachable by keyboard; drawer traps focus when open (`focus-trap-react` or Radix Dialog) |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` — disable all animations, show instant transitions |
| Screen reader | Drawer has `role="dialog" aria-modal="true" aria-label="Navigation menu"` |

---

## Responsive Breakpoints

| Breakpoint | Width | Behavior |
|-----------|-------|---------|
| Mobile | < 768px | Hamburger nav, reward pill hidden from header (in drawer only), full-width layouts |
| Tablet | 768px–1023px | Hamburger nav still visible, content columns start appearing |
| Desktop | ≥ 1024px | Full header nav visible, hamburger hidden |
| Wide | ≥ 1280px | Max content width `max-w-7xl` (1280px) — centered with generous side margins |

---

## Phase 1 Scope Clarification

**In scope for this phase:**
- `globals.css` — all CSS variables, shadcn tokens, utility classes, glassmorphism utilities
- `tailwind.config.ts` — full config with custom colors, animations, keyframes
- `app/layout.tsx` — root layout with Inter font, route groups, NuqsAdapter, metadata
- `components/layout/Header.tsx` — full header (guest + signed-in states)
- `components/layout/Footer.tsx` — full footer shell
- `components/layout/MobileDrawer.tsx` — animated mobile nav drawer
- `app/(marketing)/layout.tsx` — marketing shell layout with Header + Footer
- `app/(dashboard)/layout.tsx` — dashboard layout shell (sidebar stub)
- `app/(admin)/layout.tsx` — admin layout shell (sidebar stub)
- `app/sign-in/[[...sign-in]]/page.tsx` — Clerk embedded sign-in
- `app/sign-up/[[...sign-up]]/page.tsx` — Clerk embedded sign-up

**NOT in Phase 1 scope:**
- Home page hero or any content sections
- Compare page or firm cards
- Dashboard feature components
- Admin UI beyond layout shell
- Any data-fetching components (those come in later phases)

---

## Flag Notes

🚩 `backdrop-filter` requires `webkit` prefix for Safari — ensure both are applied.
🚩 Framer Motion requires `"use client"` on Header and MobileDrawer — plan component boundary carefully.
🚩 Clerk `<SignIn>` appearance customization uses `appearance.variables` and `appearance.elements` — verify exact token names against current Clerk docs during implementation.
