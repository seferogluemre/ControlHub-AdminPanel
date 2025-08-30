import { CheckCircle, TrendingUp, Users, FolderOpen } from "lucide-react";
import { Main } from "#/components/layout/main";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { ProjectOverview } from "./components/overview";
import { RecentProjects } from "./components/recent-sales";
import { useDashboardTranslation } from "#/lib/i18n/hooks";

export default function Dashboard() {
  const { t } = useDashboardTranslation();
  
  return (
    <>
      {/* ===== Main ===== */}
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground">{t("subtitle")}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>{t("buttons.exportReport")}</Button>
            <Button variant="outline">{t("buttons.newProject")}</Button>
          </div>
        </div>
        <Tabs orientation="vertical" defaultValue="overview" className="space-y-4">
          <div className="w-full overflow-x-auto pb-2">
            <TabsList>
              <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
              <TabsTrigger value="projects">{t("tabs.projects")}</TabsTrigger>
              <TabsTrigger value="team">{t("tabs.team")}</TabsTrigger>
              <TabsTrigger value="analytics">{t("tabs.analytics")}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("metrics.activeProjects.title")}</CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-muted-foreground text-xs">{t("metrics.activeProjects.subtitle", { count: 3 })}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("metrics.teamMembers.title")}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">157</div>
                  <p className="text-muted-foreground text-xs">{t("metrics.teamMembers.subtitle", { count: 12 })}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("metrics.tasksCompleted.title")}</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-muted-foreground text-xs">{t("metrics.tasksCompleted.subtitle", { count: 89 })}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t("metrics.onSchedule.title")}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89%</div>
                  <p className="text-muted-foreground text-xs">{t("metrics.onSchedule.subtitle", { percent: 5 })}</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
              <Card className="col-span-1 lg:col-span-4">
                <CardHeader>
                  <CardTitle>{t("charts.projectTimeline.title")}</CardTitle>
                  <CardDescription>{t("charts.projectTimeline.description")}</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ProjectOverview />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>{t("charts.recentProjects.title")}</CardTitle>
                  <CardDescription>{t("charts.recentProjects.description")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentProjects />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  );
}
