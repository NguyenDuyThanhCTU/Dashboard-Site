import 'server-only';
import type { Locale } from '@i18n.config';

const dictionaries: {
  [key: string]: () => Promise<{ [key: string]: { [key: string]: any } }>;
} = {
  vi: () =>
    import('../../assets/dictionaries/vi.json').then(
      (module) => module.default
    ),
  cn: () =>
    import('../../assets/dictionaries/cn.json').then(
      (module) => module.default
    ),
  en: () =>
    import('../../assets/dictionaries/en.json').then(
      (module) => module.default
    ),
};

export const getDictionary = async (locale: Locale) => {
  return locale == 'en'
    ? dictionaries.en()
    : locale == 'vi'
    ? dictionaries.vi()
    : dictionaries.cn();
};
