import { it as base } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "@/server/db/schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

interface TestFixtures {
  db: PostgresJsDatabase<typeof schema> & { $client: any };
}

export const dbTest = base.extend<TestFixtures>({
  db: async ({}, use) => {
    const client = new PGlite();
    const _db = drizzle(client, { schema });

    await migrate(_db, { migrationsFolder: "./drizzle" });

    const db = _db as unknown as TestFixtures["db"];

    await use(db);
  },
});
