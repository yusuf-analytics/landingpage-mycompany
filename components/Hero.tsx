'use client';

import { motion } from 'framer-motion';
import Scene from './Scene';
import { useAppContext } from './Providers';

export default function Hero() {
    const { t } = useAppContext();
    return (
        <section className="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <Scene />

            <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '100px' }}>
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ maxWidth: '800px', margin: '0 auto' }}
                >
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        {t.heroTitlePart1}<span className="text-gradient">{t.heroTitleHighlight}</span>{t.heroTitlePart2}
                    </h1>

                    <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '650px', lineHeight: 1.7, margin: '0 auto 40px auto' }}>
                        {t.heroDesc}
                    </p>

                    <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', paddingBottom: '32px', justifyContent: 'center' }}>
                        <button className="btn-primary">{t.heroBtnPrimary}</button>
                        <button className="btn-secondary">{t.heroBtnSecondary}</button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
