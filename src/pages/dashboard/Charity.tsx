import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, RefreshCw, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CountUp } from "@/components/CountUp";
import { MOCK_USER, MOCK_CHARITY } from "@/lib/dashboardMock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const ALT_CHARITIES = [
  { id: "2", name: "Ocean Conservation Trust" },
  { id: "3", name: "Veterans Aid" },
  { id: "4", name: "Youth Sports Initiative" },
  { id: "5", name: "Mental Health Matters" },
  { id: "6", name: "Food For All" },
];

const Charity = () => {
  const [pct, setPct] = useState(MOCK_CHARITY.contributionPct);
  const [changeOpen, setChangeOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState(25);
  const [search, setSearch] = useState("");

  const monthly = (MOCK_USER.subscriptionFee * pct) / 100;

  const filtered = ALT_CHARITIES.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Charity</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl">My Charity</h1>
        <p className="text-muted-foreground mt-2">Choose how much of your subscription supports your cause.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-primary/30 via-primary/5 to-background-secondary flex items-center justify-center">
            <Heart className="w-24 h-24 text-primary/50" strokeWidth={1.2} />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Your charity
            </span>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="font-display font-bold text-2xl mb-3">{MOCK_CHARITY.name}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{MOCK_CHARITY.desc}</p>
            <div className="rounded-xl bg-primary/5 border border-primary/15 p-4 mb-6">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Total donated all-time</p>
              <p className="text-3xl text-gradient-gold number-display">£<CountUp end={MOCK_CHARITY.totalDonatedAllTime} /></p>
            </div>
            <Button variant="gold-outline" onClick={() => setChangeOpen(true)} className="w-full">
              <RefreshCw className="w-4 h-4" /> Change Charity
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Contribution slider */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-display font-bold text-xl">Contribution percentage</h3>
          <span className="number-display text-3xl text-gradient-gold">{pct}%</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Minimum 10% · maximum 90%.</p>

        <Slider value={[pct]} min={10} max={90} step={1} onValueChange={(v) => setPct(v[0])} className="my-6" />

        <div className="flex justify-between text-xs text-muted-foreground number-display">
          <span>10%</span>
          <span>50%</span>
          <span>90%</span>
        </div>

        <div className="mt-8 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 p-5">
          <p className="text-sm text-muted-foreground">You contribute</p>
          <p className="text-3xl text-gradient-gold number-display my-1">£{monthly.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">per month to <span className="text-foreground font-medium">{MOCK_CHARITY.name}</span></p>
        </div>

        <Button variant="hero" size="lg" className="mt-6 w-full md:w-auto" onClick={() => toast.success(`Contribution updated to ${pct}%`)}>
          Save Contribution
        </Button>
      </motion.div>

      {/* Independent donation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h3 className="font-display font-bold text-xl mb-1">Make an independent donation</h3>
          <p className="text-sm text-muted-foreground">One-off gift, separate from your subscription.</p>
        </div>
        <Button variant="gold-outline" size="lg" onClick={() => setDonateOpen(true)}>
          <Gift className="w-4 h-4" /> Donate Now
        </Button>
      </motion.div>

      {/* Change charity dialog */}
      <Dialog open={changeOpen} onOpenChange={setChangeOpen}>
        <DialogContent className="glass-card border-primary/30 max-w-lg">
          <DialogHeader>
            <DialogTitle>Change your charity</DialogTitle>
            <DialogDescription>Pick a new cause to receive your monthly contribution.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Search charities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-input/40 border-primary/15"
          />
          <div className="max-h-72 overflow-y-auto space-y-2">
            {filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => { toast.success(`Charity changed to ${c.name}`); setChangeOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-md border border-primary/15 hover:border-primary/50 hover:bg-primary/5 transition flex items-center gap-3"
              >
                <Heart className="w-4 h-4 text-primary" />
                <span>{c.name}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No charities match.</p>}
          </div>
        </DialogContent>
      </Dialog>

      {/* Donate dialog */}
      <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
        <DialogContent className="glass-card border-primary/30">
          <DialogHeader>
            <DialogTitle>Independent donation</DialogTitle>
            <DialogDescription>100% of your gift goes to {MOCK_CHARITY.name}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label>Amount (£)</Label>
            <Input
              type="number"
              min={1}
              value={donateAmount}
              onChange={(e) => setDonateAmount(Number(e.target.value) || 0)}
              className="bg-input/40 border-primary/15 number-display text-2xl text-center"
            />
            <div className="flex gap-2">
              {[10, 25, 50, 100].map((v) => (
                <button
                  key={v}
                  onClick={() => setDonateAmount(v)}
                  className="flex-1 py-2 rounded-md border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition text-sm number-display"
                >
                  £{v}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDonateOpen(false)}>Cancel</Button>
            <Button
              variant="hero"
              onClick={() => { toast.success(`£${donateAmount} donation initiated — Stripe checkout coming soon`); setDonateOpen(false); }}
            >
              Donate £{donateAmount}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Charity;
