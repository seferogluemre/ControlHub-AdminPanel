import { type ColumnDef } from "@tanstack/react-table";
import { Edit, ListTodo, Settings, Trash2 } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";

import { Agent } from "../data/agents-data";
import AgentPermissionsModal from "./agent-permissions-modal";

// Delete confirmation component
function DeleteConfirmation({
  agent,
  onConfirm,
  onCancel,
}: {
  agent: Agent;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Agent Sil</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            <strong>{agent.name}</strong> adlı agent'ı silmek istediğinizden emin misiniz?
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Bu işlem geri alınamaz ve agent'ın tüm verileri silinecektir.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} className="mr-2">
            İptal
          </Button>
          <Button onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            Sil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const agentsColumns = (onDelete: (agentId: string) => void): ColumnDef<Agent>[] => [
  {
    accessorKey: "name",
    header: "Display Name",
    cell: ({ row }) => {
      const agent = row.original;
      const getInitials = (name: string) => {
        return name
          .split(" ")
          .map((part) => part.charAt(0))
          .join("")
          .toUpperCase()
          .slice(0, 2);
      };

      return (
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            {agent.profileImage ? (
              <AvatarImage src={agent.profileImage} alt={agent.name} />
            ) : (
              <AvatarFallback className="text-xs">{getInitials(agent.name)}</AvatarFallback>
            )}
          </Avatar>
          <span className="font-medium">{agent.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "bio",
    header: "Bio",
    cell: ({ row }) => {
      const bio = row.getValue("bio") as string;
      return <div className="text-muted-foreground">{bio || "..."}</div>;
    },
  },
  {
    accessorKey: "departments",
    header: "Departments",
    cell: ({ row }) => {
      const departments = row.getValue("departments") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {departments.map((dept, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {dept}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "isAdministrator",
    header: "Administrator",
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdministrator") as boolean;
      return (
        <Badge variant={isAdmin ? "default" : "outline"} className="text-xs">
          {isAdmin ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    cell: ({ row }) => {
      return <div className="text-muted-foreground text-sm">{row.getValue("lastLogin")}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
        </div>
      );
    },
  },
  {
    id: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const agent = row.original;
      const [showPermissionsModal, setShowPermissionsModal] = useState(false);

      return (
        <div className="flex items-center space-x-1">
          {agent.isAdministrator && (
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0"
              onClick={() => setShowPermissionsModal(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <ListTodo className="w-4 h-4" />
          </Button>

          {/* Permissions Modal */}
          {showPermissionsModal && (
            <AgentPermissionsModal
              agent={{
                id: agent.id,
                name: agent.name,
                email: agent.email,
                departments: agent.departments,
                isAdministrator: agent.isAdministrator,
                isActive: agent.isActive,
              }}
              isOpen={showPermissionsModal}
              onClose={() => setShowPermissionsModal(false)}
            />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Operations",
    cell: ({ row }) => {
      const agent = row.original;
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);

      const handleDelete = () => {
        onDelete(agent.id);
        setShowDeleteDialog(false);
      };

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={() => {
              window.location.href = `/global-settings/agents/edit/${agent.id}`;
            }}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          {showDeleteDialog && (
            <DeleteConfirmation
              agent={agent}
              onConfirm={handleDelete}
              onCancel={() => setShowDeleteDialog(false)}
            />
          )}
        </div>
      );
    },
  },
];
