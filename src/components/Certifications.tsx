"use client";

import { useState } from "react";
import { Award } from "lucide-react";
import Reveal from "./Reveal";
import { certificates, type Certificate } from "@/data/portfolio";

function CertCard({ cert }: { cert: Certificate }) {
  const [err, setErr] = useState(false);
  const showImage = cert.image && !err;

  const card = (
    <div className="w-[280px] shrink-0 overflow-hidden rounded-2xl border border-card-border bg-card transition-colors hover:border-accent-2/50 sm:w-[360px]">
      {showImage ? (
        <div className="h-44 w-full overflow-hidden bg-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            draggable={false}
            onError={() => setErr(true)}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(139,92,246,0.18),transparent_70%)]">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-2/10 text-accent-2">
            <Award size={28} />
          </span>
        </div>
      )}
      <div className="border-t border-card-border p-4">
        <p className="text-sm font-medium leading-snug text-foreground">
          {cert.title}
        </p>
      </div>
    </div>
  );

  return cert.image ? (
    <a href={cert.image} target="_blank" rel="noreferrer" draggable={false}>
      {card}
    </a>
  ) : (
    card
  );
}

function Row({ items, reverse }: { items: Certificate[]; reverse?: boolean }) {
  // Duplicate the row so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="group flex w-max gap-5 [animation:marquee-x_38s_linear_infinite] hover:[animation-play-state:paused]"
      style={reverse ? { animationDirection: "reverse" } : undefined}
    >
      {doubled.map((cert, i) => (
        <CertCard key={`${cert.title}-${i}`} cert={cert} />
      ))}
    </div>
  );
}

export default function Certifications() {
  const rowA = certificates.filter((_, i) => i % 2 === 0);
  const rowB = certificates.filter((_, i) => i % 2 === 1);

  return (
    <section id="certifications" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-accent-2">
            Certifications &amp; Awards
          </p>
          <h2 className="text-center font-display text-3xl font-bold sm:text-4xl">
            Trophy Room
          </h2>
          <p className="mt-3 text-center text-sm text-muted">
            Achievements and certifications unlocked — hover to pause, click to
            enlarge.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 flex flex-col gap-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <Row items={rowA} />
          <Row items={rowB} reverse />
        </div>
      </Reveal>
    </section>
  );
}
