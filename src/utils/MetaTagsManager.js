export class MetaTagsManager {
    static setMetaTags(news) {
        if (!news) return;

        const imageUrl = news.image.startsWith('http') 
            ? news.image 
            : `https://cinema7art.com${news.image}`;

        // Définir les meta tags dans le <head>
        document.title = `${news.arabicTitle} | Cinema7Art`;

        // Supprimer tous les anciens meta tags OG
        const oldMetaTags = document.querySelectorAll('meta[property^="og:"]');
        oldMetaTags.forEach(tag => tag.remove());

        // Créer uniquement les meta tags requis selon OGP
        const metaTags = [
            { property: 'og:title', content: news.arabicTitle },
            { property: 'og:type', content: 'article' },
            { property: 'og:image', content: imageUrl },
            { property: 'og:url', content: `https://cinema7art.com/news/${news._id}` }
        ];

        // Ajouter les meta tags
        metaTags.forEach(({ property, content }) => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', property);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
            console.log(`Meta tag ajouté - ${property}:`, content);
        });
    }
} 