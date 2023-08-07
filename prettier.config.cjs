const config = {
  importOrder: [
    "^@/components/(.*)$",
    "^@/constants/(.*)$",
    "^@/hooks/(.*)$",
    "^@/layouts/(.*)$",
    "^@/pages/(.*)$",
    "^@/providers/(.*)$",
    "^@/schemas/(.*)$",
    "^@/server/(.*)$",
    "^@/styles/(.*)$",
    "^@/ui/(.*)$",
    "^@/utils/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
