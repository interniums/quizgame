import { useEffect } from 'react'
import { GlobalState, useGlobalContext } from './context/GlobalContext'
import { Outlet, useNavigate } from 'react-router-dom'

function App() {
  // set local storage
  // set global context
  // set app state based on global context
  const { globalState, setGlobalState } = useGlobalContext()
  const navigate = useNavigate()
  console.log(globalState)

  // checking if local storage exists, if so, setting globalState based on local storage data; if don't, setting local storage to globalState hardcoded default data
  useEffect(() => {
    const data = localStorage.getItem('data')
    if (!data) {
      localStorage.setItem('data', JSON.stringify(globalState))
      return
    }
    const parsedData: GlobalState = JSON.parse(data)
    setGlobalState(parsedData)
  }, [])

  // updating local storage whenever globalState changing and update routes
  useEffect(() => {
    if (globalState) {
      console.log(globalState.answers.language)
      localStorage.setItem('data', JSON.stringify(globalState))
      navigate(globalState.path)
    }
  }, [globalState])

  return <Outlet />
}

export default App
