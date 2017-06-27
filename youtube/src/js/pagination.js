import _ from 'lodash';

import creteItem from './templates/item';
import Request from './request';
import creteElement from './create-element';

export default class {
    constructor(itemList, paginationList, itemWidth = 244, gap = 20, itemHeight = 320) {
        this.itemWidth = itemWidth;
        this.itemHeight = itemHeight;
        this.gap = gap;
        this.data = {};
        this.itemList = itemList;
        this.paginationList = paginationList;

        this.itemsPerPage = 15;
        this.pagesCount = 1;
        this.currentPage = 0;
    }


    /**
     * get information from YouTube data api and the request YouTube statistics API
     *
     * @param {(string|undefined)} title title - title of them for search,
     * without param request nex page of search result
     * @param {string} key - key for YouTube data anв statistics API
     * @param {(string|number)} maxResultCount - count of elements for request
     */
    loadPage(title, key, maxResultCount) {
        const request = new Request(key, maxResultCount);
        let requestResult;
        let createPagination = true;

        if (title !== undefined) {
            requestResult = request.loadData(title);
        } else {
            requestResult = request.loadNextPage(this.nextPageToken);
            createPagination = false;
        }

        requestResult.then((data) => {
            this.nextPageToken = data.nextPageToken;
            return data;
        })
        .then(data => _.map(data.items, item => item.id.videoId))
        .then(ids => request.loadStatistics(ids.toString()))
        .then((statistics) => {
            this.data = statistics;
            this.createItemsList();

            if (createPagination === true) {
                this.cretePaginationList();
            }
        });
    }

    /**
     * create list of components with all information from request result
     */
    createItemsList() {
        let currentListItem;
        const colsCount = _.floor(
            this.itemList.offsetWidth / (this.itemWidth + this.gap),
        );
        const rowsCount = _.floor(
            this.itemList.offsetHeight / (this.itemHeight + this.gap),
        );
        this.itemsPerPage = colsCount * rowsCount;

        this.clearList(this.itemList);

        _.forEach(this.data.items, (item, index) => {
            currentListItem = creteItem(
                item.snippet.thumbnails.medium.url,
                item.snippet.publishedAt,
                item.snippet.title,
                item.statistics.likeCount,
                item.snippet.channelTitle,
                item.id,
                item.statistics.viewCount,
                item.snippet.description,
            );

            if (index >= this.itemsPerPage) {
                currentListItem.classList.add('hidden');
            }

            this.itemList.appendChild(currentListItem);
        });
        this.currentPage = 0;
    }

    /**
     * create list of page numbers with count of pages
     */
    cretePaginationList() {
        this.pagesCount = _.ceil(this.itemList.children.length / this.itemsPerPage);
        for (let i = 1; i < this.pagesCount + 1; i++) {
            this.paginationList.appendChild(
                creteElement('li', {}, i.toString()),
            );
        }

        this.paginationList.children[this.currentPage].classList.add('active');
    }

    /**
     * change visible items in itemList for scrolling
     */
    nextPage() {
        let startItemIndex = _.findIndex(this.itemList.children, item => !item.classList.contains('hidden'));
        // this.currentPage * this.itemsPerPage;
        const endItem = startItemIndex + (this.itemsPerPage * 2);
        let pageMarkerActive;
        this.currentPage += 1;

        if (startItemIndex === -1) {
            startItemIndex = 0;
        }

        if (this.currentPage === this.pagesCount) {
            this.loadPage();

            pageMarkerActive = _.find(this.paginationList.children, item => item.classList.contains('active'));
            pageMarkerActive.classList.remove('active');
            this.paginationList.children[0].classList.add('active');
        } else {
            let currentElement;
            for (let i = startItemIndex; i < endItem; i++) {
                // console.log(`awdawd: ${startItemIndex}, ${endItem}, curPage: ${this.currentPage}`);
                currentElement = this.itemList.children[i];
                if (currentElement !== undefined) {
                    currentElement.classList.toggle('hidden');
                }
            }
            pageMarkerActive = _.find(this.paginationList.children, item => item.classList.contains('active'));
            pageMarkerActive.classList.remove('active');
            this.paginationList.children[this.currentPage].classList.add('active');
        }
    }

    /**
     * clear list of items or pagination list to add next page items or resize
     *
     * @param {Element} list - list of items or pagination list
     */
    clearList(list) {
        if (list !== undefined) {
            list.innerHTML = '';
        }
    }

    /**
     * callback function for window resizing,
     * change count of visible items in itemList and change paginationList if it needs
     */
    resize() {
        const itemWidthDifference = _.floor(
            this.itemList.offsetWidth / (this.itemWidth + this.gap),
        );
        const itemHeightDifference = _.floor(
            this.itemList.offsetHeight / (this.itemHeight + this.gap),
        );
        const itemsCount = itemWidthDifference * itemHeightDifference;

        if (this.itemList.children.length > 0) {
            const itemsDiff = itemsCount - this.itemsPerPage;
            let firstItemIndex;
            let counter = Math.abs(itemsDiff);
            let currentItem;

            while (counter > 0) {
                firstItemIndex = _.findIndex(this.itemList.children, item => !item.classList.contains('hidden'));
                currentItem = null;

                if (itemsDiff > 0) {
                    if (firstItemIndex > 0) {
                        currentItem = this.itemList.children[firstItemIndex - 1];
                    } else {
                        currentItem = this.itemList.children[firstItemIndex + this.itemsPerPage];
                    }
                } else {
                    if (firstItemIndex > 0) {
                        currentItem = this.itemList.children[firstItemIndex + 1];
                    } else {
                        currentItem = this.itemList.children[
                            firstItemIndex + (this.itemsPerPage - 1)
                        ];
                    }
                }
                currentItem.classList.toggle('hidden');
                counter -= 1;
            }

            this.itemsPerPage = itemsCount;

            this.clearList(this.paginationList);
            this.cretePaginationList();
            // this.currentPage = 
        }
    }

}
