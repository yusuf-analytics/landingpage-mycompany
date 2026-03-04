'use client';

import { motion } from 'framer-motion';
import { useAppContext } from './Providers';

export default function LiveStats() {
    const { t } = useAppContext();

    const stats = [
        { num: t.stat1Num, label: t.stat1Label },
        { num: t.stat2Num, label: t.stat2Label },
        { num: t.stat3Num, label: t.stat3Label },
        { num: t.stat4Num, label: t.stat4Label }
    ];

    return (
        <section style={{ padding: '0 0 40px', position: 'relative', zIndex: 10 }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="glass-panel"
                    style={{
                        padding: '16px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'linear-gradient(to right, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '12px'
                    }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} style={{ textAlign: 'center', minWidth: '90px', padding: '4px' }}>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="text-gradient"
                                style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', marginBottom: '2px', fontWeight: 700 }}
                            >
                                {stat.num}
                            </motion.h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
