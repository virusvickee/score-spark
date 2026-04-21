import { useState } from "react";
import { 
  Heart, 
  Plus, 
  Search, 
  Settings, 
  ExternalLink, 
  MoreVertical,
  Pencil,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  TrendingUp,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const MOCK_CHARITIES: any[] = [];

const AdminCharities = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Charity Administration</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage charitable partners, spotlight sections, and contribution tracking.</p>
        </div>
        <Button className="bg-admin hover:bg-admin/90 text-admin-foreground h-11 px-6 shadow-[0_0_20px_hsl(var(--admin)/0.3)]">
          <Plus className="w-4 h-4 mr-2" /> Add New Charity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="md:col-span-2 space-y-6">
            <div className="bg-[#0A0E1A] border border-admin/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-admin/10 flex items-center justify-between bg-admin/[0.02]">
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search charities..." className="pl-10 bg-[#050810] border-admin/10" />
                </div>
                <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="border-admin/20">Active Only</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-admin/5 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                      <th className="px-6 py-4">Charity</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Total Raised</th>
                      <th className="px-6 py-4">Supporters</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-admin/10">
                    {MOCK_CHARITIES.map((c) => (
                      <tr key={c.id} className="hover:bg-admin/[0.03] transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-admin/10 flex items-center justify-center text-admin">
                                 <Heart className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold flex items-center gap-2">
                                   {c.name}
                                   {c.featured && <Badge className="bg-admin/20 text-admin text-[8px] h-4">FEATURED</Badge>}
                                 </p>
                                 <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{c.category}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <Badge variant="outline" className={c.status === 'Active' ? 'text-success border-success/30' : 'text-muted-foreground border-muted-foreground/30'}>
                             {c.status}
                           </Badge>
                        </td>
                        <td className="px-6 py-4">
                           <p className="text-sm font-bold text-gradient-gold">{c.raised}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                           {c.subscribers}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-[#0A0E1A] border-admin/20">
                                <DropdownMenuItem className="gap-2 focus:bg-admin/10 focus:text-admin">
                                  <Pencil className="w-3.5 h-3.5" /> Edit Info
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 focus:bg-admin/10 focus:text-admin">
                                  <ImageIcon className="w-3.5 h-3.5" /> Manage Media
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 focus:bg-admin/10 focus:text-admin">
                                  <TrendingUp className="w-3.5 h-3.5" /> Impact Report
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
                                  <Trash2 className="w-3.5 h-3.5" /> Remove Partner
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                           </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
         </div>

         <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border-admin/20 bg-admin/[0.03]">
               <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                 <CheckCircle2 className="w-5 h-5 text-admin" /> 
                 Onboarding Queue
               </h3>
               <div className="space-y-4">
                  {[
                    { name: "Save The Bees", site: "bees.org", date: "2 days ago" },
                    { name: "Global Reforest", site: "forest.io", date: "5 days ago" },
                  ].map((req, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#050810] border border-admin/10 flex items-center justify-between">
                       <div>
                          <p className="text-sm font-bold">{req.name}</p>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                             <Globe className="w-3 h-3" /> {req.site} • {req.date}
                          </p>
                       </div>
                       <Button size="sm" className="h-8 bg-admin/10 text-admin hover:bg-admin/20 px-3">Review</Button>
                    </div>
                  ))}
               </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-admin/20 to-transparent border border-admin/10">
               <div className="flex items-center gap-2 mb-4 text-admin">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Platform Impact</span>
               </div>
               <p className="text-3xl font-display font-bold number-display">£124,500</p>
               <p className="text-xs text-muted-foreground mt-1">Total lifetime platform contributions</p>
               <div className="mt-6 pt-6 border-t border-admin/10">
                  <div className="flex justify-between text-xs mb-2">
                     <span className="text-muted-foreground">Monthly Avg</span>
                     <span className="font-bold">£15,200</span>
                  </div>
                  <div className="w-full h-1.5 bg-admin/10 rounded-full overflow-hidden">
                     <div className="h-full bg-admin w-3/4 rounded-full shadow-[0_0_10px_hsl(var(--admin))]" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminCharities;
