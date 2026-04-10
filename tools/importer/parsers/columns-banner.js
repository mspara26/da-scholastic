/* eslint-disable */
/* global WebImporter */
/** Parser for columns-banner. Base: columns. Source: https://www.scholastic.com/home. */
export default function parse(element, { document }) {
  // Source: responsive grid with layout-02-top containing image + text side by side
  // Each banner has a background/foreground image on one side and heading+CTA on the other

  // Extract the main image (foreground image in the image column)
  const mainImage = element.querySelector('.cmp-image__image, img.cmp-image__image');

  // Extract heading
  const heading = element.querySelector('.cmp-title h2, h2.cmp-title__text');

  // Extract CTA button/link
  const ctaLink = element.querySelector('.button .cmp-title__link, .cmp-title a.cmp-title__link');

  // Columns block structure: 1 row with 2 columns [image | text content]
  const cells = [];

  const imageCell = mainImage ? [mainImage] : [];
  const textCell = [];
  if (heading) textCell.push(heading);
  if (ctaLink && (!heading || !heading.contains(ctaLink))) textCell.push(ctaLink);

  if (imageCell.length > 0 || textCell.length > 0) {
    cells.push([imageCell.length > 0 ? imageCell : '', textCell.length > 0 ? textCell : '']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-banner', cells });
  element.replaceWith(block);
}
