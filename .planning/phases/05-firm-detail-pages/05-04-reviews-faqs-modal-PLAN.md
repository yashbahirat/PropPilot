---
phase: 05-firm-detail-pages
plan: 04
type: execute
wave: 3
depends_on: ["02"]
files_modified:
  - src/components/firm/tabs/FaqsTab.tsx
  - src/components/firm/tabs/ReviewsTab.tsx
  - src/components/firm/ReviewModal.tsx
  - src/app/actions/reviews.ts
  - src/components/firm/FirmDetailNav.tsx
autonomous: true
requirements:
  - FIRM-07
  - FIRM-08
must_haves:
  truths:
    - User can expand FAQ items to read answers
    - User can read paginated or listed user reviews
    - Logged-in user can click "Write a Review" and open a submission modal
    - Form submits a review successfully via Server Action
  artifacts:
    - path: src/components/firm/tabs/FaqsTab.tsx
      provides: Expandable FAQ list
    - path: src/components/firm/tabs/ReviewsTab.tsx
      provides: Review list and trigger for modal
    - path: src/components/firm/ReviewModal.tsx
      provides: Modal containing review form
    - path: src/app/actions/reviews.ts
      provides: Server action to insert review into DB
  key_links:
    - from: src/components/firm/ReviewModal.tsx
      to: src/app/actions/reviews.ts
      via: Form action
    - from: src/app/actions/reviews.ts
      to: prisma.review
      via: create
---

<objective>
Implement the FAQs tab, the Reviews tab, and the review submission workflow.

Purpose: Completes the firm detail page by adding community validation (FIRM-07) and common questions (FIRM-08), keeping the reading UX clean by moving submission to a modal (D-08).
Output: FaqsTab, ReviewsTab, ReviewModal components, and a Server Action for review submission.
</objective>

<execution_context>
@~/.gemini/antigravity/get-shit-done/workflows/execute-plan.md
@~/.gemini/antigravity/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/05-firm-detail-pages/05-CONTEXT.md
@.planning/phases/05-firm-detail-pages/05-UI-SPEC.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build FAQs Tab</name>
  <files>src/components/firm/tabs/FaqsTab.tsx, src/components/firm/FirmDetailNav.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-CONTEXT.md
  </read_first>
  <action>
    Create `FaqsTab.tsx`.
    Render the firm's FAQs using `shadcn/ui` Accordion.
    Implement D-07: If no FAQs, show an empty state ("No FAQs have been added yet.").
    Update `FirmDetailNav.tsx` to import and use `FaqsTab` instead of the placeholder.
  </action>
  <verify>
    <automated>grep -q "Accordion" src/components/firm/tabs/FaqsTab.tsx</automated>
  </verify>
  <done>FAQs tab renders expand/collapse accordion items.</done>
</task>

<task type="auto">
  <name>Task 2: Build Review Submission Action and Modal</name>
  <files>src/app/actions/reviews.ts, src/components/firm/ReviewModal.tsx</files>
  <read_first>
    - .planning/phases/05-firm-detail-pages/05-CONTEXT.md
  </read_first>
  <action>
    Create `src/app/actions/reviews.ts` with a Server Action `submitReview(formData: FormData)`.
    It must use Clerk `auth()` to verify the user is logged in. Insert the review into `prisma.review` (status: PENDING). Return success/error.
    Create `ReviewModal.tsx` as a Client Component.
    Implement D-08: Use `shadcn/ui` Dialog to create a modal. It contains a form with Star Rating input (1-5), Title, and Content textareas.
    Wire the form to the `submitReview` Server Action. On success, close modal and show toast.
  </action>
  <verify>
    <automated>grep -q "submitReview" src/app/actions/reviews.ts && grep -q "Dialog" src/components/firm/ReviewModal.tsx</automated>
  </verify>
  <done>Server Action and Modal component are created and wired together.</done>
</task>

<task type="auto">
  <name>Task 3: Build Reviews Tab and Wire Navigation</name>
  <files>src/components/firm/tabs/ReviewsTab.tsx, src/components/firm/FirmDetailNav.tsx</files>
  <read_first>
    - src/components/firm/ReviewModal.tsx
  </read_first>
  <action>
    Create `ReviewsTab.tsx`.
    Render a list of the firm's approved reviews using `shadcn/ui` Card for each review (show rating stars, title, content, date, user name).
    Implement D-07: Show empty state if no reviews ("Be the first to review!").
    Include the `<ReviewModal />` trigger button ("Write a Review") at the top of the tab.
    Update `FirmDetailNav.tsx` to import and use `ReviewsTab`.
  </action>
  <verify>
    <automated>grep -q "ReviewModal" src/components/firm/tabs/ReviewsTab.tsx && grep -q "ReviewsTab" src/components/firm/FirmDetailNav.tsx</automated>
  </verify>
  <done>Reviews tab lists reviews, includes the modal trigger, and is wired into the navigation.</done>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| Client → Server | User submitting review form data |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-05-04 | Spoofing | `reviews.ts` | mitigate | Action must verify user identity via Clerk `auth()`. |
| T-05-05 | Tampering | `reviews.ts` | mitigate | Validate rating is integer 1-5, sanitize text inputs (Prisma handles SQLi, React handles XSS on render). Store review as PENDING by default so admin must approve (mitigates spam/abuse). |
</threat_model>

<verification>
- Clicking "Write a Review" opens the Dialog modal.
- Submitting the form creates a PENDING review in the database.
- FAQs expand and collapse correctly.
</verification>

<success_criteria>
- FIRM-07 and FIRM-08 complete.
- Review submission UX adheres to D-08.
</success_criteria>

<output>
After completion, create `.planning/phases/05-firm-detail-pages/05-04-SUMMARY.md`
</output>
