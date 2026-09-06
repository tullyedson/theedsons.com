# The Edsons

The Edson family website, currently occupying an unreasonable amount of the space-time continuum to say almost nothing.

A neon single-page holding site whose only visible copy is "nothing to see here move along." The original Bungee typography and cyan, magenta, violet and gold palette return with animated chrome lettering, orbiting lights, a moving grid and pointer-responsive stars. The small icon in the corner pauses motion; the page also follows the visitor's reduced-motion preference. No sound, account, cookies, or analytics are added.

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

The earlier planetary backdrop is retained as an unused asset, not displayed on this revision. `public/cosmic-horizon.webp` is original artwork created with the built-in image generation tool and encoded as WebP (1536 x 1024, approximately 85 KB). The original social-preview image `public/og.png` is preserved. The exact generation prompt is in `ARTWORK.md`.
