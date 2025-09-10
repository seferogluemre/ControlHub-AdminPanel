import type { Role } from "@devflow/db/client";
import { RolePlain } from "@devflow/db/prismabox/Role";
import { BaseFormatter } from "../../../utils";

export abstract class RoleFormatter {
  static response(data: Role) {
    const convertedData = BaseFormatter.convertData<typeof RolePlain.static>(data, RolePlain);
    return convertedData;
  }
}
