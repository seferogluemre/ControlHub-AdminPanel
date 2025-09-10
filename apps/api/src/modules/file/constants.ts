import { FileFileType, FileMimeType, FileType } from "@devflow/db/client";

export const FILE_IMAGE_RULES = {
  allowedMimeTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/tiff",
  ],
  maxSize: 10 * 1024 * 1024, // 10MB
};

export const FILE_DOCUMENT_RULES = {
  allowedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  maxSize: 10 * 1024 * 1024, // 10MB
};

export const FILE_VIDEO_RULES = {
  allowedMimeTypes: ["video/mp4", "video/avi", "video/mpeg", "video/webm", "video/ogg"],
  maxSize: 10 * 1024 * 1024, // 10MB
};

export const FILE_TYPE_RULES = {
  //USER_IMAGE
  [FileType.USER_IMAGE]: {
    validationRules: FILE_IMAGE_RULES,
    pathPrefix: ["users", "images"],
    fileType: FileFileType.IMAGE,
  },
  //DOCUMENT
  [FileType.RAG_DOCUMENT]: {
    validationRules: FILE_DOCUMENT_RULES,
    pathPrefix: ["documents", "rag"],
    fileType: FileFileType.DOCUMENT,
  },
};

export const normalizeMimeType = (mimeType: string) => {
  const mimeTypesMapping = {
    //IMAGE
    "image/jpeg": FileMimeType.IMAGE_JPEG,
    "image/png": FileMimeType.IMAGE_PNG,
    "image/gif": FileMimeType.IMAGE_GIF,
    "image/webp": FileMimeType.IMAGE_WEBP,
    "image/svg+xml": FileMimeType.IMAGE_SVG,
    "image/bmp": FileMimeType.IMAGE_BMP,
    "image/tiff": FileMimeType.IMAGE_TIFF,

    //VIDEO
    "video/mp4": FileMimeType.VIDEO_MP4,
    "video/avi": FileMimeType.VIDEO_AVI,
    "video/mpeg": FileMimeType.VIDEO_MPEG,
    "video/webm": FileMimeType.VIDEO_WEBM,
    "video/ogg": FileMimeType.VIDEO_OGG,

    //DOCUMENT
    "application/pdf": FileMimeType.DOCUMENT_PDF,
    "application/msword": FileMimeType.DOCUMENT_DOC,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      FileMimeType.DOCUMENT_DOCX,
  };

  return mimeTypesMapping[mimeType as keyof typeof mimeTypesMapping];
};
