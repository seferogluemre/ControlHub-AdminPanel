import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { useDashboardTranslation } from "#/lib/i18n/hooks";

export function RecentProjects() {
  const { t } = useDashboardTranslation();
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/10 text-primary">EM</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">{t("projects.ecommerce")}</p>
            <p className="text-muted-foreground text-sm">{t("projects.ecommerceDesc")}</p>
          </div>
          <Badge variant="secondary">{t("projectStatus.inProgress")}</Badge>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarFallback className="bg-accent/10 text-accent">DA</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">{t("projects.dataAnalytics")}</p>
            <p className="text-muted-foreground text-sm">{t("projects.dataAnalyticsDesc")}</p>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {t("projectStatus.completed")}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-orange-100 text-orange-800">API</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">{t("projects.apiIntegration")}</p>
            <p className="text-muted-foreground text-sm">{t("projects.apiIntegrationDesc")}</p>
          </div>
          <Badge variant="outline">{t("projectStatus.planning")}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-blue-100 text-blue-800">UI</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">{t("projects.uiLibrary")}</p>
            <p className="text-muted-foreground text-sm">{t("projects.uiLibraryDesc")}</p>
          </div>
          <Badge variant="secondary">{t("projectStatus.inProgress")}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-purple-100 text-purple-800">ML</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm leading-none font-medium">{t("projects.machineLearning")}</p>
            <p className="text-muted-foreground text-sm">{t("projects.machineLearningDesc")}</p>
          </div>
          <Badge variant="destructive">{t("projectStatus.delayed")}</Badge>
        </div>
      </div>
    </div>
  );
}
