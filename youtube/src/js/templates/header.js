import createElement from '../create-element';

/**
 * function for creating header
 *
 * @export
 * @returns {Element}
 */
export default function createHeader() {
    // const headerFragment = document.createDocumentFragment();

    const input = createElement('input', {
        type: 'text',
        name: 'search',
        id: 'searchField',
    });
    const inputWrapper = createElement('div', {}, input);

    const searchButton = createElement('button', {
        id: 'searchButton',
    }, 'search');
    const submitWrapper = createElement('div', {}, searchButton);
    const form = createElement('form', {}, inputWrapper, submitWrapper);
    const wrapper = createElement('div', {
        class: 'header-wrapper',
    }, form);

    const container = createElement('header', {}, wrapper);
    // headerFragment.appendChild(container);

    return container; // headerFragment;
}
