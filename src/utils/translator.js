class ArabicTranslator {
    constructor() {
        this.delay = 1000; // 1 seconde de délai entre les traductions
        this.lastTranslation = 0;
    }

    async translate(text) {
        if (!text) return '';

        try {
            // Respecter le délai entre les traductions
            const now = Date.now();
            const timeSinceLastTranslation = now - this.lastTranslation;
            if (timeSinceLastTranslation < this.delay) {
                await new Promise(resolve => 
                    setTimeout(resolve, this.delay - timeSinceLastTranslation)
                );
            }

            // Utiliser l'API Google Translate
            const response = await fetch(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`
            );

            if (!response.ok) {
                throw new Error('Erreur de traduction');
            }

            const data = await response.json();
            this.lastTranslation = Date.now();

            // Extraire le texte traduit
            return data[0].map(x => x[0]).join('');

        } catch (error) {
            console.error('Erreur de traduction:', error);
            console.error('Texte source:', text);
            return text;
        }
    }
}

export { ArabicTranslator }; 