/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages. Trailing slashes keep /work/<slug>/ paths
  // resolving to index.html without a server rewrite.
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // No image optimisation server exists on GitHub Pages.
    unoptimized: true,
  },
  // Build fails on type or lint errors — a broken build is better than a
  // broken site shipped quietly.
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },
}

export default nextConfig
