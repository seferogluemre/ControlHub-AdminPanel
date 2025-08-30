import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Mail, Calendar, Activity, MoreVertical, MessageCircle, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { TeamMember } from "../types/team";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { useTeamTranslation, useLanguage } from "#/lib/i18n/hooks";

interface TeamMemberCardProps {
  member: TeamMember;
  onViewProfile?: (memberId: string) => void;
  onSendMessage?: (memberId: string) => void;
  onRemoveFromTeam?: (memberId: string) => void;
}

export function TeamMemberCard({
  member,
  onViewProfile,
  onSendMessage,
  onRemoveFromTeam,
}: TeamMemberCardProps) {
  const { t } = useTeamTranslation();
  const { currentLanguage } = useLanguage();
  const getStatusBadgeVariant = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: TeamMember["status"]) => {
    switch (status) {
      case "active":
        return t("member.status.active");
      case "inactive":
        return t("member.status.inactive");
      case "pending":
        return t("member.status.pending");
      default:
        return t("member.status.unknown");
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

  return (
    <Card className="group relative hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
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
              <DropdownMenuItem onClick={() => onViewProfile?.(member.id)}>
                <User className="mr-2 h-4 w-4" />
                {t("member.actions.viewProfile")}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSendMessage?.(member.id)}>
                <MessageCircle className="mr-2 h-4 w-4" />
                {t("member.actions.sendMessage")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onRemoveFromTeam?.(member.id)}
                className="text-destructive"
              >
                {t("member.actions.removeFromTeam")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status and Department */}
        <div className="flex items-center justify-between">
          <Badge variant={getStatusBadgeVariant(member.status)}>
            {getStatusText(member.status)}
          </Badge>
          <span className="text-sm text-muted-foreground">{member.department}</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground truncate">{member.email}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {t("member.fields.joinDate")}:{" "}
              {new Date(member.joinDate).toLocaleDateString(
                currentLanguage === "tr" ? "tr-TR" : "en-US",
              )}
            </span>
          </div>

          {member.lastActivity && (
            <div className="flex items-center space-x-2 text-sm">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t("member.fields.lastActivity")}:{" "}
                {formatDistanceToNow(new Date(member.lastActivity), {
                  addSuffix: true,
                  locale: currentLanguage === "tr" ? tr : undefined,
                })}
              </span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div>
          <p className="text-sm font-medium mb-2">{t("member.fields.skills")}</p>
          <div className="flex flex-wrap gap-1">
            {member.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {member.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{member.skills.length - 3} {t("member.fields.more")}
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center">
            <p className="text-lg font-semibold">{member.projectsCount}</p>
            <p className="text-xs text-muted-foreground">{t("member.fields.projects")}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{member.tasksCompleted}</p>
            <p className="text-xs text-muted-foreground">{t("member.fields.completedTasks")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
