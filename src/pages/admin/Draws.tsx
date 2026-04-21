import { useState } from "react";
import { 
  Dice5, 
  Play, 
  Settings2, 
  History, 
  Trophy, 
  Users, 
  Layers,
  ArrowRight,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Draws = () => {
  const [logic, setLogic] = useState("random");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<{
    numbers: number[];
    winners: { tier: string; count: number; prize: number }[];
  } | null>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    
    // Fake simulation delay
    setTimeout(() => {
      const nums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 45) + 1).sort((a, b) => a - b);
      setSimulationResult({
        numbers: nums,
        winners: [
          { tier: "5-Match Jackpot", count: 1, prize: 8200 },
          { tier: "4-Match", count: 14, prize: 512.5 },
          { tier: "3-Match", count: 86, prize: 59.60 },
        ]
      });
      setIsSimulating(false);
      toast.success("Simulation complete! Results ready for review.");
    }, 2000);
  };

  const publishResults = () => {
    toast.promise(new Promise(res => setTimeout(res, 1500)), {
      loading: 'Publishing results and notifying winners...',
      success: 'Draw results published successfully!',
      error: 'Error publishing results.',
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Draw Engine</h1>
          <p className="text-muted-foreground mt-1 text-sm">Configure, simulate, and publish monthly prize draws.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-8 border-admin/30 text-admin bg-admin/5 px-3">
            NEXT DRAW: MAY 1st, 2026
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* CONFIGURATION */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-2xl p-6 border-admin/10">
            <div className="flex items-center gap-2 mb-6">
              <Settings2 className="w-5 h-5 text-admin" />
              <h2 className="font-display font-bold text-lg">Configuration</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Draw Logic Strategy</Label>
                <Select value={logic} onValueChange={setLogic}>
                  <SelectTrigger className="bg-admin/5 border-admin/10">
                    <SelectValue placeholder="Select logic" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0E1A] border-admin/20">
                    <SelectItem value="random">Pure Random (Lottery)</SelectItem>
                    <SelectItem value="algorithm">Weighted Algorithm</SelectItem>
                    <SelectItem value="jackpot-control">Jackpot Control Mode</SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-3 rounded-lg bg-admin/5 border border-admin/10 flex gap-3 text-[11px] text-muted-foreground leading-relaxed">
                   <Info className="w-4 h-4 text-admin flex-shrink-0" />
                   {logic === 'random' && "Uses standard cryptographic secure random generation. Every combination has equal probability."}
                   {logic === 'algorithm' && "Weights probabilities towards numbers less frequently played by users to control payouts."}
                   {logic === 'jackpot-control' && "Specifically optimizes numbers to ensure the 5-match jackpot rolls over to next month."}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-admin/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Automatic Publish</p>
                    <p className="text-xs text-muted-foreground">Publish immediately after run</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Notify Users</p>
                    <p className="text-xs text-muted-foreground">Send email alerts to all participants</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button 
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full bg-admin hover:bg-admin/90 text-admin-foreground h-12 shadow-[0_0_20px_hsl(var(--admin)/0.3)] mt-2"
              >
                {isSimulating ? (
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isSimulating ? "Running Simulation..." : "Run Draw Simulation"}
              </Button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-success/5 border border-success/20">
            <div className="flex items-center justify-between mb-4">
               <span className="text-xs font-bold text-success uppercase tracking-widest">Active Prize Pool</span>
               <Badge className="bg-success text-success-foreground font-bold">READY</Badge>
            </div>
            <p className="text-4xl font-display font-bold text-success number-display">£24,510</p>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Auto-calculated from 942 active monthly subscribers.</p>
          </div>
        </div>

        {/* RESULTS / SIMULATION PREVIEW */}
        <div className="lg:col-span-2">
           <AnimatePresence mode="wait">
             {!simulationResult && !isSimulating ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] rounded-2xl border-2 border-dashed border-admin/20 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-admin/5 flex items-center justify-center mb-4">
                    <Dice5 className="w-8 h-8 text-admin/40" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">No Draw Data Selected</h3>
                  <p className="text-muted-foreground max-w-xs text-sm">
                    Configure your draw logic and run a simulation to see projected distributions and winners.
                  </p>
                </motion.div>
             ) : isSimulating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[400px] rounded-2xl bg-admin/5 border border-admin/10 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="relative mb-6">
                    <Dice5 className="w-16 h-16 text-admin animate-pulse" />
                    <div className="absolute inset-0 bg-admin/20 blur-xl rounded-full" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">Analyzing Subscription Pool...</h3>
                  <p className="text-muted-foreground text-sm">Crunching 4,710 registered scores against {logic} logic.</p>
                </motion.div>
             ) : (
                <motion.div 
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="glass-card rounded-2xl p-8 border-admin/20 bg-admin/[0.03]">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="font-display font-bold text-xl flex items-center gap-2">
                         <Sparkles className="w-5 h-5 text-admin" /> 
                         Simulation Results Preview
                       </h3>
                       <Badge className="bg-admin/20 text-admin border-admin/20">LOGIC: {logic.toUpperCase()}</Badge>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
                       {simulationResult?.numbers.map((n, i) => (
                         <motion.div 
                           key={i}
                           initial={{ rotateY: 90, opacity: 0 }}
                           animate={{ rotateY: 0, opacity: 1 }}
                           transition={{ delay: i * 0.1, type: "spring" }}
                           className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-admin/20 to-admin/5 border-2 border-admin/30 flex items-center justify-center text-2xl md:text-3xl font-display font-black text-admin shadow-[0_10px_20px_-5px_hsl(var(--admin)/0.2)]"
                         >
                           {n}
                         </motion.div>
                       ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                       {simulationResult?.winners.map((w, i) => (
                         <div key={i} className="p-4 rounded-xl bg-[#050810] border border-admin/10">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">{w.tier}</p>
                            <div className="flex items-baseline justify-between">
                               <p className="text-xl font-bold">{w.count} Winners</p>
                               <p className="text-sm text-admin font-bold">£{w.prize} ea.</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-admin/10 flex flex-col sm:flex-row gap-4">
                       <Button variant="outline" className="flex-1 border-admin/20" onClick={() => setSimulationResult(null)}>
                         Discard Simulation
                       </Button>
                       <Button className="flex-2 bg-success hover:bg-success/90 text-success-foreground font-bold px-10 shadow-[0_0_25px_hsl(var(--success)/0.3)]" onClick={publishResults}>
                         Publish Official Results
                       </Button>
                    </div>
                  </div>

                  <div className="bg-admin/5 border border-admin/10 rounded-2xl p-6">
                    <h4 className="font-display font-bold text-sm mb-4 flex items-center gap-2">
                      <History className="w-4 h-4 text-admin" /> 
                      Audit Insight
                    </h4>
                    <div className="space-y-3">
                       <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Projected Total Payout</span>
                          <span className="font-bold">£21,200.50</span>
                       </div>
                       <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Admin Fee Allocation</span>
                          <span className="font-bold text-admin">£3,310.00</span>
                       </div>
                       <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Jackpot Rollover Risk</span>
                          <span className="font-bold text-success">LOW (expected winner)</span>
                       </div>
                    </div>
                  </div>
                </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Draws;
