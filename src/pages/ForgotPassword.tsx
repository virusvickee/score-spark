import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/AuthLayout";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("If that email exists, a reset link is on the way.");
    }, 600);
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email tied to your account and we'll send a reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
        </>
      }
    >
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <p className="text-foreground font-medium mb-2">Check your inbox</p>
          <p className="text-sm text-muted-foreground">A reset link will arrive shortly. The link expires in 30 minutes.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" required className="pl-10 h-11 bg-input/40 border-primary/15 focus-visible:border-primary/50" />
            </div>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
