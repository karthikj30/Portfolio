import Image from "next/image";
import { GraduationCap, Languages, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { about, profile } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
          About
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Who I am
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-[280px_1fr] md:items-start">
        <Reveal delay={0.1}>
          <div className="relative mx-auto w-56 md:w-full">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/30 to-accent-2/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-card-border">
              <Image
                src="/images/profile.png"
                alt={profile.name}
                width={420}
                height={520}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mb-4 text-muted leading-relaxed">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-card-border bg-card p-4">
                <GraduationCap className="mb-2 text-accent-2" size={20} />
                <p className="text-sm font-medium">{profile.education}</p>
                <p className="mt-1 text-xs text-muted">CGPI: {profile.cgpi}</p>
              </div>
              <div className="rounded-2xl border border-card-border bg-card p-4">
                <MapPin className="mb-2 text-accent-2" size={20} />
                <p className="text-sm font-medium">{profile.location}</p>
                <p className="mt-1 text-xs text-muted">Based in</p>
              </div>
              <div className="rounded-2xl border border-card-border bg-card p-4">
                <Languages className="mb-2 text-accent-2" size={20} />
                <p className="text-sm font-medium">
                  {about.languages.join(", ")}
                </p>
                <p className="mt-1 text-xs text-muted">Languages</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
