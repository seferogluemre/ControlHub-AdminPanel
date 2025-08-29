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
  status: "todo" | "in-progress" | "completed";
  assignee?: string;
  dueDate?: Date;
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
      tasks: Array.from({ length: Math.floor(Math.random() * 8) + 2 }, (_, j) => ({
        id: `task-${i}-${j}`,
        title: `Task ${j + 1} for ${
          [
            "E-commerce Platform Redesign",
            "Mobile App Development",
            "Data Analytics Dashboard",
            "API Integration Project",
            "User Experience Optimization",
            "Cloud Migration Initiative",
            "Security Audit & Compliance",
            "Marketing Website Refresh",
          ][i] || `Project ${i + 1}`
        }`,
        status: ["todo", "in-progress", "completed"][j % 3] as Task["status"],
        assignee: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"][j % 4],
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000),
      })),
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
