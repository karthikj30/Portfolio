"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const EVENT = "open-resume";

/** Call from any component to open the resume viewer. */
export function openResume() {
  window.dispatchEvent(new Event(EVENT));
}

export default function ResumeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-card-border bg-surface shadow-2xl"
            style={{ background: "var(--background)" }}
          >
            <div className="flex items-center justify-between border-b border-card-border px-5 py-3">
              <p className="font-display text-sm font-semibold">
                {profile.name} — Résumé
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open in new tab"
                  className="rounded-lg border border-card-border p-2 text-muted transition-colors hover:text-accent-2"
                >
                  <ExternalLink size={16} />
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  aria-label="Download résumé"
                  className="rounded-lg border border-card-border p-2 text-muted transition-colors hover:text-accent-2"
                >
                  <Download size={16} />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-lg border border-card-border p-2 text-muted transition-colors hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe
              src={`${profile.resumeUrl}#view=FitH`}
              title="Résumé"
              className="h-full w-full flex-1 bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
