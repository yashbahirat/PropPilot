---
plan: 04-06
status: complete
phase: 04
wave: 3
---
## Summary
Created FirmList with @tanstack/react-table client-side filter+sort.
## key-files.created
- src/components/compare/FirmList.tsx
- src/hooks/use-window-width.ts
## Self-Check: PASSED
- @tanstack/react-table getCoreRowModel+getFilteredRowModel+getSortedRowModel: ✓
- Custom firmFilterFn for all 9 filter params: ✓
- 5 sort functions in SORT_FN_MAP: ✓
- Responsive: FirmRow on desktop, FirmCard on mobile: ✓
- Empty state with search icon: ✓
