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
- **Personalized offers page**: card-based list, one offer per card, scannable in a single thumb-scroll; tapping a card expands or navigates to offer detail
- **Toys on sale page**: card-based grid/list of currently discounted toys, each card showing toy name, image, original vs. sale price, percent off, and age range; toys matching the member's past purchase categories should be visually flagged or sorted to the top ("Because you bought building sets")
- **Store locator page**: a "near me" style list by default (distance-sorted), with a map view as a secondary/toggle option — don't force the map to load first on mobile data
- **Purchase history page**: reverse-chronological list, grouped by month, each entry expandable to show the specific toy(s) bought, quantity, price, and points earned for that visit
- Use a responsive grid/flex system so cards and lists stack vertically on small screens and arrange into 2-3 columns on tablet/desktop

## Interactions
- Bottom nav (mobile) stays fixed and reachable with one thumb at all times
- Tapping a points-history entry or a past purchase expands it in place (in-page expand or lightweight modal) to show the specific toy(s) bought
- Store locator list items are tappable to open directions in the device's default maps app
- Offers and sale items can be "saved" or "redeemed" with a single tap — no multi-step flows for core actions
- Sale items tied to the member's past purchase categories are visually distinguished (badge or highlight) so recommendations feel personalized, not generic
- Pull-to-refresh or a simple refresh control on Home to simulate live data updates (can be mocked against the local JSON)
- All interactive elements sized for touch (minimum ~44px tap targets), not hover-dependent

## Style
- Light theme by default, clean and high-contrast enough to read outdoors/in bright light
- Minimal chrome, generous tap targets, no dense desktop-style tables
- One primary accent color for tier badges, progress bars, and CTAs — avoid a busy, multi-color palette
- Typography sized for quick scanning at arm's length, not small dense text
- Mobile-first breakpoints: design and build the small-screen layout first, then progressively enhance for tablet/desktop — not the reverse

## Tech
- React + TypeScript
- Tailwind CSS for responsive, mobile-first styling
- Chart.js via react-chartjs-2 for the points history chart
- Fake data from a local JSON file (no API calls)
- Client-side routing only (no backend) — react-router is fine for the Home / Offers / Store Locator / History / Account views
- Out of scope: React Native, Flutter, Kotlin, Swift, or any native mobile build