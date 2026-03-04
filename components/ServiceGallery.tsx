'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryImage {
    src: string;
    category: string;
}

interface ServiceGalleryProps {
    images: GalleryImage[];
}

export default function ServiceGallery({ images }: ServiceGalleryProps) {
    const [activeCategory, setActiveCategory] = useState<string>('All');

    // Extract unique categories
    const categories = ['All', ...Array.from(new Set(images.map(img => img.category)))];

    const filteredImages = activeCategory === 'All'
        ? images
        : images.filter(img => img.category === activeCategory);

    return (
        <div>
            {/* Filter Buttons */}
            {categories.length > 2 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '99px',
                                background: activeCategory === cat ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                                border: '1px solid',
                                borderColor: activeCategory === cat ? 'var(--accent-primary)' : 'var(--glass-border)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: 500
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Image Grid */}
            <motion.div
                layout
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px'
                }}
            >
                <AnimatePresence mode='popLayout'>
                    {filteredImages.map((img, idx) => (
                        <motion.div
                            key={img.src} // using src as key allows Framer Motion to track identity properly
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            style={{ position: 'relative', width: '100%', height: '250px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                        >
                            <Image
                                src={img.src}
                                alt={`Service implementation example: ${img.category}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Category Badge overlay on image */}
                            <div style={{
                                position: 'absolute', top: '12px', right: '12px',
                                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                                padding: '4px 12px', borderRadius: '8px',
                                fontSize: '0.75rem', fontWeight: 600, color: '#fff'
                            }}>
                                {img.category}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
