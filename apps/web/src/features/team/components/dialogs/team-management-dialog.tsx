import { useState, useEffect } from "react";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { useTeamTranslation } from "#/lib/i18n/hooks";
import { departments } from "../../data/team-data";
import { Team, TeamMember } from "../../types/team";
import { toast } from "sonner";

interface TeamManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: Team | null;
  availableMembers: TeamMember[];
  onTeamUpdated?: (team: Team) => void;
}

export function TeamManagementDialog({
  open,
  onOpenChange,
  team,
  availableMembers,
  onTeamUpdated,
}: TeamManagementDialogProps) {
  const { t } = useTeamTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department: "",
    leaderId: "",
    status: "" as Team["status"],
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        description: team.description,
        department: team.department,
        leaderId: team.leaderId,
        status: team.status,
      });
    }
  }, [team]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!team) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedTeam: Team = {
        ...team,
        name: formData.name,
        description: formData.description,
        department: formData.department,
        leaderId: formData.leaderId,
        status: formData.status,
      };

      onTeamUpdated?.(updatedTeam);
      toast.success("Takım başarıyla güncellendi");
      onOpenChange(false);
    } catch (error) {
      toast.error("Takım güncellenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (!team) return null;

  const availableLeaders = availableMembers.filter(
    (member) =>
      member.status === "active" &&
      (member.role.includes("Lead") ||
        member.role.includes("Manager") ||
        member.role.includes("Senior")) &&
      team.members.some((teamMember) => teamMember.id === member.id),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Takımı Yönet</DialogTitle>
            <DialogDescription>{team.name} takımının bilgilerini düzenleyin</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Takım Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Örn: Frontend Ekibi"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Takımın sorumluluklarını açıklayın..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Departman</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Departman seçin" />
                </SelectTrigger>
                <SelectContent>
                  {departments
                    .filter((dept) => dept !== "Tümü")
                    .map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="leader">Takım Lideri</Label>
              <Select
                value={formData.leaderId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, leaderId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Takım lideri seçin" />
                </SelectTrigger>
                <SelectContent>
                  {availableLeaders.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name} - {member.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Durum</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value as Team["status"] }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Team Statistics */}
            <div className="grid gap-2">
              <Label>Takım İstatistikleri</Label>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <strong>Üye Sayısı:</strong> {team.members.length}
                </p>
                <p>
                  <strong>Proje Sayısı:</strong> {team.projectsCount}
                </p>
                <p>
                  <strong>Oluşturulma:</strong>{" "}
                  {new Date(team.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Güncelleniyor..." : "Güncelle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
