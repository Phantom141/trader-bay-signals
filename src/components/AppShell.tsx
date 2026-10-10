"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import SplashScreen from "./SplashScreen";
import BottomNav from "./BottomNav";
import { HomeSkeleton, SignalsSkeleton } from "./Skeleton";
import {
  hasSeenSplash,
  markSplashSeen,
  startTrial,
  getTier,
  isOnboardingDone,
  daysLeftInTrial,
} from "@/lib/storage";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    startTrial();
    if (hasSeenSplash()) {
      setShowSplash(false);
      setLoading(true);
      const t = setTimeout(() => {
        setLoading(false);
        setReady(true);
      }, 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSplashDone = () => {
    markSplashSeen();
    setShowSplash(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReady(true);
      if (!isOnboardingDone()) {
        router.push("/install");
      }
    }, 700);
  };

  useEffect(() => {
    if (!ready) return;
    const tier = getTier();
    if (tier === "locked") {
      const allowed = ["/courses", "/pricing", "/install"];
      if (!allowed.some((a) => path === a || path.startsWith(a + "/"))) {
        router.replace("/courses");
      }
    }
  }, [path, ready, router]);

  if (showSplash) {
    return <SplashScreen onDone={handleSplashDone} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 pb-20">
        {path.startsWith("/signals") ? <SignalsSkeleton /> : <HomeSkeleton />}
      </div>
    );
  }

  const tier = getTier();
  const daysLeft = daysLeftInTrial();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 overflow-hidden rounded-lg bg-zinc-900 flex items-center justify-center border border-zinc-700">
              <svg width="26" height="26" viewBox="0 0 220 220" fill="none">
                <path d="M50 130 L60 165 H160 L170 130 Z" fill="#92400e" />
                <rect x="106" y="45" width="8" height="75" fill="#a8a29e" />
                <path d="M114 50 L155 70 L155 115 L114 105 Z" fill="#e2e8f0" />
                <path d="M114 45 L145 40 L145 55 L114 52 Z" fill="#ef4444" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Trader Bay</p>
              <p className="text-[10px] text-zinc-500">NY Session Model</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tier === "locked" ? (
              <span className="rounded-full bg-red-500/20 px-2.5 py-1 text-[10px] font-semibold text-red-400">
                Locked
              </span>
            ) : tier === "free" ? (
              <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-[10px] font-semibold text-cyan-400">
                Trial · {daysLeft}d left
              </span>
            ) : (
              <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-400 capitalize">
                {tier}
              </span>
            )}
            <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg">{children}</main>
      <BottomNav />
    </div>
  );
}
