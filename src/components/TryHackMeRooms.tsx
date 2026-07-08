"use client";

import { SiTryhackme } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { tryhackmeRooms, profile } from "@/data/portfolio";

const THM = "#c11b17";

function diffColor(d: string) {
  const s = d.toLowerCase();
  if (s === "easy") return "#22c55e";
  if (s === "medium") return "#eab308";
  if (s === "hard") return "#ef4444";
  return "#9aa1b2";
}

export default function TryHackMeRooms() {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 md:col-span-2">
      <div className="mb-5 flex items-center gap-2">
        <span style={{ color: THM }}>
          <SiTryhackme size={20} />
        </span>
        <h4 className="font-display text-base font-semibold">TryHackMe</h4>
        <span className="rounded-full bg-background/60 px-2 py-0.5 text-[11px] text-muted">
          {tryhackmeRooms.length} rooms completed
        </span>
        <a
          href={profile.socials.tryhackme}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent-2"
        >
          View profile <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tryhackmeRooms.map((room) => (
          <div
            key={room.name}
            className="flex flex-col rounded-xl border border-card-border bg-background/40 p-4 transition-colors hover:border-accent-2/40"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-medium"
                style={{ color: diffColor(room.difficulty) }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: diffColor(room.difficulty) }}
                />
                {room.difficulty}
              </span>
              <span className="rounded-full border border-card-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                {room.type}
              </span>
            </div>
            <h5 className="font-display text-sm font-semibold leading-snug">
              {room.name}
            </h5>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
              {room.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
