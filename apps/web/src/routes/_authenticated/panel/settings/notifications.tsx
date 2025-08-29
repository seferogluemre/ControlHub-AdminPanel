import { createFileRoute } from "@tanstack/react-router";
import SettingsNotifications from "#/features/settings/notifications";

export const Route = createFileRoute("/_authenticated/panel/settings/notifications")({
  component: SettingsNotifications,
});
