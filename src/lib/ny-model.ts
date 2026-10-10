export type Bias = "LONG" | "SHORT" | "NONE";
export type SessionName = "Asia" | "Europe" | "US" | "Closed";

export interface AsiaRange {
  high: number;
  low: number;
  highTaken: boolean;
  lowTaken: boolean;
}

export interface Leg {
  high: number;
  low: number;
  direction: Bias;
}

export interface ScalpingSignal {
  id: string;
  symbol: string;
  bias: Bias;
  entry: number;
  stop: number;
  target: number;
  riskR: number;
  rewardR: number;
  status: "active" | "hit_tp" | "hit_sl" | "expired";
  reason: string;
  session: SessionName;
  createdAt: number;
}

export interface SessionInfo {
  name: SessionName;
  active: boolean;
  label: string;
  progress: number;
}

/** Approximate NY session windows in local browser time mapped roughly to UTC hours */
export function getCurrentSession(now: Date = new Date()): SessionInfo {
  const h = now.getUTCHours();
  // Rough UTC mapping: Asia ~00-07, Europe ~07-12, US ~12-21
  if (h >= 0 && h < 7) {
    return { name: "Asia", active: true, label: "Asia Session", progress: h / 7 };
  }
  if (h >= 7 && h < 12) {
    return { name: "Europe", active: true, label: "London / Europe", progress: (h - 7) / 5 };
  }
  if (h >= 12 && h < 21) {
    return { name: "US", active: true, label: "NY Session", progress: (h - 12) / 9 };
  }
  return { name: "Closed", active: false, label: "Market Closed", progress: 0 };
}

export function generateDemoSignal(symbol = "BTCUSDT"): ScalpingSignal {
  const price = symbol.includes("BTC") ? 67432 : 2345;
  const bias: Bias = Math.random() > 0.45 ? "LONG" : "SHORT";
  const risk = price * 0.004;
  const entry = price;
  const stop = bias === "LONG" ? entry - risk : entry + risk;
  const target = bias === "LONG" ? entry + risk * 2 : entry - risk * 2;
  return {
    id: `sig-${Date.now()}`,
    symbol,
    bias,
    entry: Number(entry.toFixed(2)),
    stop: Number(stop.toFixed(2)),
    target: Number(target.toFixed(2)),
    riskR: 1,
    rewardR: 2,
    status: "active",
    reason:
      bias === "LONG"
        ? "Asia low swept · bullish IFVG · TL break"
        : "Asia high swept · bearish IFVG · TL break",
    session: "US",
    createdAt: Date.now(),
  };
}

export const TIERS = [
  {
    id: "free",
    name: "Free Trial",
    price: "$0",
    period: "7 days",
    features: ["Live session tracker", "1 demo signal / day", "Courses access"],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/ month",
    features: [
      "Unlimited NY Session signals",
      "Asia range + levels",
      "IFVG / trendline alerts",
      "Priority support",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: "$79",
    period: "/ month",
    features: [
      "Everything in Pro",
      "Multi-pair (BTC, Gold, Indices)",
      "Webhook / Telegram push",
      "Private playbook",
    ],
  },
] as const;

export const COURSES = [
  {
    id: "1",
    title: "NY Session Model Basics",
    duration: "18 min",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Asia Sweep & Bias",
    duration: "22 min",
    level: "Intermediate",
  },
  {
    id: "3",
    title: "IFVG & Trendline Triggers",
    duration: "25 min",
    level: "Intermediate",
  },
  {
    id: "4",
    title: "Risk, 2R Targets & Journal",
    duration: "15 min",
    level: "All levels",
  },
] as const;
