import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";

export interface Department {
  id: string;
  name: string;
  description: string;
  members: {
    id?: string;
    name: string;
    avatar?: string;
    email?: string;
  }[];
}

export const departmentsColumns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
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
      const members = row.getValue("members") as Department["members"];
      return (
        <div className="flex -space-x-2">
          {members.slice(0, 5).map((member, index) => (
            <Avatar key={index} className="w-8 h-8 border-2 border-background">
              <AvatarFallback className="text-xs">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          {members.length > 5 && (
            <Avatar className="w-8 h-8 border-2 border-background">
              <AvatarFallback className="text-xs">+{members.length - 5}</AvatarFallback>
            </Avatar>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Operations",
    cell: ({ row }) => {
      const department = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Link to="/global-settings/departments/edit/$id" params={{ id: department.id }}>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
