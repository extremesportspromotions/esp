# Extreme Sports Promotions (ESP)

Marketing landing page for Extreme Sports Promotions — connecting students with professional extreme-sports coaches for a fee.

Front-end only (Next.js App Router + TypeScript + Tailwind CSS). No backend, database, or auth in v1.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start local development    |
| `npm run build`   | Production build           |
| `npm run start`   | Serve production build     |
| `npm run lint`    | Run ESLint                 |

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Unsplash images (configured via `next.config.ts` remote patterns)

## Project structure

- `src/app` — App Router entry (`layout.tsx`, `page.tsx`, styles)
- `src/components` — UI sections (top bar, carousel, forms, etc.)
- `src/data/sports.ts` — Featured sports content for the carousel
