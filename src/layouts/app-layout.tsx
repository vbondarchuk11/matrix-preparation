import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/ui/sidebar";
import { useMobile } from "@/hooks/use-mobile";
import { useAuthStore } from "@/store/auth-store";
import { Bell, Menu, Search, Settings } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((value) => !value)}
      />

      <div className="lg:pl-80">
        <header className="sticky top-0 z-30 border-b border-white/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open navigation</span>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="relative hidden max-w-md flex-1 md:block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search customers, deals, tasks..."
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-3 rounded-2xl border bg-card px-3 py-2 shadow-sm"
                  >
                    <Avatar>
                      <AvatarFallback>{user?.avatar ?? "MC"}</AvatarFallback>
                    </Avatar>
                    {!isMobile ? (
                      <div className="text-left">
                        <p className="text-sm font-semibold">
                          {user?.name ?? "Guest User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.role ?? "Visitor"}
                        </p>
                      </div>
                    ) : null}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Workspace settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={clearSession}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
