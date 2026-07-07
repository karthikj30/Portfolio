# Content guide — how to update your portfolio

Almost all text/content lives in **one file**:

```
src/data/portfolio.ts
```

Images and files (photos, resume, videos, project/cert images) live in:

```
public/
```

Anything in `public/` is served from the site root. So
`public/images/projects/foo.png` is referenced in code as
`/images/projects/foo.png`.

---

## 1. Add / edit a PROJECT (the flip-card carousel)

Edit the `projects` array in `src/data/portfolio.ts`:

```ts
{
  name: "My New Project",
  date: "2026",
  stack: "React · Node · MongoDB",      // "·"-separated; each gets an icon on the flip side
  description: "One or two sentences about it.",
  href: "https://github.com/karthikj30/my-project", // optional — omit for a private project (shows a lock)
  image: "/images/projects/my-project.png",          // optional cover image
}
```

- **Image:** put the file in `public/images/projects/` and set `image` to
  `/images/projects/<filename>`. Leave `image` out for the plain gradient card.
- The **back of the card** (tech + skills) is generated automatically from `stack`.
  Icons come from `src/components/skillIcons.tsx` — if a tech has no icon there,
  it falls back to a sparkle icon (add a mapping if you want a specific logo).

The smaller **"More on GitHub"** grid uses the separate `githubProjects` array
in the same file (same idea, always needs an `href`).

---

## 2. Add / edit a CERTIFICATE or AWARD (the carousel)

Edit the `certificates` array in `src/data/portfolio.ts`:

```ts
{ title: "My Certificate — Issuer" },                         // icon-only card
{ title: "My Certificate — Issuer", image: "/images/certificates/my-cert.png" }, // shows the image
```

- **Image:** put the file in `public/images/certificates/` and set `image`.
  With an image, the card shows it and clicking opens the full image in a new tab.
  Without one, it shows an award icon.
- The carousel paginates automatically — no other changes needed when you add more.

---

## 3. Add / edit SKILLS (the icon grid)

Edit `skillGroups` in `src/data/portfolio.ts` (four groups: Languages, Web,
Data & AI, Tools). Just add the skill name to a group's `items`.

To give a new skill a **specific brand icon + colour**, add a line to the `MAP`
in `src/components/skillIcons.tsx` (keyed by the lowercase name).

---

## 4. Add / edit EXPERIENCE (timeline + chart)

Edit the `experience` array in `src/data/portfolio.ts`. Each entry has
`role`, `org`, `date`, `bullets`, an optional `tag` (e.g. "Current"), and
`skills` (the chips shown at the bottom of the card).

The **"Skills I've built" chart** at the top of the section is driven by the
`skillBars` array in the same file (`{ label, level }`, level 0–100).

---

## 5. Replace media (photo / resume / intro video)

| What | File to replace |
|------|-----------------|
| Hero photo backdrop / about photo | `public/images/portrait-1.jpg`, `public/images/portrait-2.jpg`, `public/images/profile.png` |
| Résumé (opened by the "Résumé" button) | `public/resume.pdf` |
| Intro + hero video | `public/videos/intro.mp4` |

Keep the same filenames and they'll be picked up automatically. (The résumé
currently published has the two referees' phone/email redacted for privacy.)

---

## 6. Social / contact links

In `src/data/portfolio.ts` under `profile`: `email`, `socials.github`,
`socials.linkedin`, and `resumeUrl`.

---

## Running it

```bash
npm run dev     # local dev at http://localhost:3000
npm run build   # production build
```
