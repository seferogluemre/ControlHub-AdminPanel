import { Elysia } from "elysia";
import {
  chatWebsiteConfigCreateDto,
  chatWebsiteConfigDestroyDto,
  chatWebsiteConfigIndexDto,
  chatWebsiteConfigShowDto,
  chatWebsiteConfigUpdateDto,
} from "./dtos";
import { ChatWebsiteConfigService } from "./service";

const app = new Elysia({
  prefix: "/chat-website-config",
  tags: ["Chat Website Config"],
})
  .get(
    "/",
    async () => {
      const chatWebsiteConfigs = await ChatWebsiteConfigService.index();
      return chatWebsiteConfigs;
    },
    chatWebsiteConfigIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatWebsiteConfig = await ChatWebsiteConfigService.show(params.uuid);
      return chatWebsiteConfig;
    },
    chatWebsiteConfigShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatWebsiteConfig = await ChatWebsiteConfigService.store(body);
      return chatWebsiteConfig;
    },
    chatWebsiteConfigCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatWebsiteConfig = await ChatWebsiteConfigService.update(params.uuid, body);
      return chatWebsiteConfig;
    },
    chatWebsiteConfigUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatWebsiteConfig = await ChatWebsiteConfigService.destroy(params.uuid);
      return chatWebsiteConfig;
    },
    chatWebsiteConfigDestroyDto,
  );

export default app;
