import createElement from '../create-element';

/**
 * creates List item with inner html
 *
 * @export
 * @param {any} imageLink 
 * @param {any} postDate 
 * @param {any} itemsTitle 
 * @param {any} likesCount 
 * @param {any} author 
 * @param {any} id 
 * @param {any} viewsCount 
 * @param {string} description 
 * @returns {Element}
 */
export default function createItem(imageLink, postDate, itemsTitle, likesCount, author, id, viewsCount, description) {
    // const itemFragment = document.createDocumentFragment();

    const image = createElement('img', {
        src: imageLink,
    });
    const imageWrapper = createElement('p', {}, image);

    const link = createElement('a', {
        href: `https://www.youtube.com/watch?v=${id}`,
    }, itemsTitle);

    const subHeader = createElement('h1', {}, link);

    const authorSpan = createElement('span', {
        class: 'item-user',
    }, author);

    const paragraph = createElement('p', {}, description);

    const figCaption = createElement(
        'figcaption',
        {},
        subHeader,
        authorSpan,
        paragraph,
    );
    const figure = createElement('figure', {}, imageWrapper, figCaption);

    const publishDate = createElement('time', {
        datetime: postDate.slice(0, 10),
        class: 'item-date',
    }, postDate.slice(0, 10));

    const viewCount = createElement('span', {
        class: 'item-views',
    }, viewsCount);

    const likes = createElement('span', {
        class: 'item-likes',
    }, likesCount);

    const footer = createElement('footer', {}, likes, viewCount, publishDate);

    const container = createElement('section', {
        class: 'item',
    }, figure, footer);

    const listItem = createElement('li', {}, container);
    // itemFragment.appendChild(listItem);

    return listItem; // itemFragment;
}
