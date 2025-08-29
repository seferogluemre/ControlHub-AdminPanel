import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { useAuthStore } from "#context/auth.context.ts";
import { authClient } from "#lib/auth.ts";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function ProfileDropdown() {
  const { user, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await authClient.signOut();
    if (response.error) {
      toast.error(response.error.message);
    }

    if (response.data?.success) {
      await fetchUser();
      navigate({ to: "/sign-in", replace: true });
    }
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-muted-foreground text-xs leading-none">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={handleLogout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
