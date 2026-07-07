# Certificate images

Drop certificate images/scans here (e.g. `genai-academy.png`, `accenture.jpg`).

Then reference them in `src/data/portfolio.ts` on a certificate entry:

```ts
{
  title: "Gen AI Program — Gen AI Academy (Forge)",
  image: "/images/certificates/genai-academy.png", // <- this line
}
```

If a certificate has an image, the card shows the image (and clicking it opens
the full image in a new tab). Without an image, it shows the award icon.

Recommended size: ~1000×720px (landscape), under ~300 KB. JPG or PNG.
