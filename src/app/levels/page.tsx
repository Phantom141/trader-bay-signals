"use client";

import { getTier } from "@/lib/storage";
import Link from "next/link";

export default function LevelsPage() {
  const tier = getTier();
  if (tier === "locked") {
    return (
      <div className="p-4 text-center">
        <p className="text-red-400 font-semibold">Levels locked</p>
        <Link href="/pricing" className="text-cyan-400 text-sm underline">Upgrade</Link>
      </div>
    );
  }
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-lg font-bold">Key Levels</h1>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 clay-card">
        <p className="text-sm font-semibold text-cyan-400">Asia Range</p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl bg-zinc-800/80 p-3">
            <p className="text-xs text-zinc-500">Asia High</p>
            <p className="font-bold tabular-nums">67,890.00</p>
          </div>
          <div className="rounded-xl bg-zinc-800/80 p-3">
            <p className="text-xs text-zinc-500">Asia Low</p>
            <p className="font-bold tabular-nums">66,420.00</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Wait for 08:30 NY sweep of one side → bias toward open side.
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 clay-card">
        <p className="text-sm font-semibold">Quick levels</p>
        <ul className="mt-2 space-y-1 text-sm text-zinc-300">
          <li>PDH · 68,150</li>
          <li>PDL · 65,980</li>
          <li>EQ · 67,155</li>
        </ul>
      </div>
    </div>
  );
}
