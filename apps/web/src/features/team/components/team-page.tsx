import { useState, useMemo } from "react";
import { Main } from "#/components/layout/main";
import { Button } from "#/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Plus, Users as UsersIcon, Building2 } from "lucide-react";
import { ConfirmDialog } from "#/components/confirm-dialog";

import { TeamMemberCard } from "./team-member-card";
import { TeamCard } from "./team-card";
import { TeamStats } from "./team-stats";
import { TeamFiltersComponent } from "./team-filters";
import { CreateTeamDialog } from "./dialogs/create-team-dialog";
import { AddMemberDialog } from "./dialogs/add-member-dialog";
import { MemberProfileDialog } from "./dialogs/member-profile-dialog";
import { TeamDetailDialog } from "./dialogs/team-detail-dialog";
import { TeamManagementDialog } from "./dialogs/team-management-dialog";

import { mockTeamMembers, mockTeams, mockTeamStats } from "../data/team-data";
import { TeamFilters, TeamView, TeamMember, Team } from "../types/team";
import { useTeamTranslation } from "#/lib/i18n/hooks";

export function TeamPage() {
  const { t } = useTeamTranslation();

  const [filters, setFilters] = useState<TeamFilters>({
    search: "",
    department: "Tümü",
    status: "all",
    role: "Tümü",
  });

  const [view, setView] = useState<TeamView>("grid");
  const [activeTab, setActiveTab] = useState("overview");
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [memberProfileOpen, setMemberProfileOpen] = useState(false);
  
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  const [removeConfirmOpen, setRemoveConfirmOpen] = useState(false);
  
  // Team action states
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamDetailOpen, setTeamDetailOpen] = useState(false);
  const [teamManagementOpen, setTeamManagementOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (
          !member.name.toLowerCase().includes(searchTerm) &&
          !member.email.toLowerCase().includes(searchTerm) &&
          !member.role.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      if (filters.department !== "Tümü" && member.department !== filters.department) {
        return false;
      }

      if (filters.status !== "all" && member.status !== filters.status) {
        return false;
      }

      if (filters.role !== "Tümü" && member.role !== filters.role) {
        return false;
      }

      return true;
    });
  }, [filters, members]);

  // Filter teams based on current filters
  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (
          !team.name.toLowerCase().includes(searchTerm) &&
          !team.description.toLowerCase().includes(searchTerm) &&
          !team.department.toLowerCase().includes(searchTerm)
        ) {
          return false;
        }
      }

      // Department filter
      if (filters.department !== "Tümü" && team.department !== filters.department) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && team.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [filters, teams]);

  const clearFilters = () => {
    setFilters({
      search: "",
      department: "Tümü",
      status: "all",
      role: "Tümü",
    });
  };

  // Callback functions for dialogs
  const handleTeamCreated = (newTeam: Team) => {
    setTeams(prev => [...prev, newTeam]);
  };

  const handleMemberAdded = (newMember: TeamMember) => {
    setMembers(prev => [...prev, newMember]);
  };

  const handleRemoveMember = () => {
    if (memberToRemove) {
      setMembers(prev => prev.filter(member => member.id !== memberToRemove.id));
      setMemberToRemove(null);
      setRemoveConfirmOpen(false);
    }
  };

  const handleTeamUpdated = (updatedTeam: Team) => {
    setTeams(prev => prev.map(team => team.id === updatedTeam.id ? updatedTeam : team));
  };

  const handleMemberAction = (action: string, memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    switch (action) {
      case "viewProfile":
        setSelectedMember(member);
        setMemberProfileOpen(true);
        break;
      case "sendMessage":
        // TODO: Implement message functionality
        console.log("Send message to:", member.name);
        break;
      case "removeFromTeam":
        setMemberToRemove(member);
        setRemoveConfirmOpen(true);
        break;
      default:
        console.log(`Unknown action: ${action} for member:`, memberId);
    }
  };

  const handleTeamAction = (action: string, teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    if (!team) return;

    switch (action) {
      case "viewTeam":
        setSelectedTeam(team);
        setTeamDetailOpen(true);
        break;
      case "manageTeam":
        setSelectedTeam(team);
        setTeamManagementOpen(true);
        break;
      case "addMember":
        // Open add member dialog for specific team
        setAddMemberOpen(true);
        // TODO: Could pass teamId to dialog to pre-select team
        console.log("Add member to team:", team.name);
        break;
      default:
        console.log(`Unknown action: ${action} for team:`, teamId);
    }
  };

  const renderMembersView = () => {
    if (view === "grid") {
      return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onViewProfile={(id) => handleMemberAction("viewProfile", id)}
              onSendMessage={(id) => handleMemberAction("sendMessage", id)}
              onRemoveFromTeam={(id) => handleMemberAction("removeFromTeam", id)}
            />
          ))}
        </div>
      );
    }

    // For list and table views, you can implement different layouts
    return (
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{member.department}</div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderTeamsView = () => {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onViewTeam={(id) => handleTeamAction("viewTeam", id)}
            onManageTeam={(id) => handleTeamAction("manageTeam", id)}
            onAddMember={(id) => handleTeamAction("addMember", id)}
          />
        ))}
      </div>
    );
  };

  return (
    <Main>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setCreateTeamOpen(true)}>
              <Building2 className="mr-2 h-4 w-4" />
              {t("buttons.createTeam")}
            </Button>
            <Button onClick={() => setAddMemberOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t("buttons.addMember")}
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <TeamStats stats={mockTeamStats} />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
            <TabsTrigger value="members">
              <UsersIcon className="mr-2 h-4 w-4" />
              {t("tabs.members")} ({filteredMembers.length})
            </TabsTrigger>
            <TabsTrigger value="teams">
              <Building2 className="mr-2 h-4 w-4" />
              {t("tabs.teams")} ({filteredTeams.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Members */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("sections.recentMembers")}</CardTitle>
                  <CardDescription>{t("sections.recentMembersDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {members.slice(0, 3).map((member) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(member.joinDate).toLocaleDateString("tr-TR")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Teams */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("sections.activeTeams")}</CardTitle>
                  <CardDescription>{t("sections.activeTeamsDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teams
                      .filter((team) => team.status === "active")
                      .slice(0, 3)
                      .map((team) => (
                        <div key={team.id} className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            {team.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{team.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {team.members.length} {t("labels.members")}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {team.projectsCount} {t("labels.projects")}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <TeamFiltersComponent
              filters={filters}
              view={view}
              onFiltersChange={setFilters}
              onViewChange={setView}
              onClearFilters={clearFilters}
            />

            {filteredMembers.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t("emptyStates.noMembers")}</h3>
                  <p className="text-muted-foreground mb-4">{t("emptyStates.noMembersDesc")}</p>
                  <Button variant="outline" onClick={clearFilters}>
                    {t("buttons.clearFilters")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              renderMembersView()
            )}
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <TeamFiltersComponent
              filters={filters}
              view={view}
              onFiltersChange={setFilters}
              onViewChange={setView}
              onClearFilters={clearFilters}
            />

            {filteredTeams.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t("emptyStates.noTeams")}</h3>
                  <p className="text-muted-foreground mb-4">{t("emptyStates.noTeamsDesc")}</p>
                  <Button variant="outline" onClick={clearFilters}>
                    {t("buttons.clearFilters")}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              renderTeamsView()
            )}
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <CreateTeamDialog
          open={createTeamOpen}
          onOpenChange={setCreateTeamOpen}
          onTeamCreated={handleTeamCreated}
        />
        
        <AddMemberDialog
          open={addMemberOpen}
          onOpenChange={setAddMemberOpen}
          onMemberAdded={handleMemberAdded}
        />
        
        <MemberProfileDialog
          open={memberProfileOpen}
          onOpenChange={setMemberProfileOpen}
          member={selectedMember}
          onSendMessage={(memberId) => handleMemberAction("sendMessage", memberId)}
        />
        
        <ConfirmDialog
          open={removeConfirmOpen}
          onOpenChange={setRemoveConfirmOpen}
          title="Üyeyi Takımdan Çıkar"
          desc={
            memberToRemove 
              ? `${memberToRemove.name} üyesini takımdan çıkarmak istediğinizden emin misiniz? Bu işlem geri alınamaz.`
              : ""
          }
          confirmText="Çıkar"
          cancelBtnText="İptal"
          handleConfirm={handleRemoveMember}
          destructive={true}
        />
        
        <TeamDetailDialog
          open={teamDetailOpen}
          onOpenChange={setTeamDetailOpen}
          team={selectedTeam}
          onManageTeam={(teamId) => {
            setTeamDetailOpen(false);
            handleTeamAction("manageTeam", teamId);
          }}
          onAddMember={(teamId) => handleTeamAction("addMember", teamId)}
        />
        
        <TeamManagementDialog
          open={teamManagementOpen}
          onOpenChange={setTeamManagementOpen}
          team={selectedTeam}
          availableMembers={members}
          onTeamUpdated={handleTeamUpdated}
        />
      </div>
    </Main>   
  );
}