import createElement from '../create-element';

/**
 * function for creating main block with content
 *
 * @export
 * @returns {Element}
 */
export default function createMain() {
    // const contentFragment = document.createDocumentFragment();

    const list = createElement('ul');
    const listWrapper = createElement('div', {
        class: 'content',
    }, list);
    const container = createElement('main', {}, listWrapper);

    // contentFragment.appendChild(container);

    return container; // contentFragment;
}
