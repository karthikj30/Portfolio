"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import ParticleField from "./ParticleField";
import { profile } from "@/data/portfolio";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-14, 14]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <ParticleField />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-1.5 text-sm text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-accent-2 animate-pulse" />
            Open to internship & full-time opportunities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">{profile.name.split(" ")[0]}</span>
            <br />
            {profile.name.split(" ").slice(1).join(" ")}
          </motion.h1>

          <div className="mt-6 h-8 text-xl font-medium text-muted sm:text-2xl">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {profile.roles[roleIndex]}
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-card-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-accent-2/50 hover:text-accent-2"
            >
              Get in touch
            </a>

            <div className="ml-2 flex items-center gap-4 text-muted">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-foreground"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-foreground"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="transition-colors hover:text-foreground"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1000 }}
          className="relative mx-auto hidden aspect-[4/5] w-full max-w-sm lg:block"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative h-full w-full"
          >
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent/25 to-accent-2/15 blur-3xl" />
            <motion.div
              style={{ x: imageX, y: imageY }}
              className="relative h-full w-full overflow-hidden rounded-[2rem] border border-card-border"
            >
              <Image
                src="/images/portrait-2.jpg"
                alt={profile.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-foreground"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
