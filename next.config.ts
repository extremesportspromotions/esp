import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Long-lived cache for static media. Any changed file must get a new filename.
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return ["sports", "carousel-clips", "shop", "brand", "health"].map((dir) => ({
      source: `/${dir}/:file(.*\\.(?:webp|png|jpe?g|svg|gif|avif|mp4|webm))`,
      headers: immutable,
    }));
  },
  async redirects() {
    return [{ source: "/about", destination: "/#about", permanent: false }];
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
