"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Lock, RotateCw } from "lucide-react";
import Reveal from "./Reveal";
import { projects } from "@/data/portfolio";
import { getSkillMeta } from "./skillIcons";

const SPEED = 95; // px per second

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
    pointerType: "mouse" as string,
  });

  const [isTouch, setIsTouch] = useState(false);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  // Duplicate the list so the strip can loop seamlessly.
  const loop = [...projects, ...projects];

  useEffect(() => {
    setIsTouch(
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0
    );
  }, []);

  // Pause the marquee whenever a card is flipped open (touch devices).
  useEffect(() => {
    state.current.paused = flipped.size > 0;
  }, [flipped]);

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
    s.pointerType = e.pointerType || "mouse";
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

  function toggleFlip(i: number) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  // On touch: first tap flips the card; a second tap on a flipped card with a
  // link follows it. On desktop, hover flips and a click follows the link.
  function onCardClick(e: React.MouseEvent, i: number, hasHref: boolean) {
    if (state.current.moved) {
      e.preventDefault();
      return;
    }
    // Detect touch from the actual interaction (robust across devices), not
    // just a media query — this is the fix for tap-to-flip on phones.
    const touch =
      state.current.pointerType === "touch" ||
      state.current.pointerType === "pen" ||
      isTouch;
    if (!touch) return;
    const isFlipped = flipped.has(i);
    if (!isFlipped) {
      e.preventDefault();
      toggleFlip(i);
    } else if (!hasHref) {
      e.preventDefault();
      toggleFlip(i);
    }
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
            Auto-scrolling — {isTouch ? "tap" : "hover"} a card to flip it and
            reveal the stack.
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
          if (flipped.size === 0) state.current.paused = false;
        }}
        onMouseEnter={() => (state.current.paused = true)}
        onMouseLeave={() => {
          if (flipped.size === 0) state.current.paused = false;
        }}
        className="mt-10 flex cursor-grab select-none gap-6 overflow-x-auto px-6 pb-6 active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((project, i) => {
          const stack = project.stack.split(" · ");
          const isFlipped = flipped.has(i);
          const inner = (
            <div
              className="group h-[420px] w-[280px] shrink-0 [perspective:1400px] sm:w-[320px]"
              draggable={false}
            >
              <div
                className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                style={isFlipped ? { transform: "rotateY(180deg)" } : undefined}
              >
                {/* Front */}
                <div className="absolute inset-0 flex flex-col justify-end overflow-hidden rounded-3xl border border-card-border bg-card p-6 [backface-visibility:hidden]">
                  {project.image && (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.name}
                        draggable={false}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
                    </>
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.18),transparent_60%)]" />
                  <div className="absolute right-5 top-5">
                    {project.href ? (
                      <ArrowUpRight size={18} className="text-muted" />
                    ) : (
                      <Lock size={16} className="text-muted" aria-label="Private" />
                    )}
                  </div>
                  <p className="relative text-xs text-muted">{project.date}</p>
                  <h3 className="relative mt-1 font-display text-2xl font-bold">
                    {project.name}
                  </h3>
                  <p className="relative mt-3 text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>
                  <p className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-accent-2/80">
                    <RotateCw size={12} /> {isTouch ? "Tap" : "Hover"} for stack
                  </p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-accent-2/30 bg-card p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.15),transparent_60%)]" />
                  <p className="relative text-xs uppercase tracking-widest text-accent-2">
                    Tech &amp; Skills
                  </p>
                  <h3 className="relative mt-1 font-display text-xl font-bold">
                    {project.name}
                  </h3>
                  <div className="relative mt-5 flex flex-col gap-2.5">
                    {stack.map((t, ti) => {
                      const { Icon, color } = getSkillMeta(t);
                      return (
                        <div
                          key={t}
                          className="flex translate-y-2 items-center gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                          style={
                            isFlipped
                              ? {
                                  opacity: 1,
                                  transform: "translateY(0)",
                                  transitionDelay: `${250 + ti * 90}ms`,
                                }
                              : { transitionDelay: `${250 + ti * 90}ms` }
                          }
                        >
                          <span
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background/60"
                            style={{ color }}
                          >
                            <Icon size={17} />
                          </span>
                          <span className="text-sm text-foreground">{t}</span>
                        </div>
                      );
                    })}
                  </div>
                  {project.href && (
                    <span className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent-2">
                      View project <ArrowUpRight size={15} />
                    </span>
                  )}
                </div>
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
              onClick={(e) => onCardClick(e, i, true)}
            >
              {inner}
            </a>
          ) : (
            <div
              key={`${project.name}-${i}`}
              onClick={(e) => onCardClick(e, i, false)}
            >
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
