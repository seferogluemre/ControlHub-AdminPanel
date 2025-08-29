import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Textarea } from "#/components/ui/textarea";
import globalData from "../../global-settings.json";
import { agentsData } from "../data/agents-data";

export default function CreateAgent() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [departments, setDepartments] = useState<string[]>([]);
  const [isAdministrator, setIsAdministrator] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Get department names directly from global data
  const departmentNames = globalData.departments.map((dept) => dept.name);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Dosya boyutu 5MB'dan küçük olmalıdır!");
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Lütfen geçerli bir görsel dosyası seçin!");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageRemove = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      alert("Ad ve email alanları zorunludur!");
      return;
    }

    // Yeni ID üret (mevcut max ID + 1)
    const maxId = Math.max(...agentsData.map((a) => parseInt(a.id)), 0);
    const newId = (maxId + 1).toString();

    // Yeni agent objesi oluştur
    const newAgent = {
      id: newId,
      name: name.trim(),
      email: email.trim(),
      bio: bio.trim(),
      departments: departments,
      isAdministrator,
      lastLogin: new Date().toISOString().replace("T", " ").substring(0, 19),
      isActive,
      profileImage: profileImage, // Add profile image to the agent object
    };
    // AgentsData'ya ekle
    agentsData.push({ ...newAgent, profileImage: profileImage || undefined });

    // Yeni agent oluşturuldu
    navigate({ to: "/global-settings/agents" });
  };

  const handleCancel = () => {
    navigate({ to: "/global-settings/agents" });
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h1 className="text-2xl font-bold">New Agent</h1>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Profile Image Upload */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Avatar
                className="h-20 w-20 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleImageClick}
              >
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Profile" />
                ) : (
                  <AvatarFallback className="text-lg">
                    {name ? getInitials(name) : "NA"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col gap-2">
                <Button type="button" variant="outline" size="sm" onClick={handleImageClick}>
                  Upload Photo
                </Button>
                {profileImage && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleImageRemove}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove Photo
                  </Button>
                )}
                <p className="text-xs text-muted-foreground">JPG, PNG or GIF (max. 5MB)</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Display Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Agent name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="agent@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Agent bio information"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments & Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Departments & Permissions</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="departments">Departments</Label>
            <Select onValueChange={(value) => setDepartments([value])}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departmentNames.map((dept, index) => (
                  <SelectItem key={index} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="administrator"
              checked={isAdministrator}
              onCheckedChange={(checked) => setIsAdministrator(checked === true)}
            />
            <Label htmlFor="administrator">Administrator</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked === true)}
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
          Save
        </Button>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
