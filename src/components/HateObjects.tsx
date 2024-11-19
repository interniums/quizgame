import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'

type OutletContextType = {
  screenHeight: number
}

const HATEOBJECTS_ENDPOINT = 'https://quizproject/questions/hate-objects'

export default function HateObjects() {
  const { globalState, setGlobalState } = useGlobalContext()
  const { t } = useTranslation()
  const [hateObjects, setHateObjects] = useState<string[]>(['hateObject1', 'hateObject2', 'hateObject3', 'hateObject4'])
  const [choosenObjects, setChoosenObjects] = useState<string[]>(globalState.answers.hate || [])
  const { screenHeight } = useOutletContext<OutletContextType>()

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
      className="w-full h-full flex flex-col items-center px-8 flex-grow justify-around"
    >
      <div className="flex flex-col items-center justify-center w-full">
        <div className="grid gap-4 mb-6 px-2">
          <h1 className={`text-center font-bold ${screenHeight < 750 ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
            {t('hateObjectQuestion')}
          </h1>
          <p className={`text-center text-sm md:text-base opacity-70 px-4 ${screenHeight < 750 ? 'text-xs' : ''}`}>
            {t('chooseHateObject')}
          </p>
        </div>
        <div
          className={`grid w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 ${
            screenHeight < 750 ? 'gap-3 mt-10' : 'gap-4 md:mt-20'
          }`}
        >
          {hateObjects?.map((item) => (
            <button
              onClick={() => handleSelect(item)}
              key={item}
              className={`border rounded-lg w-full hover:bg-slate-100 flex items-center justify-between px-6 shadow-sm transition-all duration-200 ease-in-out ${
                screenHeight < 750 ? 'text-lg py-3' : 'py-4 text-xl md:text-2xl'
              }`}
              style={{
                outline: choosenObjects.includes(item) ? '2px solid grey' : '',
              }}
            >
              {t(`${item}`)}
              <input
                type="checkbox"
                checked={choosenObjects.includes(item)}
                className={`accent-slate-500 text-white ${screenHeight < 750 ? 'size-4' : 'size-5 md:size-6'}`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <button
          onClick={() => handleSubmit()}
          className={`border rounded-lg w-full text-center flex items-center justify-center transition-all duration-400 ease-in-out ${
            choosenObjects.length ? 'hover:bg-slate-100 shadow-md bg-slate-900 text-white' : 'bg-slate-100 text-black'
          } ${screenHeight < 750 ? 'py-2.5 text-xl' : 'py-3 md:py-4 text-2xl md:text-3xl'}`}
          disabled={!choosenObjects.length}
        >
          {t('next')}
        </button>
      </div>
    </motion.main>
  )
}
