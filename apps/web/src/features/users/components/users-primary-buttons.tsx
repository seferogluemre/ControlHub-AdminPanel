import { IconMailPlus, IconUserPlus } from "@tabler/icons-react";
import { Button } from "#/components/ui/button";
import { useUsers } from "../context/users-context";
import { useTeamTranslation } from "#/lib/i18n/hooks";

export function UsersPrimaryButtons() {
  const { t } = useTeamTranslation();
  const { setOpen } = useUsers();
  return (
    <div className="flex gap-2">
      <Button variant="outline" className="space-x-1" onClick={() => setOpen("invite")}>
        <span>{t("buttons.import")}</span> <IconMailPlus size={18} />
      </Button>
      <Button className="space-x-1" onClick={() => setOpen("add")}>
        <span>{t("buttons.newMember")}</span> <IconUserPlus size={18} />
      </Button>
    </div>
  );
}
