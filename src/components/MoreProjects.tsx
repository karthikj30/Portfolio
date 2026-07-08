"use client";

import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { GithubIcon } from "./icons";
import { githubProjects, profile } from "@/data/portfolio";
import { openProject } from "./ProjectModal";

export default function MoreProjects() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-2xl font-bold">More on GitHub</h3>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent-2"
          >
            <GithubIcon size={16} />
            @{profile.socials.github.split("/").pop()}
          </a>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {githubProjects.map((p, i) => (
          <Reveal key={p.name} delay={Math.min(i * 0.05, 0.2)}>
            <button
              onClick={() => openProject(p)}
              className="group block h-full w-full rounded-2xl border border-card-border bg-card p-5 text-left transition-colors hover:border-accent-2/40"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-display text-base font-semibold">
                  {p.name}
                </h4>
                <ArrowUpRight
                  size={16}
                  className="mt-0.5 shrink-0 text-muted transition-colors group-hover:text-accent-2"
                />
              </div>
              <p className="mt-2 line-clamp-3 text-sm text-muted leading-relaxed">
                {p.description}
              </p>
              <p className="mt-3 text-xs text-accent-2/80">{p.stack}</p>
              <span className="mt-3 inline-block text-[11px] font-medium uppercase tracking-wider text-muted transition-colors group-hover:text-accent-2">
                Click for details
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
