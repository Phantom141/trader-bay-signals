"use client";

import { TIERS } from "@/lib/ny-model";
import { getTier, setTier } from "@/lib/storage";

export default function PricingPage() {
  const current = getTier();
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-lg font-bold">Plans</h1>
      {TIERS.map((t) => (
        <div
          key={t.id}
          className={`rounded-2xl border p-4 clay-card ${
            current === t.id
              ? "border-cyan-500/50 bg-zinc-900"
              : "border-zinc-800 bg-zinc-900/70"
          }`}
        >
          <div className="flex items-baseline justify-between">
            <p className="font-bold">{t.name}</p>
            <p className="text-cyan-400">
              {t.price}
              <span className="text-xs text-zinc-500">{t.period}</span>
            </p>
          </div>
          <ul className="mt-2 space-y-1 text-sm text-zinc-400">
            {t.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          {t.id !== "free" && (
            <button
              type="button"
              onClick={() => {
                setTier(t.id as "pro" | "elite");
                window.location.href = "/";
              }}
              className="mt-3 w-full rounded-full bg-cyan-500 py-2 text-sm font-bold text-zinc-950"
            >
              {current === t.id ? "Current plan" : "Select"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
