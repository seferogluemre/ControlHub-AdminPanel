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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { useTeamTranslation } from "#/lib/i18n/hooks";
import { departments, roles } from "../../data/team-data";
import { TeamMember } from "../../types/team";
import { toast } from "sonner";

interface ManageMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TeamMember | null;
  onMemberUpdated?: (member: TeamMember) => void;
}

export function ManageMemberDialog({
  open,
  onOpenChange,
  member,
  onMemberUpdated,
}: ManageMemberDialogProps) {
  const { t } = useTeamTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    department: "",
    status: "" as TeamMember["status"],
    skills: "",
  });

  useEffect(() => {
    if (member) {
      setFormData({
        role: member.role,
        department: member.department,
        status: member.status,
        skills: member.skills.join(", "),
      });
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!member) return;

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedMember: TeamMember = {
        ...member,
        role: formData.role,
        department: formData.department,
        status: formData.status,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      onMemberUpdated?.(updatedMember);
      toast.success(t("notifications.memberUpdated"));
      onOpenChange(false);
    } catch (error) {
      toast.error("Üye güncellenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("dialogs.manageMember.title")}</DialogTitle>
            <DialogDescription>{t("dialogs.manageMember.description")}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Üye Bilgileri</Label>
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Ad:</strong> {member.name}
                </p>
                <p>
                  <strong>E-posta:</strong> {member.email}
                </p>
                <p>
                  <strong>Katılım Tarihi:</strong>{" "}
                  {new Date(member.joinDate).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">{t("dialogs.manageMember.fields.role")}</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("filters.role")} />
                </SelectTrigger>
                <SelectContent>
                  {roles
                    .filter((role) => role !== "Tümü")
                    .map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">{t("dialogs.manageMember.fields.department")}</Label>
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
              <Label htmlFor="status">{t("dialogs.manageMember.fields.status")}</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value as TeamMember["status"] }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("filters.status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t("member.status.active")}</SelectItem>
                  <SelectItem value="inactive">{t("member.status.inactive")}</SelectItem>
                  <SelectItem value="pending">{t("member.status.pending")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="skills">{t("dialogs.manageMember.fields.skills")}</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData((prev) => ({ ...prev, skills: e.target.value }))}
                placeholder="React, TypeScript, Node.js"
              />
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
