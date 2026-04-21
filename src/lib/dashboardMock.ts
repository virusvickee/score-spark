// Mock data store for the dashboard (frontend-only).
// Replace with real Cloud queries once backend is connected.

export const MOCK_USER = {
  name: "Alex Morgan",
  email: "alex@example.com",
  plan: "Yearly" as "Monthly" | "Yearly",
  subscriptionFee: 12.5, // £/month equivalent
  renewalDate: "2027-03-12",
  joined: "2025-09-04",
};

export const MOCK_CHARITY = {
  id: "1",
  name: "Children's Heart Foundation",
  desc: "Funding life-saving cardiac surgeries for children with congenital heart defects.",
  totalDonatedAllTime: 184.5,
  contributionPct: 25,
};

export type GolfScore = { id: string; score: number; date: string };

export const INITIAL_SCORES: GolfScore[] = [
  { id: "s1", score: 32, date: "2026-04-12" },
  { id: "s2", score: 28, date: "2026-04-05" },
  { id: "s3", score: 35, date: "2026-03-28" },
  { id: "s4", score: 30, date: "2026-03-21" },
];

export type DrawRow = {
  id: string;
  month: string;
  yourScores: number[];
  winningNumbers: number[];
  matches: number;
  prize: number;
  status: "Entered" | "3-Match Winner" | "4-Match Winner" | "Jackpot Winner!" | "No Match";
};

export const PAST_DRAWS: DrawRow[] = [
  { id: "d1", month: "Mar 2026", yourScores: [12, 28, 30, 35, 41], winningNumbers: [5, 12, 18, 30, 44], matches: 2, prize: 0, status: "No Match" },
  { id: "d2", month: "Feb 2026", yourScores: [9, 22, 25, 33, 40], winningNumbers: [9, 14, 22, 33, 39], matches: 3, prize: 87.5, status: "3-Match Winner" },
  { id: "d3", month: "Jan 2026", yourScores: [4, 11, 19, 27, 38], winningNumbers: [2, 11, 27, 31, 45], matches: 2, prize: 0, status: "No Match" },
  { id: "d4", month: "Dec 2025", yourScores: [7, 15, 23, 29, 36], winningNumbers: [7, 15, 23, 29, 36], matches: 5, prize: 4200, status: "Jackpot Winner!" },
];

export const CURRENT_DRAW = {
  month: "April 2026",
  countdown: { days: 12, hours: 4, minutes: 32 },
  status: "awaiting" as "awaiting" | "published",
};

export type Winning = {
  id: string;
  drawMonth: string;
  tier: string;
  amount: number;
  paymentStatus: "Pending Verification" | "Proof Submitted" | "Approved" | "Paid";
};

export const WINNINGS: Winning[] = [
  { id: "w1", drawMonth: "Feb 2026", tier: "3-Match", amount: 87.5, paymentStatus: "Paid" },
  { id: "w2", drawMonth: "Dec 2025", tier: "Jackpot", amount: 4200, paymentStatus: "Approved" },
];
