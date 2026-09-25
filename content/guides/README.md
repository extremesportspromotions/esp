# ESP Guides — how to add an article

This folder holds every article in the **Guides** section of the website
(`/guides`). **One Markdown file = one article.** You don't need to touch any code.

## Quick steps

1. **Copy** `_template.md` and rename the copy to your article's slug, for example
   `choosing-a-surf-school.md`. Use lower-case words joined by hyphens.
2. **Fill in the frontmatter** — the block between the two `---` lines at the top.
   Every field is explained below.
3. **Write the article** in Markdown underneath the frontmatter.
4. **Check it locally** with `npm run dev` and open
   `http://localhost:3000/guides/your-slug`. Drafts are visible in dev only.
5. When it's ready, set `draft: false`, run `npm run build` (it must pass), then
   commit and push. Vercel publishes it on the next deploy.

If a field is wrong (for example a misspelt sport), `npm run build` stops with a
message saying which file and field to fix.

## Frontmatter fields

| Field         | Required | What to put                                                                                         |
| ------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `title`       | Yes      | Headline in sentence case. Put it in quotes if it contains a colon.                                 |
| `slug`        | Yes      | URL name, e.g. `choosing-a-surf-school`. Must match the file name and be unique.                    |
| `description` | Yes      | 1–2 sentences, about 140–160 characters. Shown on cards, in Google results and when shared.         |
| `sport`       | Yes      | One sport slug from the list below, or `general` for articles covering several sports.              |
| `category`    | Yes      | Exactly one of the categories below (spelling and capitals must match).                             |
| `author`      | Yes      | Normally `ESP Editorial`.                                                                           |
| `date`        | Yes      | Publication date as `YYYY-MM-DD`.                                                                   |
| `updated`     | No       | Date of the last meaningful update, `YYYY-MM-DD`.                                                   |
| `heroImage`   | No       | Path to a photo in `public/guides/`, e.g. `/guides/surf-school-hero.jpg`. Leave out to use the sport's photo. |
| `heroAlt`     | Yes      | A short description of what the hero photo shows (alt text). Required whenever you set `heroImage`. |
| `featured`    | No       | `true` to feature at the top of `/guides`. Keep only one article featured at a time.               |
| `draft`       | No       | `true` hides the article from the live site. Set to `false` to publish.                             |

Reading time is worked out automatically.

### Allowed sports (`sport`)

`mountaineering`, `scuba-diving`, `paragliding`, `mountain-biking`, `wakeboarding`,
`skydiving`, `motocross`, `kiteboarding`, `wingsuit-flying`, `skateboarding`,
`surfing`, `base-jumping`, `snowboarding`, `kayaking`, `hang-gliding` — or `general`.

### Allowed categories (`category`)

`How-to`, `Safety`, `Gear`, `Getting started`, `Club reviews`, `Stories`, `News`

## Writing the article

- Start with a two or three sentence introduction (no heading above it).
- Use `##` for main sections and `###` for sub-sections. These build the table of
  contents automatically. **Don't use `#`** — the title is already the page heading.
- Aim for roughly 700–1,200 words for a standard guide.
- Include **one "Safety first" box** in every article:

  ```markdown
  > [!SAFETY]
  > Your safety advice here.
  ```

  Other boxes: `> [!TIP]` (Top tip), `> [!NOTE]` (Good to know), `> [!WARNING]`.
  You can give a box your own title: `> [!TIP] Packing for a wet weekend`.
- A plain `>` quote becomes a large pull quote. Only quote real people or sources
  you can verify — never make up quotes.
- Links: `[link text](https://example.com)`. External links open in a new tab.
- Finish with a short nudge to find a club on the map or get matched with a coach.
  The "Find clubs" and "Get matched — £30" buttons are added to every article
  automatically, so you don't need to add them.

## Images

- Put images in `public/guides/` and refer to them as `/guides/file-name.jpg`.
- **Web-optimise every image: 300 KB or less**, JPG or WebP, about 2000 px wide for
  hero images and 1200 px for images inside the article.
- Use photos you have the right to use (your own, Matthew's, or free-licence sites
  such as Unsplash). Note the source in your commit message.
- **Alt text is required**: describe what the image shows, e.g.
  `![Instructor checking a student's harness before a tandem jump](/guides/harness-check.jpg)`.

## House style

- **British English** (centre, colour, organise, licence as a noun, practise as a verb).
- **Clear, bold, trustworthy and safety-aware.** Enthusiastic, never reckless.
- Speak to a beginner as "you". Short sentences, plain words, no jargon without
  explaining it.
- **No invented facts.** Don't make up statistics, prices, quotes, dates, places or
  club details. If you're not certain of a number or rule, check it with the official
  source (e.g. British Skydiving, BHPA, BSAC, PADI) or leave it out and advise the
  reader to check with their instructor or centre.
- Refer to governing bodies accurately and in general terms.
- Never encourage anyone to learn a risky sport without qualified instruction.
- Don't promise results or guarantee safety.
