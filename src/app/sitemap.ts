import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { sports } from "@/data/sports";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();
  const latest = guides[0] ? new Date(guides[0].updated ?? guides[0].date) : new Date();
  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/guides"), lastModified: latest, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/privacy"), lastModified: new Date("2026-09-26"), changeFrequency: "yearly", priority: 0.3 },
    ...guides.map((g) => ({
      url: absoluteUrl(`/guides/${g.slug}`),
      lastModified: new Date(g.updated ?? g.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...sports.map((s) => ({
      url: absoluteUrl(`/guides/sport/${s.id}`),
      lastModified: latest,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
