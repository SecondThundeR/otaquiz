import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./src/setup.ts"],
    exclude: [...configDefaults.exclude],
    alias: {
      "@/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
    server: {
      deps: {
        inline: ["next"],
      },
    },
  },
});
