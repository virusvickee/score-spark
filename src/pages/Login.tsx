import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/AuthLayout";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.info("Auth coming soon — connect Lovable Cloud to enable sign-in.");
    }, 600);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to track your scores and check the next draw."
      footer={
        <>
          New here?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="you@example.com" required className="pl-10 h-11 bg-input/40 border-primary/15 focus-visible:border-primary/50" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input id="password" type="password" placeholder="••••••••" required className="pl-10 h-11 bg-input/40 border-primary/15 focus-visible:border-primary/50" />
          </div>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
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
      </form>
    </AuthLayout>
  );
};

export default Login;
