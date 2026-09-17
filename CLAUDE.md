# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the starter project for a Claude Code course (codewithmosh.com). It's a basic expense/finance tracker built with React + Vite. It intentionally has a bug, poor UI, and messy code — all of which are meant to be fixed over the course, so don't be surprised by rough edges; only clean things up when asked.

## Commands

- `npm run dev` — start the Vite dev server (http://localhost:5173)
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint over the project
- `npm test` — run the unit test suite once with Vitest

Tests live alongside the source files they cover (`src/*.test.jsx`), using Vitest + React Testing Library. Setup (jsdom polyfills for recharts' `ResizeObserver`/layout measurement) lives in `src/test/setup.js`, wired in via `vite.config.js`'s `test` block.

## Architecture

`src/App.jsx` (mounted by `src/main.jsx`) is the top-level component. It owns the `transactions` array (`useState`) and the hardcoded `categories` list, and composes four child components. There is no routing and no external state management — state is local `useState`, split across components by responsibility rather than centralized in `App`.

- **`src/Summary.jsx`** — takes `transactions` as a prop and internally computes `totalIncome`, `totalExpenses`, and `balance` via `reduce`, rendering the three summary cards.
- **`src/SpendingByCategory.jsx`** — takes `transactions` as a prop, groups expense amounts by `category` via `groupExpensesByCategory` (in `src/spendingUtils.js` — kept out of the component file so it stays a pure, directly-testable function and so `SpendingByCategory.jsx` only exports the component, per the `react-refresh/only-export-components` lint rule), and renders the result as a Recharts bar chart.
- **`src/TransactionForm.jsx`** — owns its own form field state (`description`, `amount`, `type`, `category`). On submit it calls the `onAdd` prop with the new transaction's data (`{ description, amount, type, category }`, with `amount` coerced via `Number(...)`); it does not know about `id` or `date` generation.
- **`src/TransactionList.jsx`** — takes `transactions` and `categories` as props, owns its own filter state (`filterType`, `filterCategory`), and renders the filter dropdowns plus the transactions table from the locally filtered list.

`App.handleAddTransaction` is the single place that assigns `id` (`Date.now()`) and `date` (today, ISO `YYYY-MM-DD`) before appending to `transactions`.

Key data shape — a transaction:
```js
{ id, description, amount, type: "income" | "expense", category, date }
```

Notable behavior worth knowing before making changes:
- `amount` is stored as a **number** end-to-end (seed data uses numeric literals; `TransactionForm` coerces the input with `Number(amount)`). Don't reintroduce string amounts — summing relies on this.
- Category list is a hardcoded array (`food, housing, utilities, transport, entertainment, salary, other`) defined once in `App` and passed down as a prop to both `TransactionForm` and `TransactionList`.
- `TransactionList`'s filtering is derived synchronously from its `transactions` prop on every render — no memoization.

Styling is plain CSS in `src/App.css` / `src/index.css`, no CSS framework. There's no shared component-level CSS split — all component styles live in the same global `App.css`.
