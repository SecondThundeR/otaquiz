/*
  Warnings:

  - You are about to drop the column `animeIds` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `wrongAnswers` on the `Game` table. All the data in the column will be lost.
  - Added the required column `animes` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "isAborted" BOOLEAN NOT NULL DEFAULT false,
    "animes" TEXT NOT NULL,
    "answers" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("amount", "id", "isFinished", "userId") SELECT "amount", "id", "isFinished", "userId" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
