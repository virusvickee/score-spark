import React from "react";
import { Link } from "react-router-dom";
import { Lock, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SubscriptionGuardProps {
  children: React.ReactNode;
  isActive: boolean;
  feature?: string;
}

export const SubscriptionGuard = ({ children, isActive, feature = "this feature" }: SubscriptionGuardProps) => {
  if (isActive) return <>{children}</>;

  return (
    <div className="relative min-h-[400px] w-full rounded-3xl overflow-hidden border border-primary/20">
      {/* Blurred background content */}
      <div className="absolute inset-0 blur-md pointer-events-none opacity-40 select-none overflow-hidden">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center p-6 md:p-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md glass-card p-8 md:p-10 rounded-3xl shadow-gold shadow-gold-sm"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6 shadow-gold-sm">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          
          <h2 className="font-display font-bold text-2xl mb-3">Subscriber Only Feature</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">
            Detailed access to {feature} is exclusive to our Monthly and Yearly subscribers. 
            Join the community to start tracking scores and entering draws.
          </p>

          <div className="flex flex-col gap-3">
            <Link to="/subscribe">
              <Button variant="hero" size="lg" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" /> Upgrade to Access
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground mt-2 font-bold">
               <ShieldCheck className="w-3 h-3 text-primary" /> 10% auto-donated to charity
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
