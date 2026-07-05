"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const IMAGES = ["/images/portrait-1.jpg", "/images/portrait-2.jpg"];
const HOLD_MS = 5200;

export default function KenBurnsBackdrop() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % IMAGES.length),
      HOLD_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: reduced ? 1.04 : 1.2 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.8, ease: "easeInOut" },
            scale: { duration: HOLD_MS / 1000 + 1.8, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={IMAGES[index]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.32]"
          />
        </motion.div>
      </AnimatePresence>

      {/* readability + cinematic vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent)]" />
    </div>
  );
}
