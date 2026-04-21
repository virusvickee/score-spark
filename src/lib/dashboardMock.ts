// Core Data Store (Placeholder for backend integration).
// These patterns are used across the dashboard and admin panel.

export type GolfScore = { id: string; score: number; date: string };

export type DrawRow = {
  id: string;
  month: string;
  yourScores: number[];
  winningNumbers: number[];
  matches: number;
  prize: number;
  status: "Entered" | "3-Match Winner" | "4-Match Winner" | "Jackpot Winner!" | "No Match";
};

export type Winning = {
  id: string;
  drawMonth: string;
  tier: string;
  amount: number;
  paymentStatus: "Pending Verification" | "Proof Submitted" | "Approved" | "Paid";
};

// Initial empty states for fresh integration
export const MOCK_USER = {
  name: "New Member",
  email: "member@example.com",
  plan: "None" as "Monthly" | "Yearly" | "None",
  subscriptionFee: 0,
  renewalDate: "---",
  joined: new Date().toISOString().split('T')[0],
};

export const MOCK_CHARITY = {
  id: "",
  name: "Not Selected",
  desc: "Please select a charity from your dashboard to begin contributing.",
  totalDonatedAllTime: 0,
  contributionPct: 10,
};

export const INITIAL_SCORES: GolfScore[] = [];

export const PAST_DRAWS: DrawRow[] = [];

export const CURRENT_DRAW = {
  month: "TBD",
  countdown: { days: 0, hours: 0, minutes: 0 },
  status: "awaiting" as "awaiting" | "published",
};

export const WINNINGS: Winning[] = [];
