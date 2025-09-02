import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import './globals.css';
import './theme.css';
import ThemeToggle from '../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Tagger Pet',
  description: 'Centraliza y simplifica el cuidado de tus mascotas.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} data-theme="auto">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* Enlace de salto para accesibilidad (navegación por teclado) */}
          <a href="#content" className="skip-link">Saltar al contenido</a>
          <header className="app-header">
            <div className="container">
              <strong>Tagger Pet</strong>
              <ThemeToggle />
            </div>
          </header>
          <main id="content" className="container">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

