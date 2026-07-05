import Reveal from "./Reveal";
import { skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
          Skills
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          What I work with
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.08}>
            <div className="h-full rounded-2xl border border-card-border bg-card p-6">
              <h3 className="mb-4 font-display text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-card-border bg-background/40 px-3 py-1 text-xs text-muted transition-colors hover:border-accent-2/50 hover:text-accent-2"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
