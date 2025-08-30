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
  Mail, 
  Calendar, 
  Activity, 
  User, 
  Building2, 
  Briefcase,
  MessageCircle,
  Phone,
  MapPin,
  Star,
  TrendingUp
} from "lucide-react";
import { TeamMember } from "../../types/team";
import { useTeamTranslation, useLanguage } from "#/lib/i18n/hooks";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

interface MemberProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember | null;
  onSendMessage?: (memberId: string) => void;
}

export function MemberProfileDialog({ 
  open, 
  onOpenChange, 
  member,
  onSendMessage 
}: MemberProfileDialogProps) {
  const { t } = useTeamTranslation();
  const { currentLanguage } = useLanguage();

  if (!member) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <User className="h-5 w-5" />
            Üye Profili
          </DialogTitle>
          <DialogDescription>
            {member.name} kullanıcısının detaylı profil bilgileri
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-lg">{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h2 className="text-2xl font-bold">{member.name}</h2>
                <p className="text-lg text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={getStatusBadgeVariant(member.status)}>
                  {getStatusText(member.status)}
                </Badge>
                <Badge variant="outline">
                  <Building2 className="mr-1 h-3 w-3" />
                  {member.department}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>İletişim Bilgileri</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">E-posta:</span>
                <span className="text-muted-foreground">{member.email}</span>
              </div>
              {/* Add more contact info if available */}
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Mesleki Bilgiler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="font-medium">Katılım Tarihi:</span>
                    <p className="text-sm text-muted-foreground">
                      {new Date(member.joinDate).toLocaleDateString(
                        currentLanguage === "tr" ? "tr-TR" : "en-US"
                      )}
                    </p>
                  </div>
                </div>
                
                {member.lastActivity && (
                  <div className="flex items-center space-x-3">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Son Aktivite:</span>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(member.lastActivity), {
                          addSuffix: true,
                          locale: currentLanguage === "tr" ? tr : undefined,
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div>
                <span className="font-medium mb-2 block">Yetenekler:</span>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Performans İstatistikleri</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-primary">{member.projectsCount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Toplam Proje</p>
                </div>
                
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">{member.tasksCompleted}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tamamlanan Görev</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onSendMessage?.(member.id)}
            className="flex items-center space-x-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Mesaj Gönder</span>
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Kapat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
