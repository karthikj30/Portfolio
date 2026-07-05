"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const LINES = [
  "Hi, I'm Karthik Janardhan.",
  "A passionate full-stack developer & GenAI builder.",
  "From LLM observability stacks to hackathon-winning platforms —",
  "Welcome to my portfolio.",
];

const STEP_MS = 1900;

export default function IntroSequence() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("intro-seen");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) return;
    setVisible(true);
    sessionStorage.setItem("intro-seen", "1");
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (step >= LINES.length - 1) {
      const finish = setTimeout(() => setVisible(false), STEP_MS + 600);
      return () => clearTimeout(finish);
    }
    const id = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(id);
  }, [visible, step]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] overflow-hidden bg-background"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: LINES.length * (STEP_MS / 1000) + 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/portrait-1.jpg"
              alt=""
              fill
              priority
              className="object-cover object-top opacity-60"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(139,92,246,0.25),transparent)]" />

          <div className="relative flex h-full items-center justify-center px-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-3xl text-center font-display text-3xl font-bold leading-tight sm:text-5xl"
              >
                {LINES[step]}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="absolute right-6 top-6 rounded-full border border-card-border bg-card/60 px-4 py-2 text-xs text-muted backdrop-blur-md transition-colors hover:text-foreground"
          >
            Skip →
          </button>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
            {LINES.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                  i <= step ? "bg-accent-2" : "bg-card-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
