import { NavLink, useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Trophy, Heart, Dices, Wallet, Settings, LogOut, ShieldAlert, ShieldCheck } from "lucide-react";
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
import { MOCK_USER } from "@/lib/dashboardMock";
import { cn } from "@/lib/utils";

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
  const hasPlan = MOCK_USER.plan !== "None";

  return (
    <Sidebar collapsible="icon" className="border-r border-primary/10">
      <SidebarHeader className="border-b border-primary/10 px-2 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-md bg-gradient-gold flex items-center justify-center shadow-gold-sm flex-shrink-0">
            <span className="font-display font-black text-primary-foreground text-sm">G</span>
          </div>
          {!collapsed && <span className="font-display font-bold text-lg tracking-tight">GolfDraw</span>}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-2">User Dashboard</SidebarGroupLabel>
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
                        className={cn(
                          "flex items-center gap-3 transition-all duration-200",
                          active
                            ? "bg-primary/10 text-primary font-bold border-l-2 border-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-primary shadow-glow" : "text-muted-foreground")} />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-auto px-4 pb-4">
             <Link to="/admin" className="flex items-center gap-2 p-3 rounded-xl bg-admin/5 border border-admin/10 text-admin hover:bg-admin/10 transition-colors group">
                <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Admin Control</span>
             </Link>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-primary/10 p-4">
        {!collapsed && (
          <div className={cn(
            "px-3 py-2.5 mb-4 rounded-xl border transition-all duration-300",
            hasPlan ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
          )}>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-bold">Plan Status</p>
            <p className={cn(
               "text-xs font-bold flex items-center gap-2",
               hasPlan ? "text-success" : "text-destructive"
            )}>
              {hasPlan ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> 
                  Active · {MOCK_USER.plan}
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3 h-3" /> 
                  Lapsed · No Plan
                </>
              )}
            </p>
            {!hasPlan && (
               <Link to="/subscribe" className="block mt-2 text-[10px] text-primary hover:underline font-bold uppercase tracking-widest">
                  Renew Now →
               </Link>
            )}
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/login" className="text-muted-foreground hover:text-destructive group">
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                {!collapsed && <span>Logout</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
