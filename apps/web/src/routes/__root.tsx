import { NavigationProgress } from "#/components/navigation-progress";
import { Toaster } from "#/components/ui/sonner";
import GeneralError from "#components/errors/general-error.tsx";
import NotFoundError from "#components/errors/not-found-error.tsx";
import { RouterContext } from "#context/router.context.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const { auth, queryClient } = context;

    await queryClient.ensureQueryData({
      queryKey: ["auth"],
      queryFn: () => auth.fetchUser(),
    });
  },
  component: () => {
    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={5000} />
        {import.meta.env.MODE === "development" && (
          <>
            <ReactQueryDevtools buttonPosition="bottom-left" />
            <TanStackRouterDevtools position="bottom-right" />
          </>
        )}
      </>
    );
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
});
