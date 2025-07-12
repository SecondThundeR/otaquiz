import type { NextApiRequest, NextApiResponse } from "next";

import { TEN_MINUTES } from "@/constants/time";

import { prisma } from "@/server/db";

import { env } from "@/env";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token || token !== env.CRON_SECRET) {
    response.status(404).end();
    return;
  }

  try {
    await prisma.game.deleteMany({
      where: {
        isFinished: {
          equals: false,
        },
        updatedAt: {
          lt: new Date(Date.now() - TEN_MINUTES),
        },
      },
    });
    return response.status(200).json({ success: true });
  } catch (error: unknown) {
    return response.status(400).json({ error: (error as Error).message });
  }
}
