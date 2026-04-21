import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { MobileBottomNav } from "./MobileBottomNav";
import { Bell } from "lucide-react";

export const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between gap-3 px-4 md:px-6 border-b border-primary/10 bg-background/60 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <SidebarTrigger className="text-muted-foreground hover:text-primary" />
              </div>
              <div className="md:hidden flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-gradient-gold flex items-center justify-center">
                  <span className="font-display font-black text-primary-foreground text-xs">G</span>
                </div>
                <span className="font-display font-bold text-base">GolfDraw</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-sm font-bold">
                A
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
            <Outlet />
          </main>
        </div>

        <MobileBottomNav />
      </div>
    </SidebarProvider>
  );
};
