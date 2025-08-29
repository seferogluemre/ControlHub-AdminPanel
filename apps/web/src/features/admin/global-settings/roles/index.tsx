import { useNavigate } from "@tanstack/react-router";
import { Edit, Plus, Search, Settings, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DataTable } from "#/components/data-table";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "#/components/ui/sheet";
import globalData from "../global-settings.json";
import { rolesColumns } from "./components/columns";
import { type Role, rolesData } from "./data/roles-data";

export default function Roles() {
  const navigate = useNavigate();

  // State management
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Permission sheet state
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isPermissionSheetOpen, setIsPermissionSheetOpen] = useState(false);

  // Members modal state
  const [selectedRoleMembers, setSelectedRoleMembers] = useState<any[]>([]);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  // Filter roles based on search
  const filteredRoles = useMemo(() => {
    if (!searchKeyword.trim()) return roles;

    const keyword = searchKeyword.toLowerCase();
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(keyword) ||
        role.description.toLowerCase().includes(keyword),
    );
  }, [roles, searchKeyword]);

  // Handle role deletion
  const handleDeleteRole = (roleId: string) => {
    setRoles((prev) => prev.filter((role) => role.id !== roleId));
  };

  // Handle view permissions
  const handleViewPermissions = (role: Role) => {
    setSelectedRole(role);
    setIsPermissionSheetOpen(true);
  };

  // Handle view members
  const handleViewMembers = (members: any[]) => {
    setSelectedRoleMembers(members);
    setIsMembersModalOpen(true);
  };

  // Update columns to include delete handler and click handlers while preserving original design
  const updatedColumns = rolesColumns.map((col) => {
    if ((col as any).accessorKey === "permissions") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const role = row.original;
          return (
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => handleViewPermissions(role)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          );
        },
      };
    }

    if ((col as any).accessorKey === "members") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const role = row.original;
          const members = role.members || [];

          return (
            <div
              className="flex -space-x-2 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleViewMembers(members)}
            >
              {members.slice(0, 8).map((member: any, index: number) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {members.length > 8 && (
                <Avatar className="w-8 h-8 border-2 border-background">
                  <AvatarFallback className="text-xs">+{members.length - 8}</AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        },
      };
    }

    if ((col as any).id === "actions") {
      return {
        ...col,
        cell: ({ row }: any) => {
          const role = row.original;
          return (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() =>
                  navigate({ to: "/global-settings/roles/edit/$id", params: { id: role.id } })
                }
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => handleDeleteRole(role.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        },
      };
    }

    return col;
  });

  return (
    <div className="flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Roles</h1>
          <Button
            onClick={() => navigate({ to: "/global-settings/roles/new" })}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Role
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search roles..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={updatedColumns} data={filteredRoles} />

      {/* Permission Sheet */}
      <Sheet open={isPermissionSheetOpen} onOpenChange={setIsPermissionSheetOpen}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader className="px-6">
            <SheetTitle>{selectedRole?.name} - Permissions</SheetTitle>
            <SheetDescription>{selectedRole?.description}</SheetDescription>
          </SheetHeader>

          <div className="mt-6 px-6">
            <h4 className="font-medium mb-4">Assigned Permissions:</h4>
            <div className="space-y-2">
              {selectedRole?.permissions.map((permissionId) => {
                const permission = globalData.availablePermissions.find(
                  (p) => p.id === permissionId,
                );
                return (
                  <div key={permissionId} className="border rounded p-3">
                    <div className="font-medium">{permission?.name || permissionId}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {permission?.description || "No description available"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Members Modal */}
      <Dialog open={isMembersModalOpen} onOpenChange={setIsMembersModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Role Members</DialogTitle>
            <DialogDescription>All members assigned to this role</DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
            {selectedRoleMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-blue-500 text-white">
                    {member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                </div>
              </div>
            ))}
            {selectedRoleMembers.length === 0 && (
              <p className="text-center text-gray-500 py-8">No members assigned</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
