import type { AuditLog, User } from "@devflow/db/client";
import { AuditLogPlain } from "@devflow/db/prismabox/AuditLog";
import { BaseFormatter } from "../../utils/base-formatter";

export class AuditLogFormatter extends BaseFormatter {
  static formatWithUser(item: AuditLog & { user: Pick<User, "id" | "name"> }) {
    const baseData = BaseFormatter.convertData<typeof AuditLogPlain.static>(item, AuditLogPlain);

    return {
      ...baseData,
      user: {
        id: item.user.id,
        name: item.user.name,
      },
    };
  }
}
