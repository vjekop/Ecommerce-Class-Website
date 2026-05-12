import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empty turbopack config silences the "webpack config but no turbopack config" error
  turbopack: {},

  // WebP image optimization for product photos
  images: {
    formats: ["image/webp"],
  },
};

export default nextConfig;
