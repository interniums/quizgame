import { Outlet, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'

export default function QuizPage() {
  const { globalState, setGlobalState } = useGlobalContext()
  const location = useLocation()

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {window.location.pathname !== '/quiz/loading' ? (
        <Header progress={globalState.progress} setGlobalState={setGlobalState} globalState={globalState} />
      ) : null}
      <Outlet key={location.pathname} />
    </div>
  )
}
