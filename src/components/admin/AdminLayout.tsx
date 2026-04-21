import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";

export const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#050810]">
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 flex items-center justify-between gap-3 px-4 md:px-8 border-b border-admin/10 bg-[#050810]/80 backdrop-blur-xl sticky top-0 z-30">
            <div className="flex items-center gap-6 flex-1">
              <SidebarTrigger className="text-muted-foreground hover:text-admin" />
              
              <div className="hidden md:flex relative max-w-sm w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search users, draws, or charities..." 
                  className="pl-10 bg-admin/5 border-admin/10 focus-visible:ring-admin/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-admin/10 text-muted-foreground hover:text-admin transition relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-admin shadow-[0_0_10px_hsl(var(--admin))]" />
              </button>
              
              <button className="p-2 rounded-lg hover:bg-admin/10 text-muted-foreground hover:text-admin transition">
                <Settings className="w-5 h-5" />
              </button>

              <div className="h-8 w-px bg-admin/10 mx-1" />

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold">Admin User</p>
                  <p className="text-[10px] text-muted-foreground">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-admin flex items-center justify-center text-admin-foreground font-black shadow-[0_0_15px_hsl(var(--admin)/0.3)]">
                  AD
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
