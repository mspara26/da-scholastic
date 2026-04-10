/* eslint-disable */
/* global WebImporter */
/** Parser for carousel-lob. Base: carousel. Source: https://www.scholastic.com/home. */
export default function parse(element, { document }) {
  // Source: .lobCarousel contains LOB (Line of Business) carousel slides
  // Each slide has: logo, description, CTA, and category sub-cards with images/labels

  const slides = element.querySelectorAll('.slick-slide:not(.slick-cloned) .lobTeaser');

  // Carousel block structure: each row = 1 slide with [image | content]
  const cells = [];

  slides.forEach((slide) => {
    // Extract logo image
    const logoImg = slide.querySelector('.cmp-lobTeaser__logo img');

    // Extract description
    const description = slide.querySelector('.cmp-lobTeaser__description p');

    // Extract CTA button
    const ctaLink = slide.querySelector('.cmp-lobTeaser__button a');

    // Extract background image for the slide
    const bgImg = slide.querySelector('.cmp-lobTeaser__backgroundImage');

    // Extract category cards
    const cards = slide.querySelectorAll('.cmp-lobTeaser__card');

    // Build content for this slide
    const imageCell = bgImg || '';
    const contentCell = [];

    if (logoImg) contentCell.push(logoImg);
    if (description) contentCell.push(description);

    // Add category card info as a list
    if (cards.length > 0) {
      const ul = document.createElement('ul');
      cards.forEach((card) => {
        const cardLink = card.querySelector('a.cmp-lobCard');
        const cardLabel = card.querySelector('.cmp-lobCard__label .cmp-title__text');
        const cardImg = card.querySelector('.cmp-lobCard__image img');

        if (cardLabel && cardLabel.textContent.trim()) {
          const li = document.createElement('li');
          if (cardLink && cardLink.href) {
            const a = document.createElement('a');
            a.href = cardLink.href;
            a.textContent = cardLabel.textContent.trim();
            li.appendChild(a);
          } else {
            li.textContent = cardLabel.textContent.trim();
          }
          ul.appendChild(li);
        }
      });
      if (ul.children.length > 0) contentCell.push(ul);
    }

    if (ctaLink) contentCell.push(ctaLink);

    if (contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-lob', cells });
  element.replaceWith(block);
}
