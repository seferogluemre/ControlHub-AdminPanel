import globalData from "../../global-settings.json";

export interface Department {
  id: string;
  name: string;
  description: string;
  members: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  }[];
}

// Transform departments to include member details
export const departmentsData: Department[] = globalData.departments.map((dept) => ({
  id: dept.id,
  name: dept.name,
  description: dept.description,
  members: dept.memberIds.map((memberId) => {
    const agent = globalData.agents.find((a) => a.id === memberId);
    return {
      id: memberId,
      name: agent?.name || "Unknown Agent",
      email: agent?.email || "unknown@example.com",
      avatar: agent?.profileImage,
    };
  }),
}));
