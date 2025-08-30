// Main team page component
export { TeamPage } from "./components/team-page";

// Individual components
export { TeamMemberCard } from "./components/team-member-card";
export { TeamCard } from "./components/team-card";
export { TeamStats } from "./components/team-stats";
export { TeamFiltersComponent } from "./components/team-filters";

export type { 
  Team, 
  TeamMember, 
  TeamStats as TeamStatsType, 
  TeamFilters, 
  TeamView 
} from "./types/team";

export { 
  mockTeamMembers, 
  mockTeams, 
  mockTeamStats, 
  departments, 
  roles 
} from "./data/team-data";

export { TeamPage as default } from "./components/team-page";
