import { RouteObject } from 'react-router-dom'
import QuizPage from './pages/QuizPage'
import Language from './components/Language'
import Gender from './components/Gender'
import Age from './components/Age'
import QuizLoading from './components/QuizLoading'
import ResultPage from './pages/ResultPage'
import EmailPage from './pages/EmailPage'
import ErrorPage from './pages/ErrorPage'
import Preferences from './components/Preferences'
import App from './App'
import Hate from './components/Hate'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/quiz',
        element: <QuizPage />,
        children: [
          { path: '/quiz/language', element: <Language /> },
          { path: '/quiz/gender', element: <Gender /> },
          { path: '/quiz/age', element: <Age /> },
          { path: '/quiz/hate', element: <Hate /> },
          { path: '/quiz/preferences', element: <Preferences /> },
          { path: '/quiz/loading', element: <QuizLoading /> },
        ],
      },
      { path: '/email', element: <EmailPage /> },
      { path: '/result', element: <ResultPage /> },
    ],
  },
]
