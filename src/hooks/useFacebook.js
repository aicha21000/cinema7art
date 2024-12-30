import { useEffect } from 'react';

export function useFacebook() {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    const share = (url, title, description) => {
        // Utiliser l'URL de partage basique qui fonctionne même avec les fonctionnalités désactivées
        const shareText = `${title}\n${description || ''}`;
        const shareUrl = new URL('https://www.facebook.com/sharer.php');
        
        // Ajouter les paramètres de partage
        shareUrl.searchParams.set('u', url);
        shareUrl.searchParams.set('t', shareText);
        
        // Ouvrir dans une nouvelle fenêtre centrée
        const width = 626;
        const height = 436;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        
        window.open(
            shareUrl.toString(),
            'facebook-share-dialog',
            `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes`
        );
    };

    return { share };
} 