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
- `content/guides/` — **ESP Guides articles** (one Markdown file per article). See `content/guides/README.md` for how to add one.
- `src/lib/guides.ts` — loads and renders the guides (gray-matter + remark/rehype, static generation)
- `src/app/guides/` — `/guides` index, `/guides/[slug]` articles, `/guides/sport/[sport]` hubs, `/guides/rss.xml`
- `src/app/sitemap.ts`, `src/app/robots.ts` — SEO files (include all guides)

## Guides deep links

Guide pages link to `/?sport=<slug>#find-a-club` and `/?sport=<slug>#enquire`; the club map and enquiry form pre-select that sport.

## Custom domain

The site is deployed on Vercel (`esp-lemon.vercel.app`). When Matthew buys a custom domain, point its DNS at the Vercel project — no domain purchase is required for the current live site.

## Club map data

UK club pins live in `src/data/clubs.json`. Non-venue POIs (memorials, wrecks that are not dive centres, etc.) are filtered out; see `/workspace/esp-improvement-report.txt` for the latest cleanup counts.

