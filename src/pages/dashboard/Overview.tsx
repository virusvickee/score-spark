import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Trophy, Dices, Wallet, Plus, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/CountUp";
import { MOCK_USER, INITIAL_SCORES, CURRENT_DRAW, WINNINGS } from "@/lib/dashboardMock";

const StatCard = ({ icon: Icon, label, value, accent, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card glass-card-hover rounded-xl p-5"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
    <p className="text-2xl font-display font-bold">{value}</p>
  </motion.div>
);

const Overview = () => {
  const totalWinnings = WINNINGS.reduce((s, w) => s + w.amount, 0);
  const scoreCount = INITIAL_SCORES.length;
  const hasPlan = MOCK_USER.plan !== "None";

  return (
    <div className="space-y-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Dashboard</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl">
          Hey {MOCK_USER.name.split(" ")[0]}, {hasPlan ? "good luck this month!" : "welcome back!"} <span className="inline-block">{hasPlan ? "🏆" : "👋"}</span>
        </h1>
        <p className="text-muted-foreground mt-2">{hasPlan ? "Here's your participation snapshot." : "Subscribe to start tracking scores and win prizes."}</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={hasPlan ? CheckCircle2 : Clock}
          label="Subscription"
          value={hasPlan ? (
            <span className="text-success flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Active
            </span>
          ) : (
            <span className="text-destructive">Lapsed</span>
          )}
          accent={hasPlan ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}
          delay={0.05}
        />
        <StatCard
          icon={Trophy}
          label="Scores Entered"
          value={<span className="number-display">{scoreCount} <span className="text-muted-foreground text-base">/ 5</span></span>}
          accent="bg-primary/15 text-primary"
          delay={0.1}
        />
        <StatCard
          icon={Dices}
          label="Current Draw"
          value={<span className={scoreCount === 5 ? "text-success" : "text-warning"}>{scoreCount === 5 ? "Entered" : "Not Entered"}</span>}
          accent="bg-primary/15 text-primary"
          delay={0.15}
        />
        <StatCard
          icon={Wallet}
          label="Total Winnings"
          value={<span className="text-gradient-gold number-display">£<CountUp end={totalWinnings} /></span>}
          accent="bg-primary/15 text-primary"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary" />
              <p className="text-xs uppercase tracking-wider text-primary">Next draw · {CURRENT_DRAW.month}</p>
            </div>
            <div className="flex items-baseline gap-3 number-display">
              <span className="text-4xl md:text-5xl text-gradient-gold">{CURRENT_DRAW.countdown.days}</span>
              <span className="text-muted-foreground text-sm">days</span>
              <span className="text-3xl md:text-4xl text-foreground">{CURRENT_DRAW.countdown.hours}</span>
              <span className="text-muted-foreground text-sm">hrs</span>
              <span className="text-2xl md:text-3xl text-foreground">{CURRENT_DRAW.countdown.minutes}</span>
              <span className="text-muted-foreground text-sm">min</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/dashboard/scores">
              <Button variant="hero" size="lg" className="w-full">
                <Plus className="w-4 h-4" /> Add Score
              </Button>
            </Link>
            <Link to="/dashboard/draws">
              <Button variant="gold-outline" size="lg" className="w-full">
                View Draws <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
