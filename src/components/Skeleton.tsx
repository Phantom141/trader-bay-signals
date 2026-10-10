"use client";

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-zinc-800/80 ${className}`}
    />
  );
}

export function HomeSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <SkeletonBlock className="h-20 w-full" />
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <SkeletonBlock key={i} className="h-8 w-14 shrink-0 rounded-full" />
        ))}
      </div>
      <SkeletonBlock className="h-28 w-full" />
      <SkeletonBlock className="h-48 w-full" />
      <SkeletonBlock className="h-32 w-full" />
    </div>
  );
}

export function SignalsSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <SkeletonBlock className="h-10 w-40" />
      {[1, 2, 3].map((i) => (
        <SkeletonBlock key={i} className="h-36 w-full" />
      ))}
    </div>
  );
}
