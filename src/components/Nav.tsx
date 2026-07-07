"use client";

import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { openResume } from "./ResumeModal";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-md border-b border-card-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight"
        >
          {profile.initials}
          <span className="text-gradient">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={openResume}
            className="inline-flex items-center gap-1.5 rounded-full border border-card-border bg-card px-4 py-2 text-sm transition-colors hover:border-accent-2/50 hover:text-accent-2"
          >
            <FileText size={15} />
            Résumé
          </button>
          <a
            href="#contact"
            className="inline-flex rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Let&apos;s talk
          </a>
        </div>

        <button
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-card-border bg-background/95 backdrop-blur-md">
          <ul className="flex flex-col px-6 py-4 gap-4 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-1 transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  openResume();
                }}
                className="flex items-center gap-2 py-1 text-accent-2"
              >
                <FileText size={15} />
                View Résumé
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
