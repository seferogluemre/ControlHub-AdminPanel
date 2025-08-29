import { useNavigate, useParams } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, Edit, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Switch } from "#/components/ui/switch";
import { Textarea } from "#/components/ui/textarea";

import globalData from "../../global-settings.json";
import { agentsData } from "../data/agents-data";

export default function EditAgent() {
  const { id } = useParams({ from: "/(admin)/global-settings/agents/edit/$id" });
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Agent bilgisini bul
  const agent = agentsData.find((a) => a.id === id);

  // Get department names directly from global data
  const departmentNames = globalData.departments.map((dept) => dept.name);

  // Form state
  const [email, setEmail] = useState(agent?.email || "");
  const [firstName, setFirstName] = useState(agent?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(agent?.name?.split(" ")[1] || "");
  const [displayName, setDisplayName] = useState(agent?.name || "");
  const [departments, setDepartments] = useState<string[]>(agent?.departments || []);
  const [isAdministrator, setIsAdministrator] = useState<boolean>(agent?.isAdministrator || false);
  const [isActive, setIsActive] = useState<boolean>(agent?.isActive || true);
  const [bio, setBio] = useState(agent?.bio || "");
  const [profileImage, setProfileImage] = useState<string | null>(agent?.profileImage || null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // Profile image functions
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

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  // firstName ve lastName değiştiğinde displayName'i otomatik güncelle
  useEffect(() => {
    if (firstName && lastName) {
      setDisplayName(`${firstName} ${lastName}`);
    }
  }, [firstName, lastName]);

  const handleRemoveDepartment = (deptToRemove: string) => {
    setDepartments(departments.filter((dept) => dept !== deptToRemove));
  };

  const handleAddDepartment = (dept: string) => {
    if (!departments.includes(dept)) {
      setDepartments([...departments, dept]);
    }
  };

  const handleSave = () => {
    if (!email.trim() || !firstName.trim() || !lastName.trim()) {
      alert("Email, ad ve soyad alanları zorunludur!");
      return;
    }

    // Mevcut agent'ı agentsData'da bul ve güncelle
    const agentIndex = agentsData.findIndex((a) => a.id === id);

    if (agentIndex !== -1) {
      // Display name'i firstName + lastName'den oluştur
      const finalDisplayName = displayName.trim() || `${firstName.trim()} ${lastName.trim()}`;

      // Güncellenmiş agent objesi oluştur
      const updatedAgent = {
        id: id,
        name: finalDisplayName,
        email: email.trim(),
        bio: bio.trim(),
        departments: departments,
        isAdministrator,
        lastLogin: agentsData[agentIndex].lastLogin,
        isActive,
        profileImage: profileImage || undefined, // Add profile image to save
      };

      // AgentsData'da güncelle
      agentsData[agentIndex] = updatedAgent;

      // Agent güncellendi
      alert("Agent başarıyla güncellendi!");
    } else {
      console.error("Agent bulunamadı!");
      alert("Agent bulunamadı!");
    }

    navigate({ to: "/global-settings/agents" });
  };

  const handleCancel = () => {
    navigate({ to: "/global-settings/agents" });
  };

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="flex flex-col space-y-6 p-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Edit Agent</h1>

      {/* Main Content */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name *</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Display name *</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Display name"
                  required
                />
              </div>
            </div>

            {/* Right Column - Avatar */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  {profileImage ? (
                    <AvatarImage src={profileImage} alt="Profile" />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {getInitials(firstName, lastName)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full"
                  onClick={handleImageClick}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                {profileImage && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -bottom-2 -left-2 w-8 h-8 p-0 rounded-full"
                    onClick={handleImageRemove}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="mt-6 space-y-2">
            <Label>Departments</Label>
            <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[40px]">
              {departments.map((dept, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-2">
                  {dept}
                  <button
                    onClick={() => handleRemoveDepartment(dept)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              <Select onValueChange={handleAddDepartment}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Add department..." />
                </SelectTrigger>
                <SelectContent>
                  {departmentNames
                    .filter((dept) => !departments.includes(dept))
                    .map((dept, index) => (
                      <SelectItem key={index} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Administrator Toggle */}
          <div className="mt-6 flex items-center justify-between">
            <Label htmlFor="administrator">Administrator</Label>
            <Switch
              id="administrator"
              checked={isAdministrator}
              onCheckedChange={(checked) => setIsAdministrator(checked)}
            />
          </div>

          {/* Active Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <Label htmlFor="active">Active</Label>
            <Switch
              id="active"
              checked={isActive}
              onCheckedChange={(checked) => setIsActive(checked)}
            />
          </div>

          {/* Set Permissions Link */}
          <div className="mt-6">
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              Set Permissions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* More Information */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => setShowMoreInfo(!showMoreInfo)}>
          <div className="flex items-center justify-between">
            <CardTitle>More Information</CardTitle>
            {showMoreInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </CardHeader>
        {showMoreInfo && (
          <CardContent className="pt-0">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                placeholder="Agent bio information"
              />
            </div>
          </CardContent>
        )}
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

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}
