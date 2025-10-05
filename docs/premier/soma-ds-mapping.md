### Mapping to `soma_design_system.json`

Design tokens
- Colors → `design_system.color_palette`
  - tokens.colors.primary (#007A63/#009F7F) ↔ likely `brand_primary` (trust color)
  - neutrals/text/border ↔ `neutrals` section (background/text/border)
  - semantic colors ↔ `semantic` section (success/warning/error/info)

- Typography → `design_system.typography`
  - Use `font_families.primary` for base and `headings` for headings
  - Size/line-height ↔ `scale` (h1–caption)

- Spacing → `design_system.spacing_system`
  - tokens.spacing (4–64px) ↔ `values` with 8px base unit guidance

Components & patterns
- Buttons ↔ `component_library.buttons` (primary, secondary, text_link)
- Cards ↔ `component_library.cards` (product_card, info_card)
- Trust badges ↔ `content_patterns.trust_signals` and `layout_patterns.trust_indicators`
- FAQ ↔ `layout_patterns.faq_accordion` and `content_patterns.educational_content`
- Header/footer ↔ `navigation.header`/`navigation.footer`

Layout & responsiveness
- Grid/breakpoints ↔ `layout_patterns.grid_system` and `responsive_behavior`
- Section spacing ↔ `spacing_system.application.section_spacing`

Accessibility & motion
- A11y checklist ↔ `accessibility.requirements` and `focus_states`
- Motion durations/easing ↔ `animation_motion.principles/common_animations`

Implementation notes
- Tokens JSON ↔ `implementation_notes.design_tokens`
- CSS vars and componentization ↔ `implementation_notes.tech_stack_recommendations` and `component_approach`

Notes
- Keep brand voice aligned with `brand_voice` (authoritative, approachable, evidence‑backed) across new sections.



