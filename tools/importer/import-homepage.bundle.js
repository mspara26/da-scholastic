var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-showcase.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(":scope > img");
    const floatingImg = element.querySelector(".cmp-compoundheader__floatingImage img");
    const heading = element.querySelector(".cmp-compoundheader__headerTitle h2, .cmp-compoundheader__headerTitle .cmp-title__text");
    const ctaLink = element.querySelector(".cmp-compoundheader__actionLink a");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (ctaLink) contentCell.push(ctaLink);
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-showcase", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-promo.js
  function parse2(element, { document }) {
    const logoImg = element.querySelector(".cmp-compoundheader__logoImage");
    const clubsImg = element.querySelector(".cmp-compoundheader__clubsImage img");
    const description = element.querySelector(".cmp-compoundheader__clubsText p");
    const ctaLink = element.querySelector(".cmp-compoundheader__button a");
    const cells = [];
    const imageCell = clubsImg || logoImg;
    const textCell = [];
    if (description) textCell.push(description);
    if (ctaLink) textCell.push(ctaLink);
    if (imageCell && textCell.length > 0) {
      cells.push([imageCell, textCell]);
    } else if (textCell.length > 0) {
      cells.push(textCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-banner.js
  function parse3(element, { document }) {
    const mainImage = element.querySelector(".cmp-image__image, img.cmp-image__image");
    const heading = element.querySelector(".cmp-title h2, h2.cmp-title__text");
    const ctaLink = element.querySelector(".button .cmp-title__link, .cmp-title a.cmp-title__link");
    const cells = [];
    const imageCell = mainImage ? [mainImage] : [];
    const textCell = [];
    if (heading) textCell.push(heading);
    if (ctaLink && (!heading || !heading.contains(ctaLink))) textCell.push(ctaLink);
    if (imageCell.length > 0 || textCell.length > 0) {
      cells.push([imageCell.length > 0 ? imageCell : "", textCell.length > 0 ? textCell : ""]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-products.js
  function parse4(element, { document }) {
    const rubric = element.querySelector(".cmp-merchandisingCarousel__rubric .cmp-title__text");
    const heading = element.querySelector(".cmp-merchandisingCarousel__cardTitle h2");
    const description = element.querySelector(".cmp-merchandisingCarousel__description p");
    const ctaLink = element.querySelector(".cmp-merchandisingCarousel__button a");
    const slides = element.querySelectorAll(".slick-slide:not(.slick-cloned) .cmp-merchandisingteaser");
    const cells = [];
    const introCell = [];
    if (rubric) {
      const p = document.createElement("p");
      p.textContent = rubric.textContent.trim();
      introCell.push(p);
    }
    if (heading) introCell.push(heading);
    if (description) introCell.push(description);
    if (ctaLink) introCell.push(ctaLink);
    if (introCell.length > 0) {
      cells.push(introCell);
    }
    slides.forEach((slide) => {
      const img = slide.querySelector(".cmp-image__image");
      const title = slide.querySelector(".cmp-merchandisingteaser__title h3, .cmp-merchandisingteaser__title .cmp-title__text");
      const link = slide.querySelector(".cmp-merchandisingteaser__content > a");
      const slideCell = [];
      if (img) slideCell.push(img);
      if (title) {
        if (link) {
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-products", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-merchandising.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(".cmp-threeCardMerchandising__merchandisingCard");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".cmp-merchandisingCard__image img");
      const title = card.querySelector(".cmp-merchandisingCard__cardTitle h3");
      const description = card.querySelector(".cmp-merchandisingCard__description p");
      const rubric = card.querySelector(".cmp-merchandisingCard__rubric .cmp-title__text");
      const link = card.querySelector(":scope > a");
      const imageCell = img || "";
      const textCell = [];
      if (rubric) {
        const p = document.createElement("p");
        p.innerHTML = "<em>" + rubric.textContent.trim() + "</em>";
        textCell.push(p);
      }
      if (title) {
        if (link) {
          const h3 = document.createElement("h3");
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-merchandising", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-lob.js
  function parse6(element, { document }) {
    const slides = element.querySelectorAll(".slick-slide:not(.slick-cloned) .lobTeaser");
    const cells = [];
    slides.forEach((slide) => {
      const logoImg = slide.querySelector(".cmp-lobTeaser__logo img");
      const description = slide.querySelector(".cmp-lobTeaser__description p");
      const ctaLink = slide.querySelector(".cmp-lobTeaser__button a");
      const bgImg = slide.querySelector(".cmp-lobTeaser__backgroundImage");
      const cards = slide.querySelectorAll(".cmp-lobTeaser__card");
      const imageCell = bgImg || "";
      const contentCell = [];
      if (logoImg) contentCell.push(logoImg);
      if (description) contentCell.push(description);
      if (cards.length > 0) {
        const ul = document.createElement("ul");
        cards.forEach((card) => {
          const cardLink = card.querySelector("a.cmp-lobCard");
          const cardLabel = card.querySelector(".cmp-lobCard__label .cmp-title__text");
          const cardImg = card.querySelector(".cmp-lobCard__image img");
          if (cardLabel && cardLabel.textContent.trim()) {
            const li = document.createElement("li");
            if (cardLink && cardLink.href) {
              const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-lob", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/scholastic-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".unsupportedModal",
        ".dark-overlay",
        ".mobile-dark-overlay",
        ".myschl-modal"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".globalnav",
        // Global navigation header
        ".experiencefragment",
        // Footer experience fragment
        ".fatFooter",
        // Fat footer
        "header.site-nav",
        // Site nav header
        "footer",
        // Footer element
        "noscript",
        // Noscript tags
        "iframe",
        // Iframes
        "link"
        // Link elements
      ]);
      const skipBtns = element.querySelectorAll(".skip-carousel-link, .skip-begin-carousel");
      skipBtns.forEach((btn) => btn.remove());
      const carouselArrows = element.querySelectorAll(".cmp-carousel__arrow");
      carouselArrows.forEach((arrow) => arrow.remove());
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-track");
        el.removeAttribute("onclick");
        el.removeAttribute("data-cmp-data-layer");
      });
    }
  }

  // tools/importer/transformers/scholastic-sections.js
  var H2 = { after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversed = [...sections].reverse();
      reversed.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (section.id !== sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-showcase": parse,
    "cards-promo": parse2,
    "columns-banner": parse3,
    "carousel-products": parse4,
    "cards-merchandising": parse5,
    "carousel-lob": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Scholastic homepage with featured content, promotions, and navigation to key sections",
    urls: [
      "https://www.scholastic.com/home"
    ],
    blocks: [
      {
        name: "hero-showcase",
        instances: [".compoundheader .cmp-compoundheader__hero"]
      },
      {
        name: "cards-promo",
        instances: [".compoundheader .grid-layout"]
      },
      {
        name: "columns-banner",
        instances: [".responsivegrid .layout-02-top.layout-02-bottom"]
      },
      {
        name: "carousel-products",
        instances: [".merchandisingcarousel:not(.bookcarousel)", ".bookcarousel.merchandisingcarousel"]
      },
      {
        name: "cards-merchandising",
        instances: [".threeCardMerchandising"]
      },
      {
        name: "carousel-lob",
        instances: [".lobCarousel.carousel"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Section",
        selector: ".compoundheader",
        style: "green-pattern",
        blocks: ["hero-showcase", "cards-promo"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Classrooms Count Banner",
        selector: [".responsivegrid .layout-02-top.layout-02-bottom:first-of-type"],
        style: null,
        blocks: ["columns-banner"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Scholastic TV Banner",
        selector: [".responsivegrid .layout-02-top.layout-02-bottom:last-of-type"],
        style: "peach",
        blocks: ["columns-banner"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Summer Learning Carousel",
        selector: ".merchandisingcarousel:not(.bookcarousel)",
        style: null,
        blocks: ["carousel-products"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Book Sets Carousel",
        selector: ".bookcarousel.merchandisingcarousel",
        style: null,
        blocks: ["carousel-products"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Don't Miss Out Cards",
        selector: ".threeCardMerchandising",
        style: "peach",
        blocks: ["cards-merchandising"],
        defaultContent: [".cmp-threeCardMerchandising__headerTitle"]
      },
      {
        id: "section-7",
        name: "Line of Business Carousel",
        selector: ".lobCarousel.carousel",
        style: null,
        blocks: ["carousel-lob"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
