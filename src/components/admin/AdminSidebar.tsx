import { 
  Users, 
  Dice5, 
  Heart, 
  CheckCircle2, 
  BarChart3, 
  Settings, 
  LogOut,
  LayoutDashboard,
  ExternalLink
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Draw Engine", url: "/admin/draws", icon: Dice5 },
  { title: "Charity Admin", url: "/admin/charities", icon: Heart },
  { title: "Winner Verification", url: "/admin/winners", icon: CheckCircle2 },
  { title: "Reports & Analytics", url: "/admin/analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-admin/10">
      <SidebarHeader className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-admin flex items-center justify-center shadow-[0_0_15px_hsl(var(--admin)/0.4)]">
            <span className="font-display font-black text-admin-foreground text-sm">G</span>
          </div>
          <div>
            <span className="font-display font-bold text-lg block leading-none">Admin</span>
            <span className="text-[10px] text-admin uppercase tracking-widest font-bold">Control Panel</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className={cn(
                      "transition-all duration-200",
                      location.pathname === item.url 
                        ? "bg-admin/10 text-admin font-medium translate-x-1" 
                        : "hover:bg-admin/5 hover:text-admin"
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-3 py-2">
                      <item.icon className={cn(
                        "w-4 h-4",
                        location.pathname === item.url ? "text-admin" : "text-muted-foreground"
                      )} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-admin/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-admin/5 hover:text-admin">
              <Link to="/dashboard" className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                <span>Exit to User Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
