import {
  IconArrowLeft,
  IconDotsVertical,
  IconUsers,
  IconCalendar,
  IconTarget,
  IconChecklist,
} from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Progress } from "#/components/ui/progress";
import { ScrollArea } from "#/components/ui/scroll-area";
import { Textarea } from "#/components/ui/textarea";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { cn } from "#/lib/utils";
import { type Project } from "../hooks";

interface ProjectAreaProps {
  selectedProject: Project;
  onAddComment: (comment: string) => void;
  onBackClick: () => void;
  showBackButton?: boolean;
  onCloseProject: () => void;
  onScrollToDate?: (scrollFn: (date: string) => void) => void;
}

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

const getTaskStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "in-progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "todo":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export function ProjectArea({
  selectedProject,
  onAddComment,
  onBackClick,
  showBackButton = false,
  onCloseProject,
}: ProjectAreaProps) {
  const [comment, setComment] = useState("");

  const handleSubmitComment = () => {
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  const completedTasks =
    selectedProject.tasks?.filter((task) => task.status === "completed").length || 0;
  const totalTasks = selectedProject.tasks?.length || 0;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button variant="ghost" size="sm" onClick={onBackClick} className="md:hidden">
              <IconArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-lg">{selectedProject.name}</h1>
            <div className="flex items-center gap-2">
              <Badge className={cn("text-xs", getStatusColor(selectedProject.status))}>
                {selectedProject.status}
              </Badge>
              <Badge className={cn("text-xs", getPriorityColor(selectedProject.priority))}>
                {selectedProject.priority} priority
              </Badge>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Project</DropdownMenuItem>
            <DropdownMenuItem>Project Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={onCloseProject} className="text-destructive">
              Archive Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <div className="px-4 pt-2">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="h-full p-4 space-y-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <IconTarget className="h-4 w-4" />
                          Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Progress value={selectedProject.progress} className="h-2" />
                          <p className="text-2xl font-bold">{selectedProject.progress}%</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <IconChecklist className="h-4 w-4" />
                          Tasks
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-2xl font-bold">
                            {completedTasks}/{totalTasks}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {taskCompletionRate}% completed
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Description */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {selectedProject.description ||
                          "No description available for this project."}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">John Doe updated task "API Integration"</p>
                          <p className="text-xs text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">JS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">Jane Smith completed "UI Design Review"</p>
                          <p className="text-xs text-muted-foreground">5 hours ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tasks" className="h-full p-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-3">
                  {selectedProject.tasks?.map((task) => (
                    <Card key={task.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <div className="flex items-center gap-2">
                              <Badge className={cn("text-xs", getTaskStatusColor(task.status))}>
                                {task.status}
                              </Badge>
                              {task.assignee && (
                                <span className="text-xs text-muted-foreground">
                                  Assigned to {task.assignee}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )) || (
                    <div className="text-center text-muted-foreground py-8">
                      No tasks available for this project.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="team" className="h-full p-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-3">
                  {selectedProject.team?.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{member.name}</h4>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )) || (
                    <div className="text-center text-muted-foreground py-8">
                      No team members assigned to this project.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="activity" className="h-full p-4 m-0">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Project Timeline</CardTitle>
                      <CardDescription>Recent project updates and milestones</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center text-muted-foreground py-8">
                        <IconCalendar className="h-8 w-8 mx-auto mb-2" />
                        <p>Project timeline coming soon...</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Comment Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <Button onClick={handleSubmitComment} disabled={!comment.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
