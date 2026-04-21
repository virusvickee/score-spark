import { useState } from "react";
import { 
  Users as UsersIcon, 
  Search, 
  Filter, 
  MoreVertical, 
  Pencil, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Plus
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

const MOCK_USERS: any[] = [];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">User Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">View and manage all platform subscribers and their accounts.</p>
        </div>
        <Button className="bg-admin hover:bg-admin/90 text-admin-foreground h-11 px-6 shadow-[0_0_20px_hsl(var(--admin)/0.3)]">
          <Plus className="w-4 h-4 mr-2" /> Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,284", icon: UsersIcon, color: "text-admin" },
          { label: "Active Subscriptions", value: "942", icon: CheckCircle2, color: "text-success" },
          { label: "Pending Verification", value: "12", icon: Filter, color: "text-warning" },
          { label: "Lapsed Accounts", value: "34", icon: XCircle, color: "text-destructive" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-admin/5 border border-admin/10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-3xl font-display font-bold number-display">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#0A0E1A] border border-admin/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-admin/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-admin/[0.02]">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or email..." 
              className="pl-10 bg-[#050810] border-admin/10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="border-admin/20 hover:bg-admin/5 flex-1 sm:flex-none">
              <Filter className="w-3.5 h-3.5 mr-2" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="border-admin/20 hover:bg-admin/5 flex-1 sm:flex-none">
               Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-admin/5 text-[10px] uppercase tracking-widest text-muted-foreground">
                <th className="px-6 py-4 font-bold">User</th>
                <th className="px-6 py-4 font-bold">Plan</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Scores Enterred</th>
                <th className="px-6 py-4 font-bold">Joined Date</th>
                <th className="px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin/10">
              {MOCK_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-admin/[0.05] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-admin/20 flex items-center justify-center text-admin font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs">{user.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-bold text-[10px] uppercase tracking-tighter px-2",
                        user.status === "Active" ? "border-success/50 text-success bg-success/5" :
                        user.status === "Lapsed" ? "border-warning/50 text-warning bg-warning/5" :
                        "border-muted-foreground/50 text-muted-foreground"
                      )}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="flex gap-0.5">
                         {[1,2,3,4,5].map(dot => (
                           <div key={dot} className={cn("w-1.5 h-1.5 rounded-full", dot <= user.scores ? "bg-admin shadow-[0_0_5px_hsl(var(--admin))]" : "bg-muted")} />
                         ))}
                       </div>
                       <span className="text-xs font-medium">{user.scores}/5</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-muted-foreground">{user.joined}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-admin/10">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#0A0E1A] border-admin/20">
                        <DropdownMenuItem className="gap-2 focus:bg-admin/10 focus:text-admin">
                          <Pencil className="w-3.5 h-3.5" /> Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 focus:bg-admin/10 focus:text-admin">
                          <ExternalLink className="w-3.5 h-3.5" /> View Activity
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <Trash2 className="w-3.5 h-3.5" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-admin/10 bg-admin/[0.02] flex items-center justify-between">
           <p className="text-xs text-muted-foreground">Showing 5 of 1,284 users</p>
           <div className="flex gap-2">
             <Button variant="outline" size="sm" disabled className="h-8 border-admin/10">Previous</Button>
             <Button variant="outline" size="sm" className="h-8 border-admin/10 hover:bg-admin/5">Next</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default Users;
