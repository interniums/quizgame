import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGlobalContext } from '../context/GlobalContext'
import axios from 'axios'
import { useNavigate, useOutletContext } from 'react-router-dom'

const PREFERENCES_ENDPOINT = 'https://quizproject/questions/genders'
const FOR_WOMEN = [1, 2, 4]
const FOR_MAN = [0, 5, 6]
const FOR_YOUNG = [3, 7, 9]
const POPULAR = [2, 4, 6]

interface ResponseData {
  allPreferences: string[]
  personalPreferences: string[]
}

type OutletContextType = {
  screenHeight: number
}

export default function Preferences() {
  const { globalState, setGlobalState } = useGlobalContext()
  const { t } = useTranslation()
  const [preferences, setPreferences] = useState<string[]>([
    'preference1',
    'preference2',
    'preference3',
    'preference4',
    'preference5',
    'preference6',
    'preference7',
    'preference8',
    'preference9',
    'preference10',
  ])
  const [choosenPreferences, setChoosenPreferences] = useState<string[]>(
    globalState.answers.preferences || []
  )
  const [personalizedPreferences, setPersonalizedPreferences] = useState<
    string[]
  >([])
  const navigate = useNavigate()
  const { screenHeight } = useOutletContext<OutletContextType>()

  // restfull implementation. if used, add loading and error state
  useEffect(() => {
    const getPreferences = async () => {
      try {
        const response = await axios.post<ResponseData>(
          `${PREFERENCES_ENDPOINT}`,
          {
            gender: globalState.answers.gender,
            age: globalState.answers.age,
          }
        )
        setPreferences(response.data.allPreferences)
        setPersonalizedPreferences(response.data.personalPreferences)
      } catch (err) {
        console.error(err)
      }
    }
    getPreferences()
  }, [])

  // get personalized preferences
  useEffect(() => {
    if (globalState.answers.gender !== 'Other') {
      globalState.answers.gender === 'Male'
        ? setPersonalizedPreferences(
            FOR_MAN.map((index) => preferences[index]).filter(Boolean)
          )
        : globalState.answers.gender === 'Female'
        ? setPersonalizedPreferences(
            FOR_WOMEN.map((index) => preferences[index]).filter(Boolean)
          )
        : null
    } else {
      globalState.answers.age === 'age1'
        ? setPersonalizedPreferences(
            FOR_YOUNG.map((index) => preferences[index]).filter(Boolean)
          )
        : setPersonalizedPreferences(
            POPULAR.map((index) => preferences[index]).filter(Boolean)
          )
    }
  }, [])

  useEffect(() => {
    setPreferences(
      preferences.filter((item) => !personalizedPreferences.includes(item))
    )
  }, [personalizedPreferences])

  const handleSubmit = () => {
    setGlobalState((prev) => ({
      ...prev,
      answers: { ...prev.answers, preferences: choosenPreferences },
    }))
    navigate('/quiz/loading')
  }

  const handleSelect = (item: string) => {
    const duplicate = choosenPreferences.includes(item)

    if (duplicate) {
      const clearDuplicate = choosenPreferences.filter((x) => x !== item)
      setChoosenPreferences(clearDuplicate)
    }
    if (!duplicate && choosenPreferences.length < 3) {
      setChoosenPreferences((prev) => [...prev, item])
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
      <div className="grid gap-4">
        <div className="px-2">
          <h1
            className={`text-center text-2xl md:text-3xl font-bold ${
              screenHeight < 750 ? 'text-xl' : ''
            }`}
          >
            {t('preferencesQuestion')}
          </h1>
        </div>
        <p
          className={`text-center text-sm md:text-base opacity-70 ${
            screenHeight < 750 ? 'text-xs' : ''
          }`}
        >
          {t('choosePreferences')}
        </p>
      </div>
      {/* topic based on info given */}
      <div className="gap-4 grid w-full py-4 md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <h1
          className={`text-center font-bold ${
            screenHeight < 750 ? 'text-lg' : 'text-xl md:text-2xl'
          }`}
        >
          {t('preferencesForYou')}
        </h1>
        <div className="flex overflow-x-auto w-full gap-4">
          {personalizedPreferences?.map((item) => (
            <button
              onClick={() => handleSelect(item)}
              key={item}
              className={`border hover:bg-slate-100 shadow-sm rounded-full size-24 aspect-square ${
                screenHeight < 750 ? 'text-lg py-4 px-4' : 'text-xl md:text-2xl'
              }`}
              style={{
                outline: choosenPreferences.includes(item)
                  ? '2px solid grey'
                  : '',
                scale: choosenPreferences.includes(item) ? '105%' : '100%',
              }}
            >
              {t(`${item}`)}
            </button>
          ))}
        </div>
      </div>
      {/* other topics */}
      <div className="gap-4 grid w-full py-4 md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          {t('otherTopics')}
        </h1>
        {preferences?.map((item) => (
          <button
            onClick={() => handleSelect(item)}
            key={item}
            className="border text-xl md:text-2xl rounded-lg hover:bg-slate-100 px-4 py-4 shadow-sm transition-all duration-200 ease-in-out"
            style={{
              outline: choosenPreferences.includes(item)
                ? '2px solid grey'
                : '',
              scale: choosenPreferences.includes(item) ? '105%' : '100%',
            }}
          >
            {t(`${item}`)}
          </button>
        ))}
      </div>
      <div className="w-full mt-24 md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <button
          onClick={() => handleSubmit()}
          className={`border rounded-lg w-full text-center text-3xl py-4 flex items-center justify-center transition-all duration-200 ease-in-out bg-slate-50 ${
            choosenPreferences.length
              ? 'hover:bg-slate-100 shadow-md bg-white'
              : ''
          }`}
          disabled={!choosenPreferences.length ? true : false}
        >
          {t('next')}
        </button>
      </div>
    </motion.main>
  )
}
