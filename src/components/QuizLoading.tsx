import { motion } from 'framer-motion'
import waitingGif from '../assets/gifs/waiting.webp'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function QuizLoading() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(0)

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
      className="flex items-start justify-center w-full h-full"
    >
      <div className="px-8 h-full min-h-screen py-36 md:py-10 grid w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <div className="w-full">
          <h1 className="text-center text-4xl font-bold mb-2">{t('loading')}</h1>
          <h1 className="text-center text-2xl">{t('findingCollections') + dots}</h1>
          <div className="w-full flex items-center justify-center">
            <img src={waitingGif} alt="loading" className="mt-4 rounded-md" />
          </div>
        </div>
        <div className="w-full mt-8">
          <p className="text-center text-2xl">{Math.round(progress)}%</p>
          <div className="relative w-full border h-5 rounded-full bg-slate-300 mt-6">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 5,
                ease: 'easeOut',
              }}
              className="w-full border h-5 rounded-full bg-black absolute inset-0"
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
