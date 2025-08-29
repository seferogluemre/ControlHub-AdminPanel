-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "public";

-- CreateTable
CREATE TABLE "RagDocument" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "vector" vector,
    "file_library_asset_id" INTEGER NOT NULL,
    "file_library_asset_uuid" TEXT NOT NULL,

    CONSTRAINT "RagDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RagDocument_uuid_key" ON "RagDocument"("uuid");

-- AddForeignKey
ALTER TABLE "RagDocument" ADD CONSTRAINT "RagDocument_file_library_asset_id_fkey" FOREIGN KEY ("file_library_asset_id") REFERENCES "file_library_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
