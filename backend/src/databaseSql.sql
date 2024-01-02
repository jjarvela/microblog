CREATE TABLE "users" (
  "uid" uuid PRIMARY KEY,
  "username" varchar(50) UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "email" varchar(50),
  "admin" boolean,
  "location" text,
  "birthday" date,
  "joined" timestamp,
  "timezone" varchar,
  "last_login" timestamp
);

CREATE TABLE "meetings" (
  "id" uuid PRIMARY KEY,
  "user_uuid" uuid NOT NULL,
  "start" timestamp,
  "end" timestamp,
  "notification" boolean
);

CREATE TABLE "invitations" (
  "id" serial PRIMARY KEY,
  "meeting_id" uuid,
  "participant" varchar(50),
  "message" text,
  "email" varchar(50)
);

CREATE TABLE "contacts" (
  "id" serial PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "sender_name" varchar,
  "header" text,
  "message" text,
  "email" varchar,
  "timestamp" timestamp,
  "notification" boolean
);

CREATE TABLE "conversations" (
  "id" serial PRIMARY KEY,
  "participant_1" uuid,
  "participant_2" uuid,
  "header" text,
  "timestamp" timestamp
);

CREATE TABLE "conversation_messages" (
  "id" serial PRIMARY KEY,
  "conversation_id" integer,
  "message" text,
  "timestamp" timestamp,
  "notification" boolean
);

CREATE TABLE "groups" (
  "id" serial PRIMARY KEY,
  "name" varchar(40) UNIQUE,
  "owner_uuid" uuid,
  "created_at" timestamp
);

CREATE TABLE "groupmembers" (
  "id" serial PRIMARY KEY,
  "group_id" integer,
  "member_id" uuid,
  "admin" boolean,
  "joined" timestamp
);

CREATE TABLE "user_medias" (
  "id" serial PRIMARY KEY,
  "filename" varchar(40),
  "path" varchar(40),
  "user_id" uuid
);

CREATE TABLE "item_properties" (
  "id" serial PRIMARY KEY,
  "creator_user_id" uuid,
  "media_id" integer,
  "blogpost_id" integer,
  "profile_id" uuid,
  "key" varchar(45),
  "value" text NOT NULL,
  "context_id" integer,
  "time" timestamp
);

CREATE TABLE "contexts" (
  "id" serial PRIMARY KEY,
  "title" varchar(50)
);

CREATE TABLE "blog_posts" (
  "id" serial PRIMARY KEY,
  "user_id" uuid,
  "blog_text" text,
  "timestamp" timestamp
);

CREATE TABLE "post_medias" (
  "blogpost_id" integer,
  "media_id" integer
);

CREATE TABLE "user_profiles" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid,
  "profile_image" integer,
  "profile_text" text,
  "header_media_id" integer,
  "homepage" text
);

CREATE TABLE "social_links" (
  "id" serial PRIMARY KEY,
  "profile_id" uuid,
  "link" text
);

CREATE TABLE "profile_elements" (
  "id" serial PRIMARY KEY,
  "profile_id" uuid,
  "type_id" integer,
  "media_id" integer,
  "gallery_id" integer,
  "post_id" integer,
  "text_value" text
);

CREATE TABLE "element_types" (
  "id" serial PRIMARY KEY,
  "name" text
);

CREATE TABLE "followings" (
  "id" serial PRIMARY KEY,
  "user_id" uuid,
  "follows_user" uuid,
  "follows_group" integer
);

CREATE TABLE "likes" (
  "id" serial PRIMARY KEY,
  "creator_user_id" uuid NOT NULL,
  "media_id" integer,
  "blogpost_id" integer
);

CREATE TABLE "folders" (
  "id" serial PRIMARY KEY,
  "profile_id" uuid,
  "folder_name" varchar
);

CREATE TABLE "foldermedia" (
  "id" serial PRIMARY KEY,
  "folder_id" integer,
  "media_id" integer
);



ALTER TABLE "meetings" ADD FOREIGN KEY ("user_uuid") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "invitations" ADD FOREIGN KEY ("meeting_id") REFERENCES "meetings" ("id") ON DELETE CASCADE;

ALTER TABLE "contacts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "conversations" ADD FOREIGN KEY ("participant_1") REFERENCES "users" ("uid") ON DELETE SET NULL;

ALTER TABLE "conversations" ADD FOREIGN KEY ("participant_2") REFERENCES "users" ("uid") ON DELETE SET NULL;

ALTER TABLE "conversation_messages" ADD FOREIGN KEY ("conversation_id") REFERENCES "conversations" ("id") ON DELETE CASCADE;

ALTER TABLE "groups" ADD FOREIGN KEY ("owner_uuid") REFERENCES "users" ("uid") ON DELETE RESTRICT;

ALTER TABLE "groupmembers" ADD FOREIGN KEY ("group_id") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "groupmembers" ADD FOREIGN KEY ("member_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "user_medias" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "item_properties" ADD FOREIGN KEY ("creator_user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "item_properties" ADD FOREIGN KEY ("media_id") REFERENCES "user_medias" ("id") ON DELETE CASCADE;

ALTER TABLE "item_properties" ADD FOREIGN KEY ("blogpost_id") REFERENCES "blog_posts" ("id") ON DELETE CASCADE;

ALTER TABLE "item_properties" ADD FOREIGN KEY ("profile_id") REFERENCES "user_profiles" ("id");

ALTER TABLE "item_properties" ADD FOREIGN KEY ("context_id") REFERENCES "contexts" ("id");

ALTER TABLE "blog_posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "post_medias" ADD FOREIGN KEY ("blogpost_id") REFERENCES "blog_posts" ("id") ON DELETE CASCADE;

ALTER TABLE "post_medias" ADD FOREIGN KEY ("media_id") REFERENCES "user_medias" ("id") ON DELETE CASCADE;

ALTER TABLE "user_profiles" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "user_profiles" ADD FOREIGN KEY ("profile_image") REFERENCES "user_medias" ("id") ON DELETE SET NULL;

ALTER TABLE "user_profiles" ADD FOREIGN KEY ("header_media_id") REFERENCES "user_medias" ("id") ON DELETE SET NULL;

ALTER TABLE "social_links" ADD FOREIGN KEY ("profile_id") REFERENCES "user_profiles" ("id");

ALTER TABLE "profile_elements" ADD FOREIGN KEY ("profile_id") REFERENCES "user_profiles" ("id") ON DELETE CASCADE;

ALTER TABLE "profile_elements" ADD FOREIGN KEY ("type_id") REFERENCES "element_types" ("id");

ALTER TABLE "followings" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "followings" ADD FOREIGN KEY ("follows_user") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "followings" ADD FOREIGN KEY ("follows_group") REFERENCES "groups" ("id") ON DELETE CASCADE;

ALTER TABLE "likes" ADD FOREIGN KEY ("creator_user_id") REFERENCES "users" ("uid") ON DELETE CASCADE;

ALTER TABLE "likes" ADD FOREIGN KEY ("media_id") REFERENCES "user_medias" ("id") ON DELETE CASCADE;

ALTER TABLE "likes" ADD FOREIGN KEY ("blogpost_id") REFERENCES "blog_posts" ("id") ON DELETE CASCADE;

ALTER TABLE "folders" ADD FOREIGN KEY ("profile_id") REFERENCES "user_profiles" ("id") ON DELETE CASCADE;

ALTER TABLE "foldermedia" ADD FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE CASCADE;

ALTER TABLE "foldermedia" ADD FOREIGN KEY ("media_id") REFERENCES "user_medias" ("id") ON DELETE CASCADE;
