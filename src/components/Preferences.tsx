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
  const [preferences, setPreferences] = useState<[string, string][]>([
    ['preference1', '🐺'],
    ['preference2', '💃'],
    ['preference3', '🥰'],
    ['preference4', '💁‍♀️'],
    ['preference5', '👑'],
    ['preference6', '🤑'],
    ['preference7', '🤠'],
    ['preference8', '🏫'],
    ['preference9', '🤧'],
    ['preference10', '😈'],
  ])
  const [emojis, setEmojis] = useState<string[]>(['🐺', '💃', '🥰', '💁‍♀️', '👑', '🤑', '🤠', '🏫', '🤧', '😈'])
  const [choosenPreferences, setChoosenPreferences] = useState<string[]>(globalState.answers.preferences || [])
  const [personalizedPreferences, setPersonalizedPreferences] = useState<[string, string][]>([])
  const navigate = useNavigate()
  const { screenHeight } = useOutletContext<OutletContextType>()
  console.log(choosenPreferences)

  // restfull implementation. if used, add loading and error state
  useEffect(() => {
    const getPreferences = async () => {
      try {
        const response = await axios.post<ResponseData>(`${PREFERENCES_ENDPOINT}`, {
          gender: globalState.answers.gender,
          age: globalState.answers.age,
        })
        console.log(response)
      } catch (err) {
        console.error(err)
      }
    }
    getPreferences()
  }, [])

  // get personalized preferences
  useEffect(() => {
    const generatePersonalizedPreferences = () => {
      let indices = []
      if (globalState.answers.gender !== 'Other') {
        indices =
          globalState.answers.gender === 'Male' ? FOR_MAN : globalState.answers.gender === 'Female' ? FOR_WOMEN : []
      } else {
        indices = globalState.answers.age === 'age1' ? FOR_YOUNG : POPULAR
      }

      const personalized = indices.map((index) => preferences[index]).filter(Boolean) as [string, string][]

      setPersonalizedPreferences(personalized)
      setPreferences((prevPreferences) =>
        prevPreferences.filter(([preference]) => !personalized.some(([personalized]) => personalized === preference))
      )
    }

    generatePersonalizedPreferences()
  }, [])

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
      const clearDuplicate = choosenPreferences.filter((selectedItem) => selectedItem !== item)
      setChoosenPreferences(clearDuplicate)
    } else if (!duplicate && choosenPreferences.length < 3) {
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
      className="w-full h-full flex flex-col items-center flex-grow justify-around"
    >
      <div className="w-full gap-2 flex flex-col items-center justify-center">
        <div className={`grid w-full px-8 mb-6 ${screenHeight < 750 ? 'gap-2' : 'gap-4'}`}>
          <div className="px-2">
            <h1 className={`text-center font-bold ${screenHeight < 750 ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
              {t('preferencesQuestion')}
            </h1>
          </div>
          <p className={`text-center opacity-70 ${screenHeight < 750 ? 'text-xs' : 'text-sm md:text-base'}`}>
            {t('choosePreferences')}
          </p>
        </div>
        {/* topic based on info given */}
        <div className={`grid w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 ${screenHeight < 750 ? 'gap-1' : 'gap-4'}`}>
          <h1 className={`text-center font-bold ${screenHeight < 750 ? 'text-lg' : 'text-xl md:text-2xl'}`}>
            {t('preferencesForYou')}
          </h1>
          <div className="flex overflow-x-auto w-full gap-4 py-4 items-center justify-center px-4">
            {personalizedPreferences?.map((item) => (
              <button
                onClick={() => handleSelect(item[0])}
                key={item[0]}
                className={`border hover:bg-slate-100 shadow-sm rounded-full aspect-square py-4 px-4 ${
                  screenHeight < 750 ? 'text-lg size-24' : 'text-xl md:text-2xl size-28'
                }`}
                style={{
                  outline: choosenPreferences.includes(item[0]) ? '2px solid grey' : '',
                  scale: choosenPreferences.includes(item[0]) ? '105%' : '100%',
                }}
              >
                <div className="text-center">
                  <h1 className="text-3xl">{item[1]}</h1>
                  <p className="text-xs truncate">{t(`${item[0]}`)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* other topics */}
        <div className={`grid w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 ${screenHeight < 750 ? 'gap-1' : 'gap-4'}`}>
          <h1 className={`text-center font-bold ${screenHeight < 750 ? 'text-lg' : 'text-xl md:text-2xl'}`}>
            {t('otherTopics')}
          </h1>
          <div className="flex overflow-x-auto w-full gap-4 py-4 items-center px-4">
            {preferences?.map((item) => (
              <button
                onClick={() => handleSelect(item[0])}
                key={item[0]}
                className={`border hover:bg-slate-100 shadow-sm rounded-full aspect-square py-4 px-4 ${
                  screenHeight < 750 ? 'text-lg size-24' : 'text-xl md:text-2xl size-28'
                }`}
                style={{
                  outline: choosenPreferences.includes(item[0]) ? '2px solid grey' : '',
                  scale: choosenPreferences.includes(item[0]) ? '105%' : '100%',
                }}
              >
                <div className="text-center">
                  <h1 className="text-3xl">{item[1]}</h1>
                  <p className="text-xs truncate">{t(`${item[0]}`)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5 px-8">
        <button
          onClick={() => handleSubmit()}
          className={`border rounded-lg w-full text-center flex items-center justify-center transition-all duration-200 ease-in-out ${
            choosenPreferences.length ? 'hover:bg-slate-100 shadow-md bg-white' : 'bg-slate-200'
          } ${screenHeight < 750 ? 'py-2.5 text-xl' : 'py-3 md:py-4 text-2xl md:text-3xl'}`}
          disabled={!choosenPreferences.length ? true : false}
        >
          {t('next')}
        </button>
      </div>
    </motion.main>
  )
}
