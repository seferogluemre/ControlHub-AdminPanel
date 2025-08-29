import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";

export function RecentProjects() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/10 text-primary">EM</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">E-commerce Platform</p>
            <p className="text-muted-foreground text-sm">Mobile app redesign</p>
          </div>
          <Badge variant="secondary">In Progress</Badge>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarFallback className="bg-accent/10 text-accent">DA</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Data Analytics</p>
            <p className="text-muted-foreground text-sm">Business intelligence dashboard</p>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-orange-100 text-orange-800">API</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">API Integration</p>
            <p className="text-muted-foreground text-sm">Third-party service connections</p>
          </div>
          <Badge variant="outline">Planning</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-blue-100 text-blue-800">UI</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">UI Component Library</p>
            <p className="text-muted-foreground text-sm">Reusable design system</p>
          </div>
          <Badge variant="secondary">In Progress</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-purple-100 text-purple-800">ML</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">Machine Learning</p>
            <p className="text-muted-foreground text-sm">Predictive analytics model</p>
          </div>
          <Badge variant="destructive">Delayed</Badge>
        </div>
      </div>
    </div>
  );
}
