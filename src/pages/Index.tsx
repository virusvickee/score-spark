import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CreditCard, Target, Trophy, Heart, Dice5, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ParticleField } from "@/components/ParticleField";
import { CountUp } from "@/components/CountUp";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <ParticleField />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="container-narrow relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium tracking-wide text-primary">Monthly draws · Real charity impact</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.05] tracking-tight max-w-4xl mx-auto"
          >
            Your Game. <span className="text-gradient-gold">Their Future.</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Enter your golf scores. Win monthly prizes. Change lives.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/subscribe?plan=monthly">
              <Button variant="hero" size="xl">Subscribe Monthly</Button>
            </Link>
            <Link to="/subscribe?plan=yearly">
              <Button variant="gold-outline" size="xl">Subscribe Yearly</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-16 inline-block glass-card rounded-2xl px-8 py-5"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Total raised for charity</p>
            <p className="text-3xl md:text-4xl text-gradient-gold">
              <CountUp end={124500} prefix="£" />
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative">
        <div className="container-narrow">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps. Real impact."
            subtitle="Subscribe in under a minute. Play golf as you already do. Every month brings a chance to win — and to give."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            {[
              { icon: CreditCard, title: "Subscribe", desc: "Pick monthly or yearly. Choose a charity that matters to you." },
              { icon: Target, title: "Enter Your Scores", desc: "Log five golf scores between 1 and 45. One per date." },
              { icon: Trophy, title: "Win & Give", desc: "Match the monthly draw numbers to win. Your subscription keeps giving." },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card glass-card-hover rounded-2xl p-8 text-center relative z-10"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold-sm mb-6">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-xs text-primary number-display mb-2">0{i + 1}</p>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CHARITY */}
      <section className="py-24">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl overflow-hidden grid md:grid-cols-2"
          >
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <span className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-medium mb-6">
                <Heart className="w-3 h-3" /> This Month's Featured Charity
              </span>
              <h3 className="font-display font-bold text-3xl md:text-4xl mb-4 leading-tight">
                Children's Heart Foundation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Funding life-saving cardiac surgeries for children born with congenital heart defects.
                Every subscription contributes directly to the next operation.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Raised this month</p>
                  <p className="text-2xl text-gradient-gold"><CountUp end={18420} prefix="£" /></p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Subscribers supporting</p>
                  <p className="text-2xl text-gradient-gold"><CountUp end={342} /></p>
                </div>
              </div>
              <Link to="/charities">
                <Button variant="gold-outline" size="lg">Support This Charity</Button>
              </Link>
            </div>
            <div className="relative min-h-[300px] bg-gradient-to-br from-primary/20 via-primary/5 to-background-secondary flex items-center justify-center">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--primary)/0.4),transparent_50%)]" />
              <Heart className="w-32 h-32 text-primary/40" strokeWidth={1} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRIZE POOL */}
      <section id="prize-pool" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-secondary/40 to-transparent" />
        <div className="container-narrow relative z-10">
          <SectionHeader
            eyebrow="The prize pool"
            title="Three ways to win."
            subtitle="Every subscription feeds the prize pool. The more players, the bigger the prizes."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              { tier: "5-Match Jackpot", pct: "40%", amount: 8200, note: "Rolls over if unclaimed" },
              { tier: "4-Match", pct: "35%", amount: 7175 },
              { tier: "3-Match", pct: "25%", amount: 5125 },
            ].map((p, i) => (
              <motion.div
                key={p.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`glass-card glass-card-hover rounded-2xl p-8 ${i === 0 ? "md:scale-105 border-primary/40" : ""}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{p.tier}</p>
                <p className="text-5xl md:text-6xl text-gradient-gold mb-4">
                  <CountUp end={p.amount} prefix="£" />
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pool share</span>
                  <span className="text-primary font-bold number-display">{p.pct}</span>
                </div>
                {p.note && (
                  <div className="mt-6 pt-6 border-t border-primary/10 flex items-center gap-2 text-xs text-muted-foreground">
                    <Dice5 className="w-4 h-4 text-primary animate-float" />
                    {p.note}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24">
        <div className="container-narrow">
          <SectionHeader
            eyebrow="Simple pricing"
            title="Pick your rhythm."
            subtitle="Cancel any time. Every plan supports the charity you choose."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <PricingCard
              name="Monthly"
              price="£15"
              period="/month"
              features={[
                "Entry to every monthly draw",
                "Min. 10% to your chosen charity",
                "Score tracking dashboard",
                "Email draw notifications",
                "Cancel anytime",
              ]}
              ctaTo="/subscribe?plan=monthly"
            />
            <PricingCard
              name="Yearly"
              price="£150"
              period="/year"
              badge="Best Value · Save £30"
              featured
              features={[
                "Everything in Monthly",
                "2 months free vs monthly",
                "Priority winner support",
                "Increase charity contribution up to 90%",
                "Annual impact report",
              ]}
              ctaTo="/subscribe?plan=yearly"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center max-w-2xl mx-auto"
  >
    <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{eyebrow}</p>
    <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-4">{title}</h2>
    <p className="text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
  </motion.div>
);

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  badge?: string;
  featured?: boolean;
  ctaTo: string;
}

const PricingCard = ({ name, price, period, features, badge, featured, ctaTo }: PricingCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`relative glass-card glass-card-hover rounded-2xl p-8 ${
      featured ? "border-primary/50 md:scale-105 shadow-gold-sm" : ""
    }`}
  >
    {badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold whitespace-nowrap shadow-gold-sm">
        {badge}
      </div>
    )}
    <h3 className="font-display font-bold text-2xl mb-2">{name}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-5xl text-gradient-gold number-display">{price}</span>
      <span className="text-muted-foreground">{period}</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-3 text-sm">
          <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
            <Check className="w-3 h-3 text-primary" />
          </span>
          <span className="text-foreground/90">{f}</span>
        </li>
      ))}
    </ul>
    <Link to={ctaTo} className="block">
      <Button variant={featured ? "hero" : "gold-outline"} size="lg" className="w-full">
        Subscribe {name}
      </Button>
    </Link>
  </motion.div>
);

export default Index;
