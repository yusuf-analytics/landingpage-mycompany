'use client';

import { useAppContext } from './Providers';
import { Moon, Sun, Globe } from 'lucide-react';

export default function SettingsToggle() {
    const { theme, setTheme, language, setLanguage } = useAppContext();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'id' : 'en');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
                onClick={toggleLanguage}
                title="Toggle Language"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'none',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '99px',
                    padding: '6px 12px',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
                <Globe size={14} />
                {language.toUpperCase()}
            </button>

            <button
                onClick={toggleTheme}
                title="Toggle Theme"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'none',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--glass-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
        </div>
    );
}
