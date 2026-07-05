"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { profile } from "@/data/portfolio";

export default function IntroSequence() {
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("intro-seen");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;
    setVisible(true);
    sessionStorage.setItem("intro-seen", "1");
  }, []);

  // Lock body scroll while the intro is playing.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  function dismiss() {
    setVisible(false);
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background"
        >
          <video
            ref={videoRef}
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            onEnded={dismiss}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* cinematic gradient for text legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-background/50" />

          {/* name / title overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-10 p-8 sm:bottom-14 sm:p-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent-2"
            >
              Portfolio 2026
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="font-display text-4xl font-extrabold leading-[0.95] sm:text-7xl"
            >
              {profile.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-4 text-xs uppercase tracking-[0.25em] text-muted sm:text-sm"
            >
              Full-Stack Developer · GenAI Builder · Hackathon Winner
            </motion.p>
          </div>

          {/* controls */}
          <div className="absolute right-6 top-6 flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="rounded-full border border-card-border bg-card/60 p-2.5 text-foreground backdrop-blur-md transition-colors hover:text-accent-2"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="rounded-full border border-card-border bg-card/60 p-2.5 text-foreground backdrop-blur-md transition-colors hover:text-accent-2"
            >
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={dismiss}
              className="rounded-full border border-card-border bg-card/60 px-4 py-2 text-xs text-muted backdrop-blur-md transition-colors hover:text-foreground"
            >
              Skip →
            </button>
          </div>

          {/* unmute hint while muted */}
          {muted && (
            <motion.button
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={toggleMute}
              className="absolute left-1/2 top-6 -translate-x-1/2 rounded-full border border-accent-2/40 bg-card/70 px-4 py-2 text-xs font-medium text-accent-2 backdrop-blur-md"
            >
              🔊 Tap to unmute
            </motion.button>
          )}

          {/* progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-card-border/60">
            <div
              className="h-full bg-accent-2"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
