import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameSection from '../components/game-section';


export default function Games() {
    return (
        <section className="mb-12">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mt-10"> اختبر معلوماتك في السينما</h1>
                <p className="text-center mt-4">اختبر معلوماتك في السينما وشارك مع أصدقائك</p>
            </div>
            <GameSection />
        </section>
    );
}


