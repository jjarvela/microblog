/*
  Warnings:

  - Added the required column `original_poster_id` to the `blog_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `read` to the `reactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "reactions_recipient_userid_blogpost_id_key";

-- DropIndex
DROP INDEX "reactions_recipient_userid_media_id_key";

-- AlterTable
ALTER TABLE "blog_posts" ADD COLUMN     "commenter_id" UUID,
ADD COLUMN     "original_created" TIMESTAMP(6),
ADD COLUMN     "original_post_id" INTEGER,
ADD COLUMN     "original_poster_id" UUID NOT NULL,
ADD COLUMN     "reposter_id" UUID;

-- AlterTable
ALTER TABLE "reactions" ADD COLUMN     "read" BOOLEAN NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(6);

-- AlterTable
ALTER TABLE "user_medias" ALTER COLUMN "filename" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "path" SET DATA TYPE VARCHAR(256);

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_original_poster_id_fkey" FOREIGN KEY ("original_poster_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_reposter_id_fkey" FOREIGN KEY ("reposter_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_commenter_id_fkey" FOREIGN KEY ("commenter_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reactions" ADD CONSTRAINT "reactions_sender_userid_fkey" FOREIGN KEY ("sender_userid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;
