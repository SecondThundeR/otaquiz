-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "animeIds" TEXT NOT NULL,
    "correctAnswersIds" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("amount", "animeIds", "correctAnswersIds", "id", "isFinished", "userId") SELECT "amount", "animeIds", "correctAnswersIds", "id", "isFinished", "userId" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
