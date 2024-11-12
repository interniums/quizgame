import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import { useNavigate } from 'react-router-dom'

export default function EmailPage() {
  const { t } = useTranslation()
  const { setGlobalState } = useGlobalContext()
  const [email, setEmail] = useState<string>('')
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false)
  const emailRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const emailRegex = /^(?!\s*$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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
      className="pt-36 md:pt-10 pb-14 min-h-screen px-8 h-full grid justify-items-center w-full"
    >
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <div className="grid gap-2">
          <h1 className="text-center text-4xl font-bold">{t('email')}</h1>
          <p className="text-center text-md opacity-70">{t('enterEmail')}</p>
        </div>
        <div className="w-full mt-20">
          <input
            ref={emailRef}
            type="text"
            className={`rounded-lg bg-slate-100 border shadow-sm outline-none w-full py-6 px-8 hover:bg-slate-200 text-xl transition-all duration-400 ease-in-out ${
              invalidEmail ? 'outline-2 outline-red-500' : ''
            }`}
            placeholder={t('yourEmail')}
            onChange={(e) => {
              setEmail(e.target.value)
              setInvalidEmail(false)
            }}
          />
          <div className="w-full px-10">
            <p className="mt-14 text-center text-sm opacity-70 hover:text-blue-500">{t('policy')}</p>
          </div>
        </div>
      </div>
      <div className="grid items-end w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <button
          onClick={() => handleSubmit()}
          className={`border rounded-lg w-full text-center text-3xl py-4 flex items-center justify-center transition-all duration-400 ease-in-out bg-slate-50 mt-32 ${
            email.length ? 'hover:bg-slate-100 shadow-md bg-white' : ''
          }`}
          disabled={!email.length ? true : false}
        >
          {t('next')}
        </button>
      </div>
    </motion.main>
  )
}
