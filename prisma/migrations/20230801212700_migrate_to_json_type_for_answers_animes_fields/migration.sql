/*
  Warnings:

  - The `answers` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `animes` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "animes",
ADD COLUMN     "animes" JSONB NOT NULL,
DROP COLUMN "answers",
ADD COLUMN     "answers" JSONB;
