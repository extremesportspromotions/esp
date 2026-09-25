import { getAllGuides } from "@/lib/guides";
import { SITE_URL, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const guides = getAllGuides();
  const items = guides
    .map((g) => {
      const url = absoluteUrl(`/guides/${g.slug}`);
      return `    <item>
      <title>${esc(g.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(g.description)}</description>
      <category>${esc(g.sportName)}</category>
      <category>${esc(g.category)}</category>
      <dc:creator>${esc(g.author)}</dc:creator>
      <pubDate>${new Date(`${g.date}T09:00:00Z`).toUTCString()}</pubDate>
      <enclosure url="${esc(absoluteUrl(g.heroImage))}" type="image/jpeg" length="0" />
    </item>`;
    })
    .join("\n");

  const lastBuild = guides[0] ? new Date(`${guides[0].updated ?? guides[0].date}T09:00:00Z`) : new Date();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>ESP Guides — Extreme Sports Promotions</title>
    <link>${SITE_URL}/guides</link>
    <atom:link href="${SITE_URL}/guides/rss.xml" rel="self" type="application/rss+xml" />
    <description>How-tos, safety advice and getting-started guides for extreme sports in the UK.</description>
    <language>en-gb</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
