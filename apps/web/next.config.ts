import { fileURLToPath } from "node:url";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mlfp/ui", "@mlfp/db"],
  // Pin tracing to the monorepo root; an unrelated lockfile above it would
  // otherwise be inferred as the workspace root.
  outputFileTracingRoot: fileURLToPath(new URL("../../", import.meta.url)),
};

export default nextConfig;
