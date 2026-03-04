import { Inter, Outfit } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' });

import { AppProvider } from '../components/Providers';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Verqoz - AI Agency & 3D Web Experiences',
  description: 'Premium AI & web development services. Get your custom AI chatbots and dynamic landing pages.',
  icons: {
    icon: '/favicon_baru.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
