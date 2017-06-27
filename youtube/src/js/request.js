export default class {
    constructor(key = 'AIzaSyBxYCV07jtUnOjRXu2RrQzuOH-4lUOTmqs', maxResultCount = 15) {
        this.KEY = key;
        this.RESULTS_COUNT = maxResultCount;
    }

    /**
     * request to youtube data api
     *
     * @param {string} title - title of theme for search
     * @returns {promise} - promise with results of request
     */
    loadData(title) {
        const request = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}&type=video&order=viewCount&maxResults=${this.RESULTS_COUNT}&key=${this.KEY}`;
        return fetch(request).then(res => res.json());
    }

    /**
     * function for downloading next page of videos
     *
     * @param {string} token - token of next page
     * @returns {promise} - promise with results of request
     */
    loadNextPage(token) {
        const request = `https://www.googleapis.com/youtube/v3/search?pageToken=${token}&part=snippet&maxResults=${this.RESULTS_COUNT}&order=relevance&q=site%3Ayoutube.com&topicId=%2Fm%2F02vx4&key=${this.KEY}`;
        return fetch(request).then(res => res.json());
    }

    /**
     * request to youtube statistics api
     *
     * @param {string} videoIds - string view of string array with video id's
     * @returns {promise} - promise with results of request
     */
    loadStatistics(videoIds) {
        const request = `https://www.googleapis.com/youtube/v3/videos?key=${this.KEY}&id=${videoIds}&part=snippet,statistics`;
        return fetch(request).then(res => res.json());
    }
}
