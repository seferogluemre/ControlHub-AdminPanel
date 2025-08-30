import { useState } from "react";
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
import { mockTeamMembers, departments } from "../../data/team-data";
import { toast } from "sonner";

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTeamCreated?: (team: any) => void;
}

export function CreateTeamDialog({ open, onOpenChange, onTeamCreated }: CreateTeamDialogProps) {
  const { t } = useTeamTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department: "",
    leaderId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTeam = {
        id: `team-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        department: formData.department,
        leaderId: formData.leaderId,
        members: [],
        createdAt: new Date().toISOString(),
        projectsCount: 0,
        status: "active" as const,
      };

      onTeamCreated?.(newTeam);
      toast.success(t("notifications.teamCreated"));

      // Reset form
      setFormData({
        name: "",
        description: "",
        department: "",
        leaderId: "",
      });

      onOpenChange(false);
    } catch (error) {
      toast.error("Takım oluşturulurken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const availableLeaders = mockTeamMembers.filter(
    (member) =>
      member.status === "active" &&
      (member.role.includes("Lead") ||
        member.role.includes("Manager") ||
        member.role.includes("Senior")),
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("dialogs.createTeam.title")}</DialogTitle>
            <DialogDescription>{t("dialogs.createTeam.description")}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("dialogs.createTeam.fields.name")}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Örn: Frontend Ekibi"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">{t("dialogs.createTeam.fields.description")}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Takımın sorumluluklarını açıklayın..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">{t("dialogs.createTeam.fields.department")}</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, department: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("filters.department")} />
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
              <Label htmlFor="leader">{t("dialogs.createTeam.fields.leader")}</Label>
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
              {loading ? "Oluşturuluyor..." : t("buttons.createTeam")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
