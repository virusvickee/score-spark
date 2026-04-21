import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileImage, Wallet, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/CountUp";
import { WINNINGS, type Winning } from "@/lib/dashboardMock";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const statusBadge = (s: Winning["paymentStatus"]) => {
  const map: Record<Winning["paymentStatus"], string> = {
    "Pending Verification": "bg-warning/15 text-warning border border-warning/30",
    "Proof Submitted": "bg-primary/15 text-primary border border-primary/30",
    "Approved": "bg-success/15 text-success border border-success/30",
    "Paid": "bg-gradient-gold text-primary-foreground",
  };
  return map[s];
};

const Winnings = () => {
  const [winnings, setWinnings] = useState<Winning[]>(WINNINGS);
  const [uploadFor, setUploadFor] = useState<Winning | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const total = winnings.reduce((s, w) => s + w.amount, 0);

  const handleFile = (f: File | null) => {
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }
    if (!["image/png", "image/jpeg"].includes(f.type)) {
      toast.error("PNG or JPG only");
      return;
    }
    setFile(f);
  };

  const submitProof = () => {
    if (!file || !uploadFor) return;
    setWinnings((prev) => prev.map((w) => (w.id === uploadFor.id ? { ...w, paymentStatus: "Proof Submitted" } : w)));
    toast.success("Proof submitted — admin review pending");
    setUploadFor(null);
    setFile(null);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Winnings</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl">My Winnings</h1>
        <p className="text-muted-foreground mt-2">All your prize entries and payment status.</p>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 md:p-10 relative overflow-hidden text-center"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="relative">
          <Wallet className="w-8 h-8 text-primary mx-auto mb-3" />
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Total winnings</p>
          <p className="text-6xl md:text-7xl text-gradient-gold number-display">£<CountUp end={total} /></p>
          <p className="text-muted-foreground mt-3 text-sm">Across {winnings.length} prize {winnings.length === 1 ? "win" : "wins"}.</p>
        </div>
      </motion.div>

      {/* Prize cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {winnings.map((w, i) => (
          <motion.div
            key={w.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card glass-card-hover rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadge(w.paymentStatus)}`}>
                {w.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{w.drawMonth} · {w.tier}</p>
            <p className="text-3xl text-gradient-gold number-display my-2">£{w.amount.toFixed(2)}</p>
            {(w.paymentStatus === "Pending Verification") && (
              <Button variant="hero" size="sm" className="w-full mt-3" onClick={() => setUploadFor(w)}>
                <Upload className="w-3.5 h-3.5" /> Upload Proof
              </Button>
            )}
            {w.paymentStatus === "Proof Submitted" && (
              <p className="text-xs text-muted-foreground mt-3">Awaiting admin review.</p>
            )}
            {w.paymentStatus === "Approved" && (
              <p className="text-xs text-success mt-3">Approved — payment incoming.</p>
            )}
            {w.paymentStatus === "Paid" && (
              <p className="text-xs text-primary mt-3">Paid in full.</p>
            )}
          </motion.div>
        ))}
        {winnings.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">No winnings yet — keep playing!</div>
        )}
      </div>

      {/* Upload modal */}
      <Dialog open={!!uploadFor} onOpenChange={(o) => { if (!o) { setUploadFor(null); setFile(null); } }}>
        <DialogContent className="glass-card border-primary/30">
          <DialogHeader>
            <DialogTitle>Upload winning proof</DialogTitle>
            <DialogDescription>
              Upload a screenshot of your scores from the official golf platform. PNG or JPG · max 5MB.
            </DialogDescription>
          </DialogHeader>

          <label
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0] || null);
            }}
            className={`block rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
              dragOver ? "border-primary bg-primary/5" : "border-primary/25 hover:border-primary/50"
            }`}
          >
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <FileImage className="w-10 h-10 text-primary" />
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-10 h-10 text-primary/60" />
                <p className="text-sm">Drag & drop, or click to upload</p>
                <p className="text-xs text-muted-foreground">PNG or JPG · max 5MB</p>
              </div>
            )}
          </label>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setUploadFor(null); setFile(null); }}>Cancel</Button>
            <Button variant="hero" disabled={!file} onClick={submitProof}>Submit Proof</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Winnings;
