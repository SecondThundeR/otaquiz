import type { NextConfig } from "next";

import "./src/env";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["next-auth"],
  experimental: {
    reactCompiler: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.shikimori.one",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shikimori.one",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default config;
