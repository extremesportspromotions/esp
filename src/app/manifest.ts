import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Extreme Sports Promotions",
    short_name: "ESP",
    start_url: "/",
    display: "standalone",
    background_color: "#EEF4FA",
    theme_color: "#1E8CFF",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
