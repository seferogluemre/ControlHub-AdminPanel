import { type ColumnDef } from "@tanstack/react-table";
import { Edit, Settings, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";

export interface Role {
  id: string;
  name: string;
  description: string;
  members: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  permissions: string[];
}

export const rolesColumns: ColumnDef<Role>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const role = row.original;
      return (
        <span className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
          {role.name}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <div className="text-muted-foreground">{row.getValue("description")}</div>;
    },
  },
  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      const members = row.getValue("members") as Role["members"];
      return (
        <div className="flex -space-x-2">
          {members.slice(0, 8).map((member, index) => (
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
  },
  {
    accessorKey: "permissions",
    header: "Permissions",
    cell: ({ row }) => {
      const _role = row.original;
      return (
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Operations",
    cell: ({ row }) => {
      const _role = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
