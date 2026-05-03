# Phase 2: Admin — Firm & Offer Management - Context

**Gathered:** 2026-05-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Admin CRUD interface for managing proprietary trading firms, their metrics, and affiliate discount codes. Provides the core data management foundation for the platform.
</domain>

<decisions>
## Implementation Decisions

### 1. Firm List View
- **Decision:** Data Table
- **Details:** Use `@tanstack/react-table` (via shadcn/ui) to display the list of firms. This allows for dense data display, sorting by key metrics (status, featured, last verified), and clear scanning.

### 2. Firm Edit Form
- **Decision:** Tabbed Interface
- **Details:** With 25+ fields on the `Firm` model, the form should be broken down into logical tabs (e.g., "General", "Metrics", "Trading Rules"). This keeps the UI clean and prevents overwhelming the admin user.

### 3. Offer Management
- **Decision:** Inline Tab
- **Details:** Admins will manage a firm's discount codes (Offers) via a dedicated "Offers" tab inside that specific Firm's edit view. Since offers strictly belong to a firm, this keeps the workflow contextual.

### 4. Logo Image Handling
- **Decision:** URL Input
- **Details:** For v1, firm logos will be added by pasting a direct image URL (e.g., from the firm's CDN or website). This is the fastest approach and defers complex image upload state for later.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- `.planning/PROJECT.md` — Project vision and constraints
- `.planning/REQUIREMENTS.md` — Requirement definitions (ADMN-01, ADMN-02)

### Research Findings
- `.planning/research/STACK.md` — Confirmed stack, specifically `nuqs` for URL-synced filter state and `@tanstack/react-table` for tables.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/layout/MobileDrawer.tsx` and `Header.tsx` use the established PropPilot design system tokens.
- `src/lib/db.ts` contains the Prisma singleton for database access.

### Established Patterns
- **Route protection:** The `/admin` routes must be protected using the `clerkMiddleware()` logic already established in `middleware.ts`, requiring the user to have the `admin` role in Clerk `publicMetadata`.

### Integration Points
- This phase will build out the `(admin)` route group, adding the actual Admin Sidebar layout inside `src/app/(admin)/layout.tsx`.
</code_context>

<specifics>
## Specific Ideas

- The admin interface should use the standard PropPilot dark mode (`#08080F`/`#0E0E1A` base) and teal accent (`#00D4AA`).
- Form validations should use `zod` alongside React Hook Form or Server Actions for strict type safety.
</specifics>

<deferred>
## Deferred Ideas

- UploadThing integration for logos (deferred to favor simple URL input for v1).
- Global standalone offer management view (deferred in favor of inline tabs).
</deferred>
