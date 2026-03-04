'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Server, Code } from 'lucide-react';
import { useAppContext } from './Providers';
import Link from 'next/link';

export default function Services() {
    const { t, language } = useAppContext();
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            id: language === 'en' ? 'ai-customer-service' : 'ai-customer-service',
            title: t.srv1Title,
            price: t.priceContact,
            description: t.srv1Desc,
            icon: <Zap size={24} color="#3b82f6" />,
            features: [
                t.srv1F1,
                t.srv1F2,
                t.srv1F3,
            ],
            maintenance: t.srv1Maint
        },
        {
            id: language === 'en' ? 'smart-business-web' : 'web-bisnis-cerdas',
            title: t.srv2Title,
            price: t.priceContact,
            description: t.srv2Desc,
            icon: <Code size={24} color="#8b5cf6" />,
            highlight: true,
            features: [
                t.srv2F1,
                t.srv2F2,
                t.srv2F3,
                t.srv2F4,
            ],
            maintenance: t.srv2Maint
        },
        {
            id: language === 'en' ? 'advanced-data-ai' : 'solusi-ai-lanjutan',
            title: t.srv3Title,
            price: t.priceContact,
            description: t.srv3Desc,
            icon: <Server size={24} color="#10b981" />,
            features: [
                t.srv3F1,
                t.srv3F2,
                t.srv3F3,
                t.srv3F4,
            ],
            maintenance: t.srv3Maint
        },
        {
            id: language === 'en' ? 'custom-enterprise' : 'custom-enterprise',
            title: t.srv4Title,
            price: t.priceContact,
            description: t.srv4Desc,
            icon: <Server size={24} color="#a1a1aa" />,
            features: [
                t.srv4F1,
                t.srv4F2,
                t.srv4F3,
                t.srv4F4,
            ],
            maintenance: t.srv4Maint
        }
    ];

    const handleScroll = () => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const scrollPosition = container.scrollLeft;
        const cardWidth = container.offsetWidth;

        const index = Math.round(scrollPosition / cardWidth);
        if (index !== activeIndex && index >= 0 && index < services.length) {
            setActiveIndex(index);
        }
    };

    const scrollTo = (index: number) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const cardWidth = container.offsetWidth;
        container.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });
        setActiveIndex(index);
    };

    return (
        <section id="services" style={{ padding: '60px 0', position: 'relative' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px' }}>
                        {t.servicesHeadingPart1} <span className="text-gradient">{t.servicesHeadingHighlight}</span>
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        {t.servicesDesc}
                    </p>
                </motion.div>

                <div
                    className="services-container"
                    ref={containerRef}
                    onScroll={handleScroll}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`glass-panel service-card ${service.highlight ? 'highlight-box' : ''}`}
                            style={{
                                border: service.highlight ? '1px solid rgba(139, 92, 246, 0.4)' : undefined,
                                boxShadow: service.highlight ? '0 0 30px rgba(139, 92, 246, 0.1)' : undefined
                            }}
                        >
                            {service.highlight && (
                                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-gradient)', padding: '4px 12px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, color: '#fff' }}>
                                    {t.popularBadge}
                                </div>
                            )}

                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                <div style={{ transform: 'scale(0.7)' }}>
                                    {service.icon}
                                </div>
                            </div>

                            <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{service.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '8px', lineHeight: '1.3' }}>{service.description}</p>

                            <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
                                {service.price}
                            </div>

                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px 0', flex: 1 }}>
                                {service.features.map((feat, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '8px', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                                        <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <div style={{ padding: '6px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '8px' }}>
                                {service.maintenance}
                            </div>

                            <Link href={`/services/${service.id}`} style={{ display: 'block', width: '100%' }}>
                                <button className={service.highlight ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', padding: '6px 12px', fontSize: '0.85rem' }}>
                                    View Details
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mobile-pagination">
                    {services.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`pagination-dot ${activeIndex === index ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
