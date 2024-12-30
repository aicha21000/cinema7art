import { useEffect } from 'react';

export function useFacebook() {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    const share = (url, title) => {
        if (window.FB) {
            window.FB.ui({
                method: 'feed',
                link: url,
                caption: title,
                display: 'popup'
            }, function(response) {
                if (response && !response.error_message) {
                    console.log('Le partage a réussi');
                } else {
                    console.log('Le partage a échoué');
                }
            });
        } else {
            // Fallback vers l'URL de partage standard
            const shareUrl = `https://www.facebook.com/dialog/share?app_id=919869716781070&display=popup&href=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
            window.open(shareUrl, 'facebook-share-dialog', 'width=626,height=436');
        }
    };

    return { share };
} 