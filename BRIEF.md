# Loyalty Member App - Project Brief

## What is this?
A member of a toy store's loyalty program needs a mobile-first web app to check their rewards status, find personalized deals and sale items, and locate nearby stores — while on the go, one-handed, glancing between other tasks (e.g. standing in the store aisle, or checking quickly before a birthday party run). This is a responsive web app (not a native app). React Native, Flutter, Kotlin, and Swift are out of scope.

## Design Principle
Mobile is not "desktop, but smaller." Assume the person is:
- Holding their phone in one hand
- Standing, walking, or mid-errand — not seated at a desk
- Checking the app for a few seconds, not a few minutes
- Possibly outdoors, in bright light, or on a job site with spotty signal

Every screen should do one thing well. Prioritize the single most useful piece of information per view over cramming in everything the data allows.

## Data
Generate a fake dataset as a JSON file (src/data/member.json) representing a single logged-in member:
- Profile (name, membership tier: Bronze/Silver/Gold/Platinum, member since date, member ID)
- Points balance (current total, points needed to reach next tier, points expiring soon with expiration date)
- Points history (12 months of activity: date, description, points earned/redeemed, running balance — trending with realistic variation, e.g. spikes around promotions or holidays)
- Personalized offers (5-8 offers: title, description, expiration date, points cost or discount value, category, image/icon placeholder — e.g. "20% off building sets," "Double points on puzzles this weekend")
- Toys on sale (10-12 items: toy name, category — e.g. Building Sets, Dolls & Action Figures, Board Games, Outdoor & Ride-On, Puzzles, Arts & Crafts, Educational/STEM — age range, original price, sale price, percent off, image/icon placeholder, and a flag for whether it's recommended based on the member's past purchases)
- Store locations (8-10 fake stores: name, address, distance from user - mock value, hours, phone number, latitude/longitude for mock map pins)
- Purchase history (15-20 transactions, each with: date, store location, specific toy(s) purchased — name, category, age range, quantity, price — total amount spent, and points earned). Skew the toy names/categories toward a believable pattern for one shopper (e.g. a mix of building sets and educational toys for a specific age range) so personalized offers and sale recommendations can plausibly be based on it

## Layout (Mobile-First Responsive)
Design and build for a single-column mobile layout first, then scale up. Do not design desktop-first and shrink it down.

- **Top bar**: app name/logo, member tier badge, and a profile/account icon — kept minimal so it doesn't eat vertical space on small screens
- **Bottom navigation bar** (mobile): fixed, thumb-reachable tab bar with icons for Home, Offers/Sale, Store Locator, History, Account. On larger screens (tablet/desktop), this can shift to a top nav or sidebar
- **Home page**: the "glanceable" screen. Should surface, in order of priority:
  1. Points balance (large, immediately visible, no scrolling required)
  2. Progress toward next tier (simple progress bar)
  3. Top 1-2 personalized offers or sale items (not all of them — just what's most relevant/urgent, ideally tied to what the member has bought before)
  4. Quick links to Store Locator and Rewards
- **Rewards points tracker page**: current balance front and center, a simple chart or list of recent points activity, and any points expiring soon flagged clearly
- **Personalized offers page**: a horizontally scrollable row of category filter chips (e.g. All, Building Sets, Puzzles, Arts & Crafts, Board Games, Outdoor) at the top; card-based list below, one offer per card, scannable in a single thumb-scroll; tapping a card expands or navigates to offer detail; active filter chip is visually highlighted
- **Toys on sale page**: same category filter chip row as Offers (All + toy categories); card-based grid/list below, each card showing toy name, image, original vs. sale price, percent off, and age range; toys matching the member's past purchase categories should be visually flagged or sorted to the top ("Because you bought building sets")
- **Store locator page**: a "near me" style list by default (distance-sorted), with a map view as a secondary/toggle option — don't force the map to load first on mobile data
- **Purchase history page**: reverse-chronological list, grouped by month, each entry expandable to show the specific toy(s) bought, quantity, price, and points earned for that visit
- **Account page**: member profile card at the top (name, photo placeholder, member ID, tier badge, member since date); a digital loyalty card section with the member's scannable barcode (same barcode used for in-store redemptions); current tier status with a clear label of what the tier unlocks (see Loyalty Tiers section); a "Your Tier Benefits" summary card; basic account actions (Edit Profile, Notification Preferences, Sign Out) as a simple list at the bottom — no settings overload
- Use a responsive grid/flex system so cards and lists stack vertically on small screens and arrange into 2-3 columns on tablet/desktop

## Interactions
- Bottom nav (mobile) stays fixed and reachable with one thumb at all times
- Tapping a points-history entry or a past purchase expands it in place (in-page expand or lightweight modal) to show the specific toy(s) bought
- Store locator list items are tappable to open directions in the device's default maps app
- Offers can be "saved" (bookmarked for later) or "redeemed" with a single tap. Tapping "Redeem" opens a full-screen barcode view — member's loyalty barcode centered on a white background, large enough to scan at a register, with the offer name and expiration date shown beneath it. A "Close" button returns to the offer. No multi-step flows.
- Sale items tied to the member's past purchase categories are visually distinguished (badge or highlight) so recommendations feel personalized, not generic
- Pull-to-refresh or a simple refresh control on Home to simulate live data updates (can be mocked against the local JSON)
- All interactive elements sized for touch (minimum ~44px tap targets), not hover-dependent

## Style
- Light theme by default, clean and high-contrast enough to read outdoors/in bright light
- Minimal chrome, generous tap targets, no dense desktop-style tables
- One primary accent color for tier badges, progress bars, and CTAs — avoid a busy, multi-color palette
- Typography sized for quick scanning at arm's length, not small dense text
- Mobile-first breakpoints: design and build the small-screen layout first, then progressively enhance for tablet/desktop — not the reverse

## Loyalty Tiers

Members earn points per dollar spent. Tier status is calculated on a rolling 12-month basis. Higher tiers unlock better offers and perks. The four tiers:

| Tier | Points threshold (12-month) | Earn rate | Offer quality | Perks |
|---|---|---|---|---|
| Bronze | 0–999 pts | 1 pt / $1 spent | Standard rotating offers (10–15% discounts) | None beyond the base program |
| Silver | 1,000–2,499 pts | 1.25 pts / $1 spent | Better offers + occasional category double-points events | Birthday bonus: 2× points in their birthday month |
| Gold | 2,500–4,999 pts | 1.5 pts / $1 spent | Priority access to offers + deeper discounts (20–30%) | Quarterly free small toy reward (≤ $15 value, redeemable in-store); birthday bonus |
| Platinum | 5,000+ pts | 2 pts / $1 spent | Exclusive offers unavailable to lower tiers (40–50% discounts, early sale access) | Monthly free small toy reward; birthday bonus; free gift wrapping in-store |

**Tier logic to represent in the UI:**
- Home page progress bar shows points needed to reach the *next* tier, not just a raw points number
- When a member reaches Platinum, the progress bar is replaced with a "You're at our highest tier" state
- Offers page should visually indicate when an offer is tier-exclusive (e.g. a small "Gold+" or "Platinum" badge on the card)
- Free toy rewards (Gold/Platinum) appear as a special offer card, distinct from discount offers — use a gift icon and label it "Your free toy reward"
- The fake dataset should reflect a Gold-tier member so both the free toy reward and tier-exclusive offers are represented in the mock data

## Accessibility

Target: **WCAG 2.1 AA** compliance throughout.

Key requirements:
- Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text and UI components (progress bars, chart lines, filter chips)
- All interactive elements have visible focus indicators (not just `:hover` styles) — never suppress the default outline without providing a clearly visible alternative
- Touch targets minimum 44×44px — applies to nav tabs, filter chips, card CTAs, and expand controls
- All images and icon-only buttons have descriptive `alt` text or `aria-label`
- Bottom navigation tabs use proper ARIA roles (`role="tablist"` / `role="tab"`) and communicate the active state (`aria-selected`)
- Tier badges and color-coded indicators (e.g. expiring-points warnings) must not rely on color alone — pair with a text label or icon
- The barcode redemption overlay is keyboard-dismissible (Escape key closes it) and focus is trapped inside it while open
- Points history chart (Chart.js) must include a screen-reader-accessible data table as a visually hidden alternative

## Tech
- React + TypeScript
- Tailwind CSS for responsive, mobile-first styling
- Chart.js via react-chartjs-2 for the points history chart
- Fake data from a local JSON file (no API calls)
- Client-side routing only (no backend) — react-router is fine for the Home / Offers / Store Locator / History / Account views
- Out of scope: React Native, Flutter, Kotlin, Swift, or any native mobile build