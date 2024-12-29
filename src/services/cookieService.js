class CookieService {
    setCookie(name, value, days = 365) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    getCookie(name) {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }

    hasAcceptedCookies() {
        return this.getCookie('cookieConsent') === 'true';
    }

    setAnalyticsCookies(enabled) {
        if (enabled) {
            // Activer Google Analytics ou autres outils d'analyse
            this.setCookie('analytics_enabled', 'true');
        } else {
            this.deleteCookie('analytics_enabled');
        }
    }
}

export default new CookieService(); 