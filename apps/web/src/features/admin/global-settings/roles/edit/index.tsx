import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";
import globalData from "../../global-settings.json";
import { rolesData } from "../data/roles-data";

export default function EditRole() {
  const params = useParams({ strict: false });
  const id = (params as any)?.id || "1"; // Fallback to first role
  const navigate = useNavigate();

  // Rol bilgisini bul
  const role = rolesData.find((r) => r.id === id);

  // Form state
  const [name, setName] = useState(role?.name || "");
  const [description, setDescription] = useState(role?.description || "");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role?.permissions || []);
  const [isActive, setIsActive] = useState(role?.isActive ?? true);

  // Member selection state
  const [selectedMembers, setSelectedMembers] = useState<any[]>(
    (role?.memberIds || [])
      .map((memberId) => {
        const agent = globalData.agents.find((a) => a.id === memberId);
        return {
          id: memberId,
          name: agent?.name || "Unknown Agent",
          email: agent?.email || "unknown@example.com",
        };
      })
      .filter((member) => member.name !== "Unknown Agent"),
  );

  const [unselectedMembers, setUnselectedMembers] = useState(
    globalData.agents
      .filter((agent) => !(role?.memberIds || []).includes(agent.id))
      .map((agent) => ({
        id: agent.id,
        name: agent.name,
        email: agent.email,
      })),
  );

  // Selection state for transfer
  const [selectedUnselectedMembers, setSelectedUnselectedMembers] = useState<string[]>([]);
  const [selectedSelectedMembers, setSelectedSelectedMembers] = useState<string[]>([]);

  // Permission handlers
  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const selectAllPermissions = () => {
    setSelectedPermissions(globalData.availablePermissions.map((p) => p.id));
  };

  const clearAllPermissions = () => {
    setSelectedPermissions([]);
  };

  // Member selection functions
  const toggleUnselectedMember = (memberId: string) => {
    if (selectedUnselectedMembers.includes(memberId)) {
      setSelectedUnselectedMembers(selectedUnselectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedUnselectedMembers([...selectedUnselectedMembers, memberId]);
    }
  };

  const toggleSelectedMember = (memberId: string) => {
    if (selectedSelectedMembers.includes(memberId)) {
      setSelectedSelectedMembers(selectedSelectedMembers.filter((id) => id !== memberId));
    } else {
      setSelectedSelectedMembers([...selectedSelectedMembers, memberId]);
    }
  };

  // Member transfer functions
  const moveSelectedToSelected = () => {
    const membersToMove = unselectedMembers.filter((member) =>
      selectedUnselectedMembers.includes(member.id),
    );
    setSelectedMembers([...selectedMembers, ...membersToMove]);
    setUnselectedMembers(
      unselectedMembers.filter((member) => !selectedUnselectedMembers.includes(member.id)),
    );
    setSelectedUnselectedMembers([]);
  };

  const moveSelectedToUnselected = () => {
    const membersToMove = selectedMembers.filter((member) =>
      selectedSelectedMembers.includes(member.id),
    );
    setUnselectedMembers([...unselectedMembers, ...membersToMove]);
    setSelectedMembers(
      selectedMembers.filter((member) => !selectedSelectedMembers.includes(member.id)),
    );
    setSelectedSelectedMembers([]);
  };

  const moveAllToSelected = () => {
    setSelectedMembers([...selectedMembers, ...unselectedMembers]);
    setUnselectedMembers([]);
    setSelectedUnselectedMembers([]);
  };

  const moveAllToUnselected = () => {
    setUnselectedMembers([...unselectedMembers, ...selectedMembers]);
    setSelectedMembers([]);
    setSelectedSelectedMembers([]);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Rol adı zorunludur!");
      return;
    }

    if (selectedPermissions.length === 0) {
      alert("En az bir yetki seçilmelidir!");
      return;
    }

    // Güncellenmiş rol objesi oluştur
    const _updatedRole = {
      id: id,
      name: name.trim(),
      description: description.trim(),
      permissions: selectedPermissions,
      memberIds: selectedMembers.map((member) => member.id),
      isActive: isActive,
      members: selectedMembers.map((member) => ({
        id: member.id,
        name: member.name,
      })),
    };

    // Navigate back (parent component will handle state management)
    navigate({ to: "/global-settings/roles" });
  };

  const handleCancel = () => {
    navigate({ to: "/global-settings/roles" });
  };

  if (!role) {
    return <div>Role not found</div>;
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h1 className="text-2xl font-bold">Edit Role</h1>

      {/* Basic Info */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Role name"
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
              placeholder="Role description"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-active"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked === true)}
            />
            <Label htmlFor="is-active">Active</Label>
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
            {/* Unselected Members */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Available Agents</Label>
              <div className="border rounded-md p-4 h-80 overflow-y-auto space-y-2 bg-gray-50/50 dark:bg-gray-900/50">
                {unselectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                      selectedUnselectedMembers.includes(member.id)
                        ? "bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-300 dark:border-blue-600"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent"
                    }`}
                    onClick={() => toggleUnselectedMember(member.id)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Buttons */}
            <div className="flex flex-col justify-center items-center space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveAllToSelected}
                disabled={unselectedMembers.length === 0}
              >
                <span className="text-lg">»</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveSelectedToSelected}
                disabled={selectedUnselectedMembers.length === 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveSelectedToUnselected}
                disabled={selectedSelectedMembers.length === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-12 h-10"
                onClick={moveAllToUnselected}
                disabled={selectedMembers.length === 0}
              >
                <span className="text-lg">«</span>
              </Button>
            </div>

            {/* Selected Members */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selected Members</Label>
              <div className="border rounded-md p-4 h-80 overflow-y-auto space-y-2 bg-gray-50/50 dark:bg-gray-900/50">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                      selectedSelectedMembers.includes(member.id)
                        ? "bg-green-100 dark:bg-green-900/50 border-2 border-green-300 dark:border-green-600"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent"
                    }`}
                    onClick={() => toggleSelectedMember(member.id)}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs text-muted-foreground">{member.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Permissions</CardTitle>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllPermissions}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllPermissions}>
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {globalData.availablePermissions.map((permission) => (
              <div
                key={permission.id}
                className={`flex items-center space-x-3 p-3 rounded cursor-pointer transition-colors ${
                  selectedPermissions.includes(permission.id)
                    ? "bg-blue-100 dark:bg-blue-900/50 border-2 border-blue-300 dark:border-blue-600"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-2 border-transparent"
                }`}
                onClick={() => togglePermission(permission.id)}
              >
                <Checkbox
                  checked={selectedPermissions.includes(permission.id)}
                  onChange={() => togglePermission(permission.id)}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{permission.name}</div>
                  <div className="text-xs text-muted-foreground">{permission.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <div className="text-sm font-medium mb-2">
              Selected Permissions ({selectedPermissions.length}):
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedPermissions.map((permissionId) => {
                const permission = globalData.availablePermissions.find(
                  (p) => p.id === permissionId,
                );
                return (
                  <div
                    key={permissionId}
                    className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-sm"
                  >
                    {permission?.name || permissionId}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
          Save Changes
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
