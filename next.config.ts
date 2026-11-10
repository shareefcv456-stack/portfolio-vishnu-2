import type { NextConfig } from "next";

// Original rgvishnu.com URLs → new routes, so every previously shared link keeps working.
const legacy: Record<string, string> = {
  "/index": "/",
  "/blog": "/journal",
  "/blog-details": "/journal/rg-group-new-branding",
  "/blog-detail2": "/journal/rg-foods-30-product-lines",
  "/blog-detail3": "/journal/rg-foods-global-journey",
  "/blog-detail4": "/journal/kerala-gingelly-oil",
};

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    const pages = ["/about", "/gallery", "/contact"].map((p) => ({ source: `${p}.html`, destination: p, permanent: true }));
    return [
      ...pages,
      { source: "/blog/:slug", destination: "/journal/:slug", permanent: true },
      ...Object.entries(legacy).flatMap(([from, to]) => [
        { source: `${from}.html`, destination: to, permanent: true },
        { source: from, destination: to, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
