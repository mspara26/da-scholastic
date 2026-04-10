/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroShowcaseParser from './parsers/hero-showcase.js';
import cardsPromoParser from './parsers/cards-promo.js';
import columnsBannerParser from './parsers/columns-banner.js';
import carouselProductsParser from './parsers/carousel-products.js';
import cardsMerchandisingParser from './parsers/cards-merchandising.js';
import carouselLobParser from './parsers/carousel-lob.js';

// TRANSFORMER IMPORTS
import scholasticCleanupTransformer from './transformers/scholastic-cleanup.js';
import scholasticSectionsTransformer from './transformers/scholastic-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-showcase': heroShowcaseParser,
  'cards-promo': cardsPromoParser,
  'columns-banner': columnsBannerParser,
  'carousel-products': carouselProductsParser,
  'cards-merchandising': cardsMerchandisingParser,
  'carousel-lob': carouselLobParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Scholastic homepage with featured content, promotions, and navigation to key sections',
  urls: [
    'https://www.scholastic.com/home',
  ],
  blocks: [
    {
      name: 'hero-showcase',
      instances: ['.compoundheader .cmp-compoundheader__hero'],
    },
    {
      name: 'cards-promo',
      instances: ['.compoundheader .grid-layout'],
    },
    {
      name: 'columns-banner',
      instances: ['.responsivegrid .layout-02-top.layout-02-bottom'],
    },
    {
      name: 'carousel-products',
      instances: ['.merchandisingcarousel:not(.bookcarousel)', '.bookcarousel.merchandisingcarousel'],
    },
    {
      name: 'cards-merchandising',
      instances: ['.threeCardMerchandising'],
    },
    {
      name: 'carousel-lob',
      instances: ['.lobCarousel.carousel'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Section',
      selector: '.compoundheader',
      style: 'green-pattern',
      blocks: ['hero-showcase', 'cards-promo'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Classrooms Count Banner',
      selector: ['.responsivegrid .layout-02-top.layout-02-bottom:first-of-type'],
      style: null,
      blocks: ['columns-banner'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Scholastic TV Banner',
      selector: ['.responsivegrid .layout-02-top.layout-02-bottom:last-of-type'],
      style: 'peach',
      blocks: ['columns-banner'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Summer Learning Carousel',
      selector: '.merchandisingcarousel:not(.bookcarousel)',
      style: null,
      blocks: ['carousel-products'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Book Sets Carousel',
      selector: '.bookcarousel.merchandisingcarousel',
      style: null,
      blocks: ['carousel-products'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: "Don't Miss Out Cards",
      selector: '.threeCardMerchandising',
      style: 'peach',
      blocks: ['cards-merchandising'],
      defaultContent: ['.cmp-threeCardMerchandising__headerTitle'],
    },
    {
      id: 'section-7',
      name: 'Line of Business Carousel',
      selector: '.lobCarousel.carousel',
      style: null,
      blocks: ['carousel-lob'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  scholasticCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [scholasticSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
