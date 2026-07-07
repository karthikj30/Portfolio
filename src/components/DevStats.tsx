"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";
import GitHubStats from "./GitHubStats";
import { profile } from "@/data/portfolio";

const LEETCODE = `https://leetcard.jacoblin.cool/${profile.leetcodeUser}?theme=dark&font=Nunito&border=0&radius=12`;

function LeetCodeCard() {
  const [err, setErr] = useState(false);
  return (
    <a
      href={profile.socials.leetcode}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center rounded-2xl border border-card-border bg-card p-4 transition-colors hover:border-accent-2/40"
    >
      {err ? (
        <span className="inline-flex items-center gap-2 py-8 text-sm text-muted">
          <ExternalLink size={16} /> View LeetCode profile
        </span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={LEETCODE}
          alt="LeetCode stats"
          loading="lazy"
          onError={() => setErr(true)}
          className="h-auto w-full max-w-md"
        />
      )}
    </a>
  );
}

export default function DevStats() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <GithubIcon size={18} />
        <h3 className="font-display text-lg font-semibold">By the numbers</h3>
        <span className="ml-1 text-xs uppercase tracking-widest text-muted">
          Live GitHub &amp; LeetCode
        </span>
      </div>
      <div className="grid items-start gap-4 md:grid-cols-2">
        <GitHubStats />
        <LeetCodeCard />
      </div>
    </div>
  );
}
