const GoogleNewsRss = require("google-news-rss")

function main(args) {
    const googleNews = new GoogleNewsRss()
    return googleNews.search("us election", 50, "en", {
        scoring: "n",
    }).then((resp) => {
        resp.forEach(obj => obj.created = new Date(obj.pubDate).getTime())
        sorted = resp.sort(sortByLatest("created")); // scoring not working
        return {
            body: sorted,
        }
    });
}

function sortByLatest(property) {
    return function (a, b) {
        if (a[property] > b[property]) return -1
        else if (a[property] < b[property]) return 1
        else return 0
    };
}

module.exports = { main, sortByLatest }
