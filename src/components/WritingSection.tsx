"use client";

import { useEffect, useState } from "react";
import { SiMedium } from "react-icons/si";
import Reveal from "./Reveal";
import FeedRotator from "./FeedRotator";
import LinkedInEmbeds from "./LinkedInEmbeds";
import { profile, type FeedPost } from "@/data/portfolio";

export default function WritingSection() {
  const [medium, setMedium] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/medium")
      .then((r) => r.json())
      .then((d) => {
        if (active) setMedium(d.posts ?? []);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="writing" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent-2">
          Writing &amp; Activity
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Latest posts
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid items-stretch gap-5 md:grid-cols-2">
          <LinkedInEmbeds />
          <FeedRotator
            title="Medium"
            icon={<SiMedium size={18} />}
            accent="#22d3ee"
            profileUrl={profile.socials.medium}
            posts={medium}
            loading={loading}
            emptyLabel="No Medium posts yet — check back soon."
          />
        </div>
      </Reveal>
    </section>
  );
}
