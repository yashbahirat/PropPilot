---
status: diagnosed
phase: 03-home-page
source: [03-01-SUMMARY.md, 03-02-SUMMARY.md, 03-03-SUMMARY.md]
started: 2026-05-09T07:43:00Z
updated: 2026-05-09T07:48:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Hero Component & Search Form
expected: |
  The home page renders the premium Hero component with a gradient mesh background. The search form accepts input, and submitting redirects the user to `/compare?q=term` (where `term` is the entered text).
result: pass

### 2. Featured Deals Carousel
expected: |
  The Featured Deals section displays a horizontal, snap-scroll carousel of firm offers with subtle entrance animations.
result: issue
reported: "pass but it doesnt scroll"
severity: major

### 3. Savings Cards Grid
expected: |
  The verified Savings section displays a responsive grid of firm offers. Hovering over a card produces a subtle glow/elevation effect.
result: pass

### 4. Trust Metrics & Social Proof
expected: |
  The Trust Metrics section displays animated counters (e.g., Verified Deals, Active Traders) with icons. Below it, the Social Proof section displays a glass-card highlighting the PropPilot Points program.
result: issue
reported: "the counters are not animated"
severity: minor

### 5. Home FAQ
expected: |
  The FAQ section displays a list of questions. Clicking a question expands an accordion to reveal the answer.
result: issue
reported: "yes it expands but the animation is not smooth"
severity: minor

## Summary

total: 5
passed: 2
issues: 3
pending: 0
skipped: 0

## Gaps

- truth: "The Featured Deals section displays a horizontal, snap-scroll carousel of firm offers with subtle entrance animations."
  status: failed
  reason: "User reported: pass but it doesnt scroll"
  severity: major
  test: 2
  root_cause: "Missing Framer Motion drag props for desktop swiping, and not enough items to naturally overflow on wide screens."
  artifacts: []
  missing:
    - "Add drag='x' and dragConstraints to FeaturedDeals carousel"
    - "Ensure sufficient width or items to enable scrolling"

- truth: "The Trust Metrics section displays animated counters (e.g., Verified Deals, Active Traders) with icons. Below it, the Social Proof section displays a glass-card highlighting the PropPilot Points program."
  status: failed
  reason: "User reported: the counters are not animated"
  severity: minor
  test: 4
  root_cause: "Counter values are hardcoded text instead of using Framer Motion useMotionValue and animate."
  artifacts: []
  missing:
    - "Implement an animated counter component using Framer Motion"
    - "Animate numbers from 0 to their target values when in view"

- truth: "The FAQ section displays a list of questions. Clicking a question expands an accordion to reveal the answer."
  status: failed
  reason: "User reported: yes it expands but the animation is not smooth"
  severity: minor
  test: 5
  root_cause: "globals.css is missing accordion-up and accordion-down keyframes/animations required by shadcn/ui in Tailwind 4."
  artifacts: []
  missing:
    - "Add accordion keyframes to globals.css @theme"
    - "Add accordion animation variables to globals.css @theme"
