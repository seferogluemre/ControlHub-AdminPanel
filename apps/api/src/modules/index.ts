import Elysia from "elysia";
import { authenticationController, rolesController } from "./auth";
import { fileController } from "./file";
import { locationsController } from "./locations";
import { systemAdministrationController } from "./system-administration";
import { usersController } from "./users";
import { websiteController } from "./website";

const app = new Elysia()
  .use(systemAdministrationController)
  .use(usersController)
  .use(authenticationController)
  .use(rolesController)
  .use(locationsController)
  .use(fileController)
  .use(websiteController)
  .get(
    "/",
    () => ({
      message: "Hello Elysia",
    }),
    {
      detail: {
        summary: "Hello World",
      },
    },
  );

export const swaggerTags: { name: string; description: string }[] = [
  {
    name: "System Administration",
    description: "System Administration endpoints",
  },
  { name: "Audit Logs", description: "Audit Logs endpoints" },
  { name: "User", description: "User endpoints" },
  { name: "Auth", description: "Auth endpoints" },
  { name: "Role", description: "Role endpoints" },
  { name: "Post", description: "Post endpoints" },
  { name: "Country", description: "Country endpoints" },
  { name: "State", description: "State endpoints" },
  { name: "City", description: "City endpoints" },
  { name: "Region", description: "Region endpoints" },
  { name: "Subregion", description: "Subregion endpoints" },
  { name: "File Library Assets", description: "File Library Assets endpoints" },
  { name: "Website", description: "Website endpoints" },
];

export default app;
