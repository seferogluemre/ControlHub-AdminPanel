import globalData from "../../global-settings.json";

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  memberIds?: string[];
  isActive: boolean;
  createdAt: string;
  members: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

// Get members from memberIds
function getRoleMembers(memberIds: string[] = []) {
  return memberIds
    .map((memberId) => {
      const agent = globalData.agents.find((a) => a.id === memberId);
      return {
        id: memberId,
        name: agent?.name || "Unknown Agent",
        avatar: agent?.profileImage,
      };
    })
    .filter((member) => member.name !== "Unknown Agent");
}

// Export roles with calculated members
export const rolesData: Role[] = globalData.roles.map((role) => ({
  ...role,
  memberIds: role.memberIds || [],
  members: getRoleMembers(role.memberIds || []),
}));
