'use client';

import { useParams, useRouter } from 'next/navigation';
import { serviceData, ServiceId } from '@/utils/serviceData';
import { useAppContext } from '@/components/Providers';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import Image from 'next/image';
import ServiceGallery from '../../../components/ServiceGallery';

export default function ServiceDetail() {
    const params = useParams();
    const router = useRouter();
    const { t } = useAppContext();
    const slug = params.id as string;

    const data = Object.values(serviceData).find(
        (s) => s.slugEn === slug || s.slugId === slug
    );

    if (!data) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1 style={{ marginBottom: '20px' }}>Service Not Found</h1>
                <button className="btn-secondary" onClick={() => router.push('/')}>Return Home</button>
            </div>
        );
    }

    // Access translated title based on key from serviceData
    const translatedTitle = t[data.titleKey as keyof typeof t] as string || data.titleKey;

    return (
        <main style={{ minHeight: '100vh', paddingBottom: '80px' }}>
            <nav style={{ padding: '20px 0', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <button
                        className="btn-secondary"
                        onClick={() => router.push('/#services')}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem', width: 'auto', minWidth: 'auto', margin: 0 }}
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden-mobile">Tutup Detail</span>
                        <span style={{ display: 'none' }} className="show-mobile">Kembali</span>
                    </button>
                    <Image
                        src="/favicon_baru.png"
                        alt="Verqoz Logo"
                        width={120}
                        height={30}
                        style={{ objectFit: 'contain', marginLeft: 'auto' }}
                    />
                </div>
            </nav>

            <div className="container" style={{ paddingTop: '60px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}
                >
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
                        <span className="text-gradient">{translatedTitle}</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        {data.fullDescription}
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '80px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-panel"
                        style={{ padding: '32px' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Key Advantages</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {data.benefits.map((benefit, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', marginTop: '8px', flexShrink: 0 }} />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="glass-panel"
                        style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Ready to Deploy?</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Let our engineers build this custom solution for your business.</p>
                        <button className="btn-primary" style={{ width: '100%', maxWidth: '300px' }} onClick={() => router.push('/#demo')}>
                            Request Consultation
                        </button>
                    </motion.div>
                </div>

                {/* Educational Resources Section */}
                {(data as any).learningLinks && (data as any).learningLinks.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: '60px' }}
                    >
                        <div className="glass-panel" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <BookOpen size={24} color="var(--accent-primary)" />
                                Pusat Pembelajaran (Medium)
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                Pelajari lebih lanjut tentang teknologi di balik layanan ini.
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                                {(data as any).learningLinks.map((link: any, i: number) => (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'block',
                                            padding: '16px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid var(--glass-border)',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                            e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                                        }}
                                    >
                                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '6px' }}>{link.category}</div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-primary)' }}>{link.title}</div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Implementation Gallery</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Visual examples of this technology in action.</p>
                </div>

                <ServiceGallery images={data.images} />
            </div>
        </main>
    );
}
