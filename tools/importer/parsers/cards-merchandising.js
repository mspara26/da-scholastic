/* eslint-disable */
/* global WebImporter */
/** Parser for cards-merchandising. Base: cards. Source: https://www.scholastic.com/home. */
export default function parse(element, { document }) {
  // Source: .threeCardMerchandising contains 3 merchandising cards
  // Each card has: rubric, title, description, CTA link, and image

  const cards = element.querySelectorAll('.cmp-threeCardMerchandising__merchandisingCard');

  // Cards block structure: each row = [image | heading + description + link]
  const cells = [];

  cards.forEach((card) => {
    const img = card.querySelector('.cmp-merchandisingCard__image img');
    const title = card.querySelector('.cmp-merchandisingCard__cardTitle h3');
    const description = card.querySelector('.cmp-merchandisingCard__description p');
    const rubric = card.querySelector('.cmp-merchandisingCard__rubric .cmp-title__text');
    const link = card.querySelector(':scope > a');

    const imageCell = img || '';
    const textCell = [];

    if (rubric) {
      const p = document.createElement('p');
      p.innerHTML = '<em>' + rubric.textContent.trim() + '</em>';
      textCell.push(p);
    }
    if (title) {
      if (link) {
        const h3 = document.createElement('h3');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = title.textContent.trim();
        h3.appendChild(a);
        textCell.push(h3);
      } else {
        textCell.push(title);
      }
    }
    if (description) textCell.push(description);

    if (textCell.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-merchandising', cells });
  element.replaceWith(block);
}
