import { GlobalState } from '../context/GlobalContext'
import leftArrow from '../assets/images/left-arrow.svg'
import { useOutletContext } from 'react-router-dom'

interface HeaderProps {
  progress: number
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>
  globalState: GlobalState
}

type OutletContextType = {
  screenHeight: number
}

const Header: React.FC<HeaderProps> = ({
  progress,
  globalState,
  setGlobalState,
}: HeaderProps) => {
  const { screenHeight } = useOutletContext<OutletContextType>()

  return (
    <header className="px-8 pt-6 flex items-center justify-center">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-2/4 2xl:w-2/5">
        <div className="mb-3 flex items-center w-full">
          <button
            disabled={progress <= 0 ? true : false}
            className="rounded-md hover:bg-slate-100 text-lg transition-all duration-700 ease-in-out"
            style={{ opacity: progress > 0 ? '100%' : '0%' }}
            onClick={() => {
              setGlobalState((prev) => ({ ...prev, progress: progress - 1 }))
            }}
          >
            <img
              src={leftArrow}
              alt="back"
              className={`mr-1 ${
                screenHeight < 700 ? 'size-10' : 'size-12 md:size-14'
              }`}
            />
          </button>
          <div
            className={`flex-1 text-center text-xl md:text-2xl mr-12 font-bold ${
              screenHeight < 700 ? 'text-lg' : ''
            }`}
          >
            <span
              className={`transition-all duration-700 ease-in-out ${
                progress !== 4 ? 'text-slate-500' : 'text-black'
              }`}
            >
              {progress + 1}
            </span>{' '}
            / <span>{globalState.paths.length}</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div
            className={`w-full h-3 md:h-4 bg-slate-400 rounded-full grid grid-cols-5 overflow-hidden ${
              screenHeight < 700 ? 'h-2' : ''
            }`}
          >
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-full transition-all duration-700 ease-in-out ${
                  progress >= level ? 'bg-black' : 'bg-slate-400'
                } ${level === 0 ? 'rounded-l-full' : ''} ${
                  level === 4 ? 'rounded-r-full' : ''
                }`}
                style={{
                  width: `${progress >= level ? 100 : 0}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
