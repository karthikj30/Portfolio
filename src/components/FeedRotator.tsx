"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { FeedPost } from "@/data/portfolio";

export default function FeedRotator({
  title,
  profileUrl,
  icon,
  accent,
  posts,
  loading,
  emptyLabel,
}: {
  title: string;
  profileUrl: string;
  icon: ReactNode;
  accent: string;
  posts: FeedPost[];
  loading?: boolean;
  emptyLabel: string;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setI((v) => (posts.length ? v % posts.length : 0));
  }, [posts.length]);

  useEffect(() => {
    if (posts.length <= 1 || paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % posts.length), 4800);
    return () => clearInterval(id);
  }, [posts.length, paused]);

  const post = posts[i];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="flex h-full flex-col rounded-2xl border border-card-border bg-card p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: accent }}>{icon}</span>
          <h3 className="font-display text-base font-semibold">{title}</h3>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted transition-colors hover:text-accent-2"
        >
          View all →
        </a>
      </div>

      <div className="relative min-h-[160px] flex-1">
        {loading ? (
          <div className="space-y-3 pt-1">
            <div className="h-4 w-3/4 animate-pulse rounded bg-background/60" />
            <div className="h-3 w-full animate-pulse rounded bg-background/40" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-background/40" />
          </div>
        ) : posts.length === 0 ? (
          <div className="flex h-full flex-col items-start justify-center gap-3">
            <p className="text-sm text-muted">{emptyLabel}</p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-card-border px-4 py-2 text-sm transition-colors hover:border-accent-2/50 hover:text-accent-2"
            >
              Follow <ArrowUpRight size={14} />
            </a>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.a
              key={i}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group block"
            >
              {post.date && (
                <p className="text-xs text-muted">{post.date}</p>
              )}
              <h4 className="mt-1 font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent-2">
                {post.title}
              </h4>
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              )}
              <span
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium"
                style={{ color: accent }}
              >
                Read <ArrowUpRight size={14} />
              </span>
            </motion.a>
          </AnimatePresence>
        )}
      </div>

      {posts.length > 1 && (
        <div className="mt-4 flex gap-1.5">
          {posts.map((_, d) => (
            <button
              key={d}
              onClick={() => setI(d)}
              aria-label={`Show item ${d + 1}`}
              className="h-1.5 rounded-full bg-card-border transition-all"
              style={
                d === i
                  ? { backgroundColor: accent, width: "1.5rem" }
                  : { width: "0.375rem" }
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
