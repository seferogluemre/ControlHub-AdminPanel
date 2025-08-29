import { IconChevronDown, IconChevronRight, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "#/components/ui/collapsible";
import { Input } from "#/components/ui/input";
import { Agent, agentGroups } from "../data/agents";

interface AgentListProps {
  agents: Agent[];
  selectedAgent?: Agent;
  selectedGroup?: string;
  onSelectAgent: (agent: Agent) => void;
  onSelectGroup: (group: string) => void;
  openGroups: Record<string, boolean>;
  onToggleGroup: (group: string) => void;
}

export function AgentList({
  agents,
  selectedAgent,
  selectedGroup,
  onSelectAgent,
  onSelectGroup,
  openGroups,
  onToggleGroup,
}: AgentListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getGroupStats = (group: string) => {
    let groupAgents;
    if (group === "Müsait") {
      groupAgents = agents;
    } else {
      groupAgents = agents.filter((agent) => agent.group === group);
    }

    const online = groupAgents.filter((agent) => agent.status === "online").length;
    const away = groupAgents.filter((agent) => agent.status === "away").length;

    return { online, away };
  };

  const getGroupAgents = (group: string) => {
    if (group === "Müsait") {
      return agents;
    }
    return agents.filter((agent) => agent.group === group);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="p-4 border-b border-border/50 flex-shrink-0 bg-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Temsilciler</h2>
        </div>
        <div className="relative">
          <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Temsilci ara..."
            className="pl-8 bg-background text-foreground border-border focus-visible:ring-offset-0 focus-visible:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {agentGroups.map((group) => {
          let currentGroupAgents = getGroupAgents(group);

          if (searchQuery) {
            currentGroupAgents = currentGroupAgents.filter((agent) =>
              agent.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
          }

          if (searchQuery && currentGroupAgents.length === 0) {
            return null; // Don't render group if no matching agents in search mode
          }

          const { online, away } = getGroupStats(group);
          const agents = currentGroupAgents;
          const isOpen = openGroups[group];

          return (
            <Collapsible
              key={group}
              open={isOpen}
              onOpenChange={() => onToggleGroup(group)}
              className="bg-card"
            >
              <CollapsibleTrigger
                className={`flex items-center justify-between w-full p-3 ${
                  selectedGroup === group ? "bg-accent" : "hover:bg-accent/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectGroup(group);
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full bg-accent/20">
                    {isOpen ? (
                      <IconChevronDown className="h-3 w-3 text-primary" />
                    ) : (
                      <IconChevronRight className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                  <span
                    className={`font-semibold text-xs ${
                      selectedGroup === group ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {group}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-green-600 font-medium">Aktif {online}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span className="text-orange-600 font-medium">Uzakta {away}</span>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden">
                <div className="px-2 pb-2 space-y-1">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      onClick={() => onSelectAgent(agent)}
                      className={`flex items-center gap-2 p-2 cursor-pointer border-transparent ${
                        selectedAgent?.id === agent.id
                          ? "bg-blue-100/50 border-transparent"
                          : "bg-transparent border-transparent hover:bg-muted"
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8 ring-1 ring-offset-1 ring-offset-card">
                          <AvatarImage src={agent.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-xs">
                            {agent.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${
                            agent.status === "online" ? "bg-green-500" : "bg-orange-500"
                          }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold truncate text-foreground">
                            {agent.name}
                          </span>
                          {agent.status === "online" ? (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-700 border-green-200"
                            >
                              {agent.chatCount} {agent.chatCount === 1 ? "sohbet" : "sohbetler"}
                            </Badge>
                          ) : (
                            <span className="text-xs text-orange-600 bg-orange-50 px-1 py-0.5 rounded-full border border-orange-200">
                              Uzakta: {agent.awayTime}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
