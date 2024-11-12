import { createContext, ReactNode, useContext, useState } from 'react'

export interface GlobalState {
  paths: string[]
  progress: number
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
    paths: ['/quiz/language', '/quiz/gender', '/quiz/age', '/quiz/hate-objects', '/quiz/preferences'],
    progress: 0,
    answers: {
      language: '',
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
