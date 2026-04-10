/* eslint-disable */
/* global WebImporter */
/** Parser for carousel-products. Base: carousel. Source: https://www.scholastic.com/home. */
export default function parse(element, { document }) {
  // Source: .merchandisingcarousel / .bookcarousel
  // Structure: left side has rubric + heading + description + CTA, right side has carousel items

  // Extract rubric/eyebrow text
  const rubric = element.querySelector('.cmp-merchandisingCarousel__rubric .cmp-title__text');

  // Extract main heading
  const heading = element.querySelector('.cmp-merchandisingCarousel__cardTitle h2');

  // Extract description
  const description = element.querySelector('.cmp-merchandisingCarousel__description p');

  // Extract CTA button
  const ctaLink = element.querySelector('.cmp-merchandisingCarousel__button a');

  // Extract carousel items (each .slick-slide contains a merchandising teaser)
  const slides = element.querySelectorAll('.slick-slide:not(.slick-cloned) .cmp-merchandisingteaser');

  // Carousel block structure: each row = 1 slide with [image | text content]
  const cells = [];

  // First slide: intro content (rubric + heading + description + CTA)
  const introCell = [];
  if (rubric) {
    const p = document.createElement('p');
    p.textContent = rubric.textContent.trim();
    introCell.push(p);
  }
  if (heading) introCell.push(heading);
  if (description) introCell.push(description);
  if (ctaLink) introCell.push(ctaLink);
  if (introCell.length > 0) {
    cells.push(introCell);
  }

  // Product slides: each with image + title
  slides.forEach((slide) => {
    const img = slide.querySelector('.cmp-image__image');
    const title = slide.querySelector('.cmp-merchandisingteaser__title h3, .cmp-merchandisingteaser__title .cmp-title__text');
    const link = slide.querySelector('.cmp-merchandisingteaser__content > a');

    const slideCell = [];
    if (img) slideCell.push(img);
    if (title) {
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = title.textContent.trim();
        slideCell.push(a);
      } else {
        slideCell.push(title);
      }
    }
    if (slideCell.length > 0) {
      cells.push(slideCell);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-products', cells });
  element.replaceWith(block);
}
