"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { projects, type Project } from "@/data/portfolio";
import { getSkillMeta } from "./skillIcons";
import { openProject } from "./ProjectModal";

function Card({ project }: { project: Project }) {
  const [imgErr, setImgErr] = useState(false);
  const stack = project.stack.split(" · ").slice(0, 4);

  return (
    <button
      onClick={() => openProject(project)}
      className="group relative flex h-[420px] w-[300px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-card-border bg-card p-6 text-left transition-colors hover:border-accent-2/50 sm:w-[340px]"
    >
      {project.image && !imgErr && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.name}
            draggable={false}
            loading="lazy"
            onError={() => setImgErr(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/10" />
        </>
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(139,92,246,0.15),transparent_60%)]" />

      <div className="absolute right-5 top-5 text-muted transition-colors group-hover:text-accent-2">
        <ArrowUpRight size={18} />
      </div>

      <p className="relative text-xs text-muted">{project.date}</p>
      <h3 className="relative mt-1 font-display text-2xl font-bold">
        {project.name}
      </h3>
      <p className="relative mt-3 line-clamp-3 text-sm text-muted leading-relaxed">
        {project.description}
      </p>

      <div className="relative mt-4 flex items-center gap-2">
        {stack.map((t) => {
          const { Icon, color } = getSkillMeta(t);
          return (
            <span
              key={t}
              title={t}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-background/70"
              style={{ color }}
            >
              <Icon size={15} />
            </span>
          );
        })}
      </div>

      <span className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-accent-2/80">
        Click for details
      </span>
    </button>
  );
}

export default function ProjectsGallery() {
  // Duplicate the list so the -50% marquee translate loops seamlessly.
  const loop = [...projects, ...projects];

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
            Projects
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Things I&apos;ve built
          </h2>
          <p className="mt-3 text-sm text-muted">
            Auto-scrolling — click a card to open full details.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div className="group flex w-max gap-6 [animation:marquee-x_22s_linear_infinite] hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {loop.map((project, i) => (
              <Card key={`${project.name}-${i}`} project={project} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
