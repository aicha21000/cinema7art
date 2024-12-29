class RSSFeedService {
    constructor() {
        this.feedUrls = [
            "https://www.premiere.fr/rss",
            "https://www.allocine.fr/rss/news.xml",
            "https://www.lesinrocks.com/cinema/feed"
        ];
    }

    async aggregateFeeds() {
        const feeds = [];
        
        for (const url of this.feedUrls) {
            const feed = await this.fetchAndParseFeed(url);
            feeds.push(...feed);
        }
        
        return this.processFeedItems(feeds);
    }
} 