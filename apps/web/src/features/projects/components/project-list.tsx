import {
  IconPin,
  IconPinFilled,
  IconCircleDot,
  IconCircleCheck,
  IconClock,
} from "@tabler/icons-react";
import { ScrollArea } from "#/components/ui/scroll-area";
import { Badge } from "#/components/ui/badge";
import { Progress } from "#/components/ui/progress";
import { cn } from "#/lib/utils";
import { type Project } from "../hooks";
import { type DisplayOptionsType } from "../hooks/use-display-options";

interface ProjectListProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onTogglePin: (projectId: string) => void;
  displayOptions: DisplayOptionsType;
}

const getStatusIcon = (status: Project["status"]) => {
  switch (status) {
    case "active":
      return <IconCircleDot className="h-3 w-3 text-green-500" />;
    case "completed":
      return <IconCircleCheck className="h-3 w-3 text-blue-500" />;
    case "on-hold":
      return <IconClock className="h-3 w-3 text-yellow-500" />;
    case "planning":
      return <IconClock className="h-3 w-3 text-gray-500" />;
    default:
      return <IconCircleDot className="h-3 w-3 text-gray-400" />;
  }
};

const getStatusColor = (status: Project["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "on-hold":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "planning":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getPriorityColor = (priority: Project["priority"]) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "medium":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

function ProjectItem({
  project,
  isSelected,
  onSelect,
  onTogglePin,
}: {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onTogglePin: () => void;
}) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer flex-col gap-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors",
        isSelected && "bg-accent border-primary/20",
      )}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {getStatusIcon(project.status)}
          <h3 className="font-medium text-sm truncate">{project.name}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
          className="flex-shrink-0 p-1.5 hover:bg-accent rounded-md transition-colors"
        >
          {project.pinned ? (
            <IconPinFilled className="h-3.5 w-3.5 text-primary" />
          ) : (
            <IconPin className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Status and Priority Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="outline"
          className={cn("text-xs py-1 px-2.5 font-medium", getStatusColor(project.status))}
        >
          {project.status}
        </Badge>
        <Badge
          variant="outline"
          className={cn("text-xs py-1 px-2.5 font-medium", getPriorityColor(project.priority))}
        >
          {project.priority}
        </Badge>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span className="font-medium">Progress</span>
          <span className="font-semibold text-foreground">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
      </div>

      {/* Team & Tasks Info */}
      <div className="flex justify-between items-center text-xs text-muted-foreground pt-1">
        <span className="flex items-center gap-1">
          <span className="font-medium">{project.team?.length || 0}</span>
          <span>members</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="font-medium">{project.tasks?.length || 0}</span>
          <span>tasks</span>
        </span>
      </div>
    </div>
  );
}

export function ProjectList({
  projects,
  selectedProject,
  onSelectProject,
  onTogglePin,
  displayOptions,
}: ProjectListProps) {
  // Sort projects: pinned first, then by status
  const sortedProjects = [...projects].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;

    // Then by status priority
    const statusPriority = { active: 4, planning: 3, "on-hold": 2, completed: 1 };
    return statusPriority[b.status] - statusPriority[a.status];
  });

  // Group by status if option is enabled
  const groupedProjects = displayOptions.groupChatByStatus
    ? {
        active: sortedProjects.filter((p) => p.status === "active"),
        planning: sortedProjects.filter((p) => p.status === "planning"),
        "on-hold": sortedProjects.filter((p) => p.status === "on-hold"),
        completed: sortedProjects.filter((p) => p.status === "completed"),
      }
    : null;

  return (
    <div className="flex flex-col h-[750px] w-full max-w-[320px] overflow-hidden rounded-lg">
      <ScrollArea className="flex-1 h-full">
        <div className="space-y-3 p-4 w-full max-w-full overflow-hidden">
          {groupedProjects ? (
            // Grouped view
            Object.entries(groupedProjects).map(
              ([status, statusProjects]) =>
                statusProjects.length > 0 && (
                  <div key={status} className="space-y-2">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
                      {status} ({statusProjects.length})
                    </h4>
                    <div className="space-y-1">
                      {statusProjects.map((project) => (
                        <ProjectItem
                          key={project.id}
                          project={project}
                          isSelected={selectedProject?.id === project.id}
                          onSelect={() => onSelectProject(project)}
                          onTogglePin={() => onTogglePin(project.id)}
                        />
                      ))}
                    </div>
                  </div>
                ),
            )
          ) : (
            // List view
            <div className="space-y-1">
              {sortedProjects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  isSelected={selectedProject?.id === project.id}
                  onSelect={() => onSelectProject(project)}
                  onTogglePin={() => onTogglePin(project.id)}
                />
              ))}
              {sortedProjects.length === 0 && (
                <div className="text-center text-muted-foreground text-xs py-8">
                  No projects found
                </div>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
