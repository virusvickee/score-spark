import { NavLink } from "react-router-dom";
import { LayoutDashboard, Trophy, Heart, Dices, Settings } from "lucide-react";

const items = [
  { title: "Home", url: "/dashboard", icon: LayoutDashboard, end: true },
  { title: "Scores", url: "/dashboard/scores", icon: Trophy },
  { title: "Charity", url: "/dashboard/charity", icon: Heart },
  { title: "Draws", url: "/dashboard/draws", icon: Dices },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export const MobileBottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-t border-primary/15">
      <div className="grid grid-cols-5">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_6px_hsl(var(--primary))]" : ""}`} />
                <span className="font-medium">{item.title}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
