### Accessibility baseline checklist

- Skip link
  - Add `a[href="#main"]` or similar as first focusable element; reveal on focus.

- Headings & landmarks
  - One H1 per page; logical H2/H3 structure. Use semantic `<header>`, `<main>`, `<footer>`, `<nav>`.

- Color & contrast
  - AA for text (≥ 4.5:1 normal, 3:1 large). Ensure button text vs background passes AA.

- Keyboard & focus
  - All interactive elements reachable by keyboard; visible focus states (`:focus-visible`).

- Links & buttons
  - Clear purpose in text; icon‑only controls need `aria-label`.

- Images & icons
  - Meaningful `alt` text; decorative images `alt=""` and `aria-hidden="true"`.

- Components
  - Accordions: buttons with `aria-controls` and `aria-expanded` reflecting state.
  - Modals, menus: focus trap; ESC to close; `role` and labelling.

- Forms
  - `<label for>` or `aria-labelledby`; error messaging tied via `aria-describedby`.

- Motion
  - Respect `prefers-reduced-motion`; avoid gratuitous animation.

- Testing
  - Run axe/WAVE; test keyboard‑only; screen reader smoke test (NVDA/VoiceOver).


