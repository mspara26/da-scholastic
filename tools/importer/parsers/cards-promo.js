/* eslint-disable */
/* global WebImporter */
/** Parser for cards-promo. Base: cards. Source: https://www.scholastic.com/home. */
export default function parse(element, { document }) {
  // Source: .compoundheader .grid-layout contains Book Clubs promo card
  // Extract logo image
  const logoImg = element.querySelector('.cmp-compoundheader__logoImage');

  // Extract clubs image
  const clubsImg = element.querySelector('.cmp-compoundheader__clubsImage img');

  // Extract description text
  const description = element.querySelector('.cmp-compoundheader__clubsText p');

  // Extract CTA button
  const ctaLink = element.querySelector('.cmp-compoundheader__button a');

  // Cards block structure: each row = 1 card with [image | text content]
  const cells = [];

  // Single card row: image column | text column
  const imageCell = clubsImg || logoImg;
  const textCell = [];
  if (description) textCell.push(description);
  if (ctaLink) textCell.push(ctaLink);

  if (imageCell && textCell.length > 0) {
    cells.push([imageCell, textCell]);
  } else if (textCell.length > 0) {
    cells.push(textCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
