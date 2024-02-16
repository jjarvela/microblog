/*
  Warnings:

  - You are about to drop the column `profile_image` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `screen_name` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `user_medias` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipient_userid` to the `conversation_messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_blogpost_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_creator_user_id_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_media_id_fkey";

-- DropForeignKey
ALTER TABLE "user_profiles" DROP CONSTRAINT "user_profiles_profile_image_fkey";

-- AlterTable
ALTER TABLE "conversation_messages" ADD COLUMN     "recipient_userid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "profile_image",
DROP COLUMN "screen_name";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "disabled" BOOLEAN,
ADD COLUMN     "profile_image" INTEGER,
ADD COLUMN     "screen_name" TEXT,
ADD COLUMN     "socket_id" TEXT,
ADD COLUMN     "verified" BOOLEAN;

-- DropTable
DROP TABLE "likes";

-- CreateTable
CREATE TABLE "reactions" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "recipient_userid" UUID NOT NULL,
    "sender_userid" UUID NOT NULL,
    "media_id" INTEGER,
    "blogpost_id" INTEGER,

    CONSTRAINT "reactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mbsession" (
    "sid" VARCHAR NOT NULL,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
);

-- CreateIndex
CREATE UNIQUE INDEX "reactions_recipient_userid_media_id_key" ON "reactions"("recipient_userid", "media_id");

-- CreateIndex
CREATE UNIQUE INDEX "reactions_recipient_userid_blogpost_id_key" ON "reactions"("recipient_userid", "blogpost_id");

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "mbsession"("expire");

-- CreateIndex
CREATE UNIQUE INDEX "user_medias_user_id_key" ON "user_medias"("user_id");

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_blogpost_id_fkey" FOREIGN KEY ("blogpost_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_recipient_userid_fkey" FOREIGN KEY ("recipient_userid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "user_medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_image_fkey" FOREIGN KEY ("profile_image") REFERENCES "user_medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
