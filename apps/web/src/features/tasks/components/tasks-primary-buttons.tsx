import { IconDownload, IconPlus, IconFileExport } from "@tabler/icons-react";
import { Button } from "#/components/ui/button";
import { useTasks } from "../context/tasks-context";

export function TasksPrimaryButtons() {
  const { setOpen } = useTasks();
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" className="space-x-2">
        <IconFileExport size={16} />
        <span>Export</span>
      </Button>
      <Button variant="outline" size="sm" className="space-x-2" onClick={() => setOpen("import")}>
        <IconDownload size={16} />
        <span>Import Tasks</span>
      </Button>
      <Button size="sm" className="space-x-2" onClick={() => setOpen("create")}>
        <IconPlus size={16} />
        <span>New Task</span>
      </Button>
    </div>
  );
}
