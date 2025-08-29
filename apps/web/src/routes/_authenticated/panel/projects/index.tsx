import { createFileRoute } from "@tanstack/react-router";
import Projects from "#features/projects/index.tsx";

export const Route = createFileRoute("/_authenticated/panel/projects/")({
  component: Projects,
});
