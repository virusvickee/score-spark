import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/AuthLayout";
import { toast } from "sonner";
import { Mail, Lock, User, Heart, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CHARITIES = [
  { id: "1", name: "Children's Heart Foundation", desc: "Funding life-saving surgeries." },
  { id: "2", name: "Ocean Conservation Trust", desc: "Protecting our marine life." },
  { id: "3", name: "Veterans Aid", desc: "Support for those who served." },
  { id: "4", name: "Youth Sports Initiative", desc: "Empowering the next generation." },
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const navigate = useNavigate();

  const onAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const onComplete = () => {
    if (!selectedCharity) {
      toast.error("Please select a charity to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <AuthLayout
      title={step === 1 ? "Create your account" : "Select your cause"}
      subtitle={step === 1 ? "Start tracking scores and changing lives." : "Pick the charity that will receive your contributions."}
      footer={
        step === 1 ? (
          <>
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </>
        ) : (
          <button onClick={() => setStep(1)} className="text-muted-foreground hover:text-primary transition">
            Back to account details
          </button>
        )
      }
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={onAccountSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="name" type="text" placeholder="Jane Doe" required className="pl-10 h-11 bg-input/40 border-primary/15 focus-visible:border-primary/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" required className="pl-10 h-11 bg-input/40 border-primary/15 focus-visible:border-primary/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="At least 8 characters" required minLength={8} className="pl-10 h-11 bg-input/40 border-primary/15 focus-visible:border-primary/50" />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Continue to Charities <ChevronRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-primary/10" /></div>
              <div className="relative flex justify-center text-xs uppercase tracking-wider">
                <span className="bg-card px-3 text-muted-foreground">or</span>
              </div>
            </div>

            <Button type="button" variant="outline" size="lg" className="w-full">
              Continue with Google
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid gap-3">
              {CHARITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCharity(c.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    selectedCharity === c.id 
                    ? "bg-primary/10 border-primary shadow-gold-sm" 
                    : "bg-input/20 border-primary/15 hover:border-primary/40 hover:bg-input/40"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                    selectedCharity === c.id ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}>
                    {selectedCharity === c.id ? <Check className="w-5 h-5" /> : <Heart className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${selectedCharity === c.id ? "text-primary" : ""}`}>{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <Button onClick={onComplete} variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Finalizing..." : "Complete Registration"}
            </Button>
            
            <p className="text-[10px] text-muted-foreground text-center">
              A minimum 10% of your future subscription goes directly to your selected charity.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
};

export default Register;
