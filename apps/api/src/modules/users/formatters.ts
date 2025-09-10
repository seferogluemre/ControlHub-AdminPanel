import type { User } from "@devflow/db/client";

import { BaseFormatter } from "../../utils";
import { userResponseSchema } from "./dtos";
import type { UserShowResponse } from "./types";

export abstract class UserFormatter {
  static response(data: User) {
    const convertedData = BaseFormatter.convertData<UserShowResponse>(data, userResponseSchema);

    return convertedData;
  }
}
