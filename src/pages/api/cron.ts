import { and, eq, lt } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { TEN_MINUTES } from "@/constants/time";
import { env } from "@/env";
import { db } from "@/server/db";
import { games } from "@/server/db/schema";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token || token !== env.CRON_SECRET) {
    response.status(404).end();
    return;
  }

  try {
    await db
      .delete(games)
      .where(
        and(eq(games.isFinished, false), lt(games.updatedAt, new Date(Date.now() - TEN_MINUTES))),
      );
    return response.status(200).json({ success: true });
  } catch (error: unknown) {
    return response.status(400).json({ error: (error as Error).message });
  }
}
