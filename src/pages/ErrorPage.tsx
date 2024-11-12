import { useNavigate, useRouteError } from 'react-router-dom'
import errorImage from '../assets/gifs/404 image.webp'

interface RouteError {
  statusText?: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError
  const navigate = useNavigate()

  return (
    <div className="absolute inset-0 flex items-start justify-center">
      <div className="px-8 h-full py-20 grid">
        <div>
          <h1 className="text-center text-4xl font-bold mb-2">Whoops!</h1>
          <h1 className="text-center text-2xl">Someone screwed up, let's get away quickly</h1>
          <img src={errorImage} alt="error image" className="mt-4 rounded-md" />
          <div className="w-full flex items-center justify-center mt-4">
            <button
              onClick={() => {
                navigate('/')
              }}
              className="border rounded-md py-2 hover:bg-slate-100 w-full text-2xl font-bold animate-pulse"
            >
              Back
            </button>
          </div>
        </div>
        <div className="flex justify-center items-end w-full">
          <p className="text-center muted text-slate-500">
            {error.statusText || error.message || 'An unexpected error occurred.'}
          </p>
        </div>
      </div>
    </div>
  )
}
