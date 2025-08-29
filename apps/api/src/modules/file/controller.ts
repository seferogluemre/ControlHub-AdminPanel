import { auth } from "#modules/auth/authentication/plugin";
import { Elysia } from "elysia";

import { dtoWithMiddlewares, NotFoundException } from "../../utils";
import { PaginationService } from "../../utils/pagination";
import { AuditLogAction, AuditLogEntity, withAuditLog } from "../audit-logs";
import { PERMISSIONS } from "../auth/roles/constants";
import { dtoWithPermission, withPermission } from "../auth/roles/middleware";
import { fileCreateDto, fileDestroyDto, fileIndexDto, fileShowDto, fileUpdateDto } from "./dtos";
import { FileFormatter } from "./formatters";
import { FilesService } from "./service";

const app = new Elysia({
  prefix: "/file",
  tags: ["File"],
})
  .use(auth())
  .get(
    "/",
    async ({ query }) => {
      const { data, total } = await FilesService.index(query);
      return PaginationService.createPaginatedResponse({
        data,
        total,
        query,
        formatter: FileFormatter.response,
      });
    },
    dtoWithPermission(fileIndexDto, PERMISSIONS.FILE_LIBRARY_ASSETS.SHOW),
  )
  .get(
    "/:uuid",
    async ({ params }) => {
      const file = await FilesService.show(params.uuid);
      if (!file) throw new NotFoundException("Dosya bulunamadı");
      return FileFormatter.response(file);
    },
    dtoWithPermission(fileShowDto, PERMISSIONS.FILE_LIBRARY_ASSETS.SHOW),
  )
  .post(
    "/",
    async ({ body }) => {
      const file = await FilesService.store(body);
      return FileFormatter.response(file);
    },
    dtoWithMiddlewares(
      fileCreateDto,
      withPermission(PERMISSIONS.FILE_LIBRARY_ASSETS.CREATE),
      withAuditLog({
        actionType: AuditLogAction.CREATE,
        entityType: AuditLogEntity.FILE,
        getEntityUuid: (ctx) => {
          // @ts-ignore TODO: fix this
          const response = ctx.response as ReturnType<typeof FileFormatter.response>;
          return response.uuid;
        },
        getDescription: () => {
          return "Yeni dosya oluşturuldu";
        },
      }),
    ),
  )
  .put(
    "/:uuid",
    async ({ params, body }) => {
      const file = await FilesService.update(params.uuid, body);
      if (!file) throw new NotFoundException("Dosya bulunamadı");
      return FileFormatter.response(file);
    },
    dtoWithMiddlewares(
      fileUpdateDto,
      withPermission(PERMISSIONS.FILE_LIBRARY_ASSETS.UPDATE),
      withAuditLog({
        actionType: AuditLogAction.UPDATE,
        entityType: AuditLogEntity.FILE,
        getEntityUuid: ({ params }) => params.uuid!,
        getDescription: ({ body }) => {
          return `Dosya güncellendi: ${Object.keys(body as object).join(", ")}`;
        },
        getMetadata: ({ body }) => {
          return { updatedFields: body };
        },
      }),
    ),
  )
  .delete(
    "/:uuid",
    async ({ params }) => {
      const file = await FilesService.destroy(params.uuid);
      if (!file) throw new NotFoundException("Dosya bulunamadı");
      return { message: "Dosya başarıyla silindi" };
    },
    dtoWithMiddlewares(
      fileDestroyDto,
      withPermission(PERMISSIONS.FILE_LIBRARY_ASSETS.DESTROY),
      withAuditLog({
        actionType: AuditLogAction.DELETE,
        entityType: AuditLogEntity.FILE,
        getEntityUuid: ({ params }) => params.uuid!,
        getDescription: () => {
          return "Dosya silindi";
        },
      }),
    ),
  );

export default app;
