import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Users, UserCheck, FolderOpen, CheckCircle, Activity, TrendingUp } from "lucide-react";
import { TeamStats as TeamStatsType } from "../types/team";
import { Badge } from "#/components/ui/badge";

interface TeamStatsProps {
  stats: TeamStatsType;
}

export function TeamStats({ stats }: TeamStatsProps) {
  const statCards = [
    {
      title: "Toplam Üye",
      value: stats.totalMembers,
      icon: Users,
      description: "Tüm takım üyeleri",
      color: "text-blue-600",
    },
    {
      title: "Aktif Üye",
      value: stats.activeMembers,
      icon: UserCheck,
      description: "Şu anda aktif olan üyeler",
      color: "text-green-600",
    },
    {
      title: "Toplam Takım",
      value: stats.totalTeams,
      icon: FolderOpen,
      description: "Oluşturulmuş takım sayısı",
      color: "text-purple-600",
    },
    {
      title: "Tamamlanan Proje",
      value: stats.completedProjects,
      icon: CheckCircle,
      description: "Başarıyla tamamlanan projeler",
      color: "text-emerald-600",
    },
    {
      title: "Aktif Görev",
      value: stats.activeTasks,
      icon: Activity,
      description: "Devam eden görevler",
      color: "text-orange-600",
    },
    {
      title: "Verimlilik Ortalaması",
      value: `${stats.averageProductivity}%`,
      icon: TrendingUp,
      description: "Takım performans ortalaması",
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
              {stat.title === "Aktif Üye" && (
                <Badge variant="outline" className="mt-2">
                  {Math.round((stats.activeMembers / stats.totalMembers) * 100)}% aktif
                </Badge>
              )}

              {stat.title === "Verimlilik Ortalaması" && stats.averageProductivity >= 80 && (
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
