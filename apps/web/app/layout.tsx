import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import './globals.css';
import './theme.css';
import ThemeToggle from './components/theme-toggle';

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

