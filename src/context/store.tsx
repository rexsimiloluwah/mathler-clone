import { IDifficulty, DIFFICULTY } from '../constants'
import React, { createContext, useReducer } from 'react'
import { gameReducer } from './reducer'

export type InitialStateType = {
 difficulty: IDifficulty
}

export interface IAppProviderProps {
 children?: React.ReactNode
}

const initialState = {
 difficulty: DIFFICULTY[0],
}

export const AppContext = createContext<{
 state: InitialStateType
 dispatch: React.Dispatch<any>
}>({
 state: initialState,
 dispatch: () => null,
})

export const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
 const [state, dispatch] = useReducer(gameReducer, initialState)

 return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
