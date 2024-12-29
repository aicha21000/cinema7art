class RumorService {
    validateRumor(rumor) {
        const reliability = {
            score: 0,
            factors: []
        };

        // Vérifier les sources multiples
        if (rumor.sources.length > 1) {
            reliability.score += 2;
            reliability.factors.push('مصادر متعددة');
        }

        // Vérifier la réputation de la source
        if (this.isReliableSource(rumor.source)) {
            reliability.score += 3;
            reliability.factors.push('مصدر موثوق');
        }

        // Vérifier la cohérence avec d'autres informations
        if (this.checkConsistency(rumor)) {
            reliability.score += 2;
            reliability.factors.push('معلومات متناسقة');
        }

        return {
            ...rumor,
            reliability: reliability.score > 5 ? 'موثوق' : 'غير مؤكد',
            validationFactors: reliability.factors
        };
    }
} 