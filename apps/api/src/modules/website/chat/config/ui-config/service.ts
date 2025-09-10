import prisma from "@devflow/db";
import { NotFoundError } from "elysia";
import {
  type ChatWebsiteUIConfigCreatePayload,
  type ChatWebsiteUIConfigUpdatePayload,
} from "./types";

export abstract class ChatWebsiteUIConfigService {
  static async index() {
    const chatWebsiteUIConfigs = await prisma.chatWebsiteUIConfig.findMany({
      where: { deletedAt: null },
    });

    return chatWebsiteUIConfigs;
  }

  static async show(uuid: string) {
    const chatWebsiteUIConfig = await prisma.chatWebsiteUIConfig.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!chatWebsiteUIConfig) {
      throw new NotFoundError("Chat Website UI Config bulunamadı");
    }

    return chatWebsiteUIConfig;
  }

  static async store(data: ChatWebsiteUIConfigCreatePayload) {
    const chatWebsiteUIConfig = await prisma.chatWebsiteUIConfig.create({
      data: {
        ...data,
      },
    });

    return chatWebsiteUIConfig;
  }

  static async update(uuid: string, data: ChatWebsiteUIConfigUpdatePayload) {
    const chatWebsiteUIConfig = await prisma.chatWebsiteUIConfig.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        ...data,
      },
    });

    return chatWebsiteUIConfig;
  }

  static async destroy(uuid: string) {
    const chatWebsiteUIConfig = await prisma.chatWebsiteUIConfig.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!chatWebsiteUIConfig) {
      throw new NotFoundError("Chat Website UI Config bulunamadı");
    }

    return chatWebsiteUIConfig;
  }
}
