"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, FileText, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import GalaxyBackground from "./GalaxyBackground";
import { openResume } from "./ResumeModal";
import { profile } from "@/data/portfolio";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-driven 3D tilt + parallax (Moncy-style).
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 90, damping: 16 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 16 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const imageX = useTransform(springX, [-0.5, 0.5], [-24, 24]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-24, 24]);

  // Scroll-driven lift + drift so the portrait moves as you scroll.
  const { scrollY } = useScroll();
  const scrollLift = useTransform(scrollY, [0, 700], [0, -90]);
  const scrollLiftSpring = useSpring(scrollLift, { stiffness: 120, damping: 30 });

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
      ref={sectionRef}
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <GalaxyBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
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
            <button
              onClick={openResume}
              className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-accent-2/50 hover:text-accent-2"
            >
              <FileText size={16} />
              View Résumé
            </button>
            <a
              href="#contact"
              className="text-sm font-semibold text-muted transition-colors hover:text-foreground"
            >
              Get in touch →
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
          className="relative mx-auto hidden aspect-video w-full max-w-lg lg:block"
        >
          <motion.div
            style={{
              rotateX,
              rotateY,
              y: scrollLiftSpring,
              transformStyle: "preserve-3d",
            }}
            className="relative h-full w-full"
          >
            <div className="absolute -inset-6 rounded-[1.75rem] bg-gradient-to-br from-accent/25 to-accent-2/15 blur-3xl" />
            <motion.div
              style={{ x: imageX, y: imageY }}
              className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-card-border shadow-2xl shadow-black/40"
            >
              <video
                src="/videos/intro.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/images/portrait-2.jpg"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
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
