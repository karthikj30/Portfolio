"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { GithubIcon } from "./icons";
import { getSkillMeta } from "./skillIcons";
import type { Project } from "@/data/portfolio";

const EVENT = "open-project";

/** Call from any component to open the project detail dialog. */
export function openProject(project: Project) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: project }));
}

function BrokenImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false);
  if (err) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErr(true)}
      className="w-full rounded-xl border border-card-border object-cover"
    />
  );
}

export default function ProjectModal() {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const handler = (e: Event) =>
      setProject((e as CustomEvent<Project>).detail);
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProject(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project]);

  const stack = project?.stack.split(" · ") ?? [];
  const images = project
    ? ([project.image, ...(project.images ?? [])].filter(Boolean) as string[])
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setProject(null)}
          className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-2xl rounded-2xl border border-card-border bg-background shadow-2xl"
          >
            {/* header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 rounded-t-2xl border-b border-card-border bg-background/90 px-6 py-4 backdrop-blur-md">
              <div>
                <h3 className="font-display text-xl font-bold">{project.name}</h3>
                <p className="text-xs text-muted">{project.date}</p>
              </div>
              <button
                onClick={() => setProject(null)}
                aria-label="Close"
                className="rounded-lg border border-card-border p-2 text-muted transition-colors hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              {/* images */}
              {images.length > 0 && (
                <div className="space-y-3">
                  {images.map((src) => (
                    <BrokenImage key={src} src={src} alt={project.name} />
                  ))}
                </div>
              )}

              {/* about */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent-2">
                  About
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {project.about ?? project.description}
                </p>
              </div>

              {/* tech stack */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent-2">
                  Tech &amp; Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {stack.map((t) => {
                    const { Icon, color } = getSkillMeta(t);
                    return (
                      <span
                        key={t}
                        className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-3 py-1.5 text-sm text-foreground"
                      >
                        <Icon size={16} style={{ color }} />
                        {t}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-wrap gap-3 border-t border-card-border pt-5">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
                  >
                    <GithubIcon size={16} />
                    View on GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent-2/50 hover:text-accent-2"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
