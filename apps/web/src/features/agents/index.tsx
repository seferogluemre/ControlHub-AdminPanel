import { useMemo, useState } from "react";
// Mock Data - Using Faker.js generator
import generateAgents from "../../utils/mock-generators/agent-generator";
import { AgentDetails } from "./components/agent-details";
import { AgentList } from "./components/agent-list";
import { Agent } from "./data/agents";

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | undefined>(undefined);
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Müsait: true,
    Finansal: false,
    Promosyonlar: false,
    Deneme: false,
    Diğer: false,
  });

  const mockAgents = useMemo(() => generateAgents(), []);

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setSelectedGroup(undefined); // Clear group selection when agent is selected
  };

  const handleSelectGroup = (group: string) => {
    setSelectedGroup(group);
    setSelectedAgent(undefined); // Clear agent selection when group is selected
  };

  const handleToggleGroup = (group: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  return (
    <div className="flex h-[calc(100vh-90px)] p-4 gap-3">
      {/* Left Side - Agent List */}
      <div className="w-64 min-w-[274px] max-w-[256px] bg-card flex flex-col overflow-hidden h-full rounded-xl shadow-md border">
        <AgentList
          agents={mockAgents}
          selectedAgent={selectedAgent}
          selectedGroup={selectedGroup}
          onSelectAgent={handleSelectAgent}
          onSelectGroup={handleSelectGroup}
          openGroups={openGroups}
          onToggleGroup={handleToggleGroup}
        />
      </div>

      {/* Right Side - Agent Details */}
      {selectedAgent || selectedGroup ? (
        <div className="flex-1 flex h-full min-h-0 overflow-hidden rounded-xl shadow-md">
          <AgentDetails
            agents={mockAgents}
            selectedGroup={selectedGroup}
            selectedAgent={selectedAgent}
          />
        </div>
      ) : (
        <div
          className="flex-1 flex flex-col items-center justify-center h-full rounded-xl shadow-md border"
          style={{
            background: "color-mix(in oklab, var(--muted) 15%, transparent)",
          }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <div className="w-8 h-8 bg-primary rounded-lg opacity-50"></div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Grup veya Temsilci Seçiniz</h2>
              <p className="text-muted-foreground">
                Sohbete görüntülemek için grup veya temsilci seçiniz
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
