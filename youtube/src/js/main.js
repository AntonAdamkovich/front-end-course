import _ from 'lodash';

import './../sass/main.scss';

import createHeader from './templates/header';
import createMain from './templates/content';
import createFooter from './templates/footer';
import Pagination from './pagination';
// import Request from './Request';

(function () {
    document.body.appendChild(createHeader());
    document.body.appendChild(createMain());
    document.body.appendChild(createFooter());

    const contentList = document.querySelector('.content > ul');
    const searchButton = document.querySelector('#searchButton');
    const searchField = document.querySelector('#searchField');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const paginationList = document.querySelector('.pagination');
    const startPosition = {};
    const pagination = new Pagination(contentList, paginationList);
    let throttled = false;


    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        const title = _.get(searchField, 'value');

        pagination.loadPage(title);
    }, false);


    main.addEventListener('mousedown', (event) => {
        console.log(event.type.keyDown);
        // event.preventDefault();
        // event.stopPropagation();
        startPosition.x = event.clientX;
        startPosition.y = event.clientY;

        footer.classList.toggle('hidden');
    }, false);

    main.addEventListener('mouseup', (event) => {
        // event.preventDefault();
        // event.stopPropagation();

        footer.classList.toggle('hidden');

        if (event.clientX - startPosition.x > 100 || event.clientX - startPosition.x < -100) {
            pagination.nextPage();
        }
    }, false);

    window.addEventListener('resize', (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!throttled) {
            pagination.resize();

            throttled = true;

            setTimeout(() => {
                throttled = false;
            }, 250);
        }
    }, false);
}());
