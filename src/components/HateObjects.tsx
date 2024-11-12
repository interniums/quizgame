import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import axios from 'axios'

const HATEOBJECTS_ENDPOINT = 'https://quizproject/questions/hate-objects'

export default function HateObjects() {
  const { globalState, setGlobalState } = useGlobalContext()
  const { t } = useTranslation()
  const [hateObjects, setHateObjects] = useState<string[]>(['hateObject1', 'hateObject2', 'hateObject3', 'hateObject4'])
  const [choosenObjects, setChoosenObjects] = useState<string[]>(globalState.answers.hate || [])

  // restfull implementation. if used, add loading and error state
  useEffect(() => {
    const getHateObjects = async () => {
      try {
        const response = await axios.get<string[]>(`${HATEOBJECTS_ENDPOINT}`)
        setHateObjects(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    getHateObjects()
  }, [])

  const handleSubmit = () => {
    setGlobalState((prev) => ({
      ...prev,
      progress: 4,
      answers: { ...prev.answers, hate: choosenObjects },
    }))
  }

  const handleSelect = (item: string) => {
    const duplicate = choosenObjects.includes(item)

    if (duplicate) {
      const clearDuplicate = choosenObjects.filter((x) => x !== item)
      setChoosenObjects(clearDuplicate)
    }
    if (!duplicate) {
      setChoosenObjects((prev) => [...prev, item])
    }
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
        <h1 className="text-center text-3xl font-bold">{t('hateObjectQuestion')}</h1>
        <p className="text-center text-md opacity-70 px-4">{t('chooseHateObject')}</p>
      </div>
      <div className="mt-20 grid gap-4 w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        {hateObjects?.map((item) => (
          <button
            onClick={() => handleSelect(item)}
            key={item}
            className="border rounded-lg w-full text-2xl py-4 hover:bg-slate-100 flex items-center justify-between px-6 shadow-sm transition-all duration-200 ease-in-out"
            style={{ outline: choosenObjects.includes(item) ? '2px solid grey' : '' }}
          >
            {t(`${item}`)}
            <input
              type="checkbox"
              checked={choosenObjects.includes(item) ? true : false}
              className="size-6 accent-slate-500 text-white"
            />
          </button>
        ))}
      </div>
      <div className="w-full mt-24 md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <button
          onClick={() => handleSubmit()}
          className={`border rounded-lg w-full text-center text-3xl py-4 flex items-center justify-center transition-all duration-400 ease-in-out bg-slate-50 ${
            choosenObjects.length ? 'hover:bg-slate-100 shadow-md bg-white' : ''
          }`}
          disabled={!choosenObjects.length ? true : false}
        >
          {t('next')}
        </button>
      </div>
    </motion.main>
  )
}
