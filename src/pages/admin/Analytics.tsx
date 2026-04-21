import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const GROWTH_DATA: any[] = [];

const CHARITY_DATA: any[] = [];

const COLORS = ["#3B82F6", "#F5C842", "#10B981", "#8B5CF6"];

const Analytics = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Real-time platform growth, revenue metrics, and charitable impact.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="border-admin/20 bg-admin/5 h-11 px-4">
              <Calendar className="w-4 h-4 mr-2" /> Apr 2026
           </Button>
           <Button className="bg-admin hover:bg-admin/90 text-admin-foreground h-11 px-6 shadow-[0_0_20px_hsl(var(--admin)/0.3)]">
              <Download className="w-4 h-4 mr-2" /> Export Report
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MRR (Estimated)", value: "£19,260", trend: "+24%", trendUp: true },
          { label: "Conversion Rate", value: "3.2%", trend: "+0.4%", trendUp: true },
          { label: "Churn Rate", value: "1.1%", trend: "-0.2%", trendUp: false },
          { label: "Charity Payouts", value: "£42,500", trend: "+12%", trendUp: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-admin/5 border border-admin/10"
          >
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-3">{stat.label}</p>
            <div className="flex items-end justify-between">
               <p className="text-3xl font-display font-bold number-display">{stat.value}</p>
               <div className={`flex items-center gap-1 text-xs font-bold ${stat.trendUp ? "text-success" : "text-destructive"}`}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
         {/* GROWTH CHART */}
         <div className="glass-card rounded-2xl p-6 border-admin/20 bg-admin/[0.02]">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="font-display font-bold text-lg">User Growth</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Lifetime active subscribers</p>
               </div>
               <div className="flex items-center gap-2">
                  <Badge className="bg-admin/20 text-admin border-0">ACTIVE</Badge>
               </div>
            </div>
            
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA}>
                     <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#9ca3af'}} 
                        dy={10}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#9ca3af'}} 
                     />
                     <Tooltip 
                        contentStyle={{backgroundColor: '#0A0E1A', border: '1px solid #3b82f630', borderRadius: '12px'}}
                        itemStyle={{color: '#3b82f6'}}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#3B82F6" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorUsers)" 
                        animationDuration={2000}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* CHARITY DISTRIBUTION */}
         <div className="glass-card rounded-2xl p-6 border-admin/20 bg-admin/[0.02]">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="font-display font-bold text-lg">Charity Allocation</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Total funds by category</p>
               </div>
               <Button variant="ghost" size="sm" className="text-admin text-[10px] font-black uppercase tracking-widest gap-1 h-7">
                  View Partners <ArrowRight className="w-3 h-3" />
               </Button>
            </div>
            
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHARITY_DATA} layout="vertical" margin={{ left: 20 }}>
                     <XAxis type="number" hide />
                     <YAxis 
                        type="category" 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fontSize: 10, fill: '#9ca3af'}}
                        width={100}
                     />
                     <Tooltip 
                        cursor={{fill: '#ffffff05'}}
                        contentStyle={{backgroundColor: '#0A0E1A', border: '1px solid #3b82f630', borderRadius: '12px'}}
                     />
                     <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} animationDuration={1500}>
                        {CHARITY_DATA.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-admin/20 via-admin/5 to-transparent border border-admin/10 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-admin/10 flex items-center justify-center text-admin shadow-inner">
               <TrendingUp className="w-8 h-8" />
            </div>
            <div>
               <h3 className="text-2xl font-display font-bold">Scaling to the next level?</h3>
               <p className="text-muted-foreground">Your platform growth is currently outperforming projections by 12.4% for Q2.</p>
            </div>
         </div>
         <Button className="w-full md:w-auto h-12 px-8 bg-admin text-admin-foreground font-bold shadow-[0_10px_30px_-10px_hsl(var(--admin)/0.5)]">
            Generate Q2 Insight Report
         </Button>
      </div>
    </div>
  );
};

export default Analytics;
