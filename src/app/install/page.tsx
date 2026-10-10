"use client";

import { completeOnboarding } from "@/lib/storage";
import { useRouter } from "next/navigation";

const steps = [
  "Open MetaTrader 5 or TradingView",
  "Add NY_Time_Lines indicator (Asia range + session lines)",
  "Attach NY_Session_EA or follow signals in this app",
  "Trade only the NY window — Asia sweep → bias → IFVG/TL → 2R",
  "Risk 0.5–1% per trade · max one setup per day",
];

export default function InstallPage() {
  const router = useRouter();
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-lg font-bold">How to install</h1>
      <p className="text-sm text-zinc-400">
        Follow these steps to use the NY Session Model with Trader Bay signals.
      </p>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li
            key={i}
            className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3 clay-card"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400">
              {i + 1}
            </span>
            <span className="text-sm text-zinc-200">{s}</span>
          </li>
        ))}
      </ol>
      <button
        type="button"
        onClick={() => {
          completeOnboarding();
          router.push("/");
        }}
        className="w-full rounded-full bg-cyan-500 py-3 text-sm font-bold text-zinc-950"
      >
        Got it — start trading
      </button>
    </div>
  );
}
