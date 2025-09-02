import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  return (
    <main>
      <h1>{t('home.title')}</h1>
      <p>{t('home.welcome')}</p>
    </main>
  );
}
