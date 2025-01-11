import { useEffect } from 'react';
import { adConfig } from '../config/adConfig';

function AdSpace({ size = 'small', provider = 'adsense' }) {
    const adSizes = {
        large: {
            style: { display: 'block', minHeight: '250px', marginBottom: '1rem' },
            'data-ad-format': 'auto',
            'data-full-width-responsive': 'true',
            'data-ad-client': adConfig.adsense.clientId,
            'data-ad-slot': adConfig.adsense.slots[size]
        },
        small: {
            style: { display: 'block', minHeight: '120px', marginBottom: '1rem' },
            'data-ad-format': 'auto',
            'data-ad-client': adConfig.adsense.clientId,
            'data-ad-slot': adConfig.adsense.slots[size]
        }
    };

    useEffect(() => {
        switch (provider) {
            case 'adsense':
                try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (err) {
                    console.error('Erreur AdSense:', err);
                }
                break;
            case 'media.net':
                window._mNHandle?.loadAd();
                break;
            case 'propeller':
                window.propellerads?.push({});
                break;
            default:
                break;
        }
    }, [provider]);

    return (
        <div className="w-full overflow-hidden rounded-lg">
            {provider === 'adsense' && (
                <ins className="adsbygoogle" {...adSizes[size]} />
            )}
            {provider === 'media.net' && (
                <div
                    className="media-net-ad"
                    data-container={adConfig.mediaNet.slots[size]}
                    id={`media-net-${size}-${Math.random()}`}
                />
            )}
            {provider === 'propeller' && (
                <div
                    className="propeller-ad"
                    data-zone={adConfig.propeller.slots[size]}
                />
            )}
        </div>
    );
}

export default AdSpace; 