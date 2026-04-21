import { motion } from "framer-motion";
import { Dices } from "lucide-react";
import { CURRENT_DRAW, INITIAL_SCORES, PAST_DRAWS } from "@/lib/dashboardMock";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const NumberBall = ({ n, matched, delay = 0 }: { n: number; matched?: boolean; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, rotateY: 180, scale: 0.6 }}
    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={`number-display flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full text-base md:text-lg font-bold ${
      matched
        ? "bg-gradient-gold text-primary-foreground shadow-gold-sm"
        : "bg-secondary border border-primary/15 text-muted-foreground"
    }`}
  >
    {n.toString().padStart(2, "0")}
  </motion.div>
);

const statusStyle = (status: string) => {
  if (status.includes("Jackpot")) return "bg-gradient-gold text-primary-foreground";
  if (status.includes("Winner")) return "bg-success/15 text-success border border-success/30";
  if (status === "Entered") return "bg-primary/15 text-primary border border-primary/30";
  return "bg-muted text-muted-foreground border border-border/30";
};

const Draws = () => {
  const scoresEntered = INITIAL_SCORES.length === 5;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Draws</p>
        <h1 className="font-display font-bold text-3xl md:text-4xl">Draw Results</h1>
        <p className="text-muted-foreground mt-2">Your monthly draw status and historical wins.</p>
      </div>

      {/* Current draw */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary mb-1">Current draw · {CURRENT_DRAW.month}</p>
              <h2 className="font-display font-bold text-2xl">
                {scoresEntered ? "You're entered" : "Not entered yet"}
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/30 text-warning text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" /> Awaiting results
            </div>
          </div>

          {scoresEntered ? (
            <>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Your 5 scores</p>
              <div className="flex flex-wrap gap-3 mb-6">
                {[...INITIAL_SCORES].sort((a, b) => a.score - b.score).map((s, i) => (
                  <NumberBall key={s.id} n={s.score} delay={i * 0.1} />
                ))}
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Dices className="w-4 h-4 animate-pulse text-primary" />
                Awaiting winning numbers — published on the last day of the month.
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Add 5 scores to enter this month's draw.</p>
          )}
        </div>
      </motion.div>

      {/* Past draws */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-4 md:p-6 overflow-x-auto"
      >
        <h3 className="font-display font-bold text-xl mb-4 px-2">Past draws</h3>
        <Table>
          <TableHeader>
            <TableRow className="border-primary/10 hover:bg-transparent">
              <TableHead>Month</TableHead>
              <TableHead>Your scores</TableHead>
              <TableHead>Winning numbers</TableHead>
              <TableHead className="text-center">Matches</TableHead>
              <TableHead className="text-right">Prize</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAST_DRAWS.map((d) => (
              <TableRow key={d.id} className="border-primary/10 hover:bg-primary/5">
                <TableCell className="font-medium whitespace-nowrap">{d.month}</TableCell>
                <TableCell>
                  <div className="flex gap-1.5 flex-wrap">
                    {d.yourScores.map((n) => (
                      <span
                        key={n}
                        className={`number-display text-xs px-2 py-1 rounded ${
                          d.winningNumbers.includes(n)
                            ? "bg-gradient-gold text-primary-foreground font-bold"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {n.toString().padStart(2, "0")}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1.5 flex-wrap">
                    {d.winningNumbers.map((n) => (
                      <span
                        key={n}
                        className={`number-display text-xs px-2 py-1 rounded ${
                          d.yourScores.includes(n)
                            ? "bg-gradient-gold text-primary-foreground font-bold"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {n.toString().padStart(2, "0")}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center number-display text-primary font-bold">{d.matches}</TableCell>
                <TableCell className="text-right number-display">{d.prize > 0 ? `£${d.prize.toFixed(2)}` : "—"}</TableCell>
                <TableCell>
                  <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${statusStyle(d.status)}`}>
                    {d.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default Draws;
