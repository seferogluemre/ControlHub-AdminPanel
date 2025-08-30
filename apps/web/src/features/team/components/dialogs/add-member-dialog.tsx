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

interface AddMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMemberAdded?: (member: TeamMember) => void;
}

export function AddMemberDialog({ open, onOpenChange, onMemberAdded }: AddMemberDialogProps) {
  const { t } = useTeamTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    skills: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newMember: TeamMember = {
        id: `member-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        joinDate: new Date().toISOString().split('T')[0],
        status: "pending",
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
        projectsCount: 0,
        tasksCompleted: 0,
      };

      onMemberAdded?.(newMember);
      toast.success(t("notifications.memberAdded"));
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        role: "",
        department: "",
        skills: "",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast.error("Üye eklenirken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t("dialogs.addMember.title")}</DialogTitle>
            <DialogDescription>
              {t("dialogs.addMember.description")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("dialogs.addMember.fields.name")}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Örn: Ahmet Yılmaz"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">{t("dialogs.addMember.fields.email")}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="ahmet@company.com"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">{t("dialogs.addMember.fields.role")}</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("filters.role")} />
                </SelectTrigger>
                <SelectContent>
                  {roles.filter(role => role !== "Tümü").map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="department">{t("dialogs.addMember.fields.department")}</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("filters.department")} />
                </SelectTrigger>
                <SelectContent>
                  {departments.filter(dept => dept !== "Tümü").map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="skills">{t("dialogs.addMember.fields.skills")}</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
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
              {loading ? "Ekleniyor..." : t("buttons.addMember")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
