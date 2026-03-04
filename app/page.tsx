'use client';

import Hero from '@/components/Hero';
import LiveStats from '@/components/LiveStats';
import Features from '@/components/Features';
import Services from '@/components/Services';
import ChatbotMock from '@/components/ChatbotMock';
import Image from 'next/image';
import SettingsToggle from '@/components/SettingsToggle';
import { useAppContext } from '@/components/Providers';

import { useEffect } from 'react';

export default function Home() {
  const { t } = useAppContext();

  // Force scroll to top on mount/refresh
  useEffect(() => {
    // Override browser default scroll restoration if possible
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Timeout ensures it runs after DOM paint
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as any });
    }, 50);
  }, []);

  return (
    <main>
      <nav style={{ padding: '8px 0', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap' }}>
          <div style={{ flexShrink: 0, zIndex: 101 }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/Desain_tanpa_judul-removebg-preview.png"
                alt="Verqoz Logo"
                width={400}
                height={110}
                style={{ objectFit: 'contain', width: 'auto', height: 'clamp(85px, 15vw, 130px)', marginLeft: '-8px' }}
                priority
              />
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', fontWeight: 500, fontSize: '0.9rem', flexShrink: 0 }}>
              <a href="#services">{t.navServices}</a>
              <a href="#demo">{t.navDemo}</a>
            </div>
            <SettingsToggle />
          </div>
        </div>
      </nav>

      <Hero />
      <LiveStats />
      <Features />
      <Services />
      <div id="demo">
        <ChatbotMock />
      </div>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '60px 0 40px', marginTop: '40px' }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/Desain_tanpa_judul-removebg-preview.png"
              alt="Verqoz Logo"
              width={260}
              height={70}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p style={{ maxWidth: '400px', margin: '0 auto 40px' }}>{t.footerDesc}</p>
          <div style={{ fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Verqoz AI. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
