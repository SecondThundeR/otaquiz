import { fileURLToPath } from "node:url";
import { createJiti } from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));

await jiti.import("./src/env");

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
