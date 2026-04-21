import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "£15",
    period: "per month",
    features: [
      "Entry to every monthly draw",
      "Min. 10% to your chosen charity",
      "Score tracking dashboard",
      "Email draw notifications",
      "Cancel anytime",
    ],
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "£150",
    period: "per year",
    badge: "Best Value · Save £30",
    featured: true,
    features: [
      "Everything in Monthly",
      "2 months free vs monthly",
      "Priority winner support",
      "Increase charity contribution up to 90%",
      "Annual impact report",
    ],
  },
];

const Subscribe = () => {
  const [params] = useSearchParams();
  const preselect = params.get("plan");

  const handleSubscribe = (planId: string) => {
    toast.info(`Stripe checkout for ${planId} plan — connect Lovable Cloud + Stripe to enable.`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container-narrow">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Subscribe</p>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">Choose your plan</h1>
            <p className="text-muted-foreground text-lg">
              You'll select your charity right after subscribing. Cancel anytime from your dashboard.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative glass-card glass-card-hover rounded-2xl p-8 ${
                  (plan.featured || preselect === plan.id) ? "border-primary/50 shadow-gold-sm" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold whitespace-nowrap shadow-gold-sm">
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl text-gradient-gold number-display">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  variant={plan.featured ? "hero" : "gold-outline"}
                  size="lg"
                  className="w-full"
                >
                  Subscribe {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            Secure payment via Stripe · Encrypted end-to-end
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Subscribe;
