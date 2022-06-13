const momentLocales = {
  en: 'en',
  ru: 'ru',
  zh: 'zh-cn'
}

const currLocale = localStorage.getItem('lang')

// eslint-disable-next-line import/prefer-default-export
export const getLocale = () => momentLocales[currLocale] || 'en'
