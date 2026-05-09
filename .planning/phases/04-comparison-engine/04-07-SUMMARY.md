---
plan: 04-07
status: complete
phase: 04
wave: 3
---
## Summary
Created ComparisonDock and ComparisonView.
## key-files.created
- src/components/compare/ComparisonDock.tsx — sticky bottom bar with selected firms and Compare CTA
- src/components/compare/ComparisonView.tsx — 19-metric side-by-side table with teal/amber cell highlighting
## Deviations
- Fixed TS2345: values[fi] ?? '—' fallback
## Self-Check: PASSED
- Dock appears when 1+ firms selected: ✓
- ComparisonView teal=best, amber=worst cell coloring: ✓
- 19 metric rows defined: ✓
- diff badge on differing rows: ✓
