await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["ru"],
    defaultLocale: "ru",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.shikimori.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shikimori.me",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default config;
