import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const { auth } = context;

    if (!auth.user) {
      throw redirect({ to: "/sign-in", search: { redirect: location.pathname } });
    }
  },
  component: Outlet,
});
