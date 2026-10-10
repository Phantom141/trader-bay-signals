"use client";

import { useEffect, useState } from "react";
import { generateDemoSignal, type ScalpingSignal } from "@/lib/ny-model";
import { getTier } from "@/lib/storage";
import Link from "next/link";

export default function SignalsPage() {
  const [signals, setSignals] = useState<ScalpingSignal[]>([]);
  const tier = getTier();
  const locked = tier === "locked";

  useEffect(() => {
    if (locked) return;
    setSignals([
      generateDemoSignal("BTCUSDT"),
      generateDemoSignal("XAUUSD"),
      generateDemoSignal("NAS100"),
    ]);
  }, [locked]);

  if (locked) {
    return (
      <div className="p-4 text-center">
        <p className="font-semibold text-red-400">Signals locked</p>
        <p className="mt-1 text-sm text-zinc-400">Upgrade to Pro or Elite.</p>
        <Link href="/pricing" className="mt-3 inline-block text-cyan-400 underline">
          View pricing
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-lg font-bold">Scalping Signals</h1>
      <p className="text-xs text-zinc-500">NY Session Model · Asia sweep → IFVG / TL → 2R</p>
      {signals.map((s) => (
        <div
          key={s.id + s.symbol}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 clay-card"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">{s.symbol}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                s.bias === "LONG"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {s.bias}
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-400">{s.reason}</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-zinc-500">Entry</p>
              <p className="font-bold">{s.entry}</p>
            </div>
            <div>
              <p className="text-zinc-500">Stop</p>
              <p className="font-bold text-red-400">{s.stop}</p>
            </div>
            <div>
              <p className="text-zinc-500">TP 2R</p>
              <p className="font-bold text-emerald-400">{s.target}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
