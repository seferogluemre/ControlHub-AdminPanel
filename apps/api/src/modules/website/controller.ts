import { Elysia } from "elysia";
import {
  websiteCreateDto,
  websiteDestroyDto,
  websiteIndexDto,
  websiteShowDto,
  websiteUpdateDto,
} from "./dtos";
import { WebsiteService } from "./service";

const app = new Elysia({
  prefix: "/website",
  tags: ["Website"],
})
  .get(
    "/",
    async () => {
      const websites = await WebsiteService.index();
      return websites;
    },
    websiteIndexDto,
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const website = await WebsiteService.show(params.uuid);
      return website;
    },
    websiteShowDto,
  )
  .post(
    "/",
    async ({ body }) => {
      const website = await WebsiteService.store(body);
      return website;
    },
    websiteCreateDto,
  )
  .patch(
    "/:uuid",
    async ({ params, body }) => {
      const website = await WebsiteService.update(params.uuid, body);
      return website;
    },
    websiteUpdateDto,
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const website = await WebsiteService.destroy(params.uuid);
      return website;
    },
    websiteDestroyDto,
  );

export default app;
