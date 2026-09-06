# The Edsons

The Edson family website, currently occupying an unreasonable amount of the space-time continuum to say almost nothing.

A cinematic single-page holding site with original planetary artwork, luminous typography, pointer-responsive stars, and an entirely unnecessary hyperspace button. The header control pauses motion; the page also follows the visitor's reduced-motion preference. No sound, account, cookies, or analytics are added.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The static output is `dist/client`. The existing GitHub Pages workflow deploys it on pushes to `main`, including the existing `CNAME` and `.nojekyll`. Sites uses the same static output through `.openai/hosting.json`. A local build alone does not publish the public family website.

## Checks

```bash
npx tsc --noEmit --incremental false
npx eslint app
npm run build
```

## Artwork

`public/cosmic-horizon.webp` is original artwork created with the built-in image generation tool and encoded as WebP (1536 x 1024, approximately 85 KB). The original social-preview image `public/og.png` is preserved. The exact generation prompt is in `ARTWORK.md`.
