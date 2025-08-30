import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Users, UserCheck, FolderOpen, CheckCircle, Activity, TrendingUp } from "lucide-react";
import { TeamStats as TeamStatsType } from "../types/team";
import { Badge } from "#/components/ui/badge";
import { useTeamTranslation } from "#/lib/i18n/hooks";

interface TeamStatsProps {
  stats: TeamStatsType;
}

export function TeamStats({ stats }: TeamStatsProps) {
  const { t } = useTeamTranslation();
  const statCards = [
    {
      title: t("stats.totalMembers.title"),
      value: stats.totalMembers,
      icon: Users,
      description: t("stats.totalMembers.description"),
      color: "text-blue-600",
    },
    {
      title: t("stats.activeMembers.title"),
      value: stats.activeMembers,
      icon: UserCheck,
      description: t("stats.activeMembers.description"),
      color: "text-green-600",
    },
    {
      title: t("stats.totalTeams.title"),
      value: stats.totalTeams,
      icon: FolderOpen,
      description: t("stats.totalTeams.description"),
      color: "text-purple-600",
    },
    {
      title: t("stats.completedProjects.title"),
      value: stats.completedProjects,
      icon: CheckCircle,
      description: t("stats.completedProjects.description"),
      color: "text-emerald-600",
    },
    {
      title: t("stats.activeTasks.title"),
      value: stats.activeTasks,
      icon: Activity,
      description: t("stats.activeTasks.description"),
      color: "text-orange-600",
    },
    {
      title: t("stats.averageProductivity.title"),
      value: `${stats.averageProductivity}%`,
      icon: TrendingUp,
      description: t("stats.averageProductivity.description"),
      color: "text-indigo-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>

              {/* Additional badges for certain stats */}
              {stat.title === t("stats.activeMembers.title") && (
                <Badge variant="outline" className="mt-2">
                  {Math.round((stats.activeMembers / stats.totalMembers) * 100)}% aktif
                </Badge>
              )}

              {stat.title === t("stats.averageProductivity.title") && stats.averageProductivity >= 80 && (
                <Badge variant="default" className="mt-2 bg-green-600">
                  Yüksek Performans
                </Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
