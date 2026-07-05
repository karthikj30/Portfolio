import { Mail } from "lucide-react";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(139,92,246,0.15),transparent)]" />
          <p className="relative mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
            Contact
          </p>
          <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
            Let&apos;s build something together
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-muted">
            Open to internships, full-time roles, and interesting
            collaborations. Reach out — I reply fast.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              <Mail size={16} />
              {profile.email}
            </a>
          </div>

          <div className="relative mt-8 flex items-center justify-center gap-6 text-muted">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-foreground"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-foreground"
            >
              <LinkedinIcon size={22} />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
