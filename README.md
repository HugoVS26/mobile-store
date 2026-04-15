# Mobile Store

A mobile phones catalogue built as a technical challenge. Browse phones, view details, and manage a cart. Powered by a REST API with key-based auth.

## Stack

- **React 19** + **TypeScript**
- **React Router** for navigation
- **React Context API** for state management
- **Vitest** + **Testing Library** + **MSW** for testing
- **ESLint** + **Prettier** for code quality

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your API key:

```
VITE_API_KEY=your_api_key_here
```

### 3. Run the dev server

```bash
npm run dev
```

## Available Scripts

| Script                  | Description                         |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start dev server                    |
| `npm run build`         | Type-check and build for production |
| `npm run build:watch`   | Build in watch mode                 |
| `npm test`              | Run tests once                      |
| `npm run test:watch`    | Run tests in watch mode             |
| `npm run test:coverage` | Run tests with coverage report      |
| `npm run lint`          | Lint the codebase                   |
| `npm run preview`       | Preview the production build        |

## Testing

Tests use Vitest with jsdom. MSW handles API mocking so tests never hit the real network.
