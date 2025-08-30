import { createFileRoute } from "@tanstack/react-router";
import TeamPage from "#features/team/index.tsx";

export const Route = createFileRoute("/_authenticated/panel/team/")({
  component: TeamPage,
});
