import globalData from "../../global-settings.json";

export interface Agent {
  id: string;
  name: string;
  email: string;
  bio?: string;
  departments: string[]; // Department names for UI
  roleIds?: string[]; // Role IDs
  isAdministrator: boolean;
  lastLogin: string;
  isActive: boolean;
  profileImage?: string;
}

// Simple function to get department name by ID
function getDepartmentName(id: string): string {
  const dept = globalData.departments.find((d) => d.id === id);
  return dept?.name || "Unknown Department";
}

// Transform agents to have department names instead of IDs
export const agentsData: Agent[] = globalData.agents.map((agent) => ({
  ...agent,
  departments: agent.departments.map((deptId) => getDepartmentName(deptId)),
}));
