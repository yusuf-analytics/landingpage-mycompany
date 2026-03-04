'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene from './Scene';
import { useAppContext } from './Providers';
import { Mail, MessageCircle } from 'lucide-react';

export default function Hero() {
    const { t } = useAppContext();
    const [showContact, setShowContact] = useState(false);
    return (
        <section className="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            <Scene />

            <div className="container" style={{ position: 'relative', zIndex: 20, paddingTop: '100px' }}>
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
                        <button
                            className="btn-primary"
                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            {t.heroBtnPrimary}
                        </button>
                        <div style={{ position: 'relative', zIndex: 50 }}>
                            <button
                                className="btn-secondary"
                                onClick={() => setShowContact(!showContact)}
                            >
                                {t.heroBtnSecondary}
                            </button>
                            <AnimatePresence>
                                {showContact && (
                                    <motion.div
                                        className="contact-dropdown"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                    >
                                        <a
                                            href="mailto:yusuf.analytics@gmail.com"
                                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', transition: 'background 0.2s', textDecoration: 'none', color: 'inherit' }}
                                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <Mail size={20} color="#3b82f6" />
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Email</span>
                                        </a>
                                        <a
                                            href="https://wa.me/6281221999138"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', transition: 'background 0.2s', textDecoration: 'none', color: 'inherit' }}
                                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <MessageCircle size={20} color="#25D366" />
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>WhatsApp</span>
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
