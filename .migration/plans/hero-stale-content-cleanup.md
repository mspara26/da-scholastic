# Apply Design Tokens to Block CSS — Refinement Plan

## Context

The global design system (`/styles/styles.css`) and block CSS files (`/blocks/*-*/*.css`) were created in a previous session. The blocks **are rendering** in the preview — the JS decoration is working (after fixing the `moveInstrumentation` import) and CSS is loading. However, several issues need addressing to ensure the CSS selectors correctly target the decorated DOM and the visual output matches the original Scholastic site.

## Current State Analysis

### What's Working
- All 6 block JS files load and decorate successfully
- Global tokens (colors, typography, spacing, buttons) are defined in `:root`
- Block CSS files exist and reference global tokens via `var(--*)`
- Section variant `.green-pattern` applies its background color

### CSS ↔ DOM Selector Mismatches

The block CSS files target class names created by the JS decoration. Here's the mapping:

| Block | JS Creates These Classes | CSS Targets | Match? |
|-------|------------------------|-------------|--------|
| **hero-showcase** | `.no-image` on block | `.hero-showcase`, `.hero-showcase.no-image`, `picture`, `img` | Correct — but hero has no `<picture>` in content, so it always gets `.no-image` |
| **cards-promo** | `ul > li` structure, `.cards-promo-card-image`, `.cards-promo-card-body` | CSS targets `.cards-promo > div > div` (pre-decoration structure) | **Mismatch** — CSS uses `> div` but JS converts to `ul > li` |
| **cards-merchandising** | `ul > li`, `.cards-merchandising-card-image`, `.cards-merchandising-card-body` | CSS targets `ul > li`, `.cards-merchandising-card-image`, `.cards-merchandising-card-body` | Correct |
| **columns-banner** | `.columns-banner-img-col`, `.columns-banner-2-cols` | CSS targets `> div > div`, `.columns-banner-img-col` | Correct |
| **carousel-products** | `.carousel-products-slides-container`, `.carousel-products-slides`, `.carousel-products-slide`, `.carousel-products-slide-image`, `.carousel-products-slide-content`, etc. | CSS targets all these classes | Correct |
| **carousel-lob** | `.carousel-lob-slides-container`, `.carousel-lob-slides`, `.carousel-lob-slide`, `.carousel-lob-slide-image`, `.carousel-lob-slide-content`, etc. | CSS targets all these classes | Correct |

### Content Issues in `home.plain.html`

1. **Stale "Remembering Dick Robinson" content** — 7 paragraphs with empty/broken links and a portrait image appear before the hero-showcase block
2. **Cookie consent dialog content** — OneTrust "Privacy Preference Center" text was imported as page content at the bottom
3. **All blocks in single section** — No `<hr>` section breaks exist, so all blocks render in one `.section.green-pattern` instead of separate sections
4. **`carousel-products` missing `.carousel-products-header` class** — The CSS targets a `.carousel-products-header` wrapper for the intro text (eyebrow + heading + description + CTA) but the JS doesn't create this class. The first slide contains the intro content without this wrapper.

## Checklist

### Content Cleanup
- [ ] **1. Remove stale "Remembering Dick Robinson" paragraphs** from `content/home.plain.html` (lines containing `rememberingdickrobinson` links and Dick Robinson portrait image)
- [ ] **2. Remove cookie consent dialog content** from `content/home.plain.html` (everything from "Privacy Preference Center" heading through "Powered by Onetrust" at the end, before the metadata div)
- [ ] **3. Add section breaks (`<hr>`)** between block groups in `content/home.plain.html` to create proper EDS sections matching the original page layout

### CSS Selector Fixes
- [ ] **4. Fix `cards-promo.css`** — Update selectors from `> div > div` to target the `ul > li` structure that the JS creates (`.cards-promo > ul`, `.cards-promo > ul > li`, `.cards-promo .cards-promo-card-image`, `.cards-promo .cards-promo-card-body`)
- [ ] **5. Fix `carousel-products.css` header targeting** — The CSS expects a `.carousel-products-header` element but the JS doesn't create one. Either: (a) update `carousel-products.js` to wrap the first slide's content in a header div, or (b) update CSS to target `.carousel-products-slide:first-child` for the intro content styling

### Design Token Refinement
- [ ] **6. Verify `carousel-products` slide sizing** — Current CSS sets `flex: 0 0 260px` per slide; confirm product card widths match original (~200px with image)
- [ ] **7. Verify `carousel-lob` slide backgrounds** — Each LOB slide should have a distinct background image/color; current CSS relies on `.carousel-lob-slide-image` but content may need background colors added inline or via section metadata
- [ ] **8. Add mobile-specific heading sizes** — The `@media (width >= 900px)` block in `styles.css` has identical values to the default `:root` — add smaller mobile sizes (e.g., `--heading-font-size-xxl: 36px` for mobile)

### Transformer Fixes (prevent issues on re-import)
- [ ] **9. Update `scholastic-cleanup.js`** — Add selectors to remove the "Remembering Dick Robinson" memorial section and OneTrust cookie consent dialog from future imports
- [ ] **10. Verify `scholastic-sections.js`** — Confirm the section transformer inserts `<hr>` breaks correctly when running against the live page

### Verification
- [ ] **11. Preview the page** at `/content/home` — Confirm all blocks render with correct styling, sections have proper backgrounds, and no stale content appears
- [ ] **12. Compare against original** — Side-by-side visual check of hero, carousels, cards, and LOB sections

## Files to Modify

| File | Changes |
|------|---------|
| `content/home.plain.html` | Remove stale content, add `<hr>` section breaks |
| `blocks/cards-promo/cards-promo.css` | Fix selectors for `ul > li` structure |
| `blocks/carousel-products/carousel-products.css` | Fix first-slide header targeting |
| `blocks/carousel-products/carousel-products.js` | (Option A) Add `.carousel-products-header` wrapper for first slide |
| `styles/styles.css` | Add mobile-specific heading sizes |
| `tools/importer/transformers/scholastic-cleanup.js` | Add removal selectors for memorial + cookie content |

## Priority Order

1. Content cleanup (steps 1-3) — biggest visual impact
2. CSS selector fixes (steps 4-5) — blocks will render correctly
3. Design token refinement (steps 6-8) — polish
4. Transformer fixes (steps 9-10) — prevent re-import issues
5. Verification (steps 11-12) — confirm everything works

---

*To execute this plan, switch to Execute mode.*
