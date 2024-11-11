import { Outlet, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from '../components/Header'

export default function QuizPage() {
  const { globalState } = useGlobalContext()
  const pageCount = globalState.pageCount || 0
  const location = useLocation()
  const [progress, setProgress] = useState<number>(globalState.progress || 0)

  // updating progress bar when globalState.progress updating
  useEffect(() => {
    setProgress(globalState.progress)
  }, [globalState])

  return (
    <>
      <Header progress={progress} pageCount={pageCount} />
      <AnimatePresence>
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </>
  )
}
