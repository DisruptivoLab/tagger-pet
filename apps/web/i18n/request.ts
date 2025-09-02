import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale) locale = 'es';

  // Carga los mensajes del locale solicitado desde la carpeta raíz /messages
  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
