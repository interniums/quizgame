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
import HateObjects from './components/HateObjects'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'quiz',
        element: <QuizPage />,
        errorElement: <ErrorPage />,
        children: [
          { path: 'language', element: <Language /> },
          { path: 'gender', element: <Gender /> },
          { path: 'age', element: <Age /> },
          { path: 'hate-objects', element: <HateObjects /> },
          { path: 'preferences', element: <Preferences /> },
          { path: 'loading', element: <QuizLoading /> },
        ],
      },
      { path: 'email', element: <EmailPage />, errorElement: <ErrorPage /> },
      { path: 'result', element: <ResultPage />, errorElement: <ErrorPage /> },
    ],
  },
]
