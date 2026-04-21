import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Clock, 
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Banknote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_SUBMISSIONS: any[] = [];

const Winners = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const handleApprove = (id: string) => {
    toast.success(`Submission ${id} approved for payout!`);
  };

  const handleReject = (id: string) => {
    toast.error(`Submission ${id} rejected.`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Winner Verification</h1>
          <p className="text-muted-foreground mt-1 text-sm">Review uploaded score proof and verify payouts for draw winners.</p>
        </div>
      </div>

      <div className="flex bg-admin/5 p-1 rounded-xl w-fit">
         {["pending", "approved", "paid"].map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
               activeTab === tab ? "bg-admin text-admin-foreground shadow-lg" : "text-muted-foreground hover:text-admin"
             }`}
           >
             {tab}
           </button>
         ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0A0E1A] border border-admin/10 rounded-2xl overflow-hidden shadow-2xl">
               <div className="p-6 border-b border-admin/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-admin/[0.02]">
                  <div className="relative w-full sm:max-w-xs">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                     <Input placeholder="Search winners..." className="pl-10 bg-[#050810] border-admin/10" />
                  </div>
                  <Button variant="outline" size="sm" className="border-admin/20">
                     <Filter className="w-3.5 h-3.5 mr-2" /> Month: Mar 2026
                  </Button>
               </div>

               <div className="divide-y divide-admin/10">
                  {MOCK_SUBMISSIONS.filter(s => s.status.toLowerCase() === activeTab || activeTab === 'all').map((sub) => (
                    <motion.div 
                      key={sub.id} 
                      className="p-6 hover:bg-admin/[0.03] transition-colors"
                      layout
                    >
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-admin/10 flex items-center justify-center text-admin font-bold shadow-inner">
                                {sub.user.charAt(0)}
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                   <p className="font-bold text-foreground">{sub.user}</p>
                                   <Badge className="bg-admin/20 text-admin h-4 px-1.5 text-[8px] font-black uppercase text-center flex justify-center items-center">
                                      {sub.tier}
                                   </Badge>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-0.5">{sub.email} • ID: {sub.id}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-lg font-bold text-gradient-gold tabular-nums">{sub.amount}</p>
                             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{sub.drawMonth} Draw</p>
                          </div>
                       </div>

                       <div className="mt-6 p-4 rounded-xl bg-[#050810] border border-admin/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-admin/10 flex items-center justify-center text-admin">
                                <ImageIcon className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-xs font-semibold">score_proof_{sub.id}.png</p>
                                <p className="text-[10px] text-muted-foreground">Uploaded on {sub.date}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                             <Button size="sm" variant="outline" className="flex-1 sm:flex-none border-admin/20 gap-2 h-9">
                                <Eye className="w-3.5 h-3.5" /> View Proof
                             </Button>
                             {sub.status === 'Pending' && (
                               <>
                                 <Button 
                                   size="sm" 
                                   onClick={() => handleReject(sub.id)}
                                   className="flex-1 sm:flex-none bg-destructive/10 text-destructive hover:bg-destructive/20 border-0 h-9 px-4"
                                 >
                                   Reject
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   onClick={() => handleApprove(sub.id)}
                                   className="flex-1 sm:flex-none bg-success text-success-foreground hover:bg-success/90 font-bold h-9 px-6 shadow-[0_0_15px_hsl(var(--success)/0.3)]"
                                 >
                                   Approve
                                 </Button>
                               </>
                             )}
                             {sub.status === 'Approved' && (
                                <Button size="sm" className="flex-1 sm:flex-none bg-admin text-admin-foreground font-bold h-9 px-6 shadow-[0_0_15px_hsl(var(--admin)/0.3)]">
                                   Process Payout
                                </Button>
                             )}
                          </div>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-admin/5 border border-admin/10">
               <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2 text-admin">
                 <Banknote className="w-5 h-5" /> 
                 Payout Status
               </h3>
               <div className="space-y-4">
                  {[
                    { label: "Pending Verification", value: "12", color: "text-warning", icon: Clock },
                    { label: "Ready for Payout", value: "8", color: "text-admin", icon: CheckCircle2 },
                    { label: "Total Paid (This Month)", value: "£42,500", color: "text-success", icon: Banknote },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-admin/[0.03] border border-admin/5">
                       <div className="flex items-center gap-2">
                          <stat.icon className={`w-4 h-4 ${stat.color}`} />
                          <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                       </div>
                       <span className="text-sm font-bold">{stat.value}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border-admin/20 bg-admin/[0.03]">
               <h4 className="text-[10px] uppercase font-bold text-admin tracking-wider mb-4">Latest Verifications</h4>
               <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success">
                          <CheckCircle2 className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-xs font-bold">Payout Processed</p>
                          <p className="text-[10px] text-muted-foreground">ID: #4928 • 1h ago</p>
                       </div>
                       <ChevronRight className="w-3 h-3 ml-auto text-muted-foreground" />
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Winners;
