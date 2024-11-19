import { useEffect, useState } from 'react'
import { GlobalState, useGlobalContext } from './context/GlobalContext'
import { Outlet, useNavigate } from 'react-router-dom'
import i18n from 'i18next'

type Language = 'English' | 'French' | 'German' | 'Spanish'
const langMap: Record<Language, string> = {
  English: 'en',
  French: 'fr',
  German: 'de',
  Spanish: 'es',
}

function App() {
  const { globalState, setGlobalState } = useGlobalContext()
  const navigate = useNavigate()
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)
  console.log(globalState)
  const [language, setLanguage] = useState(globalState?.answers?.language as Language)

  useEffect(() => {
    if (globalState?.answers?.language) {
      setLanguage(globalState.answers.language as Language)
    }
  }, [globalState?.answers?.language])

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // checking if local storage exists, if so, setting globalState based on local storage data; if don't, setting local storage to globalState hardcoded default data
  useEffect(() => {
    const data = localStorage.getItem('data')
    if (!data) {
      localStorage.setItem('data', JSON.stringify(globalState))
    } else {
      const parsedData: GlobalState = JSON.parse(data)
      console.log(parsedData)
      setGlobalState(parsedData)
    }
  }, [])

  // updating local storage whenever globalState changing
  useEffect(() => {
    if (globalState) {
      localStorage.setItem('data', JSON.stringify(globalState))
    }
  }, [globalState])

  useEffect(() => {
    if (langMap[language]) {
      i18n.changeLanguage(langMap[language])
    }
  }, [language])

  // updating app path
  useEffect(() => {
    const nextPath = globalState.paths[globalState.progress]
    if (nextPath && nextPath !== window.location.pathname) {
      navigate(nextPath)
    }
    if (globalState.answers.preferences.length) {
      navigate('/email')
    }
    if (globalState.answers.email.length) {
      navigate('/result')
    }
  }, [globalState.progress, navigate])

  return <Outlet context={{ screenHeight: screenHeight }} />
}

export default App
