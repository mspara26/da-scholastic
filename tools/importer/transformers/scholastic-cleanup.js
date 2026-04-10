/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Scholastic site cleanup.
 * Selectors from captured DOM of https://www.scholastic.com/home
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove modals and overlays that block parsing
    WebImporter.DOMUtils.remove(element, [
      '.unsupportedModal',
      '.dark-overlay',
      '.mobile-dark-overlay',
      '.myschl-modal',
    ]);

    // Remove "Remembering Dick Robinson" memorial section (hidden responsive grid)
    // Selector from captured DOM: .responsivegrid_2021037237 parent container
    const drSection = element.querySelector('#DR-hero');
    if (drSection) {
      const drParent = drSection.closest('.responsivegrid');
      if (drParent) drParent.remove();
    }
    // Also remove the label link above it
    const drLabel = element.querySelector('a[href*="rememberingdickrobinson"]');
    if (drLabel) {
      const drLabelContainer = drLabel.closest('.responsivegrid');
      if (drLabelContainer) drLabelContainer.remove();
    }

    // Remove OneTrust cookie consent dialog
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#onetrust-banner-sdk',
      '[class*="onetrust"]',
      '[id*="onetrust"]',
    ]);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome
    WebImporter.DOMUtils.remove(element, [
      '.globalnav',                   // Global navigation header
      '.experiencefragment',          // Footer experience fragment
      '.fatFooter',                   // Fat footer
      'header.site-nav',             // Site nav header
      'footer',                       // Footer element
      'noscript',                     // Noscript tags
      'iframe',                       // Iframes
      'link',                         // Link elements
    ]);

    // Remove skip/accessibility navigation buttons from carousels
    const skipBtns = element.querySelectorAll('.skip-carousel-link, .skip-begin-carousel');
    skipBtns.forEach((btn) => btn.remove());

    // Remove slick carousel navigation arrows (UI chrome, not content)
    const carouselArrows = element.querySelectorAll('.cmp-carousel__arrow');
    carouselArrows.forEach((arrow) => arrow.remove());

    // Clean tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-track');
      el.removeAttribute('onclick');
      el.removeAttribute('data-cmp-data-layer');
    });
  }
}
