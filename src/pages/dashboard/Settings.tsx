import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MOCK_USER } from "@/lib/dashboardMock";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

const SectionCard = ({ title, desc, children, delay = 0 }: any) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card rounded-2xl p-6 md:p-8"
  >
    <h2 className="font-display font-bold text-xl">{title}</h2>
    {desc && <p className="text-sm text-muted-foreground mt-1 mb-6">{desc}</p>}
    {!desc && <div className="mb-6" />}
    {children}
  </motion.section>
);

const Settings = () => {
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [emailNotif, setEmailNotif] = useState(true);
  const [drawNotif, setDrawNotif] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Account</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl">Settings</h1>
      </div>

      <SectionCard title="Profile" desc="Your public account details.">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="bg-input/40 border-primary/15" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-input/40 border-primary/15" />
          </div>
        </div>
        <Button variant="hero" className="mt-6" onClick={() => toast.success("Profile updated")}>Save Changes</Button>
      </SectionCard>

      <SectionCard title="Password" desc="Update your password regularly to keep your account secure." delay={0.05}>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Current</Label>
            <Input type="password" className="bg-input/40 border-primary/15" />
          </div>
          <div className="space-y-2">
            <Label>New</Label>
            <Input type="password" className="bg-input/40 border-primary/15" />
          </div>
          <div className="space-y-2">
            <Label>Confirm</Label>
            <Input type="password" className="bg-input/40 border-primary/15" />
          </div>
        </div>
        <Button variant="gold-outline" className="mt-6" onClick={() => toast.success("Password updated")}>Update Password</Button>
      </SectionCard>

      <SectionCard title="Subscription" delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl bg-success/5 border border-success/20 p-5 mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-success flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Active · {MOCK_USER.plan}
            </p>
            <p className="text-sm mt-1">Renews on <span className="font-medium">{new Date(MOCK_USER.renewalDate).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span></p>
          </div>
          <Button variant="outline" onClick={() => toast.info("Stripe customer portal — connect Cloud + Stripe to enable")}>
            Manage in Stripe
          </Button>
        </div>
        <button onClick={() => toast.info("Cancellation flow — coming soon")} className="text-sm text-destructive hover:underline">
          Cancel subscription
        </button>
      </SectionCard>

      <SectionCard title="Notifications" desc="Choose what you'd like to hear about." delay={0.15}>
        <div className="space-y-4">
          {[
            { label: "Email notifications", desc: "Account updates and renewal reminders.", val: emailNotif, set: setEmailNotif },
            { label: "Draw results", desc: "Notify me when monthly draw results are published.", val: drawNotif, set: setDrawNotif },
            { label: "Marketing", desc: "Product news and partner offers.", val: marketing, set: setMarketing },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 py-3 border-b border-primary/10 last:border-0">
              <div>
                <p className="text-sm font-medium">{row.label}</p>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
              <Switch checked={row.val} onCheckedChange={row.set} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Danger zone" desc="These actions are permanent and cannot be undone." delay={0.2}>
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-medium text-destructive">Delete account</p>
            <p className="text-xs text-muted-foreground">All your scores, winnings, and contribution history will be permanently removed.</p>
          </div>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="w-4 h-4" /> Delete Account
          </Button>
        </div>
      </SectionCard>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="glass-card border-destructive/40">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This is permanent. Your subscription will be cancelled and all data removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => { toast.success("Account deletion requested"); setDeleteOpen(false); }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, delete forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
