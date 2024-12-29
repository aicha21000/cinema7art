export function rankNews(newsItems) {
    return newsItems.sort((a, b) => {
        // Priorité aux exclusivités
        if (a.isExclusive && !b.isExclusive) return -1;
        if (!a.isExclusive && b.isExclusive) return 1;

        // Priorité aux sources fiables
        if (a.reliability === 'موثوق' && b.reliability !== 'موثوق') return -1;
        if (a.reliability !== 'موثوق' && b.reliability === 'موثوق') return 1;

        // Priorité aux actualités récentes
        return new Date(b.publishDate) - new Date(a.publishDate);
    });
} 