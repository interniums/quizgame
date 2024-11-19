import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'

const AGES_ENDPOINT = 'https://quizproject/questions/ages'

type OutletContextType = {
  screenHeight: number
}

export default function Age() {
  const { globalState, setGlobalState } = useGlobalContext()
  const { t } = useTranslation()
  const [ages, setAges] = useState<string[]>(['age1', 'age2', 'age3', 'age4'])
  const { screenHeight } = useOutletContext<OutletContextType>()

  // restfull implementation. if used, add loading and error state
  useEffect(() => {
    const getAges = async () => {
      try {
        const response = await axios.get<string[]>(`${AGES_ENDPOINT}`)
        setAges(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getAges()
  }, [])

  const handleSelect = (item: string) => {
    setGlobalState((prev) => ({
      ...prev,
      progress: 3,
      answers: { ...prev.answers, age: item },
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
        <h1
          className={`text-center text-2xl md:text-3xl font-bold ${
            screenHeight < 750 ? 'text-xl' : ''
          }`}
        >
          {t('ageQuestion')}
        </h1>
        <p
          className={`text-center text-sm md:text-base opacity-70 ${
            screenHeight < 750 ? 'text-xs' : ''
          }`}
        >
          {t('chooseAge')}
        </p>
      </div>
      <div className="mt-10 md:mt-20 grid gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        {ages?.map((item) => (
          <button
            onClick={() => handleSelect(item)}
            key={item}
            className={`border rounded-lg w-full text-center text-2xl md:text-3xl hover:bg-slate-100 flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out ${
              screenHeight < 750 ? 'text-lg py-3' : 'py-4'
            }`}
            style={{
              outline:
                globalState?.answers?.age === item ? '2px solid gray' : '',
            }}
          >
            {t(item)}
          </button>
        ))}
      </div>
    </motion.main>
  )
}
