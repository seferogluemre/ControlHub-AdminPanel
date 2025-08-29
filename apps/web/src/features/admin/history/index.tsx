import { Link } from "@tanstack/react-router";
import { MessageSquare, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#/components/ui/card";

export default function History() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <h1 className="text-3xl font-bold">History</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link to="/history/chats" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Chats</span>
              </CardTitle>
              <CardDescription>Kullanıcı sohbet geçmişini görüntüleyin ve yönetin</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tüm kullanıcı sohbetlerinin geçmişini görüntüleyin
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/history/agent-chats" className="block">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Agent Chats</span>
              </CardTitle>
              <CardDescription>Agent sohbet geçmişini görüntüleyin ve yönetin</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Agent'ların sohbet geçmişini görüntüleyin
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
