import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import en from '../messages/en.json';
import es from '../messages/es.json';

import './globals.css';
import './theme.css';
import ThemeToggle from './components/theme-toggle';

export const metadata: Metadata = {
  title: 'Tagger Pet',
  description: 'Centraliza y simplifica el cuidado de tus mascotas.',
};

function getBrowserLocale(): 'es' | 'en' {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language?.toLowerCase() || 'es';
    return lang.startsWith('en') ? 'en' : 'es';
  }
  return 'es';
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getBrowserLocale();
  const messages = locale === 'en' ? en : es;

  return (
    <html lang={locale} data-theme="auto">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <header className="app-header">
            <div className="container">
              <strong>Tagger Pet</strong>
              <ThemeToggle />
            </div>
          </header>
          <main className="container">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

