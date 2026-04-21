import { NavLink, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Trophy, Heart, Dices, Wallet, Settings, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard, end: true },
  { title: "My Scores", url: "/dashboard/scores", icon: Trophy },
  { title: "My Charity", url: "/dashboard/charity", icon: Heart },
  { title: "Draw Results", url: "/dashboard/draws", icon: Dices },
  { title: "My Winnings", url: "/dashboard/winnings", icon: Wallet },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-primary/10">
      <SidebarHeader className="border-b border-primary/10">
        <Link to="/" className="flex items-center gap-2 px-2 py-3 group">
          <div className="w-8 h-8 rounded-md bg-gradient-gold flex items-center justify-center shadow-gold-sm flex-shrink-0">
            <span className="font-display font-black text-primary-foreground text-sm">G</span>
          </div>
          {!collapsed && <span className="font-display font-bold text-lg tracking-tight">GolfDraw</span>}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = item.end ? location.pathname === item.url : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        end={item.end}
                        className={`flex items-center gap-3 ${
                          active
                            ? "bg-primary/15 text-primary border-l-2 border-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-primary/10">
        {!collapsed && (
          <div className="px-3 py-2 mb-2 rounded-md bg-success/10 border border-success/20">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Subscription</p>
            <p className="text-xs font-medium text-success flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Active · Yearly
            </p>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/login" className="text-muted-foreground hover:text-destructive">
                <LogOut className="w-4 h-4" />
                {!collapsed && <span>Logout</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
