# Loyalty Member App

A mobile-first web app for members of a toy store loyalty program. Members can check their rewards balance, browse personalized offers and sale items, and find nearby store locations — all optimized for one-handed use on the go.

## Features

- **Home** — glanceable points balance, tier progress bar, and top personalized offers
- **Offers** — filterable offer cards with tier-exclusive badges and one-tap barcode redemption
- **Sale** — sale items flagged by past purchase category so recommendations feel personal
- **Store Locator** — distance-sorted store list with tap-to-directions, optional map view
- **Points History** — running balance chart, recent activity feed, and grouped purchase history
- **Account** — member profile, digital loyalty card barcode, tier benefits, and Platinum upgrade teaser

## Loyalty Tiers

| Tier | 12-Month Points | Earn Rate | Highlights |
|---|---|---|---|
| Bronze | 0–999 | 1 pt / $1 | Standard offers |
| Silver | 1,000–2,499 | 1.25 pts / $1 | Birthday 2× points |
| Gold | 2,500–4,999 | 1.5 pts / $1 | Quarterly free toy + birthday bonus |
| Platinum | 5,000+ | 2 pts / $1 | Monthly free toy, early sale access, free gift wrapping |

The mock dataset uses a **Gold-tier** member so tier-exclusive offers and the free toy reward are represented.

## Tech Stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Charts | Chart.js via react-chartjs-2 |
| UI Components | MUI v9 |
| Build | Vite 8 |
| Data | Static JSON (`src/data/member.json`) — no backend |

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

```bash
npm run build    # Production build → dist/
npm run preview  # Serve the production build locally
```

## Project Structure

```
src/
  components/       # Shared UI (TopBar, BottomNav, FilterChips, StarBackground)
  data/
    member.json     # All mock data — member profile, points, offers, purchases, stores
  pages/            # One file per route (Home, Offers, Sale, StoreLocator, History, Account)
  types/            # Shared TypeScript interfaces
  App.tsx           # Route definitions
  main.tsx          # Entry point
```

## Accessibility

Target: **WCAG 2.1 AA** throughout.

- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for UI components
- All touch targets minimum 44 × 44 px
- Bottom nav uses `role="tablist"` / `role="tab"` with `aria-selected`
- Barcode redemption overlay is keyboard-dismissible (Escape) with focus trapping
- Points history chart includes a visually hidden `<table>` for screen readers
- No color-only indicators — tier badges and expiry warnings always include a text label

## Design Approach

Designed for someone standing in a store aisle, one phone in hand, checking for a few seconds — not sitting at a desk. Every screen prioritizes one primary action. Mobile layout is designed first; tablet and desktop layouts scale up from there.
