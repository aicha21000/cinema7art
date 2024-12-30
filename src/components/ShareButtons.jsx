import { useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { useFacebook } from '../hooks/useFacebook';

export default function ShareButtons({ url, title, description, image }) {
    const { share } = useFacebook();

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, [url]);

    const shareOnFacebook = (e) => {
        e.preventDefault();
        share(url, title);
    };

    const shareOnTwitter = (e) => {
        e.preventDefault();
        const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(shareUrl, 'twitter-share-dialog', 'width=626,height=436');
    };

    const shareOnWhatsapp = (e) => {
        e.preventDefault();
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`;
        window.open(shareUrl, 'whatsapp-share-dialog', 'width=626,height=436');
    };

    return (
        <div className="flex gap-4 items-center">
            <button
                onClick={shareOnFacebook}
                className="bg-[#4267B2] text-white p-2 rounded-full hover:bg-[#365899] transition-colors"
                aria-label="مشاركة على فيسبوك"
            >
                <FaFacebookF className="w-5 h-5" />
            </button>

            <button
                onClick={shareOnTwitter}
                className="bg-[#1DA1F2] text-white p-2 rounded-full hover:bg-[#1a91da] transition-colors"
                aria-label="مشاركة على تويتر"
            >
                <FaTwitter className="w-5 h-5" />
            </button>

            <button
                onClick={shareOnWhatsapp}
                className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#22bf5b] transition-colors"
                aria-label="مشاركة على واتساب"
            >
                <FaWhatsapp className="w-5 h-5" />
            </button>

            <div
                className="fb-like"
                data-href={url}
                data-layout="button_count"
                data-action="like"
                data-share="false"
                data-size="small">
            </div>
        </div>
    );
} 