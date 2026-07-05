import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-card-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js.
        </p>
        <a href="#top" className="transition-colors hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
