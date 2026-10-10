# Own What You Spend

A hackathon web app that helps you invest in the companies you spend money with.

## Concept

Every time you spend on your Starling card at a publicly listed company (Tesco, Greggs, Apple, Spotify, etc.), a configurable percentage of that spend is moved into a savings pot. At the end of the month, you see a summary of the public companies you spent with and choose how much of the saved money to invest in each company's stock.

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for charts and visualizations
- Mock data with structured API service layer

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/                # Data service layer (API functions)
│   └── index.ts       # getTransactions, getMonthlySummary, etc.
├── components/         # Reusable UI components
│   ├── Button.tsx
│   ├── Layout.tsx
│   ├── StatCard.tsx
│   └── TransactionCard.tsx
├── data/              # Mock data
│   ├── companies.ts   # 25 public companies with merchant aliases
│   └── mockTransactions.ts
├── lib/               # Business logic
│   ├── formatters.ts  # Currency and percentage formatting
│   └── merchantMatcher.ts # Match merchants to companies
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── MonthlySummary.tsx
│   ├── Portfolio.tsx
│   └── Settings.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx           # Main app with routing
└── main.tsx          # Entry point
```

## Features

### Dashboard ✅
- Header with total saved this month and total spent at public companies
- Live-style feed of recent transactions
- Shows merchant, amount, and "£X saved" for matching public companies
- Button to simulate new card transactions with animations

### Monthly Summary (Coming Soon)
- List of companies spent with this month
- Per-company investment allocation selector (100% / 50% / 20% / 0% / custom)
- Live-updating total to be invested
- Review and confirm modal
- Success screen

### Portfolio (Coming Soon)
- Holdings by company with current value
- Donut chart showing allocation
- "Your portfolio of the places you shop"

### Settings (Coming Soon)
- Savings rate slider (1-60%, default 5%)
- Toggle for auto-invest vs. manual monthly confirmation
- Exclude specific companies from savings

## Integrating Real APIs

The app is structured to make API integration straightforward. All data fetching is centralized in `src/api/index.ts`.

### To integrate with Starling Engine API and Trading 212 API:

1. **Keep the interface the same** - the functions `getTransactions()`, `getMonthlySummary()`, etc. should maintain their current signatures
2. **Replace mock implementations** in `src/api/index.ts` with real API calls
3. **Add API configuration** - create a `src/config.ts` for API keys and endpoints
4. **Handle authentication** - add auth tokens to requests
5. **Update data mapping** - map API responses to the existing TypeScript types in `src/types/`

Example:

```typescript
// Before (mock)
export async function getTransactions(): Promise<Transaction[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTransactions.slice(0, 20);
}

// After (real API)
export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch('https://api.starlingbank.com/api/v2/feed/account/{accountUid}/category/{categoryUid}', {
    headers: {
      'Authorization': `Bearer ${STARLING_API_KEY}`,
    },
  });
  const data = await response.json();
  return data.feedItems.map(mapToTransaction);
}
```

## Mock Data

- **25 UK-listed and major public companies** with realistic merchant aliases
- **40 sample transactions** for the current month
- **Merchant matching function** that maps card merchant strings to companies
- Returns `null` for non-public merchants (local cafes, restaurants, etc.)

## Design

- Clean, modern fintech aesthetic
- Dark navy (#102a43) and green accent (#2bc883) color palette
- Mobile-first and fully responsive
- Smooth transitions and loading states
- Currency formatted in GBP (£)

## Development Notes

- Mock data includes realistic merchant name variations (e.g., "TESCO STORES 3412", "TESCO EXPRESS")
- Savings calculations use configurable rate (default 5%)
- All business logic is separated into `src/lib/` for testability
- Transaction feed shows time-relative labels ("2m ago", "3h ago", etc.)

## License

MIT
