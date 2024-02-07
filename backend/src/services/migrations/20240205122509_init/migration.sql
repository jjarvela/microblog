-- CreateTable
CREATE TABLE "blog_posts" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "blog_text" TEXT,
    "timestamp" TIMESTAMP(6),

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "sender_name" VARCHAR,
    "header" TEXT,
    "message" TEXT,
    "email" VARCHAR,
    "timestamp" TIMESTAMP(6),
    "notification" BOOLEAN,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contexts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50),

    CONSTRAINT "contexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_messages" (
    "id" SERIAL NOT NULL,
    "conversation_id" INTEGER,
    "sender_userid" UUID,
    "message" TEXT,
    "timestamp" TIMESTAMP(6),
    "notification" BOOLEAN,

    CONSTRAINT "conversation_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" SERIAL NOT NULL,
    "participant_1" UUID,
    "participant_2" UUID,
    "header" TEXT,
    "timestamp" TIMESTAMP(6),

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "element_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "element_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foldermedia" (
    "id" SERIAL NOT NULL,
    "folder_id" INTEGER,
    "media_id" INTEGER,

    CONSTRAINT "foldermedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "folders" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID,
    "folder_name" VARCHAR,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "followings" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "follows_user" UUID,
    "follows_group" INTEGER,

    CONSTRAINT "followings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupmembers" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER,
    "member_id" UUID,
    "admin" BOOLEAN,
    "joined" TIMESTAMP(6),

    CONSTRAINT "groupmembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40),
    "owner_uuid" UUID,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" SERIAL NOT NULL,
    "meeting_id" UUID,
    "participant" VARCHAR(50),
    "message" TEXT,
    "email" VARCHAR(50),

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_properties" (
    "id" SERIAL NOT NULL,
    "creator_user_id" UUID,
    "media_id" INTEGER,
    "blogpost_id" INTEGER,
    "profile_id" UUID,
    "key" VARCHAR(45),
    "value" TEXT NOT NULL,
    "context_id" INTEGER,
    "time" TIMESTAMP(6),

    CONSTRAINT "item_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "creator_user_id" UUID NOT NULL,
    "media_id" INTEGER,
    "blogpost_id" INTEGER,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetings" (
    "id" UUID NOT NULL,
    "user_uuid" UUID NOT NULL,
    "start" TIMESTAMP(6),
    "end" TIMESTAMP(6),
    "notification" BOOLEAN,

    CONSTRAINT "meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_medias" (
    "id" SERIAL NOT NULL,
    "blogpost_id" INTEGER,
    "media_id" INTEGER,

    CONSTRAINT "post_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_elements" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID NOT NULL,
    "type_id" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "profile_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" SERIAL NOT NULL,
    "profile_id" UUID,
    "link" TEXT,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_medias" (
    "id" SERIAL NOT NULL,
    "filename" VARCHAR(40),
    "path" VARCHAR(40),
    "user_id" UUID,

    CONSTRAINT "user_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "screen_name" TEXT,
    "profile_image" INTEGER,
    "profile_text" TEXT,
    "header_media_id" INTEGER,
    "homepage" TEXT,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "uid" UUID NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR NOT NULL,
    "email" VARCHAR(50),
    "admin" BOOLEAN,
    "location" TEXT,
    "birthday" DATE,
    "joined" TIMESTAMP(6),
    "timezone" VARCHAR,
    "last_login" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "element_types_name_key" ON "element_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "followings_user_id_follows_user_key" ON "followings"("user_id", "follows_user");

-- CreateIndex
CREATE UNIQUE INDEX "followings_user_id_follows_group_key" ON "followings"("user_id", "follows_group");

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_key" ON "groups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "likes_creator_user_id_media_id_key" ON "likes"("creator_user_id", "media_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_creator_user_id_blogpost_id_key" ON "likes"("creator_user_id", "blogpost_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_user_id_key" ON "user_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conversation_messages" ADD CONSTRAINT "conversation_messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_participant_1_fkey" FOREIGN KEY ("participant_1") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_participant_2_fkey" FOREIGN KEY ("participant_2") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "foldermedia" ADD CONSTRAINT "foldermedia_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "foldermedia" ADD CONSTRAINT "foldermedia_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "user_medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "followings" ADD CONSTRAINT "followings_follows_group_fkey" FOREIGN KEY ("follows_group") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "followings" ADD CONSTRAINT "followings_follows_user_fkey" FOREIGN KEY ("follows_user") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "followings" ADD CONSTRAINT "followings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groupmembers" ADD CONSTRAINT "groupmembers_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groupmembers" ADD CONSTRAINT "groupmembers_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_owner_uuid_fkey" FOREIGN KEY ("owner_uuid") REFERENCES "users"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_meeting_id_fkey" FOREIGN KEY ("meeting_id") REFERENCES "meetings"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item_properties" ADD CONSTRAINT "item_properties_blogpost_id_fkey" FOREIGN KEY ("blogpost_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item_properties" ADD CONSTRAINT "item_properties_context_id_fkey" FOREIGN KEY ("context_id") REFERENCES "contexts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item_properties" ADD CONSTRAINT "item_properties_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item_properties" ADD CONSTRAINT "item_properties_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "user_medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "item_properties" ADD CONSTRAINT "item_properties_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_blogpost_id_fkey" FOREIGN KEY ("blogpost_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_creator_user_id_fkey" FOREIGN KEY ("creator_user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "user_medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "meetings" ADD CONSTRAINT "meetings_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post_medias" ADD CONSTRAINT "post_medias_blogpost_id_fkey" FOREIGN KEY ("blogpost_id") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "post_medias" ADD CONSTRAINT "post_medias_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "user_medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile_elements" ADD CONSTRAINT "profile_elements_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile_elements" ADD CONSTRAINT "profile_elements_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "element_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "user_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_medias" ADD CONSTRAINT "user_medias_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_header_media_id_fkey" FOREIGN KEY ("header_media_id") REFERENCES "user_medias"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_profile_image_fkey" FOREIGN KEY ("profile_image") REFERENCES "user_medias"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;
