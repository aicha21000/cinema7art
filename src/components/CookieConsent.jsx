import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Vérifier si l'utilisateur a déjà accepté les cookies
        const hasConsented = localStorage.getItem('cookieConsent');
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    const handleRefuse = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-right flex-1">
                    <p className="mb-2">
                        نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا.
                        من خلال الاستمرار في التصفح، فإنك توافق على استخدامنا لملفات تعريف الارتباط.
                    </p>
                    <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                        اقرأ المزيد عن سياسة الخصوصية
                    </Link>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleRefuse}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                        رفض
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
                        aria-label="قبول ملفات تعريف الارتباط"
                    >
                        موافق
                    </button>
                </div>
            </div>
        </div>
    );
} 