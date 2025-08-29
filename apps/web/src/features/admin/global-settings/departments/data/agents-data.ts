import globalData from "../../global-settings.json";

export interface Agent {
  id: string;
  name: string;
  email: string;
}

// Export agents directly from global JSON for departments usage
export const agentsData: Agent[] = globalData.agents.map((agent) => ({
  id: agent.id,
  name: agent.name,
  email: agent.email,
}));
