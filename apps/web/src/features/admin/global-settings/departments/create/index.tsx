import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import { Textarea } from "#/components/ui/textarea";

import { agentsData } from "../data/agents-data";
import { departmentsData } from "../data/departments-data";

export default function CreateDepartment() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<any[]>([]);
  const [unselectedAgents, setUnselectedAgents] = useState(agentsData);
  const [liveChatEnabled, setLiveChatEnabled] = useState(true);
  const [offlineMessageOption, setOfflineMessageOption] = useState("department");

  // Selection state for transfer
  const [selectedUnselectedAgents, setSelectedUnselectedAgents] = useState<string[]>([]);
  const [selectedSelectedAgents, setSelectedSelectedAgents] = useState<string[]>([]);

  // Agent selection functions
  const toggleUnselectedAgent = (agentId: string) => {
    if (selectedUnselectedAgents.includes(agentId)) {
      setSelectedUnselectedAgents(selectedUnselectedAgents.filter((id) => id !== agentId));
    } else {
      setSelectedUnselectedAgents([...selectedUnselectedAgents, agentId]);
    }
  };

  const toggleSelectedAgent = (agentId: string) => {
    if (selectedSelectedAgents.includes(agentId)) {
      setSelectedSelectedAgents(selectedSelectedAgents.filter((id) => id !== agentId));
    } else {
      setSelectedSelectedAgents([...selectedSelectedAgents, agentId]);
    }
  };

  // Agent transfer functions
  const moveSelectedToSelected = () => {
    const agentsToMove = unselectedAgents.filter((agent) =>
      selectedUnselectedAgents.includes(agent.id),
    );
    const newSelectedAgents = agentsToMove.map((agent) => ({
      id: agent.id,
      name: agent.name,
      email: agent.email,
    }));
    setSelectedAgents([...selectedAgents, ...newSelectedAgents]);
    setUnselectedAgents(
      unselectedAgents.filter((agent) => !selectedUnselectedAgents.includes(agent.id)),
    );
    setSelectedUnselectedAgents([]);
  };

  const moveSelectedToUnselected = () => {
    const agentsToMove = selectedAgents.filter((agent) =>
      selectedSelectedAgents.includes(agent.id || agent.name),
    );
    const newUnselectedAgents = agentsToMove.map((agent) => ({
      id: agent.id || agent.name,
      name: agent.name,
      email: agent.email || `${agent.name.toLowerCase().replace(" ", ".")}@example.com`,
    }));
    setUnselectedAgents([...unselectedAgents, ...newUnselectedAgents]);
    setSelectedAgents(
      selectedAgents.filter((agent) => !selectedSelectedAgents.includes(agent.id || agent.name)),
    );
    setSelectedSelectedAgents([]);
  };

  const moveAllToSelected = () => {
    const newSelectedAgents = unselectedAgents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      email: agent.email,
    }));
    setSelectedAgents([...selectedAgents, ...newSelectedAgents]);
    setUnselectedAgents([]);
    setSelectedUnselectedAgents([]);
  };

  const moveAllToUnselected = () => {
    const newUnselectedAgents = selectedAgents.map((agent) => ({
      id: agent.id || agent.name,
      name: agent.name,
      email: agent.email || `${agent.name.toLowerCase().replace(" ", ".")}@example.com`,
    }));
    setUnselectedAgents([...unselectedAgents, ...newUnselectedAgents]);
    setSelectedAgents([]);
    setSelectedSelectedAgents([]);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Departman adı zorunludur!");
      return;
    }

    // Yeni ID üret (mevcut max ID + 1)
    const maxId = Math.max(...departmentsData.map((d) => parseInt(d.id)), 0);
    const newId = (maxId + 1).toString();

    // Yeni departman objesi oluştur
    const newDepartment = {
      id: newId,
      name: name.trim(),
      description: description.trim(),
      members: selectedAgents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        email: agent.email,
      })),
    };

    // DepartmentsData'ya ekle
    departmentsData.push(newDepartment);

    // Yeni departman oluşturuldu
    navigate({ to: "/global-settings/departments" });
  };

  const handleCancel = () => {
    navigate({ to: "/global-settings/departments" });
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h1 className="text-2xl font-bold">New Department</h1>

      {/* Name and Description */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Department name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Department description"
            />
          </div>
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Unselected Agents */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Unselected Agents</Label>
              <div className="border rounded-md p-4 h-80 overflow-y-auto space-y-2 bg-gray-50/50 dark:bg-gray-900/50">
                {unselectedAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                      selectedUnselectedAgents.includes(agent.id)
                        ? "bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-300 dark:border-blue-600"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent"
                    }`}
                    onClick={() => toggleUnselectedAgent(agent.id)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {agent.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Buttons */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveAllToSelected}
                disabled={unselectedAgents.length === 0}
              >
                <span className="text-lg">»</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveSelectedToSelected}
                disabled={selectedUnselectedAgents.length === 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveSelectedToUnselected}
                disabled={selectedSelectedAgents.length === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveAllToUnselected}
                disabled={selectedAgents.length === 0}
              >
                <span className="text-lg">«</span>
              </Button>
            </div>

            {/* Selected Agents */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selected Agents</Label>
              <div className="border rounded-md p-4 h-80 overflow-y-auto space-y-2 bg-gray-50/50 dark:bg-gray-900/50">
                {selectedAgents.map((agent) => (
                  <div
                    key={agent.id || agent.name}
                    className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                      selectedSelectedAgents.includes(agent.id || agent.name)
                        ? "bg-green-100 dark:bg-green-900/50 border-2 border-green-300 dark:border-green-600"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent"
                    }`}
                    onClick={() => toggleSelectedAgent(agent.id || agent.name)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {agent.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {agent.email || `${agent.name.toLowerCase().replace(" ", ".")}@example.com`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available in */}
      <Card>
        <CardHeader>
          <CardTitle>Available in</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="live-chat"
              checked={liveChatEnabled}
              onCheckedChange={(checked) => setLiveChatEnabled(checked === true)}
            />
            <Label htmlFor="live-chat">Live Chat</Label>
          </div>
          {liveChatEnabled && (
            <div className="ml-6 space-y-2">
              <Label className="text-sm font-medium">Send offline messages to</Label>
              <RadioGroup value={offlineMessageOption} onValueChange={setOfflineMessageOption}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="department" id="department" />
                  <Label htmlFor="department">all agents in the department</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" />
                  <Label htmlFor="email">the email address(es)</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
          Save
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
