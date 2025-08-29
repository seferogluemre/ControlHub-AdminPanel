import { Elysia } from "elysia";
import {
  chatWebsiteUIConfigCreateDto,
  chatWebsiteUIConfigDestroyDto,
  chatWebsiteUIConfigIndexDto,
  chatWebsiteUIConfigShowDto,
  chatWebsiteUIConfigUpdateDto,
} from "./dtos";
import { ChatWebsiteUIConfigService } from "./service";

const app = new Elysia({
  prefix: "/chat-website-ui-config",
  tags: ["Chat Website UI Config"],
})
  .get(
    "/",
    async () => {
      const chatWebsiteUIConfigs = await ChatWebsiteUIConfigService.index();
      return chatWebsiteUIConfigs;
    },
    chatWebsiteUIConfigIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const chatWebsiteUIConfig = await ChatWebsiteUIConfigService.show(params.uuid);
      return chatWebsiteUIConfig;
    },
    chatWebsiteUIConfigShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const chatWebsiteUIConfig = await ChatWebsiteUIConfigService.store(body);
      return chatWebsiteUIConfig;
    },
    chatWebsiteUIConfigCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const chatWebsiteUIConfig = await ChatWebsiteUIConfigService.update(params.uuid, body);
      return chatWebsiteUIConfig;
    },
    chatWebsiteUIConfigUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const chatWebsiteUIConfig = await ChatWebsiteUIConfigService.destroy(params.uuid);
      return chatWebsiteUIConfig;
    },
    chatWebsiteUIConfigDestroyDto,
  );

export default app;
