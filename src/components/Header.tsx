import { GlobalState } from '../context/GlobalContext'
import leftArrow from '../assets/images/left-arrow.svg'

interface HeaderProps {
  progress: number
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>
  globalState: GlobalState
}

const Header: React.FC<HeaderProps> = ({ progress, globalState, setGlobalState }: HeaderProps) => {
  return (
    <header className="px-8 py-4 flex items-center justify-center ">
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
            <img src={leftArrow} alt="back" className="size-14 mr-1" />
          </button>
          <div className="flex-1 text-center text-2xl mr-12 font-bold">
            <span
              className={`transition-all duration-700 ease-in-out ${progress !== 4 ? 'text-slate-500' : 'text-black'}`}
            >
              {progress + 1}
            </span>{' '}
            / <span>{globalState.paths.length}</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-full h-4 bg-slate-400 rounded-full grid grid-cols-5 overflow-hidden">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-full transition-all duration-700 ease-in-out ${
                  progress >= level ? 'bg-black' : 'bg-slate-400'
                } ${level === 0 ? 'rounded-l-full' : ''} ${level === 4 ? 'rounded-r-full' : ''}`}
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
