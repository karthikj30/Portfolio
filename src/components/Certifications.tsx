import { Award } from "lucide-react";
import Reveal from "./Reveal";
import { certificates } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative mx-auto max-w-6xl px-6 py-28"
    >
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
          Certifications
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Learning, formalized
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {certificates.map((cert) => (
            <div
              key={cert}
              className="flex items-start gap-3 rounded-xl border border-card-border bg-card px-4 py-3"
            >
              <Award size={16} className="mt-0.5 shrink-0 text-accent-2" />
              <span className="text-sm text-muted">{cert}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
