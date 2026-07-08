import { profile } from "@/data/portfolio";

// Refetch the feed at most every 30 minutes (live-ish, without hammering Medium).
export const revalidate = 1800;

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function pick(block: string, re: RegExp): string {
  const m = block.match(re);
  return m ? m[1] : "";
}

export async function GET() {
  try {
    const res = await fetch(`${profile.socials.medium}/feed`, {
      headers: { "User-Agent": "Mozilla/5.0 (portfolio)" },
      next: { revalidate },
    });
    if (!res.ok) return Response.json({ posts: [] });

    const xml = await res.text();
    const blocks = xml
      .split("<item>")
      .slice(1)
      .map((chunk) => chunk.split("</item>")[0]);

    const posts = blocks.slice(0, 8).map((block) => {
      const title = decode(pick(block, /<title>([\s\S]*?)<\/title>/)).trim();
      const url = decode(pick(block, /<link>([\s\S]*?)<\/link>/)).split("?")[0];
      const pubDate = pick(block, /<pubDate>([\s\S]*?)<\/pubDate>/);
      const content = pick(
        block,
        /<content:encoded>([\s\S]*?)<\/content:encoded>/
      );
      const text = decode(content)
        .replace(/<h3[\s\S]*?<\/h3>/i, "") // drop the repeated heading
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      const date = pubDate
        ? new Date(pubDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";
      const excerpt =
        text.length > 180 ? `${text.slice(0, 180).trim()}…` : text;
      return { title, url, date, excerpt };
    });

    return Response.json({ posts });
  } catch {
    return Response.json({ posts: [] });
  }
}
