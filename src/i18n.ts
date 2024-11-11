import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// initializing translations
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        languageQuestion: 'What is your preferred language?',
        chooseLanguage: 'Choose Language',
        English: 'English',
        French: 'French',
        German: 'German',
        Spanish: 'Spanish',
      },
    },
    fr: {},
    de: {},
    es: {},
  },
})

export default i18n
