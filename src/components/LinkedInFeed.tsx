"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  Repeat2,
  ThumbsUp,
} from "lucide-react";
import { LinkedinIcon } from "./icons";
import { linkedinPosts, profile } from "@/data/portfolio";

const LI = "#0A66C2";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function LinkedInFeed() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = linkedinPosts.length;

  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((v) => (v + 1) % count);
    }, 5000);
    return () => clearInterval(id);
  }, [count]);

  const go = (dir: number) => setIndex((v) => (v + dir + count) % count);
  const post = linkedinPosts[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-full flex-col rounded-2xl border border-card-border bg-card p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: LI }}>
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

      <a
        key={index}
        href={post.url}
        target="_blank"
        rel="noreferrer"
        className="group flex flex-1 flex-col rounded-xl border border-card-border bg-background/40 p-5 transition-colors hover:border-[#0A66C2]/50 motion-safe:animate-[fadeIn_.4s_ease]"
      >
        {post.reposted && (
          <p className="mb-3 flex items-center gap-1.5 border-b border-card-border pb-3 text-xs text-muted">
            <Repeat2 size={13} /> {profile.name.split(" ")[0]} reposted this
          </p>
        )}

        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${LI}, #22d3ee)`,
            }}
          >
            {initials(post.author)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {post.author}
            </p>
            <p className="truncate text-xs text-muted">{post.role}</p>
            <p className="text-[11px] text-muted">{post.date} • 🌐</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-foreground/90">
          {post.text}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-card-border pt-3 text-xs text-muted">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ThumbsUp size={13} style={{ color: LI }} /> {post.reactions}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={13} /> {post.comments}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-[#0A66C2] opacity-0 transition-opacity group-hover:opacity-100">
            Read on LinkedIn <ExternalLink size={12} />
          </span>
        </div>
      </a>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {linkedinPosts.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show post ${i + 1}`}
              className="h-1.5 rounded-full bg-card-border transition-all"
              style={
                i === index
                  ? { backgroundColor: LI, width: "1.25rem" }
                  : { width: "0.375rem" }
              }
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
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
