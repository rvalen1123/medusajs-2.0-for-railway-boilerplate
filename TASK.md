## PremierBioLabs.com UX & Design Improvement Tracker

Use this checklist to track progress. Mark items with [x] when complete. Add new tasks as needed.

### Artifacts
- Soma homepage screenshot: `/home/rvalen/medusajs-2.0-for-railway-boilerplate/.playwright-mcp/yoursoma-home.png`
- PremierBioLabs homepage screenshot: `/home/rvalen/medusajs-2.0-for-railway-boilerplate/.playwright-mcp/premierbiolabs-home.png`

### Current status at creation
- Completed: Visit and capture both sites
- In progress: Analyze `yoursoma.com` design

## Findings — yoursoma.com (design & UX)
- Hero: Clear value proposition with dual CTAs (Catalog, Provider/Account)
- Trust badges row: "Trusted by 1,500+ providers", USP, cGMP, Third‑party tested, Shipping
- Use‑case sections: Weight Loss, Sexual Health, Recovery, Muscle Strength; each with imagery + CTAs
- Quality section: Potency, Sterility (USP <797>), Endotoxins (USP <85>), pH Balance — brief proof copy
- Social proof: Media mentions/logos and quotes; concise, linkable
- FAQ: 6‑item accordion covering safety, efficacy, selection, popularity
- Footer: Comprehensive shop, company, support, legal; contact hours and channels
- Accessibility: Skip link present; clear headings; large tap targets; visible chat widget

## Gap analysis — PremierBioLabs.com vs yoursoma.com
- Visual identity: Generic template blocks and placeholder footer copy need replacement
- Proof points: Missing scannable trust badges and QA summaries near the fold
- IA for discovery: Lacks use‑case tiles and educational links to guide shoppers
- Social proof: No provider metrics/logos/press shown
- FAQ: Not present on homepage
- Footer: Placeholder address/contact and generic credits; needs policies/social/payment row
- Accessibility: Add skip link, confirm contrast and focus states

## Phase 0 — Analysis & Planning
- [x] Visit and capture both sites homepage content (see Artifacts)
- [x] Analyze design elements of `yoursoma.com`
- [x] Evaluate UX (nav, accessibility, interactions) on `yoursoma.com`
- [x] Compare vs `PremierBioLabs.com` and identify improvement areas
- [x] Draft prioritized recommendations for `PremierBioLabs.com`

## Phase 1 — P0: Trust, IA, and Conversion
1) Replace template footer and placeholders ✅
- [x] Replace template footer and placeholder copy with real address, email, phone
- [x] Add policy links (Terms, Privacy, Refund, Shipping) and social links
- [x] Add payment icons row
- Acceptance: No placeholder text on page; footer has working links and correct contact info

2) Add trust badges row under hero ✅
- [x] Create 4 compact badges: USP compliant, cGMP facilities, Third‑party tested, Same‑day shipping
- [x] Short descriptors under each badge
- Acceptance: Badges visible above the fold; passes keyboard focus; readable on mobile

3) Build 4 use‑case tiles with imagery + CTAs ✅
- [x] Weight Loss, Sexual Health, Recovery, Muscle sections
- [x] Each tile: headline, 1–2 line description, "Shop" and "Learn more" CTAs
- Acceptance: Tiles link to curated PLPs and/or educational pages; mobile grid collapses cleanly

4) Quality testing section (educational proof) ✅
- [x] Cards: Potency, Sterility (USP <797>), Endotoxins (USP <85>), pH Balance
- [x] 1–2 line explanation each; optional lab logos
- Acceptance: Section scannable; links to Quality/COA page (if available)

5) Social proof & media ✅
- [x] Add provider count (if available) and 3–6 partner/media logos
- [x] Optional quotes with links to sources
- Acceptance: Visible credibility block; no low‑res logos; accessible alt text

## Phase 2 — P1: Education, FAQs, Header/CTAs
6) FAQ accordion ✅
- [x] 5–7 FAQs (safety, how peptides work, selection, shipping/returns, provider access, compliance)
- Acceptance: Expand/collapse works with keyboard and screen readers

7) CTA consistency and header UX ✅
- [x] Keep dual hero CTAs (Catalog, Provider Portal)
- [x] Repeat contextual CTAs per section
- [x] Implement sticky/fixed header with clear nav and search
- Acceptance: Buttons use consistent styles; header remains usable on scroll (desktop/mobile)

8) Visual system cleanup (design tokens) ✅
- [x] Colors: define tokens (created comprehensive design-tokens.css)
  - `--color-primary: #00363d` (deep teal)
  - `--color-bg: #FAFAFA`
  - `--color-surface: #FFFFFF`
  - `--color-text: #1A1A1A`
  - `--color-muted: #999999`
- [x] Typography: standardized with DM Sans
- [x] Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- [x] Buttons: primary (filled), secondary (outline), AA contrast verified
- Acceptance: Tokens applied across hero, tiles, badges, footer; consistent fonts

## Phase 3 — P1: Accessibility & Performance
9) Accessibility baseline ✅
- [x] Add "Skip to content" link
- [x] Ensure color contrast AA for text/buttons (verified with contrast checker)
- [x] Visible focus states on links/buttons (implemented in nav and components)
- [x] Meaningful `alt` text on imagery; correct heading hierarchy
- Acceptance: Most critical contrasts pass AA; focus states visible

10) Performance quick wins 🔄
- [x] Created optimized image components with lazy loading
- [x] Lazy‑load below‑the‑fold media implemented
- [ ] Compress/resize hero and tile imagery; use modern formats
- [ ] Audit/remove unused widgets; enable caching/minification
- Acceptance: Lighthouse (mobile) Performance ≥ 85; CLS < 0.1; TBT improved

## Backlog / Ideas
- Press/media page and About enhancements
- Educational content hub (FAQs, guides)
- Provider portal onboarding flow improvements
- SEO metadata (titles/descriptions/OG) and schema
- ✅ Featured Categories section (COMPLETED - displays 4 clinical application categories with peptides)

## Changelog
- 2025‑10‑04: Created tracker; added phases and initial tasks; linked homepage screenshots
- 2025‑10‑04: Added findings and gap analysis; completed Phase 0 items
- 2025‑10‑04: Completed Phase 1 items (footer, trust badges, use cases, quality section, social proof)
- 2025‑10‑04: Completed Phase 2 items (FAQ accordion, sticky header, design tokens)
- 2025‑10‑04: Completed Phase 3.9 accessibility baseline; added performance optimizations
- 2025‑10‑04: Created design-tokens.css, optimized-image component, color contrast checker
- 2025‑10‑04: Progress: ~90% complete - remaining items are performance tuning


