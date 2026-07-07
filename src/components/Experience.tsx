"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { experience, skillBars } from "@/data/portfolio";
import { getSkillMeta } from "./skillIcons";

function SkillGrowthChart() {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Skills I&apos;ve built</h3>
        <span className="text-xs uppercase tracking-widest text-muted">
          Growth across roles
        </span>
      </div>
      <div className="space-y-5">
        {skillBars.map((bar, i) => (
          <div key={bar.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="text-foreground">{bar.label}</span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-muted"
              >
                {bar.level}%
              </motion.span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-background/70">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${bar.level}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 1.1,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-gradient-to-r from-accent-2 to-accent"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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

      <Reveal delay={0.1}>
        <div className="mt-10">
          <SkillGrowthChart />
        </div>
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

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-card-border pt-4">
                    {exp.skills.map((skill, si) => {
                      const { Icon, color } = getSkillMeta(skill);
                      return (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: si * 0.05 }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-background/50 px-2.5 py-1 text-[11px] text-muted"
                        >
                          <Icon size={13} className="shrink-0" style={{ color }} />
                          {skill}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
