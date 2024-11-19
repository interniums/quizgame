import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'

const GENDERS_ENDPOINT = 'https://quizproject/questions/genders'

type OutletContextType = {
  screenHeight: number
}

export default function Gender() {
  const { t } = useTranslation()
  const { globalState, setGlobalState } = useGlobalContext()
  const [genders, setGenders] = useState<string[]>(['Male', 'Female', 'Other'])
  const { screenHeight } = useOutletContext<OutletContextType>()

  // restfull implementation. if used, add loading and error state
  useEffect(() => {
    const getGenders = async () => {
      try {
        const response = await axios.get<string[]>(`${GENDERS_ENDPOINT}`)
        setGenders(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getGenders()
  }, [])

  const handleSelect = (item: string) => {
    setGlobalState((prev) => ({
      ...prev,
      progress: 2,
      answers: { ...prev.answers, gender: item },
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
        <h1 className={`text-center font-bold ${screenHeight < 750 ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
          {t('genderQuestion')}
        </h1>
        <p className={`text-center opacity-70 ${screenHeight < 750 ? 'text-xs' : 'text-sm md:text-base'}`}>
          {t('chooseGender')}
        </p>
      </div>
      <div
        className={`grid gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 ${
          screenHeight < 750 ? 'mt-10' : 'mt-10 md:mt-20'
        }`}
      >
        {genders?.map((item) => (
          <button
            onClick={() => handleSelect(item)}
            key={item}
            className={`border rounded-lg w-full text-center hover:bg-slate-100 flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out ${
              screenHeight < 750 ? 'text-lg py-3' : 'py-4 text-2xl md:text-3xl'
            }`}
            style={{
              outline: globalState?.answers.gender == item ? '2px solid gray' : '',
            }}
          >
            {t(`${item}`)}
          </button>
        ))}
      </div>
    </motion.main>
  )
}
