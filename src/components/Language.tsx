import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import '../i18n'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'

type OutletContextType = {
  screenHeight: number
}

const LANGUAGES_ENDPOINT = 'https://quizproject/questions/language'

export default function Language() {
  const { screenHeight } = useOutletContext<OutletContextType>()
  const { t } = useTranslation()
  const { globalState, setGlobalState } = useGlobalContext()
  const [languages, setLanguages] = useState<string[]>(['English', 'French', 'German', 'Spanish'])

  // restfull implementation. if used, add loading and error state
  useEffect(() => {
    const getLanguages = async () => {
      try {
        const response = await axios.get<string[]>(`${LANGUAGES_ENDPOINT}`)
        setLanguages(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getLanguages()
  }, [])

  const handleSelect = (item: string) => {
    setGlobalState((prev) => ({
      ...prev,
      progress: 1,
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
      className="w-full h-full flex flex-col items-center px-8 flex-grow justify-center"
    >
      <div className="grid gap-4">
        <h1 className={`text-center font-bold ${screenHeight < 700 ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
          {t('languageQuestion')}
        </h1>
        <p
          className={`text-center text-sm md:text-base opacity-70 ${
            screenHeight < 700 ? 'text-xs' : 'text-sm md:text-base'
          }`}
        >
          {t('chooseLanguage')}
        </p>
      </div>
      <div
        className={`grid gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 ${
          screenHeight < 750 ? 'mt-10' : 'mt-10 md:mt-20'
        }`}
      >
        {languages?.map((item) => (
          <button
            onClick={() => handleSelect(item)}
            key={item}
            className={`border rounded-lg w-full text-center hover:bg-slate-100 shadow-sm transition-all duration-200 ease-in-out ${
              screenHeight < 700 ? 'text-lg py-3' : 'py-4 text-2xl md:text-3xl'
            }`}
            style={{
              outline: globalState?.answers?.language == item ? '2px solid gray' : '',
            }}
          >
            {t(item)}
          </button>
        ))}
      </div>
    </motion.main>
  )
}
