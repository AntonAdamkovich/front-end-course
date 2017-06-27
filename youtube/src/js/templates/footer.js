import createElement from '../create-element';

/**
 * function for creating footer
 *
 * @export
 * @returns {Element}
 */
export default function createFooter() {
    // const footerFragment = document.createDocumentFragment();

    const pagesList = createElement('ul', {
        class: 'pagination',
    });
    const wrapper = createElement('div', {
        class: 'footer-wrapper',
    }, pagesList);
    const container = createElement('footer', {
        class: 'hidden',
    }, wrapper);

    // footerFragment.appendChild(container);

    return container; // footerFragment;
}
