import Reveal from "./Reveal";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
          Experience
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Where I&apos;ve been
        </h2>
      </Reveal>

      <div className="relative mt-14 pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-2 via-card-border to-transparent" />

        <div className="space-y-10">
          {experience.map((exp, i) => (
            <Reveal key={`${exp.org}-${exp.date}`} delay={Math.min(i * 0.06, 0.3)}>
              <div className="relative">
                <span
                  className={`absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background ${
                    exp.tag ? "bg-accent-2" : "bg-card-border"
                  }`}
                />
                <div className="rounded-2xl border border-card-border bg-card p-6 transition-colors hover:border-accent-2/40">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">
                      {exp.role}
                    </h3>
                    <span className="text-xs text-muted">{exp.date}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent-2">
                    {exp.org}
                    {exp.tag && (
                      <span className="ml-2 rounded-full bg-accent-2/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-2">
                        {exp.tag}
                      </span>
                    )}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
