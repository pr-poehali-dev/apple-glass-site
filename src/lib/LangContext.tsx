import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, T, SUPPORTED_LANGS } from './i18n';

const DETECT_URL = 'https://functions.poehali.dev/23406a98-bf75-4250-9866-45d60da376df';
const STORAGE_KEY = 'maxon_lang';

type LangContextType = {
  lang: string;
  setLang: (l: string) => void;
  t: T;
  country: string;
  loading: boolean;
};

const LangContext = createContext<LangContextType>({
  lang: 'en', setLang: () => {}, t: getTranslation('en'), country: '', loading: true,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<string>(() => localStorage.getItem(STORAGE_KEY) || '');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      setLangState(saved);
      setLoading(false);
      return;
    }
    fetch(DETECT_URL)
      .then(r => r.json())
      .then(data => {
        const detected = data.lang || 'en';
        setLangState(detected);
        setCountry(data.country || '');
        localStorage.setItem(STORAGE_KEY, detected);
      })
      .catch(() => setLangState('en'))
      .finally(() => setLoading(false));
  }, []);

  const setLang = (l: string) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: getTranslation(lang), country, loading }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
