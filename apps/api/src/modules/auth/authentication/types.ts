import type { User } from "@devflow/db/client";
import type { Context } from "elysia";

export interface AuthContext extends Context {
  user: User;
}
