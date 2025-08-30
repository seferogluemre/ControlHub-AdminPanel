import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Users, FolderOpen, Calendar, MoreVertical, Settings, Eye, UserPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { Team } from "../types/team";

interface TeamCardProps {
  team: Team;
  onViewTeam?: (teamId: string) => void;
  onManageTeam?: (teamId: string) => void;
  onAddMember?: (teamId: string) => void;
}

export function TeamCard({ team, onViewTeam, onManageTeam, onAddMember }: TeamCardProps) {
  const getStatusBadgeVariant = (status: Team["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: Team["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Pasif";
      default:
        return "Bilinmiyor";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const leader = team.members.find((member) => member.id === team.leaderId);

  return (
    <Card className="group relative hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={team.avatar} alt={team.name} />
              <AvatarFallback>{getInitials(team.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{team.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{team.department}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewTeam?.(team.id)}>
                <Eye className="mr-2 h-4 w-4" />
                Takımı Görüntüle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onManageTeam?.(team.id)}>
                <Settings className="mr-2 h-4 w-4" />
                Takımı Yönet
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAddMember?.(team.id)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Üye Ekle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <Badge variant={getStatusBadgeVariant(team.status)}>{getStatusText(team.status)}</Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(team.createdAt).toLocaleDateString("tr-TR")}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{team.description}</p>

        {/* Team Leader */}
        {leader && (
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={leader.avatar} alt={leader.name} />
              <AvatarFallback className="text-xs">{getInitials(leader.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Takım Lideri</p>
              <p className="text-xs text-muted-foreground">{leader.name}</p>
            </div>
          </div>
        )}

        {/* Team Members Preview */}
        <div>
          <p className="text-sm font-medium mb-2">Takım Üyeleri</p>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {team.members.slice(0, 4).map((member) => (
                <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                </Avatar>
              ))}
              {team.members.length > 4 && (
                <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium">+{team.members.length - 4}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">{team.members.length} üye</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold">{team.members.length}</p>
              <p className="text-xs text-muted-foreground">Üye</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-semibold">{team.projectsCount}</p>
              <p className="text-xs text-muted-foreground">Proje</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewTeam?.(team.id)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Görüntüle
          </Button>
          <Button variant="outline" size="sm" onClick={() => onAddMember?.(team.id)}>
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
