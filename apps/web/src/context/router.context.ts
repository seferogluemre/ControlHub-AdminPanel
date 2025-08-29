import { QueryClient } from "@tanstack/react-query";
import { AuthState } from "./auth.context";

export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthState;
}
