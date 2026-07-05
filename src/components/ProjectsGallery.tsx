"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import Reveal from "./Reveal";
import { projects } from "@/data/portfolio";

const SPEED = 45; // px per second

export default function ProjectsGallery() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    paused: false,
    dragging: false,
    startX: 0,
    startScroll: 0,
    moved: false,
    single: 0,
    raf: 0,
  });

  // Duplicate the list so the strip can loop seamlessly.
  const loop = [...projects, ...projects];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      state.current.single = el.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);

    let last = performance.now();
    const tick = (now: number) => {
      const s = state.current;
      // Clamp dt so returning to the tab after it was backgrounded
      // (rAF paused) doesn't cause a big jump on the first frame.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!reduced && !s.paused && !s.dragging && s.single > 0) {
        el.scrollLeft += SPEED * dt;
        if (el.scrollLeft >= s.single) el.scrollLeft -= s.single;
      }
      s.raf = requestAnimationFrame(tick);
    };
    state.current.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.current.raf);
      window.removeEventListener("resize", measure);
    };
  }, []);

  function wrap() {
    const el = scrollerRef.current;
    const single = state.current.single;
    if (!el || single <= 0) return;
    if (el.scrollLeft >= single) el.scrollLeft -= single;
    else if (el.scrollLeft < 0) el.scrollLeft += single;
  }

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    el.scrollLeft += delta;
    wrap();
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;
    const s = state.current;
    s.dragging = true;
    s.moved = false;
    s.startX = e.clientX;
    s.startScroll = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    const s = state.current;
    if (!el || !s.dragging) return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.moved = true;
    el.scrollLeft = s.startScroll - dx;
    wrap();
  }

  function onPointerUp() {
    state.current.dragging = false;
  }

  function onCardClick(e: React.MouseEvent) {
    if (state.current.moved) e.preventDefault();
  }

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
            Auto-scrolling — hover to pause, or drag to explore.
          </p>
        </Reveal>
      </div>

      <div
        ref={scrollerRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          onPointerUp();
          state.current.paused = false;
        }}
        onMouseEnter={() => (state.current.paused = true)}
        onMouseLeave={() => (state.current.paused = false)}
        className="mt-10 flex cursor-grab select-none gap-6 overflow-x-auto px-6 pb-6 active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((project, i) => {
          const stack = project.stack.split(" · ");
          const inner = (
            <div
              data-card
              className="group relative flex h-[420px] w-[280px] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border border-card-border bg-card p-6 transition-colors duration-300 hover:border-accent-2/40 sm:w-[320px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.25),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute right-5 top-5">
                {project.href ? (
                  <ArrowUpRight
                    size={18}
                    className="text-muted transition-colors group-hover:text-accent-2"
                  />
                ) : (
                  <Lock
                    size={16}
                    className="text-muted"
                    aria-label="Not publicly available"
                  />
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
              key={`${project.name}-${i}`}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              draggable={false}
              onClick={onCardClick}
            >
              {inner}
            </a>
          ) : (
            <div key={`${project.name}-${i}`} draggable={false}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
