import { motion } from 'framer-motion'
import waitingGif from '../assets/gifs/waiting.webp'
import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type OutletContextType = {
  screenHeight: number
}

export default function QuizLoading() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(0)
  const { screenHeight } = useOutletContext<OutletContextType>()

  useEffect(() => {
    if (progress == 100) {
      setTimeout(() => {
        navigate('/email')
      }, 300)
    }
  }, [progress])

  useEffect(() => {
    const startTime = Date.now()
    const duration = 5000

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      const newProgress = Math.min((elapsedTime / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress === 100) {
        clearInterval(interval)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      className="flex items-center justify-center w-full h-full flex-grow"
    >
      <div
        className={`px-8 h-full grid w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 ${
          screenHeight < 750 ? 'py-4' : 'md:py-10'
        }`}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className={`text-center font-bold mb-2 ${screenHeight < 750 ? 'text-2xl' : 'text-4xl md:text-3xl'}`}>
            {t('loading')}
          </h1>
          <h1 className={`text-center ${screenHeight < 750 ? 'text-lg' : 'text-xl md:text-2xl'}`}>
            {t('findingCollections') + dots}
          </h1>
          <div className={`w-full flex justify-center ${screenHeight < 750 ? 'size-96' : ''}`}>
            <img src={waitingGif} alt="loading" className="mt-4 rounded-md object-cover" />
          </div>
        </div>
        <div className="w-full mt-8 flex-col flex items-center justify-center">
          <p className={`text-center ${screenHeight < 750 ? 'text-lg' : 'text-xl md:text-2xl'}`}>
            {Math.round(progress)}%
          </p>
          <div
            className={`relative w-full border rounded-full bg-slate-300 ${
              screenHeight < 750 ? 'h-3 mt-4' : 'h-4 md:h-5 mt-6'
            }`}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 5,
                ease: 'easeOut',
              }}
              className="border rounded-full bg-black w-full h-full"
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
