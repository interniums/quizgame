import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import '../i18n'
import axios from 'axios'

const LANGUAGES_ENDPOINT = 'https://quizproject/questions/language'

interface Language {
  code: string
  name: string
}

export default function Language() {
  const { t } = useTranslation()
  const { setGlobalState } = useGlobalContext()
  const [languages, setLanguages] = useState<string[]>([t('English'), t('French'), t('German'), t('Spanish')])

  // restfull implementation. if used, add loading and error state
  useEffect(() => {
    const getLanguages = async () => {
      try {
        const response = await axios.get<string[]>(`${LANGUAGES_ENDPOINT}`)
        setLanguages(response.data)
      } catch (err) {
        console.error(err)
      }

      if (!languages.length) {
        setLanguages([t('English'), t('French'), t('German'), t('Spanish')])
      }
    }
    getLanguages()
  }, [])

  const handleSelect = (item: string) => {
    setGlobalState((prev) => ({
      ...prev,
      path: '/quiz/gender',
      progress: 2,
      answers: { ...prev.answers, language: item },
    }))
  }

  return (
    <motion.main
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: '0%' }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{
        duration: 0.75,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      className="w-full h-full grid items-center justify-items-center px-8 py-10"
    >
      <div className="grid gap-4">
        <h1 className="text-center text-3xl font-bold">{t('languageQuestion')}</h1>
        <p className="text-center text-md opacity-70">{t('chooseLanguage')}</p>
      </div>
      <div className="mt-20 grid gap-4 w-full">
        {languages?.map((item) => (
          <button
            onClick={() => handleSelect(item)}
            key={item}
            className="border rounded-lg w-full text-center text-3xl py-4 hover:bg-slate-100"
          >
            {t(`${item}`)}
          </button>
        ))}
      </div>
    </motion.main>
  )
}
