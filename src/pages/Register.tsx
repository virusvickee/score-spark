import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/AuthLayout";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.info("Auth coming soon — connect Lovable Cloud to enable account creation.");
    }, 600);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking scores, supporting charity, and entering the monthly draw."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
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

        <div className="space-y-2">
          <Label htmlFor="confirm" className="text-xs uppercase tracking-wider text-muted-foreground">Confirm password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="confirm" type="password" placeholder="Repeat password" required minLength={8} className="pl-10 h-11 bg-input/40 border-primary/15 focus-visible:border-primary/50" />
          </div>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
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

        <p className="text-xs text-muted-foreground text-center pt-2">
          By creating an account you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
