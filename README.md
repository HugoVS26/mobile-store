# Mobile Store

A mobile phones e-commerce catalogue built as a technical challenge. Users can browse phones, search by name or brand, view detailed specifications, select colour and storage variants, and manage a persistent shopping cart.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Architecture](#project-architecture)
- [Testing](#testing)
- [Test Coverage](#test-coverage)

---

## Tech Stack

| Category         | Technology                             |
| ---------------- | -------------------------------------- |
| UI               | React 19 + TypeScript                  |
| Routing          | React Router v7                        |
| State Management | React Context API + localStorage       |
| Build Tool       | Vite 8                                 |
| Testing          | Vitest + Testing Library + MSW         |
| Code Quality     | ESLint + Prettier + Husky + Commitlint |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the required values:

```env
VITE_API_BASE_URL=https://your-api-url.com
VITE_API_KEY=your_api_key_here
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## Available Scripts

| Script                  | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `npm run dev`           | Start the Vite development server with HMR                   |
| `npm run build`         | Type-check and build minified assets for production          |
| `npm run build:dev`     | Build unminified assets with source maps (development build) |
| `npm run build:watch`   | Rebuild on file changes                                      |
| `npm run preview`       | Serve the production build locally                           |
| `npm test`              | Run the test suite once                                      |
| `npm run test:watch`    | Run tests in interactive watch mode                          |
| `npm run test:coverage` | Run tests and generate a coverage report                     |
| `npm run lint`          | Lint the codebase with ESLint                                |

### Build modes

| Mode                | Minification    | Source Maps | File Names                  |
| ------------------- | --------------- | ----------- | --------------------------- |
| `npm run dev`       | No (HMR server) | Yes         | N/A                         |
| `npm run build:dev` | No              | Yes         | Readable (`[name].js`)      |
| `npm run build`     | Yes (esbuild)   | No          | Hashed (`[name]-[hash].js`) |

---

## Project Architecture

```
src/
├── api/                    # HTTP client and endpoint definitions
│   ├── client.ts           # Generic fetch wrapper with API key auth
│   ├── endpoints.ts        # getMobiles() and getMobileById()
│   └── types.ts            # Shared TypeScript interfaces for API responses
│
├── components/             # Reusable UI components
│   ├── cart/
│   │   └── CartItem/       # Individual cart entry display
│   ├── layout/
│   │   └── Navbar/         # Top navigation bar with cart badge
│   ├── mobile/
│   │   ├── ColorSelector/  # Colour variant picker
│   │   ├── MobileCard/     # Phone listing card (image, name, price)
│   │   ├── MobileDetail/   # Full detail view (specs, selectors, similar)
│   │   ├── MobileList/     # Responsive grid of MobileCards
│   │   ├── SimilarProducts/# Related phones section
│   │   └── StorageSelector/# Storage capacity picker with price deltas
│   └── ui/
│       ├── BackLink/       # Contextual back navigation
│       └── SearchBar/      # Debounced search input
│
├── context/                # Global state via React Context API
│   ├── CartContext.ts      # Context type definition
│   ├── CartProvider.tsx    # Cart state with localStorage persistence
│   └── cartUtils.ts        # Utility for generating cart item keys
│
├── hooks/                  # Custom React hooks
│   ├── useCart.ts          # Context consumer with guard
│   ├── useDebounce.ts      # Generic debounce utility (300 ms default)
│   ├── useMobileDetail.ts  # Fetches a single product by ID
│   └── useMobiles.ts       # Fetches product list with optional search
│
├── pages/                  # Route-level components
│   ├── CartPage/           # /cart — cart summary and total
│   ├── MobileDetailPage/   # /product/:id — product detail view
│   └── MobileListPage/     # / — browsable catalogue with search
│
├── router/
│   └── router.tsx          # React Router configuration
│
├── styles/
│   ├── resets.css          # CSS reset
│   └── variables.css       # Global CSS custom properties (design tokens)
│
└── test/
    └── mocks/
        ├── handlers.ts     # MSW request handlers
        ├── mobiles.ts      # Static mock data
        └── server.ts       # MSW server setup for tests
```

### Key design decisions

**API layer** — A single generic `get<T>()` client in `client.ts` handles authentication headers and error throwing. All endpoint logic lives in `endpoints.ts`, keeping components fully decoupled from HTTP details.

**Data-fetching hooks** — `useMobiles` and `useMobileDetail` use `useReducer` for loading/error/success state transitions and a cancellation flag to prevent stale responses from updating state after unmount.

**Search with URL sync** — The search query is stored in `URLSearchParams` via React Router's `useSearchParams`, keeping the UI state shareable and bookmarkable. Input is debounced at 300 ms to limit API calls.

**Cart persistence** — Cart state lives in React Context and is written to `localStorage` on every change. Items are keyed by a composite `id-colour-storage` string, preventing duplicate entries for the same configuration.

---

## Testing

Tests are written with **Vitest** and **React Testing Library**. **MSW (Mock Service Worker)** intercepts all HTTP requests at the network level, so tests always exercise the real fetch logic without hitting any external API.

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch
```

The test setup is in [src/setupTests.ts](src/setupTests.ts) and mock handlers are in [src/test/mocks/](src/test/mocks/).

---

## Test Coverage

Coverage is collected with **@vitest/coverage-v8**.

```bash
npm run test:coverage
```

Latest results (89 tests across 19 files — all passing):

| Metric     | Coverage               |
| ---------- | ---------------------- |
| Statements | **88.78%** (190 / 214) |
| Branches   | **85.57%** (89 / 104)  |
| Functions  | **92.68%** (76 / 82)   |
| Lines      | **88.88%** (184 / 207) |

**Per-module breakdown:**

| Module                       | Statements | Branches | Functions | Lines  |
| ---------------------------- | ---------- | -------- | --------- | ------ |
| `api/client.ts`              | 81.81%     | 62.5%    | 100%      | 81.81% |
| `api/endpoints.ts`           | 100%       | 100%     | 50%       | 100%   |
| `components/MobileDetail`    | 91.66%     | 93.33%   | 100%      | 90.9%  |
| `components/SimilarProducts` | 69.23%     | 63.63%   | 71.42%    | 68.75% |
| `context/CartProvider.tsx`   | 100%       | 75%      | 100%      | 100%   |
| `hooks/useCart.ts`           | 100%       | 50%      | 100%      | 100%   |
| `hooks/useMobileDetail.ts`   | 100%       | 77.77%   | 100%      | 100%   |
| `hooks/useMobiles.ts`        | 100%       | 80%      | 100%      | 100%   |
| `pages/MobileListPage`       | 94.73%     | 94.11%   | 87.5%     | 100%   |
