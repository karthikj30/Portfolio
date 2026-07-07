"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { skillGroups } from "@/data/portfolio";
import { getSkillMeta } from "./skillIcons";

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
              <h3 className="mb-5 font-display text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } },
                }}
                className="flex flex-col gap-2.5"
              >
                {group.items.map((item) => {
                  const { Icon, color } = getSkillMeta(item);
                  return (
                    <motion.div
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        show: { opacity: 1, x: 0 },
                      }}
                      whileHover={{ x: 4 }}
                      className="group flex items-center gap-3 rounded-xl border border-transparent px-2 py-1.5 transition-colors hover:border-card-border hover:bg-background/40"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/60 transition-transform duration-300 group-hover:scale-110"
                        style={{ color }}
                      >
                        <Icon size={20} />
                      </span>
                      <span className="text-sm text-muted transition-colors group-hover:text-foreground">
                        {item}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
