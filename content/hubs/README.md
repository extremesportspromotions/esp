# Sport hubs — step-by-step pages

One JSON file per sport, named after the sport id (for example `skydiving.json`).
Each file becomes a page at `/guides/hub/<sport>`, gets a tile on `/guides`, and every
guide it lists shows a "Step n of N · Part of …" line near its top. No code changes needed.

## Fields

| Field | What to put |
| --- | --- |
| `sport` | The sport id, same as the file name. |
| `title` | Hub heading, e.g. `"Skydiving: from first jump to pro"`. |
| `intro` | One or two short sentences under the heading. |
| `sections` | The steps, in order. Each section has optional `title` (shown as a labelled group, e.g. a track) and `intro`, plus `items`. Leave `title` out for a single list. |
| `sections[].items` | `{ "slug": "guide-slug", "summary": "One line." }`. Steps are numbered straight through all sections. The card shows the guide's own title plus this summary. |
| `quickLinks.prices` | `guides`: slugs of any costs article; `coursePricesAnchor`: the heading id for this sport on `/guides/uk-course-prices`. Optional `coursePricesLabel`. The "What it costs" rows come from `src/data/guidePrices.ts` automatically. |
| `quickLinks.governingBody` | `links`: the official body's site(s) as `{ "label", "href" }`; `governingBodiesAnchor` and `qualificationsAnchor`: heading ids on the two reference guides. |
| `quickLinks.competitions` | Optional: leave it out for sports with no competitions and the Competitions block is hidden. `guides`: the hub's competitions article, if any; `competitions2027Anchor`: the heading id on `/guides/british-competitions-2027`; optional `competitions2027Label`. |

Heading ids are made from the heading text (lower case, spaces to hyphens, e.g.
`## [6. Skydiving](…)` → `6-skydiving`). `npm run build` checks every anchor and slug and
stops with the list of real ids if one is wrong — so if a heading's wording changes, update
the anchor here. Every guide listed must be published (`draft: false`).
