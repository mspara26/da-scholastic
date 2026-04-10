/* eslint-disable */
/* global WebImporter */
/** Parser for hero-showcase. Base: hero. Source: https://www.scholastic.com/home. */
export default function parse(element, { document }) {
  // Extract background image from .cmp-compoundheader__hero > img (first direct img)
  const bgImage = element.querySelector(':scope > img');

  // Extract floating image
  const floatingImg = element.querySelector('.cmp-compoundheader__floatingImage img');

  // Extract heading from .cmp-compoundheader__headerTitle
  const heading = element.querySelector('.cmp-compoundheader__headerTitle h2, .cmp-compoundheader__headerTitle .cmp-title__text');

  // Extract CTA link from .cmp-compoundheader__actionLink
  const ctaLink = element.querySelector('.cmp-compoundheader__actionLink a');

  // Build cells matching hero block structure:
  // Row 1: background image
  // Row 2: content (heading + CTA)
  const cells = [];

  // Row 1: image (background + floating combined)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (ctaLink) contentCell.push(ctaLink);
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-showcase', cells });
  element.replaceWith(block);
}
