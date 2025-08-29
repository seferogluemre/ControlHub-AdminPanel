import { IconFolderPlus, IconSearch } from "@tabler/icons-react";
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
import { Badge } from "#/components/ui/badge";
import { ScrollArea } from "#/components/ui/scroll-area";
import { type Project } from "../hooks";

type ProjectData = Omit<Project, "id" | "createdAt" | "progress" | "tasks" | "team">;

interface NewProjectProps {
  projects: Omit<Project, "tasks">[];
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const projectTemplates = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web application development project',
    priority: 'medium' as const,
    status: 'planning' as const,
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application development',
    priority: 'high' as const,
    status: 'planning' as const,
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics Platform',
    description: 'Business intelligence and data visualization project',
    priority: 'medium' as const,
    status: 'planning' as const,
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Third-party API integration and backend services',
    priority: 'low' as const,
    status: 'planning' as const,
  },
];

const getPriorityColor = (priority: Project['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'medium':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export function NewProject({ projects, onOpenChange, open }: NewProjectProps) {
  const [step, setStep] = useState<'template' | 'details'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof projectTemplates[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectData, setProjectData] = useState<Partial<ProjectData>>({});

  const filteredTemplates = projectTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTemplateSelect = (template: typeof projectTemplates[0]) => {
    setSelectedTemplate(template);
    setProjectData({
      name: template.name,
      description: template.description,
      status: template.status,
      priority: template.priority,
    });
    setStep('details');
  };

  const handleCreateProject = () => {
    if (projectData.name && projectData.description) {
      console.log('Creating new project:', projectData);
      // Here you would typically call an API to create the project
      
      // Reset form and close dialog
      setStep('template');
      setSelectedTemplate(null);
      setProjectData({});
      setSearchQuery("");
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setStep('template');
    setSelectedTemplate(null);
    setProjectData({});
    setSearchQuery("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        {step === 'template' ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <IconFolderPlus className="h-5 w-5" />
                Create New Project
              </DialogTitle>
              <DialogDescription>
                Choose a project template to get started quickly, or start from scratch.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Templates */}
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {/* Custom Project Option */}
                  <div
                    className="p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => {
                      setSelectedTemplate(null);
                      setProjectData({ status: 'planning', priority: 'medium' });
                      setStep('details');
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h3 className="font-medium text-sm">Custom Project</h3>
                        <p className="text-xs text-muted-foreground">
                          Start from scratch with a blank project
                        </p>
                      </div>
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                        Custom
                      </Badge>
                    </div>
                  </div>

                  {/* Template Options */}
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <h3 className="font-medium text-sm">{template.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                        <Badge className={getPriorityColor(template.priority)}>
                          {template.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {filteredTemplates.length === 0 && searchQuery && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No templates found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <IconFolderPlus className="h-5 w-5" />
                Project Details
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate ? `Configure your ${selectedTemplate.name} project` : 'Configure your custom project'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  placeholder="Enter project name..."
                  value={projectData.name || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project..."
                  value={projectData.description || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={projectData.status}
                    onValueChange={(value) => setProjectData(prev => ({ ...prev, status: value as Project['status'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={projectData.priority}
                    onValueChange={(value) => setProjectData(prev => ({ ...prev, priority: value as Project['priority'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep('template')}>
                Back
              </Button>
              <Button 
                onClick={handleCreateProject}
                disabled={!projectData.name || !projectData.description}
              >
                Create Project
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
