# Features Research — PropPilot

## Table Stakes (Must Have — Users Leave Without These)

### Comparison & Discovery
- **Filterable firm list:** Filter by capital size, drawdown type, evaluation type, price range, broker/platform (MT4/MT5/DXTrade), trading rules (news allowed, weekend holding, EA allowed)
- **Sortable columns:** By price, drawdown %, profit target, payout speed, overall score
- **Search bar:** Instant firm search by name or category
- **Mobile-friendly card view:** Most comparison tables fail on mobile — card layout is mandatory
- **Side-by-side comparison:** Select 2-3 firms and compare rule-by-rule
- **Firm detail pages:** Full breakdown per firm with all rules, fees, pros/cons

### Trust & Transparency
- **Affiliate disclosure:** Clear, upfront notice (ideally persistent banner or footer element)
- **Last updated timestamps:** Traders distrust stale data — show when each firm's data was last verified
- **Verified badges:** Visual indicators for firms manually vetted
- **No paid placements unmarked:** All sponsored/featured placements must be labeled
- **Review aggregation:** Trustpilot/Reddit sentiment references

### Discounts & Affiliate
- **One-click copy discount codes:** With copy confirmation animation
- **True cost display:** Show fee AFTER discount ("Was $150, now $127 with PROP10")
- **Affiliate link CTAs:** Clear "Visit Site" button that routes through tracking link
- **Exclusive vs public code distinction:** Show if code is PropPilot-exclusive

## Differentiators (Competitive Advantage)

- **Rule Difficulty Score:** Proprietary weighted score combining: daily drawdown strictness, consistency rules, profit target difficulty, weekend holding restrictions. Converts fine print into a single comparable metric traders trust
- **Drawdown type clarity:** Explicit badge for "Balance-based" vs "Equity-based" daily drawdown — this is the #1 hidden gotcha traders face. Most sites don't differentiate this clearly
- **PropPilot Points / Rewards:** Gamified loyalty system — earn points by purchasing through affiliate links, redeemable for perks (challenge rebates, bonuses). Creates return visits and brand loyalty
- **Claim verification + reward system:** Users submit purchase proof and earn tracked rewards — no other comparison site does this
- **Guide content tied to firm data:** e.g., "Firms with no consistency rules" article links directly to filtered compare view
- **Rich data cards:** Show all critical params (not just price and drawdown) in a compact, scannable card
- **Admin-curated "PropPilot Pick":** Editorial recommendation badge on standout firms/offers

## Anti-Features (Deliberately NOT Build)

- **Unmarked paid placements:** Fatal to trust; all featured spots must be disclosed
- **Becoming a prop firm:** Conflict of interest; stay as neutral comparison layer
- **Automated scraped data:** Risk of stale/incorrect data causing user losses — admin-managed is safer and more accurate for v1
- **Forum/community features:** Scope creep; Reddit/Discord fills this need; link out instead
- **Real-time price feeds:** Prop firm pricing changes via API don't exist; manual management is the right v1 approach

## Key Data Points Traders Compare

| Data Point | Priority | Notes |
|-----------|---------|-------|
| Max Daily Drawdown % | Critical | MUST clarify Balance-based vs Equity-based |
| Max Total Drawdown % | Critical | Static vs trailing distinction important |
| Profit Target (Phase 1) | Critical | Usually 8-10% |
| Profit Target (Phase 2) | High | Usually 5% |
| Consistency Rule | Critical | Whether "best day ≤ X% of total profit" applies |
| Weekend Holding | High | Many firms prohibit holding positions over weekend |
| News Trading | High | Many firms prohibit trading during high-impact news |
| EAs/Bots Allowed | High | Algorithmic traders require this |
| Payout Frequency | High | 14 days standard; on-demand is premium |
| Payout Speed | Medium | How fast after request |
| Scaling Plan | Medium | Does firm offer larger accounts over time? |
| Profit Split | High | Usually 80-90%; higher is better |
| Challenge Fee | Critical | The primary cost; show after discount |
| Free Retry Policy | Medium | Does firm offer free resets? |
| Trading Platform | Medium | MT4/MT5/DXTrade/cTrader preference varies |
| Minimum Trading Days | High | Minimum active days required to pass |

## SEO Opportunities

- **Review schema:** `Product` + `AggregateRating` JSON-LD on firm pages → rich snippets
- **Comparison schema:** Article schema on comparison pages with proper headings
- **Long-tail keywords:** "prop firms with no consistency rules", "best funded trader challenge under $100", "FTMO alternatives 2025", "instant funded account prop firm"
- **Brand + comparison queries:** "[Firm A] vs [Firm B]" pages
- **Location-specific:** "prop firms that allow US traders", "UK prop firm comparison"
- **Programmatic SEO:** Generate pages for every firm combination, filter preset (e.g., "Prop firms with daily drawdown over 5%")

## Competitor Gaps (What Existing Sites Do Poorly)

- **Mobile UX:** Most comparison tables are horizontal scroll nightmares on mobile — PropPilot uses card view
- **Data freshness:** Sites often show outdated fees/rules — PropPilot shows "last verified" dates
- **Drawdown type confusion:** No site clearly labels balance vs equity daily drawdown — massive differentiator
- **Design quality:** Existing sites look like WordPress affiliate blogs — PropPilot aims for Bloomberg/SaaS aesthetic
- **Trust signals:** No existing site has a manual verification + reward claim system — builds strong trust loop
- **SEO depth:** Most sites have thin, template-generated firm pages — PropPilot should have deep, rich content per firm

## Feature Complexity Notes

| Feature | Complexity | Dependencies |
|---------|-----------|-------------|
| Filter/sort compare table | Medium | Firm data schema, nuqs URL state |
| Side-by-side comparison | Medium | URL state for selected firms |
| Copy code with tracking | Low | Server Action + clipboard API |
| Affiliate redirect tracking | Low | Route Handler + DB write |
| Claim verification flow | High | File upload, DB, admin review UI |
| Reward points system | Medium | Claim approval trigger, points ledger |
| Admin dashboard | High | All data models, auth roles |
| Review system | Medium | Moderation, rating aggregation |
| Guide/blog content | Low | MDX or DB-driven content |
| Rule Difficulty Score | Medium | Weighted formula, admin calibration |
