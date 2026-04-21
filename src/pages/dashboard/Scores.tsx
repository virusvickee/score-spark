import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Pencil, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { INITIAL_SCORES, type GolfScore } from "@/lib/dashboardMock";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const Scores = () => {
  const [scores, setScores] = useState<GolfScore[]>(INITIAL_SCORES);
  const [score, setScore] = useState(25);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingReplace, setPendingReplace] = useState<{ score: number; date: string; oldest: GolfScore } | null>(null);

  const sorted = useMemo(() => [...scores].sort((a, b) => b.date.localeCompare(a.date)), [scores]);
  const isFull = scores.length >= 5;
  const today = new Date().toISOString().slice(0, 10);

  const validate = (): string | null => {
    if (score < 1 || score > 45) return "Score must be between 1 and 45";
    if (!date) return "Please select a date";
    if (date > today) return "Date cannot be in the future";
    const dupe = scores.find((s) => s.date === date && s.id !== editingId);
    if (dupe) return "You already entered a score for this date";
    return null;
  };

  const performAdd = (replaceOldestId?: string) => {
    const newScore: GolfScore = { id: `s${Date.now()}`, score, date };
    setScores((prev) => {
      let next = prev.filter((s) => s.id !== replaceOldestId);
      if (editingId) next = next.filter((s) => s.id !== editingId);
      return [...next, newScore];
    });
    toast.success(editingId ? "Score updated" : "Score added", {
      description: `Score ${score} on ${formatDate(date)}`,
    });
    setScore(25);
    setDate(new Date().toISOString().slice(0, 10));
    setEditingId(null);
  };

  const handleSubmit = () => {
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    if (!editingId && isFull) {
      const oldest = [...scores].sort((a, b) => a.date.localeCompare(b.date))[0];
      setPendingReplace({ score, date, oldest });
      return;
    }
    performAdd();
  };

  const handleEdit = (s: GolfScore) => {
    setEditingId(s.id);
    setScore(s.score);
    setDate(s.date);
  };

  const handleDelete = (id: string) => {
    setScores((prev) => prev.filter((s) => s.id !== id));
    toast.success("Score deleted");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Score management</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl">My Scores</h1>
        <p className="text-muted-foreground mt-2">Stableford format · range 1–45 · max 5 retained.</p>
      </div>

      {/* Score entry form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <h2 className="font-display font-bold text-xl mb-6">{editingId ? "Edit score" : "Enter a new score"}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Score (1–45)</Label>
            <div className="mt-3 mb-4">
              <div className="number-display text-7xl text-center text-gradient-gold tabular-nums">
                {score.toString().padStart(2, "0")}
              </div>
            </div>
            <Slider
              value={[score]}
              min={1}
              max={45}
              step={1}
              onValueChange={(v) => setScore(v[0])}
              className="my-4"
            />
            <div className="flex items-center gap-2 mt-3">
              <Input
                type="number"
                min={1}
                max={45}
                value={score}
                onChange={(e) => setScore(Math.max(1, Math.min(45, Number(e.target.value) || 1)))}
                className="bg-input/40 border-primary/15 text-center number-display"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Date played</Label>
            <Input
              type="date"
              max={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-input/40 border-primary/15"
            />
            <p className="text-xs text-muted-foreground mt-2">No duplicate dates · no future dates.</p>

            <div className="flex-1" />

            <div className="flex gap-3 mt-6">
              {editingId && (
                <Button variant="outline" onClick={() => { setEditingId(null); setScore(25); }} className="flex-1">
                  Cancel
                </Button>
              )}
              <Button variant="hero" size="lg" onClick={handleSubmit} className="flex-1">
                <Plus className="w-4 h-4" /> {editingId ? "Update Score" : "Add Score"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Entry banner */}
      {scores.length === 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl px-5 py-4 bg-success/10 border border-success/30 flex items-center gap-3"
        >
          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
          <p className="text-sm font-medium text-success">You are entered in this month's draw!</p>
        </motion.div>
      )}
      {scores.length < 5 && (
        <div className="rounded-xl px-5 py-4 bg-warning/5 border border-warning/30 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
          <p className="text-sm text-warning">
            Add {5 - scores.length} more {5 - scores.length === 1 ? "score" : "scores"} to enter this month's draw.
          </p>
        </div>
      )}

      {/* Score cards */}
      <div>
        <h3 className="font-display font-bold text-lg mb-4">Your last 5 scores</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <AnimatePresence>
            {sorted.map((s, i) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="glass-card glass-card-hover rounded-xl p-5 group"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Score</p>
                <p className="number-display text-5xl text-gradient-gold mb-3">{s.score.toString().padStart(2, "0")}</p>
                <p className="text-sm text-muted-foreground border-t border-primary/10 pt-3">{formatDate(s.date)}</p>
                <div className="flex gap-2 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(s)}
                    className="p-1.5 rounded-md hover:bg-primary/15 text-muted-foreground hover:text-primary transition"
                    aria-label="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="p-1.5 rounded-md hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {Array.from({ length: Math.max(0, 5 - scores.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="rounded-xl border-2 border-dashed border-primary/25 p-5 flex flex-col items-center justify-center min-h-[180px] text-center hover:border-primary/50 transition"
            >
              <Plus className="w-6 h-6 text-primary/50 mb-2" />
              <p className="text-xs text-muted-foreground">Add a score</p>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={!!pendingReplace} onOpenChange={(o) => !o && setPendingReplace(null)}>
        <AlertDialogContent className="glass-card border-primary/30">
          <AlertDialogHeader>
            <AlertDialogTitle>Replace your oldest score?</AlertDialogTitle>
            <AlertDialogDescription>
              You already have 5 scores. Adding this score will remove your oldest entry:
              <br />
              <span className="text-foreground font-medium mt-2 inline-block">
                Score: {pendingReplace?.oldest.score} · {pendingReplace && formatDate(pendingReplace.oldest.date)}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertogCancel className="bg-secondary">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingReplace) performAdd(pendingReplace.oldest.id);
                setPendingReplace(null);
              }}
              className="bg-gradient-gold text-primary-foreground hover:opacity-90"
            >
              Replace & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Scores;
