const feed = require('rss-to-json');

function main(args) {
    return feed.load('https://news.google.com/rss/search?q=us+election&hl=en-US&gl=US&ceid=US:en').then(rss => {
        sorted = rss.items.sort(sortByProperty('created'))
        return { body: sorted };
    });
}

function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}

exports.main = main
