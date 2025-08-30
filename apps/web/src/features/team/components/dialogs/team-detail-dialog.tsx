import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Badge } from "#/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import {
  Users,
  Calendar,
  Building2,
  FolderOpen,
  User,
  Settings,
  UserPlus,
  Crown,
} from "lucide-react";
import { Team } from "../../types/team";
import { useTeamTranslation, useLanguage } from "#/lib/i18n/hooks";

interface TeamDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: Team | null;
  onManageTeam?: (teamId: string) => void;
  onAddMember?: (teamId: string) => void;
}

export function TeamDetailDialog({
  open,
  onOpenChange,
  team,
  onManageTeam,
  onAddMember,
}: TeamDetailDialogProps) {
  const { t } = useTeamTranslation();
  const { currentLanguage } = useLanguage();

  if (!team) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Building2 className="h-5 w-5" />
            Takım Detayları
          </DialogTitle>
          <DialogDescription>{team.name} takımının detaylı bilgileri ve üyeleri</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Team Header */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={team.avatar} alt={team.name} />
              <AvatarFallback className="text-lg">{getInitials(team.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold">{team.name}</h2>
                <p className="text-lg text-muted-foreground">{team.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getStatusBadgeVariant(team.status)}>
                  {getStatusText(team.status)}
                </Badge>
                <Badge variant="outline">
                  <Building2 className="mr-1 h-3 w-3" />
                  {team.department}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Team Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Takım Bilgileri</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Oluşturulma:</span>
                  <span className="text-muted-foreground">
                    {new Date(team.createdAt).toLocaleDateString(
                      currentLanguage === "tr" ? "tr-TR" : "en-US",
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Üye Sayısı:</span>
                  <span className="text-muted-foreground">{team.members.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Proje Sayısı:</span>
                  <span className="text-muted-foreground">{team.projectsCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Team Leader */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-4 w-4" />
                  <span>Takım Lideri</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {leader ? (
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={leader.avatar} alt={leader.name} />
                      <AvatarFallback>{getInitials(leader.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{leader.name}</p>
                      <p className="text-sm text-muted-foreground">{leader.role}</p>
                      <p className="text-xs text-muted-foreground">{leader.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Takım lideri atanmamış</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Takım Üyeleri ({team.members.length})</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => onAddMember?.(team.id)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Üye Ekle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{member.name}</p>
                          {member.id === team.leaderId && (
                            <Crown className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        member.status === "active"
                          ? "default"
                          : member.status === "pending"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {member.status === "active"
                        ? "Aktif"
                        : member.status === "pending"
                          ? "Beklemede"
                          : "Pasif"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FolderOpen className="h-4 w-4" />
                <span>Performans İstatistikleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-primary">{team.projectsCount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Toplam Proje</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">{team.members.length}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Takım Üyesi</p>
                </div>

                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-600">
                      {team.members.filter((m) => m.status === "active").length}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Aktif Üye</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onManageTeam?.(team.id)}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>Takımı Yönet</span>
          </Button>
          <Button onClick={() => onOpenChange(false)}>Kapat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
