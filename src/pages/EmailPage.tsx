import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate, useOutletContext } from 'react-router-dom'

type OutletContextType = {
  screenHeight: number
}

export default function EmailPage() {
  const { t } = useTranslation()
  const { setGlobalState } = useGlobalContext()
  const [email, setEmail] = useState<string>('')
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const emailRegex = /^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const { screenHeight } = useOutletContext<OutletContextType>()

  const handleSubmit = () => {
    if (!emailRegex.test(email)) {
      setInvalidEmail(true)
      if (emailRef.current) {
        emailRef.current.focus()
      }
    } else {
      setGlobalState((prev) => ({ ...prev, answers: { ...prev.answers, email: email } }))
      navigate('/result')
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="md:pt-10 px-8 h-full flex flex-col justify-around w-full flex-grow items-center"
    >
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <div className="grid gap-2">
          <h1 className={`text-center font-bold ${screenHeight < 750 ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            {t('email')}
          </h1>
          <p className={`text-center text-md opacity-70 ${screenHeight < 750 ? 'text-sm' : 'text-base md:text-lg'}`}>
            {t('enterEmail')}
          </p>
        </div>
        <div className="w-full mt-20">
          <input
            ref={emailRef}
            type="text"
            className={`rounded-lg bg-slate-100 border shadow-sm outline-none w-full hover:bg-slate-200 text-xl transition-all duration-400 ease-in-out ${
              invalidEmail ? 'outline-2 outline-red-500' : 'focus:outline-slate-800'
            } ${screenHeight < 750 ? 'py-3 px-6 text-base' : 'py-4 md:py-6 px-8 text-lg md:text-xl'}`}
            placeholder={t('yourEmail')}
            onChange={(e) => {
              setEmail(e.target.value)
              setInvalidEmail(false)
            }}
          />
          <p style={{ opacity: invalidEmail ? '1' : '0' }} className="text-red-500 text-start font-bold mt-2">
            {t('invalidEmail')}
          </p>
          <div className="w-full px-10">
            <p
              className={`mt-14 text-center text-sm opacity-70 hover:text-blue-500 ${
                screenHeight < 750 ? 'text-xs' : 'text-sm md:text-base'
              }`}
            >
              {t('policy')}
            </p>
          </div>
        </div>
      </div>
      <div className="grid items-end w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <button
          onClick={() => handleSubmit()}
          className={`border rounded-lg w-full text-center flex items-center justify-center transition-all duration-400 ease-in-out bg-slate-200 mt-32 ${
            email.length ? 'hover:bg-slate-800 shadow-md bg-slate-900 text-white' : 'bg-slate-200 text-black'
          } ${screenHeight < 750 ? 'text-xl py-3' : 'text-2xl py-4'}`}
          disabled={!email.length}
        >
          {t('next')}
        </button>
      </div>
    </motion.main>
  )
}
