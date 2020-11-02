const { main } = require('../index');
const GoogleNewsRss = require("google-news-rss");

jest.genMockFromModule('google-news-rss');
jest.mock('google-news-rss');
const googleNews = {
  search: jest.fn()
};

GoogleNewsRss.mockImplementation(() => googleNews);

describe('main function', () => {
  test('it should return news articles by topic', async () => {
    // arrange
    const response = [
      {
        "description": "2020 election news: Live updates",
        "link": "https://www.cnn.com/politics/live-news/us-election-news-10-14-20/index.html",
        "pubDate": "Wed, 14 Oct 2020 22:19:00 GMT",
        "publisher": "CNN",
        "source": {
          "$": {
            "url": "https://www.cnn.com"
          },
          "_": "CNN"
        },
        "title": "2020 election news: Live updates - CNN"
      },
      {
        "description": "Trump Vs. Biden: How Russia Sees The U.S. Election",
        "link": "https://www.npr.org/2020/10/14/923380941/trump-vs-biden-how-russia-sees-the-u-s-election",
        "pubDate": "Wed, 14 Oct 2020 17:24:00 GMT",
        "publisher": "NPR",
        "source": {
          "$": {
            "url": "https://www.npr.org"
          },
          "_": "NPR"
        },
        "title": "Trump Vs. Biden: How Russia Sees The U.S. Election - NPR"
      },
    ];

    googleNews.search.mockImplementationOnce(
      (terms, num, language, extraParams) =>
        Promise.resolve(response)
    );

    // act
    const data = await main()

    // assert
    expect(data).toStrictEqual({ body: response })
    expect(data.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          created: 1602696240000
        })
      ])
    )
    expect(googleNews.search).toHaveBeenCalledTimes(1)

  });
});
