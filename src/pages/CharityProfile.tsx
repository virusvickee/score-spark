import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Calendar, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountUp } from "@/components/CountUp";
import { toast } from "sonner";

const CHARITY = {
  name: "Children's Heart Foundation",
  category: "Health",
  description:
    "We exist to give every child born with a heart defect a fair chance. Your subscription funds the operations, the post-op care, and the families behind them. Last year, we supported 84 surgeries — every one of them a story.",
  raised: 18420,
  subscribers: 342,
  events: [
    { date: "12 May", name: "Charity Pro-Am" },
    { date: "08 Jun", name: "Annual Gala" },
    { date: "20 Jul", name: "Family Open Day" },
  ],
};

const CharityProfile = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-24">
        <div className="relative h-[300px] md:h-[380px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-background-secondary" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.4),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart className="w-40 h-40 text-primary/30" strokeWidth={1} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container-narrow -mt-24 relative z-10">
          <Link to="/charities" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6">
            <ArrowLeft className="w-4 h-4" /> All charities
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3" /> Featured this month
                </span>
                <h1 className="font-display font-bold text-4xl md:text-5xl leading-tight max-w-2xl">
                  {CHARITY.name}
                </h1>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 py-8 border-y border-primary/10 mb-8">
              <Stat label="Total Raised" value={<><CountUp end={CHARITY.raised} prefix="£" /></>} icon={Heart} />
              <Stat label="Subscribers" value={<CountUp end={CHARITY.subscribers} />} icon={Users} />
              <Stat label="Upcoming events" value={<CountUp end={CHARITY.events.length} />} icon={Calendar} />
            </div>

            <p className="text-foreground/90 leading-relaxed text-lg max-w-3xl mb-10">
              {CHARITY.description}
            </p>

            <div>
              <h3 className="font-display font-bold text-xl mb-5">Upcoming events</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {CHARITY.events.map((e) => (
                  <div key={e.name} className="rounded-xl border border-primary/15 p-5 bg-card-foreground/5 hover:border-primary/40 transition">
                    <p className="text-xs uppercase tracking-wider text-primary mb-2">{e.date}</p>
                    <p className="font-medium">{e.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-primary/10 flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" onClick={() => toast.info("Sign in and subscribe to select a charity.")}>
                Select This Charity
              </Button>
              <Button variant="gold-outline" size="lg" onClick={() => toast.info("Stripe donation modal — connect Cloud + Stripe to enable.")}>
                Make Independent Donation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const Stat = ({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon: React.ElementType }) => (
  <div className="flex items-center gap-4">
    <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-2xl text-gradient-gold">{value}</p>
    </div>
  </div>
);

export default CharityProfile;
