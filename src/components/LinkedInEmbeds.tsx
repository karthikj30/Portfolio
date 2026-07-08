"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { LinkedinIcon } from "./icons";
import { linkedinEmbeds, profile } from "@/data/portfolio";

export default function LinkedInEmbeds() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(new Set([0]));
  const [paused, setPaused] = useState(false);
  const count = linkedinEmbeds.length;

  // Keep every slide that has been shown mounted, so it doesn't reload on return.
  useEffect(() => {
    setLoaded((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, [index]);

  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((v) => (v + 1) % count);
    }, 8000);
    return () => clearInterval(id);
  }, [count]);

  const go = (dir: number) => setIndex((v) => (v + dir + count) % count);
  const current = linkedinEmbeds[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-full flex-col rounded-2xl border border-card-border bg-card p-4"
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span style={{ color: "#0A66C2" }}>
            <LinkedinIcon size={18} />
          </span>
          <h3 className="font-display text-base font-semibold">LinkedIn</h3>
        </div>
        <a
          href={profile.socials.linkedinActivity}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted transition-colors hover:text-accent-2"
        >
          View all →
        </a>
      </div>

      {/* embed viewport — each slide mounts once, then just toggles visibility */}
      <div className="relative h-[540px] flex-1 overflow-hidden rounded-xl bg-white">
        {linkedinEmbeds.map((post, i) => (
          <div
            key={post.urn}
            className="absolute inset-0"
            style={{ display: i === index ? "block" : "none" }}
          >
            {loaded.has(i) ? (
              <iframe
                src={`https://www.linkedin.com/embed/feed/update/${post.urn}`}
                title={post.title}
                loading="lazy"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <div className="h-full w-full animate-pulse bg-background/20" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 px-1">
        <a
          href={current.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A66C2] transition-opacity hover:opacity-80"
        >
          Open post <ExternalLink size={12} />
        </a>

        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {linkedinEmbeds.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show post ${i + 1}`}
                className="h-1.5 rounded-full bg-card-border transition-all"
                style={
                  i === index
                    ? { backgroundColor: "#0A66C2", width: "1.25rem" }
                    : { width: "0.375rem" }
                }
              />
            ))}
          </div>
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="rounded-full border border-card-border p-1.5 text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="rounded-full border border-card-border p-1.5 text-muted transition-colors hover:text-foreground"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
