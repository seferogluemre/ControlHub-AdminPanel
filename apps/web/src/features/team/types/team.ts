export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'pending';
  skills: string[];
  lastActivity?: string;
  projectsCount: number;
  tasksCompleted: number;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  leaderId: string;
  createdAt: string;
  projectsCount: number;
  status: 'active' | 'inactive';
  department: string;
  avatar?: string;
}

export interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  totalTeams: number;
  completedProjects: number;
  activeTasks: number;
  averageProductivity: number;
}

export interface TeamFilters {
  search: string;
  department: string;
  status: 'all' | 'active' | 'inactive';
  role: string;
}

export type TeamView = 'grid' | 'list' | 'table';
