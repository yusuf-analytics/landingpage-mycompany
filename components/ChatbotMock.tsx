'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { useAppContext } from './Providers';

const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: '8px' }} />;

        // Match **bold** or [text](url)
        const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

        return (
            <div key={i} style={{
                marginBottom: line.startsWith('-') || line.match(/^\d+\./) ? '6px' : '4px',
                paddingLeft: line.startsWith('-') ? '16px' : '0',
                position: 'relative'
            }}>
                {line.startsWith('-') && <span style={{ position: 'absolute', left: 0 }}>•</span>}
                {parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j} style={{ fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
                    }

                    const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (linkMatch) {
                        return (
                            <a
                                key={j}
                                href={linkMatch[2]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontWeight: 500 }}
                            >
                                {linkMatch[1]}
                            </a>
                        );
                    }

                    if (part.startsWith('- ')) {
                        return <span key={j}>{part.slice(2)}</span>;
                    }
                    return <span key={j}>{part}</span>;
                })}
            </div>
        );
    });
};

export default function ChatbotMock() {
    const { t } = useAppContext();
    const [messages, setMessages] = useState([
        { role: 'bot', text: t.chatGreeting }
    ]);
    const isInitialMount = useRef(true);
    const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));

    useEffect(() => {
        setMessages(prev => {
            if (prev.length === 1 && prev[0].role === 'bot') {
                return [{ role: 'bot', text: t.chatGreeting }];
            }
            return prev;
        });
    }, [t.chatGreeting]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        // Only scroll if it's not the initial mount to prevent jumping on page load
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Find the scrollable container and scroll it, not the whole window
        const container = messagesEndRef.current?.parentElement;
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleBlur = () => {
        // Fix for mobile devices (especially iOS) where closing the keyboard leaves the layout shifted.
        setTimeout(() => {
            window.scrollTo({
                top: window.scrollY,
                left: window.scrollX,
                behavior: 'smooth'
            });
        }, 100);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages(prev => [...prev, { role: 'user', text: input }]);
        const userMsg = input;
        setInput('');

        setMessages(prev => [...prev, { role: 'bot', text: 'Typing...' }]);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'https://verqoz-ai.up.railway.app/chat';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session_id: sessionId, message: userMsg }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'bot', text: data.reply };
                return newMessages;
            });
        } catch (error) {
            console.error('Error fetching chat response:', error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'bot', text: 'Maaf, server AI sedang tidak dapat diakses saat ini.' };
                return newMessages;
            });
        }
    };

    return (
        <section id="demo" style={{ padding: '80px 0 120px' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '24px' }}>
                            Experience Next-Gen <span className="text-gradient">RAG AI</span>
                        </h2>
                        <div style={{
                            padding: '20px 24px',
                            borderLeft: '4px solid var(--accent-primary)',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
                            borderRadius: '0 16px 16px 0',
                            marginBottom: '32px'
                        }}>
                            <p style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.5, marginBottom: '8px', letterSpacing: '-0.3px' }}>
                                {t.chatMockHighlight1}
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                                {t.chatMockHighlight2}
                            </p>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {['24/7 Client Support', 'WhatsApp & Telegram Ready', 'Deep Business Context', 'Seamless Human Handoff'].map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '1.1rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel"
                        style={{ padding: '0', overflow: 'hidden', height: '500px', display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={20} color="#fff" />
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Verqoz AI Assistant</div>
                                <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                                    Online
                                </div>
                            </div>
                        </div>

                        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <AnimatePresence>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="chat-message-container"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '12px',
                                            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
                                        }}
                                    >
                                        <div style={{
                                            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                                            background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'var(--accent-gradient)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div
                                            className="chat-message-content"
                                            style={{
                                                borderRadius: '16px',
                                                background: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--glass-bg)',
                                                color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                                                borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                                                borderTopLeftRadius: msg.role === 'bot' ? '4px' : '16px',
                                                border: msg.role === 'bot' ? '1px solid var(--glass-border)' : 'none',
                                            }}
                                        >
                                            {renderFormattedText(msg.text)}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input-wrapper" style={{ padding: '20px 24px', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <input
                                className="chat-input-field"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                onBlur={handleBlur}
                                placeholder={t.chatPlaceholder}
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '99px',
                                    padding: '12px 20px',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'inherit',
                                    outline: 'none'
                                }}
                            />
                            <button
                                className="chat-send-btn"
                                onClick={handleSend}
                                style={{
                                    width: '48px', height: '48px',
                                    flexShrink: 0,
                                    borderRadius: '50%',
                                    background: 'var(--accent-primary)',
                                    border: 'none',
                                    display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#fff',
                                    transition: 'transform 0.2s',
                                    transform: input ? 'scale(1)' : 'scale(0.95)',
                                    opacity: input ? 1 : 0.7
                                }}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
