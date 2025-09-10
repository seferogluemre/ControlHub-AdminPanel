import prisma from "@devflow/db";
import { NotFoundError } from "elysia";
import { type ChatWebsiteConfigCreatePayload, type ChatWebsiteConfigUpdatePayload } from "./types";

export abstract class ChatWebsiteConfigService {
  static async index() {
    const chatWebsiteConfigs = await prisma.chatWebsiteConfig.findMany({
      where: { deletedAt: null },
    });

    return chatWebsiteConfigs;
  }

  static async show(uuid: string) {
    const chatWebsiteConfig = await prisma.chatWebsiteConfig.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatWebsiteConfig) {
      throw new NotFoundError("Chat Website Config bulunamadı");
    }

    return chatWebsiteConfig;
  }

  static async store(data: ChatWebsiteConfigCreatePayload) {
    const chatWebsiteConfig = await prisma.chatWebsiteConfig.create({
      data: {
        ...data,
      },
    });

    return chatWebsiteConfig;
  }

  static async update(uuid: string, data: ChatWebsiteConfigUpdatePayload) {
    const chatWebsiteConfig = await prisma.chatWebsiteConfig.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatWebsiteConfig;
  }

  static async destroy(uuid: string) {
    const chatWebsiteConfig = await prisma.chatWebsiteConfig.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatWebsiteConfig) {
      throw new NotFoundError("Chat Website Config bulunamadı");
    }

    return chatWebsiteConfig;
  }
}
