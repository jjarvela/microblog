/*
  Warnings:

  - Made the column `user_id` on table `user_medias` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "user_medias_user_id_key";

-- AlterTable
ALTER TABLE "user_medias" ALTER COLUMN "user_id" SET NOT NULL;
