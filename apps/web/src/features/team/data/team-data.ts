import { Team, TeamMember, TeamStats } from "../types/team";

export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@company.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "Frontend Developer",
    department: "Engineering",
    joinDate: "2023-01-15",
    status: "active",
    skills: ["React", "TypeScript", "CSS", "Next.js"],
    lastActivity: "2024-01-10T14:30:00Z",
    projectsCount: 8,
    tasksCompleted: 45
  },
  {
    id: "2", 
    name: "Zeynep Kaya",
    email: "zeynep.kaya@company.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: "UI/UX Designer",
    department: "Design",
    joinDate: "2023-03-20",
    status: "active",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
    lastActivity: "2024-01-10T16:15:00Z",
    projectsCount: 12,
    tasksCompleted: 38
  },
  {
    id: "3",
    name: "Mehmet Özkan",
    email: "mehmet.ozkan@company.com", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "Backend Developer",
    department: "Engineering",
    joinDate: "2022-11-08",
    status: "active",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
    lastActivity: "2024-01-10T13:45:00Z",
    projectsCount: 15,
    tasksCompleted: 67
  },
  {
    id: "4",
    name: "Elif Demir",
    email: "elif.demir@company.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", 
    role: "Product Manager",
    department: "Product",
    joinDate: "2023-05-12",
    status: "active",
    skills: ["Product Strategy", "Agile", "Analytics", "User Research"],
    lastActivity: "2024-01-10T17:20:00Z",
    projectsCount: 6,
    tasksCompleted: 29
  },
  {
    id: "5",
    name: "Can Arslan",
    email: "can.arslan@company.com",
    role: "DevOps Engineer", 
    department: "Engineering",
    joinDate: "2023-08-03",
    status: "pending",
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    lastActivity: "2024-01-09T11:30:00Z",
    projectsCount: 3,
    tasksCompleted: 18
  },
  {
    id: "6",
    name: "Selin Yurt",
    email: "selin.yurt@company.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "QA Engineer",
    department: "Quality Assurance", 
    joinDate: "2023-02-28",
    status: "active",
    skills: ["Test Automation", "Selenium", "JIRA", "Manual Testing"],
    lastActivity: "2024-01-10T12:00:00Z",
    projectsCount: 10,
    tasksCompleted: 52
  }
];

export const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Frontend Ekibi",
    description: "Kullanıcı arayüzü ve deneyimi geliştiren ekip",
    members: [mockTeamMembers[0], mockTeamMembers[1]], // Ahmet + Zeynep
    leaderId: "1",
    createdAt: "2023-01-01",
    projectsCount: 8,
    status: "active",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&h=150&fit=crop"
  },
  {
    id: "team-2", 
    name: "Backend Ekibi",
    description: "Sunucu tarafı geliştirme ve API tasarımı",
    members: [mockTeamMembers[2], mockTeamMembers[4]], // Mehmet + Can
    leaderId: "3",
    createdAt: "2022-12-15",
    projectsCount: 12,
    status: "active",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop"
  },
  {
    id: "team-3",
    name: "Ürün Ekibi", 
    description: "Ürün stratejisi ve kullanıcı deneyimi",
    members: [mockTeamMembers[3], mockTeamMembers[1]], // Elif + Zeynep
    leaderId: "4",
    createdAt: "2023-03-01",
    projectsCount: 6,
    status: "active",
    department: "Product",
    avatar: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=150&h=150&fit=crop"
  },
  {
    id: "team-4",
    name: "Kalite Güvence",
    description: "Test ve kalite kontrol süreçleri",
    members: [mockTeamMembers[5]], // Selin
    leaderId: "6", 
    createdAt: "2023-02-20",
    projectsCount: 4,
    status: "active",
    department: "Quality Assurance",
    avatar: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=150&h=150&fit=crop"
  }
];

export const mockTeamStats: TeamStats = {
  totalMembers: mockTeamMembers.length,
  activeMembers: mockTeamMembers.filter(member => member.status === 'active').length,
  totalTeams: mockTeams.length,
  completedProjects: mockTeams.reduce((acc, team) => acc + team.projectsCount, 0),
  activeTasks: 127,
  averageProductivity: 87.5
};

export const departments = [
  "Tümü",
  "Engineering", 
  "Design",
  "Product",
  "Quality Assurance",
  "Marketing",
  "Sales"
];

export const roles = [
  "Tümü",
  "Frontend Developer",
  "Backend Developer", 
  "UI/UX Designer",
  "Product Manager",
  "DevOps Engineer",
  "QA Engineer",
  "Team Lead",
  "Senior Developer"
];
