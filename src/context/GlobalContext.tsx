import { createContext, ReactNode, useContext, useState } from 'react'
const PAGE_COUNT = 5

export interface GlobalState {
  path: string
  progress: number
  pageCount: number
  answers: {
    language: string
    gender: string
    age: string
    hate: string[]
    preferences: string[]
    email: string
  }
}

interface GlobalContextType {
  globalState: GlobalState
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

interface GlobalProviderProps {
  children: ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    path: '/quiz/language',
    progress: 1,
    pageCount: PAGE_COUNT,
    answers: {
      language: 'English',
      gender: '',
      age: '',
      hate: [],
      preferences: [],
      email: '',
    },
  })

  return <GlobalContext.Provider value={{ globalState, setGlobalState }}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }

  return context
}
