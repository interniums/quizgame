import leftArrow from '../assets/images/left-arrow.svg'

interface HeaderProps {
  progress: number
  pageCount: number
}

const Header: React.FC<HeaderProps> = ({ progress, pageCount }) => {
  return (
    <header className="px-8 py-4">
      <div className="mb-3 flex items-center w-full">
        <button
          className="rounded-md hover:bg-slate-100 text-lg transition-all duration-700 ease-in-out"
          style={{ opacity: progress > 1 ? '100%' : '0%' }}
          onClick={() => {}}
        >
          <img src={leftArrow} alt="back" className="size-14 mr-1" />
        </button>
        <div className="flex-1 text-center text-2xl mr-12 font-bold">
          <span
            className={`transition-all duration-700 ease-in-out ${progress !== 5 ? 'text-slate-500' : 'text-black'}`}
          >
            {progress}
          </span>{' '}
          / <span>{pageCount}</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-full h-4 bg-slate-400 rounded-full grid grid-cols-5 overflow-hidden">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-full transition-all duration-700 ease-in-out ${
                progress >= level ? 'bg-black' : 'bg-slate-400'
              } ${level === 1 ? 'rounded-l-full' : ''} ${level === 5 ? 'rounded-r-full' : ''}`}
              style={{
                width: `${progress >= level ? 100 : 0}%`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
