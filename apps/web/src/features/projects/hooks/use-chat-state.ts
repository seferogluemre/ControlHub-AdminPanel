import { useState } from "react";
import generateChatUsers from "../../../utils/mock-generators/chat-generator";
import { type ChatUser } from "../data/chat-types";

// Project types for the new project management context
export interface Project {
  id: string;
  name: string;
  description?: string;
  status: "active" | "completed" | "on-hold" | "planning";
  priority: "low" | "medium" | "high" | "urgent";
  progress: number;
  tasks?: Task[];
  team?: TeamMember[];
  deadline?: Date;
  createdAt: Date;
  pinned?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  assignee?: string;
  dueDate?: Date;
  projectId: string;
  projectName: string;
  createdAt: Date;
  tags?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

// Legacy chat state for backward compatibility
export function useChatState() {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [mobileSelectedUser, setMobileSelectedUser] = useState<ChatUser | null>(null);
  const [createConversationDialogOpened, setCreateConversationDialog] = useState(false);

  // Generate conversations with useMemo to maintain state
  const [conversations, setConversations] = useState<ChatUser[]>(() => {
    const { conversations: generatedConversations } = generateChatUsers(25);
    return generatedConversations;
  });

  const handleUserSelect = (user: ChatUser) => {
    setSelectedUser(user);
    setMobileSelectedUser(user);
  };

  const handleBackClick = () => {
    setMobileSelectedUser(null);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
    setMobileSelectedUser(null);
  };

  const handleTogglePin = (userId: string) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) =>
        conversation.id === userId
          ? { ...conversation, pinned: !conversation.pinned }
          : conversation,
      ),
    );
  };

  const openNewChatDialog = () => setCreateConversationDialog(true);
  const closeNewChatDialog = () => setCreateConversationDialog(false);

  return {
    conversations,
    selectedUser,
    mobileSelectedUser,
    createConversationDialogOpened,

    handleUserSelect,
    handleBackClick,
    handleCloseChat,
    handleTogglePin,
    openNewChatDialog,
    closeNewChatDialog,

    setSelectedUser,
    setMobileSelectedUser,
    setCreateConversationDialog,
  };
}

// New project state for project management
export function useProjectState() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileSelectedProject, setMobileSelectedProject] = useState<Project | null>(null);
  const [createProjectDialogOpened, setCreateProjectDialog] = useState(false);

  // Generate mock projects
  const [projects, setProjects] = useState<Project[]>(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: `project-${i + 1}`,
      name:
        [
          "E-commerce Platform Redesign",
          "Mobile App Development",
          "Data Analytics Dashboard",
          "API Integration Project",
          "User Experience Optimization",
          "Cloud Migration Initiative",
          "Security Audit & Compliance",
          "Marketing Website Refresh",
        ][i] || `Project ${i + 1}`,
      description: `Description for project ${i + 1}`,
      status: ["active", "completed", "on-hold", "planning"][i % 4] as Project["status"],
      priority: ["low", "medium", "high", "urgent"][i % 4] as Project["priority"],
      progress: Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      pinned: i < 2,
      tasks: Array.from({ length: Math.floor(Math.random() * 8) + 2 }, (_, j) => {
        const projectName =
          [
            "E-commerce Platform Redesign",
            "Mobile App Development",
            "Data Analytics Dashboard",
            "API Integration Project",
            "User Experience Optimization",
            "Cloud Migration Initiative",
            "Security Audit & Compliance",
            "Marketing Website Refresh",
          ][i] || `Project ${i + 1}`;

        const taskTitles = [
          "Design user interface mockups",
          "Implement authentication system",
          "Setup database structure",
          "Create API endpoints",
          "Write unit tests",
          "Deploy to production",
          "Fix responsive design issues",
          "Optimize performance",
          "Update documentation",
          "Review code quality",
        ];

        return {
          id: `task-${i}-${j}`,
          title: taskTitles[j % taskTitles.length],
          description: `Detailed description for ${taskTitles[j % taskTitles.length].toLowerCase()}`,
          status: ["todo", "in-progress", "review", "completed"][j % 4] as Task["status"],
          priority: ["low", "medium", "high", "urgent"][j % 4] as Task["priority"],
          assignee: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"][j % 4],
          dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
          projectId: `project-${i + 1}`,
          projectName,
          createdAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000),
          tags: [["frontend", "ui"], ["backend", "auth"], ["database"], ["api"], ["testing"]][
            j % 5
          ],
        };
      }),
      team: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, k) => ({
        id: `member-${i}-${k}`,
        name: [
          "John Doe",
          "Jane Smith",
          "Mike Johnson",
          "Sarah Wilson",
          "Alex Brown",
          "Emily Davis",
        ][k % 6],
        role: ["Developer", "Designer", "PM", "QA", "DevOps"][k % 5],
      })),
    }));
  });

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setMobileSelectedProject(project);
  };

  const handleBackClick = () => {
    setMobileSelectedProject(null);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
    setMobileSelectedProject(null);
  };

  const handleTogglePin = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, pinned: !project.pinned } : project,
      ),
    );
  };

  const openNewProjectDialog = () => setCreateProjectDialog(true);

  return {
    projects,
    selectedProject,
    mobileSelectedProject,
    createProjectDialogOpened,

    handleProjectSelect,
    handleBackClick,
    handleCloseProject,
    handleTogglePin,
    openNewProjectDialog,
    setCreateProjectDialog,
  };
}

// New task state for task management
export function useTaskState() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [createTaskDialogOpened, setCreateTaskDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | "all">("all");

  // Get projects to extract all tasks
  const { projects } = useProjectState();

  // Flatten all tasks from all projects
  const allTasks = projects.flatMap((project) => project.tasks || []);

  // Filter tasks based on selected project
  const filteredTasks =
    selectedProject === "all"
      ? allTasks
      : allTasks.filter((task) => task.projectId === selectedProject);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
  };

  const openNewTaskDialog = () => setCreateTaskDialog(true);

  const handleProjectFilter = (projectId: string | "all") => {
    setSelectedProject(projectId);
  };

  // Group tasks by status for Kanban view
  const tasksByStatus = {
    todo: filteredTasks.filter((task) => task.status === "todo"),
    "in-progress": filteredTasks.filter((task) => task.status === "in-progress"),
    review: filteredTasks.filter((task) => task.status === "review"),
    completed: filteredTasks.filter((task) => task.status === "completed"),
  };

  return {
    allTasks: filteredTasks,
    tasksByStatus,
    selectedTask,
    createTaskDialogOpened,
    selectedProject,
    projects,

    handleTaskSelect,
    handleCloseTask,
    openNewTaskDialog,
    handleProjectFilter,
    setCreateTaskDialog,
  };
}
