import {
  IconCircle,
  IconProgress,
  IconEye,
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconUser,
  IconTag,
} from "@tabler/icons-react";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { ScrollArea } from "#/components/ui/scroll-area";
import { cn } from "#/lib/utils";
import { type Task } from "../../projects/hooks";
import { format } from "date-fns";
import { useTasksTranslation, useLanguage } from "#/lib/i18n/hooks";

interface TaskBoardProps {
  tasksByStatus: {
    todo: Task[];
    "in-progress": Task[];
    review: Task[];
    completed: Task[];
  };
  onTaskSelect: (task: Task) => void;
}

const statusConfig = {
  todo: {
    label: "To Do",
    icon: IconCircle,
    color: "text-slate-500",
    bgColor: "bg-slate-50 dark:bg-slate-900/50",
    borderColor: "border-slate-200 dark:border-slate-800",
  },
  "in-progress": {
    label: "In Progress",
    icon: IconProgress,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  review: {
    label: "Review",
    icon: IconEye,
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    borderColor: "border-amber-200 dark:border-amber-800",
  },
  completed: {
    label: "Completed",
    icon: IconCheck,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    borderColor: "border-green-200 dark:border-green-800",
  },
};

const priorityConfig = {
  low: { color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  medium: { color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  high: { color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
  urgent: { color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
};

function TaskCard({ task, onSelect }: { task: Task; onSelect: () => void }) {
  const { t } = useTasksTranslation();
  const { currentLanguage } = useLanguage();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        "group relative overflow-hidden",
        isOverdue && task.status !== "completed" && "border-red-200 dark:border-red-800",
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4 space-y-3">
        {/* Task Title */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
          )}
        </div>

        {/* Priority & Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={cn("text-xs px-2 py-0.5", priorityConfig[task.priority].color)}
          >
            {t(`priority.${task.priority}`)}
          </Badge>

          {task.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
              <IconTag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        {/* Project Info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="truncate font-medium">{task.projectName}</span>
        </div>

        {/* Bottom Info */}
        <div className="flex items-center justify-between text-xs">
          {/* Assignee */}
          <div className="flex items-center gap-1.5">
            <IconUser className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground truncate">
              {task.assignee || t("card.unassigned")}
            </span>
          </div>

          {/* Due Date */}
          {task.dueDate && (
            <div
              className={cn(
                "flex items-center gap-1.5",
                isOverdue && task.status !== "completed"
                  ? "text-red-600 dark:text-red-400"
                  : "text-muted-foreground",
              )}
            >
              {isOverdue && task.status !== "completed" && (
                <IconAlertTriangle className="h-3.5 w-3.5" />
              )}
              <IconClock className="h-3.5 w-3.5" />
              <span className="font-medium">
                {format(new Date(task.dueDate), "MMM dd", {
                  locale: currentLanguage === "tr" ? undefined : undefined, // date-fns locale burada eklenecek
                })}
                {isOverdue && task.status !== "completed" && (
                  <span className="ml-1">{t("card.overdue")}</span>
                )}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusColumn({
  status,
  tasks,
  onTaskSelect,
}: {
  status: keyof typeof statusConfig;
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
}) {
  const { t } = useTasksTranslation();
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn("flex flex-col h-full rounded-lg border", config.borderColor, config.bgColor)}
    >
      {/* Column Header */}
      <div className="p-4 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-4 w-4", config.color)} />
            <h2 className="font-semibold text-sm">{t(`board.${status}.label`)}</h2>
          </div>
          <Badge variant="secondary" className="px-2 py-1 text-xs">
            {tasks.length}
          </Badge>
        </div>
      </div>

      {/* Tasks List */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Icon className={cn("h-8 w-8 mb-2", config.color, "opacity-50")} />
              <p className="text-sm text-muted-foreground">{t(`board.${status}.empty`)}</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onSelect={() => onTaskSelect(task)} />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export function TaskBoard({ tasksByStatus, onTaskSelect }: TaskBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 h-full">
      {Object.entries(tasksByStatus).map(([status, tasks]) => (
        <StatusColumn
          key={status}
          status={status as keyof typeof statusConfig}
          tasks={tasks}
          onTaskSelect={onTaskSelect}
        />
      ))}
    </div>
  );
}
