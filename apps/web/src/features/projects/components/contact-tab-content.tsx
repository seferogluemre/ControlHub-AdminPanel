import { IconPlus, IconUser } from "@tabler/icons-react";
import { Button } from "#/components/ui/button";
import { TabsContent } from "#/components/ui/tabs";

export function ContactTabContent() {
  return (
    <TabsContent value="contact" className="mt-0 h-full overflow-hidden">
      <div className="p-3 h-full flex flex-col items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
            <IconUser className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">İletişim</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bu müşteri için tüm iletişim geçmişini takip etmek ve yönetmek için bir kişi
              oluşturun.
            </p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <IconPlus className="h-4 w-4 mr-2" />
              Yeni Kişi Oluştur
            </Button>
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
