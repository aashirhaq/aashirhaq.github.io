import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site for GitHub Pages (aashirhaq.github.io).
  output: "export",
  // GitHub Pages serves `/route/index.html` for `/route/`.
  trailingSlash: true,
  // The default image optimizer needs a server; assets are pre-optimized at build time instead.
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
