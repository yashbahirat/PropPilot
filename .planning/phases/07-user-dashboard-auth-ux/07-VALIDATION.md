---
phase: 07
slug: user-dashboard-auth-ux
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-20
---

# Phase 07 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest / React Testing Library |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npm run test` |
| **Full suite command** | `npm run test` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test`
- **After every plan wave:** Run `npm run test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 07-01-01 | 01 | 1 | DASH-01 | — | N/A | render | `npm run test -- dashboard layout` | ❌ W0 | ⬜ pending |
| 07-02-01 | 02 | 1 | DASH-02 | — | N/A | render | `npm run test -- claims` | ❌ W0 | ⬜ pending |
| 07-03-01 | 03 | 1 | DASH-03 | — | N/A | render | `npm run test -- saved firms` | ❌ W0 | ⬜ pending |
| 07-04-01 | 04 | 1 | DASH-04 | — | N/A | render | `npm run test -- rewards` | ❌ W0 | ⬜ pending |
| 07-05-01 | 05 | 2 | DASH-05 | — | N/A | action | `npm run test -- save firm` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `__tests__/dashboard-layout.test.tsx` — stubs for DASH-01
- [ ] `__tests__/saved-firms.test.tsx` — stubs for DASH-03
- [ ] `__tests__/claims.test.tsx` — stubs for DASH-02
- [ ] `__tests__/rewards.test.tsx` — stubs for DASH-04

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Clerk Auth Customization | Auth UX Polish | Clerk components are third-party and heavily rely on CSS rendering | Verify `/sign-in` and `/sign-up` visually map to PropPilot dark theme. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
