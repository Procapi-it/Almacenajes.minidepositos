import { ui, defaultLang } from './ui';

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  // Si no hay lang en la URL o es la ruta raíz, devolver el idioma por defecto (español)
  if (!lang) return defaultLang;
  // Si el lang está en nuestro objeto ui de traducciones, devolverlo
  if (lang in ui) return lang;
  // En cualquier otro caso, devolver el idioma por defecto
  return defaultLang;
}

export function useTranslations(lang) {
  return function t(key) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function localizePath(path, lang) {
  // Si el idioma es español, no agregamos el prefijo de idioma
  if (lang === 'es') {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // Para otros idiomas, agregamos el prefijo
  return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}
