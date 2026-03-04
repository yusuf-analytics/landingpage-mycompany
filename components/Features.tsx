'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Clock, Award } from 'lucide-react';
import { useAppContext } from './Providers';

export default function Features() {
    const { t } = useAppContext();

    const features = [
        {
            title: t.feat1Title,
            description: t.feat1Desc,
            icon: <TrendingUp size={28} color="var(--accent-primary)" />
        },
        {
            title: t.feat2Title,
            description: t.feat2Desc,
            icon: <Clock size={28} color="var(--accent-secondary)" />
        },
        {
            title: t.feat3Title,
            description: t.feat3Desc,
            icon: <Award size={28} color="#10b981" />
        }
    ];

    return (
        <section id="features" style={{ padding: '80px 0', position: 'relative' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '56px' }}
                >
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                        {t.featHeadingPart1}<span className="text-gradient">{t.featHeadingHighlight}</span>
                    </h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="glass-panel"
                            style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
                        >
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '16px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
