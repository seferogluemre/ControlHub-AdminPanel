import { Elysia } from "elysia";
import {
  chatWebsiteAIConfigCreateDto,
  chatWebsiteAIConfigDestroyDto,
  chatWebsiteAIConfigIndexDto,
  chatWebsiteAIConfigShowDto,
  chatWebsiteAIConfigUpdateDto,
} from "./dtos";
import { ChatWebsiteAIConfigService } from "./service";

const app = new Elysia({
  prefix: "/chat-website-ai-config",
  tags: ["Chat Website AI Config"],
})
  .get(
    "/",
    async () => {
      const chatWebsiteAIConfigs = await ChatWebsiteAIConfigService.index();
      return chatWebsiteAIConfigs;
    },
    chatWebsiteAIConfigIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatWebsiteAIConfig = await ChatWebsiteAIConfigService.show(params.uuid);
      return chatWebsiteAIConfig;
    },
    chatWebsiteAIConfigShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatWebsiteAIConfig = await ChatWebsiteAIConfigService.store(body);
      return chatWebsiteAIConfig;
    },
    chatWebsiteAIConfigCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatWebsiteAIConfig = await ChatWebsiteAIConfigService.update(params.uuid, body);
      return chatWebsiteAIConfig;
    },
    chatWebsiteAIConfigUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatWebsiteAIConfig = await ChatWebsiteAIConfigService.destroy(params.uuid);
      return chatWebsiteAIConfig;
    },
    chatWebsiteAIConfigDestroyDto,
  );

export default app;
