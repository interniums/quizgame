import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import Header from '../components/Header'

type OutletContextType = {
  screenHeight: number
}

export default function QuizPage() {
  const { globalState, setGlobalState } = useGlobalContext()
  const location = useLocation()
  const { screenHeight } = useOutletContext<OutletContextType>()

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen flex flex-col">
      {window.location.pathname !== '/quiz/loading' ? (
        <Header
          progress={globalState.progress}
          setGlobalState={setGlobalState}
          globalState={globalState}
        />
      ) : null}
      <Outlet
        key={location.pathname}
        context={{ screenHeight: screenHeight }}
      />
    </div>
  )
}
