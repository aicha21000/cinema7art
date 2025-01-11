import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptEssential = () => {
    const consent = { necessary: true, analytics: false, marketing: false };
    Cookies.set('cookie_consent', JSON.stringify(consent), { expires: 365 });
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const consent = { necessary: true, analytics: true, marketing: true };
    Cookies.set('cookie_consent', JSON.stringify(consent), { expires: 365 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-700 text-white p-3 flex flex-col items-center text-sm">
      <p className="mb-2">
        نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك اختيار قبول ملفات تعريف الارتباط الأساسية فقط أو جميع ملفات تعريف الارتباط.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleAcceptEssential}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          قبول الأساسية فقط
        </button>
        <button
          onClick={handleAcceptAll}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          قبول الكل
        </button>
      </div>
    </div>
  );
};

export default CookieConsent; 