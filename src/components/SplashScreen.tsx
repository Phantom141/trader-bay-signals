"use client";

import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

function TraderBayLogo({ size = 220 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rounded-2xl"
    >
      <rect width="220" height="220" rx="24" fill="#0a0a0f" />
      <rect x="8" y="8" width="204" height="204" rx="18" fill="#111118" stroke="#1e293b" strokeWidth="2" />
      <path d="M20 160 Q55 145 90 160 T160 160 T200 160 L200 200 L20 200 Z" fill="#0e7490" opacity="0.4" />
      <path d="M20 170 Q55 155 90 170 T160 170 T200 170 L200 200 L20 200 Z" fill="#0891b2" opacity="0.5" />
      <path d="M50 130 L60 165 H160 L170 130 Z" fill="#78350f" />
      <path d="M55 130 L65 160 H155 L165 130 Z" fill="#92400e" />
      <rect x="65" y="115" width="90" height="18" rx="2" fill="#a16207" />
      <rect x="106" y="45" width="8" height="75" fill="#44403c" />
      <path d="M114 50 L155 70 L155 115 L114 105 Z" fill="#e2e8f0" />
      <path d="M114 55 L150 72 L150 110 L114 100 Z" fill="#f8fafc" />
      <path d="M114 45 L145 40 L145 55 L114 52 Z" fill="#ef4444" />
      <circle cx="130" cy="47" r="4" fill="#fafafa" />
      <circle cx="110" cy="180" r="30" fill="#22d3ee" opacity="0.15" />
      <text x="110" y="205" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="700" fontFamily="system-ui">
        TRADER BAY
      </text>
    </svg>
  );
}

export default function SplashScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(onDone, 300);
    };
    requestAnimationFrame(tick);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="relative mb-8 animate-pulse">
        <TraderBayLogo size={200} />
      </div>
      <h1 className="text-3xl font-black tracking-tight text-white mb-1">
        TRADER <span className="text-cyan-400">BAY</span>
      </h1>
      <p className="text-sm text-zinc-400 mb-10">NY Session Model · Smart. Simple. Precise.</p>
      <div className="w-48 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
