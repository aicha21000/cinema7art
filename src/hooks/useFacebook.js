import { useEffect } from 'react';

export function useFacebook() {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    const share = (url, title, description, image) => {
        if (window.FB) {
            // Utiliser l'API Feed Dialog pour un meilleur contrôle du partage
            window.FB.ui({
                method: 'feed',
                link: url,
                caption: title,
                description: description,
                picture: image,
                display: 'popup'
            }, function(response) {
                if (response && !response.error_message) {
                    console.log('Partage réussi');
                }
            });
        } else {
            // Fallback si le SDK FB n'est pas chargé
            const shareUrl = new URL('https://www.facebook.com/dialog/feed');
            shareUrl.searchParams.set('app_id', '919869716781070');
            shareUrl.searchParams.set('link', url);
            shareUrl.searchParams.set('caption', title);
            shareUrl.searchParams.set('description', description);
            shareUrl.searchParams.set('picture', image);
            shareUrl.searchParams.set('display', 'popup');
            
            const windowFeatures = 'width=626,height=436,scrollbars=yes,resizable=yes';
            const windowName = 'facebook-share-dialog';
            
            const left = (window.screen.width - 626) / 2;
            const top = (window.screen.height - 436) / 2;
            
            window.open(
                shareUrl.toString(),
                windowName,
                `${windowFeatures},top=${top},left=${left}`
            );
        }
    };

    return { share };
} 