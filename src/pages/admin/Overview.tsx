import { 
  Users, 
  Dice5, 
  Heart, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdminOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl flex items-center gap-3">
             System Overview <ShieldCheck className="text-admin w-6 h-6" />
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Welcome back. Here's what's happening on the platform today.</p>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="h-8 border-success/30 text-success bg-success/5 px-3 uppercase tracking-widest text-[10px] font-bold">
              System Live & Healthy
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* TASK LIST / ALERTS */}
         <div className="md:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
               {[
                 { label: "Pending Verifications", value: "12", icon: CheckCircle2, color: "text-warning", link: "/admin/winners" },
                 { label: "New Charity Requests", value: "3", icon: Heart, color: "text-admin", link: "/admin/charities" },
                 { label: "Draw Status", value: "Awaiting", icon: Dice5, color: "text-admin", link: "/admin/draws" },
                 { label: "Support Tickets", value: "5", icon: MessageSquare, color: "text-muted-foreground", link: "#" },
               ].map((item, i) => (
                 <Link to={item.link} key={item.label}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl bg-admin/5 border border-admin/10 hover:bg-admin/[0.08] transition-all group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-2xl font-display font-bold">{item.value}</p>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mt-1">{item.label}</p>
                    </motion.div>
                 </Link>
               ))}
            </div>

            <div className="glass-card rounded-2xl p-6 border-admin/10">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-lg">Server Logs</h3>
                  <Button variant="ghost" size="sm" className="text-admin text-[10px] font-bold tracking-widest uppercase">View All Logs</Button>
               </div>
               <div className="space-y-3">
                  {[
                    { time: "2m ago", type: "AUTH", msg: "New user registration: alex@example.com" },
                    { time: "15m ago", type: "DRAW", msg: "Apr 2026 Simulation run by Admin" },
                    { time: "1h ago", type: "SYSTEM", msg: "Database backup completed successfully" },
                    { time: "3h ago", type: "PAYMENT", msg: "Subscription renewed for #4928" },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4 p-3 rounded-lg bg-white/5 text-[11px]">
                       <span className="text-muted-foreground w-12 flex-shrink-0">{log.time}</span>
                       <span className="text-admin font-bold w-16 uppercase tracking-tighter">{log.type}</span>
                       <span className="text-foreground/80">{log.msg}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* SIDEBAR WIDGETS */}
         <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-admin/20 to-transparent border border-admin/10">
               <div className="flex items-center gap-2 mb-4 text-admin">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Revenue Forecast</span>
               </div>
               <p className="text-3xl font-display font-bold number-display">£21,450</p>
               <p className="text-xs text-muted-foreground mt-1">Expected MRR for May 2026</p>
               <div className="mt-8 pt-8 border-t border-admin/10">
                  <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold mb-3">
                     <span className="text-muted-foreground">System Resource Usage</span>
                  </div>
                  <div className="space-y-3">
                     <div>
                        <div className="flex justify-between text-[10px] mb-1">
                           <span>CPU</span>
                           <span>12%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-success w-[12%]" />
                        </div>
                     </div>
                     <div>
                        <div className="flex justify-between text-[10px] mb-1">
                           <span>Memory</span>
                           <span>42%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-admin w-[42%]" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 rounded-2xl bg-warning/10 border border-warning/20">
               <div className="flex items-center gap-2 mb-3 text-warning">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="text-sm font-bold">Admin Notice</h4>
               </div>
               <p className="text-xs text-warning/80 leading-relaxed">
                  The weighted draw algorithm requires at least 500 active subscribers. Currently at 942. Ready for May draw.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminOverview;
