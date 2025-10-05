### Performance quick wins

- Images
  - Compress hero and tile imagery; serve AVIF/WebP with JPEG fallbacks.
  - Size images to container; apply `loading="lazy"` for below‑the‑fold.

- JavaScript
  - Defer non‑critical scripts; inline only critical snippets.
  - Audit/remove unused third‑party widgets; load on intent where possible.

- CSS
  - Inline critical CSS for above‑the‑fold; defer rest; purge unused CSS.

- Fonts
  - Limit families/weights; use `font-display: swap`; preconnect to font hosts.

- Caching
  - Long‑cache static assets with hashing; enable CDN; gzip/brotli.

- Metrics
  - Target Lighthouse (mobile): Performance ≥ 85, CLS < 0.1, TBT reduction. Monitor with Web Vitals.


