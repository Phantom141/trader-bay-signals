"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  generateDemoSignal,
  getCurrentSession,
  type ScalpingSignal,
  type SessionInfo,
} from "@/lib/ny-model";
import { getTier } from "@/lib/storage";

export default function HomePage() {
  const [signal, setSignal] = useState<ScalpingSignal | null>(null);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [price] = useState(67432.19);
  const [change] = useState(1.24);

  useEffect(() => {
    setSignal(generateDemoSignal("BTCUSDT"));
    setSession(getCurrentSession());
    const id = setInterval(() => setSession(getCurrentSession()), 30_000);
    return () => clearInterval(id);
  }, []);

  const tier = getTier();
  const locked = tier === "locked";

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 clay-card">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
            B
          </div>
          <div>
            <p className="font-semibold">BTCUSDT</p>
            <p className="text-xs text-zinc-500">Binance</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold tabular-nums">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs font-medium text-emerald-400">
            +{change}% · +$825.47
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["1m", "5m", "15m", "1H", "4H", "1D"].map((tf) => (
          <button
            key={tf}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              tf === "1H"
                ? "bg-cyan-500 text-zinc-950"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 clay-card">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">⏱</span>
            <span className="text-sm font-semibold">Session Tracker</span>
          </div>
          {session && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {session.name} Active
            </span>
          )}
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
            style={{ width: `${(session?.progress ?? 0.4) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          {session?.label ?? "Loading…"} · NY Session Model
        </p>
      </div>

      {signal && !locked && (
        <div className="rounded-2xl border border-cyan-500/30 bg-zinc-900/80 p-4 clay-card glow-cyan">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-cyan-400">
              Active Signal
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                signal.bias === "LONG"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {signal.bias}
            </span>
          </div>
          <p className="text-sm text-zinc-300">{signal.reason}</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-xl bg-zinc-800/80 p-2">
              <p className="text-zinc-500">Entry</p>
              <p className="font-bold tabular-nums">{signal.entry}</p>
            </div>
            <div className="rounded-xl bg-zinc-800/80 p-2">
              <p className="text-zinc-500">Stop</p>
              <p className="font-bold tabular-nums text-red-400">{signal.stop}</p>
            </div>
            <div className="rounded-xl bg-zinc-800/80 p-2">
              <p className="text-zinc-500">Target 2R</p>
              <p className="font-bold tabular-nums text-emerald-400">
                {signal.target}
              </p>
            </div>
          </div>
        </div>
      )}

      {locked && (
        <div className="rounded-2xl border border-red-500/30 bg-zinc-900/80 p-4 text-center">
          <p className="font-semibold text-red-400">Trial ended</p>
          <p className="mt-1 text-sm text-zinc-400">
            Upgrade to unlock live signals.
          </p>
          <Link
            href="/pricing"
            className="mt-3 inline-block rounded-full bg-cyan-500 px-4 py-2 text-sm font-bold text-zinc-950"
          >
            View plans
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/signals"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 clay-card"
        >
          <p className="text-xs text-zinc-500">Signals</p>
          <p className="font-semibold text-cyan-400">View all →</p>
        </Link>
        <Link
          href="/levels"
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 clay-card"
        >
          <p className="text-xs text-zinc-500">Levels</p>
          <p className="font-semibold text-cyan-400">Asia range →</p>
        </Link>
      </div>
    </div>
  );
}
