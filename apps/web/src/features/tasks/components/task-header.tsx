import { IconPlus, IconFilter, IconChecklist, IconClock, IconFolders } from "@tabler/icons-react";
import { Button } from "#/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Badge } from "#/components/ui/badge";
import { type Project } from "../../projects/hooks";
import { useTasksTranslation, useFormattedTranslation } from "#/lib/i18n/hooks";

interface TaskHeaderProps {
  selectedProject: string | "all";
  projects: Project[];
  onProjectFilter: (projectId: string | "all") => void;
  onNewTask: () => void;
  taskCount: number;
}

export function TaskHeader({
  selectedProject,
  projects,
  onProjectFilter,
  onNewTask,
  taskCount,
}: TaskHeaderProps) {
  const { t } = useTasksTranslation();
  const { formatCount } = useFormattedTranslation();
  const activeProjects = projects.filter((p) => p.status === "active");
  const selectedProjectData = projects.find((p) => p.id === selectedProject);

  return (
    <div className="space-y-4">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <IconChecklist className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
              <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-3 py-1">
            {t("taskCount", { count: taskCount })}
          </Badge>
          <Button onClick={onNewTask} className="gap-2">
            <IconPlus className="h-4 w-4" />
            {t("newTask")}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-2 text-sm font-medium">
          <IconFilter className="h-4 w-4 text-muted-foreground" />
          <span>{t("filterByProject")}</span>
        </div>

        <Select value={selectedProject} onValueChange={onProjectFilter}>
          <SelectTrigger className="w-full sm:w-[250px] bg-background">
            <div className="flex items-center gap-2">
              {selectedProject === "all" ? (
                <IconFolders className="h-4 w-4 text-muted-foreground" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
              <SelectValue placeholder="Select project..." />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <IconFolders className="h-4 w-4 text-muted-foreground" />
                <span>{t("allProjects")}</span>
                <Badge variant="outline" className="ml-auto">
                  {projects.length}
                </Badge>
              </div>
            </SelectItem>
            {activeProjects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="truncate">{project.name}</span>
                  <Badge variant="outline" className="ml-auto">
                    {project.tasks?.length || 0}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedProjectData && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IconClock className="h-4 w-4" />
            <span>{t("progress", { progress: selectedProjectData.progress })}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
