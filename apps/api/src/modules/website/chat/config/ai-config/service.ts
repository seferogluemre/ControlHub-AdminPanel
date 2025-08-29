import prisma from "@onlyjs/db";
import { NotFoundError } from "elysia";
import {
  type ChatWebsiteAIConfigCreatePayload,
  type ChatWebsiteAIConfigUpdatePayload,
} from "./types";

export abstract class ChatWebsiteAIConfigService {
  static async index() {
    const chatWebsiteAIConfigs = await prisma.chatWebsiteAIConfig.findMany({
      where: { deletedAt: null },
    });

    return chatWebsiteAIConfigs;
  }

  static async show(uuid: string) {
    const chatWebsiteAIConfig = await prisma.chatWebsiteAIConfig.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatWebsiteAIConfig) {
      throw new NotFoundError("Chat Website AI Config bulunamadı");
    }

    return chatWebsiteAIConfig;
  }

  static async store(data: ChatWebsiteAIConfigCreatePayload) {
    const chatWebsiteAIConfig = await prisma.chatWebsiteAIConfig.create({
      data: {
        ...data,
      },
    });

    return chatWebsiteAIConfig;
  }

  static async update(uuid: string, data: ChatWebsiteAIConfigUpdatePayload) {
    const chatWebsiteAIConfig = await prisma.chatWebsiteAIConfig.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatWebsiteAIConfig;
  }

  static async destroy(uuid: string) {
    const chatWebsiteAIConfig = await prisma.chatWebsiteAIConfig.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatWebsiteAIConfig) {
      throw new NotFoundError("Chat Website AI Config bulunamadı");
    }

    return chatWebsiteAIConfig;
  }
}
