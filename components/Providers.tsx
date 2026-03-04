'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../utils/translations';
import { translations } from '../utils/translations';

type Theme = 'dark' | 'light';

interface AppContextType {
    theme: Theme;
    setTheme: (t: Theme) => void;
    language: Language;
    setLanguage: (l: Language) => void;
    t: typeof translations.en;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [language, setLanguage] = useState<Language>('id'); // Default pre-set per user request initially, but let's default to En or ID appropriately

    // On mount, read from localStorage if available
    useEffect(() => {
        const storedLang = localStorage.getItem('language') as Language;
        if (storedLang && (storedLang === 'en' || storedLang === 'id')) {
            setLanguage(storedLang);
        }
        const storedTheme = localStorage.getItem('theme') as Theme;
        if (storedTheme && (storedTheme === 'dark' || storedTheme === 'light')) {
            setTheme(storedTheme);
        }
    }, []);

    // Sync theme up to the document root element (data attribute)
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Sync language to local storage
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const value = {
        theme,
        setTheme,
        language,
        setLanguage,
        t: translations[language],
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}
