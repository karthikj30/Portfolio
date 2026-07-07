"use client";

import { useEffect, useState } from "react";
import { ExternalLink, GitFork, Star, Users } from "lucide-react";
import { GithubIcon } from "./icons";
import { getSkillMeta } from "./skillIcons";
import { profile } from "@/data/portfolio";

const gh = profile.githubUser;

type Lang = { name: string; count: number };
type Stats = { repos: number; followers: number; stars: number; langs: Lang[] };

export default function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem("gh-stats");
    if (cached) {
      try {
        setStats(JSON.parse(cached));
        return;
      } catch {
        /* ignore bad cache */
      }
    }
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${gh}`),
          fetch(`https://api.github.com/users/${gh}/repos?per_page=100&sort=pushed`),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error("github");
        const u = await uRes.json();
        const repos: Array<{
          fork: boolean;
          stargazers_count: number;
          language: string | null;
        }> = await rRes.json();

        let stars = 0;
        const langCount: Record<string, number> = {};
        for (const r of repos) {
          if (r.fork) continue;
          stars += r.stargazers_count || 0;
          if (r.language)
            langCount[r.language] = (langCount[r.language] || 0) + 1;
        }
        const langs = Object.entries(langCount)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6);

        const s: Stats = {
          repos: u.public_repos ?? 0,
          followers: u.followers ?? 0,
          stars,
          langs,
        };
        setStats(s);
        sessionStorage.setItem("gh-stats", JSON.stringify(s));
      } catch {
        setErr(true);
      }
    })();
  }, []);

  if (err) {
    return (
      <a
        href={profile.socials.github}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-card-border bg-card p-6 text-sm text-muted transition-colors hover:border-accent-2/40 hover:text-accent-2"
      >
        <ExternalLink size={16} /> View GitHub profile
      </a>
    );
  }

  const tiles = [
    { icon: GitFork, label: "Repositories", value: stats?.repos },
    { icon: Star, label: "Stars earned", value: stats?.stars },
    { icon: Users, label: "Followers", value: stats?.followers },
  ];
  const maxLang = Math.max(...(stats?.langs.map((l) => l.count) ?? [1]), 1);

  return (
    <div className="rounded-2xl border border-card-border bg-card p-6">
      <div className="mb-5 flex items-center gap-2">
        <GithubIcon size={18} />
        <h4 className="font-display text-base font-semibold">GitHub</h4>
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-xs text-muted transition-colors hover:text-accent-2"
        >
          @{gh}
        </a>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {tiles.map((t) => (
          <div
            key={t.label}
            className="rounded-xl border border-card-border bg-background/40 p-3 text-center"
          >
            <t.icon size={16} className="mx-auto mb-1.5 text-accent-2" />
            <p className="font-display text-xl font-bold tabular-nums">
              {t.value ?? "—"}
            </p>
            <p className="text-[11px] text-muted">{t.label}</p>
          </div>
        ))}
      </div>

      {stats && stats.langs.length > 0 && (
        <div className="mt-5">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted">
            Most used languages
          </p>
          <div className="space-y-2.5">
            {stats.langs.map((l) => {
              const color = getSkillMeta(l.name).color;
              return (
                <div key={l.name} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-xs text-foreground">
                    {l.name}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-background/70">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(l.count / maxLang) * 100}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {!stats && (
        <div className="mt-5 h-24 animate-pulse rounded-xl bg-background/40" />
      )}
    </div>
  );
}
