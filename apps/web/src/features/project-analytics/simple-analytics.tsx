import { BarChart3, TrendingUp, Users, Calendar, Clock, FolderOpen } from "lucide-react";
import { Main } from "#/components/layout/main";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { useAnalyticsTranslation } from "#/lib/i18n/hooks";

export default function Analytics() {
  const { t } = useAnalyticsTranslation();
  return (
    <Main>
      <div className="mb-6 flex items-center justify-between space-y-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">{t("buttons.exportData")}</Button>
          <Button>{t("buttons.generateReport")}</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t("tabs.overview")}</TabsTrigger>
          <TabsTrigger value="projects">{t("tabs.projects")}</TabsTrigger>
          <TabsTrigger value="team">{t("tabs.team")}</TabsTrigger>
          <TabsTrigger value="timeline">{t("tabs.timeline")}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("metrics.totalProjects.title")}
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">
                  {t("metrics.totalProjects.subtitle", { percent: 12 })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("metrics.completionRate.title")}
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  {t("metrics.completionRate.subtitle", { percent: 5 })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("metrics.activeTeamMembers.title")}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  {t("metrics.activeTeamMembers.subtitle", { count: 3 })}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("metrics.avgDuration.title")}
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  3.2 {t("metrics.avgDuration.months", { defaultValue: "months" })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {t("metrics.avgDuration.subtitle", { months: "0.5" })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("charts.performanceTrends.title")}</CardTitle>
                <CardDescription>{t("charts.performanceTrends.description")}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>{t("comingSoon.charts")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("charts.topProjects.title")}</CardTitle>
                <CardDescription>{t("charts.topProjects.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      nameKey: "projects.mobileRedesign",
                      completion: 95,
                      statusKey: "status.onTrack",
                    },
                    {
                      nameKey: "projects.apiIntegration",
                      completion: 89,
                      statusKey: "status.completed",
                    },
                    {
                      nameKey: "projects.dataAnalytics",
                      completion: 78,
                      statusKey: "status.inProgress",
                    },
                    {
                      nameKey: "projects.userDashboard",
                      completion: 65,
                      statusKey: "status.inProgress",
                    },
                  ].map((project, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{t(project.nameKey)}</p>
                        <p className="text-xs text-muted-foreground">{t(project.statusKey)}</p>
                      </div>
                      <div className="text-sm font-medium">{project.completion}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("charts.projectList.title")}</CardTitle>
              <CardDescription>{t("charts.projectList.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FolderOpen className="h-12 w-12 mx-auto mb-2" />
                <p>{t("comingSoon.projectList")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("charts.teamPerformance.title")}</CardTitle>
              <CardDescription>{t("charts.teamPerformance.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2" />
                <p>{t("comingSoon.teamAnalytics")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("charts.projectTimeline.title")}</CardTitle>
              <CardDescription>{t("charts.projectTimeline.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2" />
                <p>{t("comingSoon.timelineAnalytics")}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Main>
  );
}
