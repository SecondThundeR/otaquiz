import type { NextConfig } from "next";

import "./src/env";

const config: NextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
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
