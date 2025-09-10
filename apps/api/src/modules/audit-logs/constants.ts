import { PrismaModelNamePascalCase } from "@devflow/db/types";

export enum AuditLogAction {
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
}

export const AuditLogEntity = {
  USER: "User",
  ROLE: "Role",
  FILE: "File",
} as const satisfies Record<string, PrismaModelNamePascalCase>;
