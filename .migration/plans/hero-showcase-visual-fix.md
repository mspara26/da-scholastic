# Fix Hero-Showcase Block to Match Original Screenshot

## Analysis

Looking at the original screenshot vs current rendering:

| Element | Original | Current | Fix Needed |
|---------|----------|---------|------------|
| **Background** | Green patterned (from section) with raindrop shapes | Green-pattern section bg applied correctly | Section bg is fine; hero should be transparent, not peach |
| **Book images** | Large collage of book covers centered above heading | Missing entirely | Add the book cover collage image to content as first row in hero block |
| **Heading** | "Spring into New Stories" — dark text (#333), centered, ~32px thin weight | Currently white (overridden by `.no-image` to #333) | Works with `.no-image` fix |
| **CTA** | "SHOP NOW" — red uppercase text link with underline, NOT a button | Renders as filled red pill button via `.button` class | Change from `a.button` to plain `a` link in content, style as text CTA in CSS |
| **Layout** | Image on top, heading below, CTA below that, all centered | Heading + button only, no image | Add image row to content |

## Content Change

The `hero-showcase` block table in `home.plain.html` needs:
- **Row 1**: Book cover collage image (from `https://www.scholastic.com/content/corp-home/home/_jcr_content/root/compoundheader/image.coreimg.png/1775069835816/gxd-7210-books-img.png`)
- **Row 2**: Heading "Spring into New Stories" + "Shop Now" link (NOT as `.button`)

## CSS Changes

- Remove peach background from `.no-image` — hero should be transparent so section green-pattern shows through
- Style heading as dark text (already handled by `.no-image` override, but let's keep it clean)
- Add text CTA style: red, uppercase, bold, underline — not a filled button
- Ensure the book image displays naturally (not as absolute-positioned background)

## Checklist

- [ ] **1. Update `content/home.plain.html`** — Add the book cover collage image as Row 1 in the hero-showcase block, and ensure "Shop Now" is a plain link (not wrapped in button markup)
- [ ] **2. Update `hero-showcase.css`** — Remove peach from `.no-image`, style the foreground image to display naturally centered, style CTA as red text link
- [ ] **3. Update `hero-showcase.js`** — Adjust the `no-image` detection to check for `picture` in first row specifically (image in first div = has image)
- [ ] **4. Verify in preview** — Confirm hero matches the screenshot: green bg, book images, dark heading, red text CTA

## Files to Modify

| File | Change |
|------|--------|
| `content/home.plain.html` | Add book image row to hero-showcase block, change Shop Now from button to text link |
| `blocks/hero-showcase/hero-showcase.css` | Fix `.no-image`, add foreground image styling, add text CTA styling |
| `blocks/hero-showcase/hero-showcase.js` | Minor: keep current logic (image detection already works) |

---

*Execution requires switching to Execute mode.*
