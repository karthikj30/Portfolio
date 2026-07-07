import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // react-icons ships giant barrel modules; rewrite the named imports to
  // direct per-icon paths so dev/build don't parse the whole set.
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
