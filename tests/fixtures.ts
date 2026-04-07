import { it as base, beforeAll, beforeEach, afterAll } from "vitest";
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "@/server/db/schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { sql } from "drizzle-orm";

interface TestFixtures {
  db: PostgresJsDatabase<typeof schema> & { $client: any };
}

let client: PGlite;
let db: ReturnType<typeof drizzle>;

async function cleanDb() {
  await db.execute(sql`
    TRUNCATE TABLE
      "otaquiz_account",
      "otaquiz_session",
      "otaquiz_verification_token",
      "otaquiz_game",
      "otaquiz_user"
    RESTART IDENTITY CASCADE;
  `);
}

beforeAll(async () => {
  client = new PGlite();
  db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: "./drizzle" });
});

beforeEach(async () => {
  await cleanDb();
});

afterAll(async () => {
  await client.close?.();
});

export const dbTest = base.extend<TestFixtures>({
  db: async ({}, use) => {
    await use(db as unknown as TestFixtures["db"]);
  },
});
