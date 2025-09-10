import prisma from "@devflow/db";
import { NotFoundError } from "elysia";
import { type WebsiteCreatePayload, type WebsiteUpdatePayload } from "./types";

export abstract class WebsiteService {
  static async index() {
    const websites = await prisma.website.findMany({
      where: { deletedAt: null },
    });

    return websites;
  }

  static async show(uuid: string) {
    const website = await prisma.website.findUnique({
      where: { uuid: uuid, deletedAt: null },
    });

    if (!website) {
      throw new NotFoundError("Website bulunamadı");
    }

    return website;
  }

  static async store(data: WebsiteCreatePayload) {
    const website = await prisma.website.create({
      data: {
        name: data.name,
      },
    });

    return website;
  }

  static async update(uuid: string, data: WebsiteUpdatePayload) {
    const website = await prisma.website.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        name: data.name,
      },
    });

    return website;
  }

  static async destroy(uuid: string) {
    const website = await prisma.website.update({
      where: { uuid: uuid, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!website) {
      throw new NotFoundError("Website bulunamadı");
    }

    return website;
  }
}
