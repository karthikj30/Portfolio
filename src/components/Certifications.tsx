"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import Reveal from "./Reveal";
import { certificates } from "@/data/portfolio";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Certifications() {
  const [perView, setPerView] = useState(2);
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slides = useMemo(() => chunk(certificates, perView), [perView]);

  useEffect(() => {
    setIndex((i) => Math.min(i, slides.length - 1));
  }, [slides.length]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || slides.length <= 1) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % slides.length);
    }, 3800);
    return () => clearInterval(id);
  }, [slides.length]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);

  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
              Certifications &amp; Awards
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Learning, formalized
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="rounded-full border border-card-border bg-card p-2.5 text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="rounded-full border border-card-border bg-card p-2.5 text-muted transition-colors hover:text-foreground"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div
          className="mt-10"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {slides.map((group, si) => (
                <div
                  key={si}
                  className="grid w-full shrink-0 gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))`,
                  }}
                >
                  {group.map((cert) => {
                    const card = (
                      <div className="group flex h-full min-h-[130px] flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card p-6 transition-colors hover:border-accent-2/40">
                        {cert.image ? (
                          <div className="mb-4 overflow-hidden rounded-lg border border-card-border">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-2/10 text-accent-2 transition-transform duration-300 group-hover:scale-110">
                            <Award size={22} />
                          </span>
                        )}
                        <p className="mt-4 text-sm font-medium leading-snug text-foreground">
                          {cert.title}
                        </p>
                      </div>
                    );
                    return cert.image ? (
                      <a
                        key={cert.title}
                        href={cert.image}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {card}
                      </a>
                    ) : (
                      <div key={cert.title}>{card}</div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* pagination dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-accent-2"
                    : "w-2 bg-card-border hover:bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
