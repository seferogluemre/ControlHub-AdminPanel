import { 
  IconX,
  IconCalendar,
  IconUser,
  IconFlag,
  IconTag,
  IconAlertTriangle,
  IconClock,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Separator } from "#/components/ui/separator";
import { cn } from "#/lib/utils";
import { type Task, type Project } from "../../projects/hooks";
import { format } from "date-fns";

interface TaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: Project[];
}

const statusConfig = {
  todo: { label: "To Do", color: "text-slate-500 bg-slate-100 dark:bg-slate-800" },
  "in-progress": { label: "In Progress", color: "text-blue-500 bg-blue-100 dark:bg-blue-800" },
  review: { label: "Review", color: "text-amber-500 bg-amber-100 dark:bg-amber-800" },
  completed: { label: "Completed", color: "text-green-500 bg-green-100 dark:bg-green-800" },
};

const priorityConfig = {
  low: { 
    label: "Low Priority", 
    color: "text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    icon: "🟢"
  },
  medium: { 
    label: "Medium Priority", 
    color: "text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
    icon: "🔵"
  },
  high: { 
    label: "High Priority", 
    color: "text-orange-600 bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800",
    icon: "🟠"
  },
  urgent: { 
    label: "Urgent", 
    color: "text-red-600 bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
    icon: "🔴"
  },
};

export function TaskDialog({ task, open, onOpenChange, projects }: TaskDialogProps) {
  if (!task) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add a new task to your project workflow.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-8 text-center text-muted-foreground">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <IconEdit className="h-8 w-8" />
            </div>
            <p>Task creation form will be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const project = projects.find(p => p.id === task.projectId);
  const statusInfo = statusConfig[task.status];
  const priorityInfo = priorityConfig[task.priority];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <DialogTitle className="text-xl leading-tight pr-8">
                {task.title}
              </DialogTitle>
              {task.description && (
                <DialogDescription className="text-base">
                  {task.description}
                </DialogDescription>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="shrink-0"
            >
              <IconX className="h-4 w-4" />
            </Button>
          </div>

          {/* Status & Priority Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge className={cn("px-3 py-1.5", statusInfo.color)}>
              {statusInfo.label}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn("px-3 py-1.5 border", priorityInfo.color)}
            >
              <span className="mr-1">{priorityInfo.icon}</span>
              {priorityInfo.label}
            </Badge>
          </div>
        </DialogHeader>

        <Separator />

        <div className="space-y-6">
          {/* Project Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Project Information
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{task.projectName}</span>
                {project && (
                  <Badge variant="outline">
                    {project.progress}% complete
                  </Badge>
                )}
              </div>
              {project && (
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              )}
            </div>
          </div>

          {/* Task Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Assignee */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <IconUser className="h-4 w-4 text-muted-foreground" />
                Assignee
              </h4>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm">
                  {task.assignee || "Unassigned"}
                </p>
              </div>
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <IconCalendar className="h-4 w-4 text-muted-foreground" />
                Due Date
              </h4>
              <div className={cn(
                "bg-muted/50 rounded-lg p-3 flex items-center gap-2",
                isOverdue && task.status !== "completed" && "bg-red-50 dark:bg-red-900/20"
              )}>
                {isOverdue && task.status !== "completed" && (
                  <IconAlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
                <p className={cn(
                  "text-sm",
                  isOverdue && task.status !== "completed" 
                    ? "text-red-600 dark:text-red-400 font-medium" 
                    : ""
                )}>
                  {task.dueDate 
                    ? format(new Date(task.dueDate), "PPP")
                    : "No due date set"
                  }
                  {isOverdue && task.status !== "completed" && (
                    <span className="ml-2 text-xs">(Overdue)</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <IconTag className="h-4 w-4 text-muted-foreground" />
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <IconClock className="h-4 w-4 text-muted-foreground" />
              Timeline
            </h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Created:</span>
                <span>{format(new Date(task.createdAt), "PPp")}</span>
              </div>
              {task.dueDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due:</span>
                  <span>{format(new Date(task.dueDate), "PPp")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <IconEdit className="h-4 w-4" />
              Edit Task
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
              <IconTrash className="h-4 w-4" />
              Delete
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Task ID: {task.id}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
