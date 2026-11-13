import type { NextConfig } from "next";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const hide = spawnSync(join(root, "node_modules/.bin/tsx"), ["scripts/hide-unorderable.ts"], {
  cwd: root,
  stdio: "inherit",
  encoding: "utf8",
});
if (hide.status !== 0) {
  // Hiding colours must not fail the build; a script crash still leaves the last generated list in place.
  console.warn("Shop visibility check did not run; using the existing hide list.");
}


const nextConfig: NextConfig = {
  async headers() {
    // Long-lived cache for static media. Any changed file must get a new filename.
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return ["sports", "carousel-clips", "shop", "brand", "health"].map((dir) => ({
      source: `/${dir}/:file(.*\\.(?:webp|png|jpe?g|svg|gif|avif|mp4|webm))`,
      headers: immutable,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
