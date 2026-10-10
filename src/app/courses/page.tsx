"use client";

import { COURSES } from "@/lib/ny-model";

export default function CoursesPage() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-lg font-bold">Courses</h1>
      <p className="text-xs text-zinc-500">Always available — even when locked out</p>
      {COURSES.map((c) => (
        <div
          key={c.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 clay-card"
        >
          <p className="font-semibold">{c.title}</p>
          <p className="mt-1 text-xs text-zinc-500">
            {c.duration} · {c.level}
          </p>
        </div>
      ))}
    </div>
  );
}
