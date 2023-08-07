// @ts-check

/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */
/** @typedef {{ tailwindConfig: string }} TailwindConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  tailwindConfig: "./tailwind.config.ts",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/components/(.*)$",
    "",
    "^@/constants/(.*)$",
    "",
    "^@/hooks/(.*)$",
    "",
    "^@/layouts/(.*)$",
    "",
    "^@/pages/(.*)$",
    "",
    "^@/providers/(.*)$",
    "",
    "^@/schemas/(.*)$",
    "",
    "^@/server/(.*)$",
    "",
    "^@/styles/(.*)$",
    "",
    "^@/ui/(.*)$",
    "",
    "^@/utils/(.*)$",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

module.exports = config;
