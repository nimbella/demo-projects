const nock = require('nock');
const rssMock = require('../__mocks__/rss');
const googleNewsClient = require("google-news-rss");

const link = 'https://news.google.com';
nock(link)
  .get('/rss/search')
  .query({ q: 'elections', num: 10, hl: 'en-US', gl: 'US' })
  .reply(200, rssMock);

nock(link)
.get('/rss/search')
  .query({  q: 'elections',gl: 'US', num: 30, hl: 'en-US' })
  .reply(200, rssMock);

const googleNews = new googleNewsClient();

test('Searches the news and returns formatted articles', async () => {
  expect.assertions(3);

  const expectedArticle1 = {
    title: 'Record turnout as Americans endure long waits to vote early in 2020 election - The Guardian',
    link: 'https://www.theguardian.com/us-news/2020/oct/14/us-election-record-turnout-early-voting',
    pubDate: 'Wed, 14 Oct 2020 18:36:00 GMT',
    description: '<ol><li><a href="https://www.theguardian.com/us-news/2020/oct/14/us-election-record-turnout-early-voting" target="_blank">Record turnout as Americans endure long waits to vote early in 2020 election</a>&nbsp;&nbsp;<font color="#6f6f6f">The Guardian</font></li><li><a href="https://www.cnn.com/2020/10/14/politics/voting-lines-election-coronavirus/index.html" target="_blank">Determined voters endure long lines to cast early ballots in historic election</a>&nbsp;&nbsp;<font color="#6f6f6f">CNN</font></li><li><a href="https://www.bbc.com/news/election-us-2020-54532189" target="_blank">US election 2020: World reaction to long queues of voters in US</a>&nbsp;&nbsp;<font color="#6f6f6f">BBC News</font></li><li><a href="https://www.cnbc.com/2020/10/13/early-voting-in-2020-us-election-already-smashing-2016-levels.html" target="_blank">Early voting in 2020 U.S. election already smashing 2016 levels</a>&nbsp;&nbsp;<font color="#6f6f6f">CNBC</font></li><li><a href="https://www.latimes.com/politics/story/2020-10-14/philadelphia-pennsylvania-presidential-election-mail-ballots" target="_blank">Pennsylvania\'s slow vote count may delay 2020 election outcome</a>&nbsp;&nbsp;<font color="#6f6f6f">Los Angeles Times</font></li><li><strong><a href="https://news.google.com/stories/CAAqOQgKIjNDQklTSURvSmMzUnZjbmt0TXpZd1NoTUtFUWpTcjdMOGtJQU1FZXRGaDk3eGpKVnZLQUFQAQ?oc=5" target="_blank">View Full Coverage on Google News</a></strong></li></ol>',
    source: 'The Guardian',
  };

  const expectedArticle2 = {
    title: 'Judge denies request to block private elections grants to Madison, 4 other Wisconsin cities - Madison.com',
    link: 'https://madison.com/wsj/news/local/govt-and-politics/judge-denies-request-to-block-private-elections-grants-to-madison-4-other-wisconsin-cities/article_0f0c83a1-e365-51a2-9a2c-3cc0435f1219.html',
    category: 'food',
    pubDate: 'Wed, 14 Oct 2020 20:00:00 GMT',
    description: '<a href="https://madison.com/wsj/news/local/govt-and-politics/judge-denies-request-to-block-private-elections-grants-to-madison-4-other-wisconsin-cities/article_0f0c83a1-e365-51a2-9a2c-3cc0435f1219.html" target="_blank">Judge denies request to block private elections grants to Madison, 4 other Wisconsin cities</a>&nbsp;&nbsp;<font color="#6f6f6f">Madison.com</font>',
    source: 'Madison.com',
  };

  const articles = await googleNews.search('elections');

  expect(articles[0]).toEqual(expectedArticle1);
  expect(articles[9]).toEqual(expectedArticle2);
  expect(articles.length).toBe(10);
});

test('Specify num results in correct request', async () => {
  expect.assertions(1);

  const articles = await googleNews.search('elections', 30);
  expect(articles.length).toBe(10);
});
