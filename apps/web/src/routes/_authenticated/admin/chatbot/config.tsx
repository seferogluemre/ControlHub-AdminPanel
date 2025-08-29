import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { ChatButton, ChatWindow, PostChats, PreChats } from "#features/admin/live-chat";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/chatbot/config")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-8 gap-6 h-full">
        {/* Left Section - 5/8 width with tabs */}
        <div className="col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Chatbot Yapılandırması</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat-button" className="h-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="chat-button">Sohbet Butonu</TabsTrigger>
                  <TabsTrigger value="chat-window">Sohbet Penceresi</TabsTrigger>
                  <TabsTrigger value="pre-chat">Sohbet Öncesi</TabsTrigger>
                  <TabsTrigger value="post-chat">Sohbet Sonrası</TabsTrigger>
                </TabsList>

                <TabsContent value="chat-button" className="mt-6">
                  <ChatButton />
                </TabsContent>

                <TabsContent value="chat-window" className="mt-6">
                  <ChatWindow />
                </TabsContent>

                <TabsContent value="pre-chat" className="mt-6">
                  <PreChats />
                </TabsContent>

                <TabsContent value="post-chat" className="mt-6">
                  <PostChats />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - 3/8 width preview */}
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
