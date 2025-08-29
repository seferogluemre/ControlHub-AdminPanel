/*
  Warnings:

  - You are about to drop the `RagDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `file_library_assets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."file_type" AS ENUM ('USER_IMAGE', 'RAG_DOCUMENT');

-- CreateEnum
CREATE TYPE "public"."file_file_type" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "public"."file_mime_type" AS ENUM ('IMAGE_JPEG', 'IMAGE_PNG', 'IMAGE_GIF', 'IMAGE_WEBP', 'IMAGE_SVG', 'IMAGE_BMP', 'IMAGE_TIFF', 'VIDEO_MP4', 'VIDEO_AVI', 'VIDEO_MPEG', 'VIDEO_WEBM', 'VIDEO_OGG', 'DOCUMENT_PDF', 'DOCUMENT_DOC', 'DOCUMENT_DOCX');

-- CreateEnum
CREATE TYPE "public"."chat_conversation_type" AS ENUM ('STAFF_GROUP', 'STAFF_TO_STAFF', 'VISITOR');

-- CreateEnum
CREATE TYPE "public"."chat_conversation_actor_type" AS ENUM ('VISITOR', 'STAFF', 'AGENT');

-- CreateEnum
CREATE TYPE "public"."chat_conversation_event_type" AS ENUM ('MESSAGE', 'MESSAGE_EDIT', 'MESSAGE_DELETE', 'CONVERSATION_TRANSFER', 'CONVERSATION_JOIN', 'CONVERSATION_LEAVE');

-- DropForeignKey
ALTER TABLE "public"."RagDocument" DROP CONSTRAINT "RagDocument_file_library_asset_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."posts" DROP CONSTRAINT "posts_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_image_id_fkey";

-- DropTable
DROP TABLE "public"."RagDocument";

-- DropTable
DROP TABLE "public"."file_library_assets";

-- DropTable
DROP TABLE "public"."posts";

-- DropEnum
DROP TYPE "public"."file_asset_mime_type";

-- DropEnum
DROP TYPE "public"."file_library_asset_file_type";

-- DropEnum
DROP TYPE "public"."file_library_asset_type";

-- CreateTable
CREATE TABLE "public"."files" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "type" "public"."file_type" NOT NULL,
    "file_type" "public"."file_file_type" NOT NULL,
    "mime_type" "public"."file_mime_type" NOT NULL,
    "size" BIGINT NOT NULL,
    "path" VARCHAR(512) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."websites" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "logo_file_id" INTEGER,
    "logo_file_src" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "websites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ChatWebsiteUIConfig" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "ChatWebsiteUIConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_website_uis" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(512) NOT NULL,
    "prompt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chat_website_uis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_website_configs" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "token" VARCHAR(512) NOT NULL,
    "website_id" INTEGER NOT NULL,
    "website_uuid" TEXT NOT NULL,
    "ui_config_id" INTEGER NOT NULL,
    "ui_config_uuid" TEXT NOT NULL,
    "ai_config_id" INTEGER NOT NULL,
    "ai_config_uuid" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "aiConfigData" JSONB,
    "uiConfigData" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chat_website_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_canned_messages" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "website_id" INTEGER NOT NULL,
    "website_uuid" TEXT NOT NULL,
    "slug" VARCHAR(512) NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chat_canned_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_conversations" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "website_id" INTEGER NOT NULL,
    "website_uuid" TEXT NOT NULL,
    "type" "public"."chat_conversation_type" NOT NULL,
    "participants" JSONB NOT NULL,
    "states" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chat_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_conversation_participants" (
    "website_id" INTEGER NOT NULL,
    "website_uuid" TEXT NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "conversation_uuid" TEXT NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "participant_uuid" TEXT NOT NULL,
    "participations" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "public"."chat_visitor_visits" (
    "visitor_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "page_title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "public"."chat_visitors" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "website_id" INTEGER NOT NULL,
    "token" VARCHAR(512) NOT NULL,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "device_info" TEXT NOT NULL,
    "browser_info" TEXT NOT NULL,
    "os_info" TEXT NOT NULL,
    "staffNotes" JSONB,
    "record" JSONB,
    "currentVisit" JSONB,
    "banned_at" TIMESTAMP(3),
    "ban_expires_at" TIMESTAMP(3),
    "ban_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chat_visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_visitor_staff_notes" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "website_id" INTEGER NOT NULL,
    "website_uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_by_id" INTEGER NOT NULL,
    "created_by_uuid" TEXT NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "conversation_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "chat_visitor_staff_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_conversation_events" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "website_id" INTEGER NOT NULL,
    "website_uuid" TEXT NOT NULL,
    "conversation_id" INTEGER NOT NULL,
    "conversation_uuid" TEXT NOT NULL,
    "actor_type" "public"."chat_conversation_actor_type" NOT NULL,
    "actor_id" INTEGER,
    "actor_uuid" TEXT,
    "event_type" "public"."chat_conversation_event_type" NOT NULL,
    "data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_conversation_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_uuid_key" ON "public"."files"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "websites_uuid_key" ON "public"."websites"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "ChatWebsiteUIConfig_uuid_key" ON "public"."ChatWebsiteUIConfig"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "chat_website_uis_uuid_key" ON "public"."chat_website_uis"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "chat_website_configs_uuid_key" ON "public"."chat_website_configs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "chat_website_configs_token_key" ON "public"."chat_website_configs"("token");

-- CreateIndex
CREATE UNIQUE INDEX "chat_canned_messages_uuid_key" ON "public"."chat_canned_messages"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "chat_conversations_uuid_key" ON "public"."chat_conversations"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "chat_conversation_participants_conversation_id_participant__key" ON "public"."chat_conversation_participants"("conversation_id", "participant_id");

-- CreateIndex
CREATE UNIQUE INDEX "chat_visitor_visits_visitor_id_created_at_key" ON "public"."chat_visitor_visits"("visitor_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "chat_visitors_uuid_key" ON "public"."chat_visitors"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "chat_visitors_token_key" ON "public"."chat_visitors"("token");

-- CreateIndex
CREATE UNIQUE INDEX "chat_visitor_staff_notes_uuid_key" ON "public"."chat_visitor_staff_notes"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "chat_conversation_events_uuid_key" ON "public"."chat_conversation_events"("uuid");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "public"."files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
