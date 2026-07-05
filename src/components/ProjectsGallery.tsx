"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import Reveal from "./Reveal";
import { projects } from "@/data/portfolio";

export default function ProjectsGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, startScroll: 0, moved: false });

  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function updateEdges() {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }

  function scrollByCards(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      el.scrollLeft += e.deltaY;
      updateEdges();
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      dragging: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el || !dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    el.scrollLeft = dragState.current.startScroll - dx;
    updateEdges();
  }

  function onPointerUp() {
    dragState.current.dragging = false;
  }

  function onCardClick(e: React.MouseEvent) {
    if (dragState.current.moved) {
      e.preventDefault();
    }
  }

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
                Projects
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Things I&apos;ve built
              </h2>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button
                onClick={() => scrollByCards(-1)}
                disabled={atStart}
                aria-label="Scroll left"
                className="rounded-full border border-card-border bg-card p-2.5 text-muted transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => scrollByCards(1)}
                disabled={atEnd}
                aria-label="Scroll right"
                className="rounded-full border border-card-border bg-card p-2.5 text-muted transition-colors hover:text-foreground disabled:opacity-30"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={scrollerRef}
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onScroll={updateEdges}
          className="mt-10 flex cursor-grab select-none gap-6 overflow-x-auto px-6 pb-6 active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="shrink-0 sm:w-[calc((100vw-1152px)/2)]" />
          {projects.map((project) => {
            const stack = project.stack.split(" · ");
            const inner = (
              <div
                data-card
                className="group relative flex h-[420px] w-[280px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-card-border bg-card p-6 transition-transform duration-300 sm:w-[320px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.25),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute right-5 top-5">
                  {project.href ? (
                    <ArrowUpRight
                      size={18}
                      className="text-muted transition-colors group-hover:text-accent-2"
                    />
                  ) : (
                    <Lock size={16} className="text-muted" title="Not publicly available" />
                  )}
                </div>

                <p className="relative text-xs text-muted">{project.date}</p>
                <h3 className="relative mt-1 font-display text-2xl font-bold">
                  {project.name}
                </h3>
                <p className="relative mt-3 text-sm text-muted leading-relaxed">
                  {project.description}
                </p>
                <div className="relative mt-4 flex flex-wrap gap-2">
                  {stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-card-border bg-background/50 px-2.5 py-1 text-[11px] text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );

            return project.href ? (
              <a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                draggable={false}
                onClick={onCardClick}
              >
                {inner}
              </a>
            ) : (
              <div key={project.name} draggable={false}>
                {inner}
              </div>
            );
          })}
          <div className="shrink-0 sm:w-[calc((100vw-1152px)/2)]" />
        </div>
      </Reveal>

      <p className="mt-2 text-center text-xs text-muted sm:hidden">
        ← swipe to explore →
      </p>
    </section>
  );
}
