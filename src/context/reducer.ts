export enum GameTypes {
 SET_DIFFICULTY = 'SET_DIFFICULTY',
}

//@ts-ignore
export const gameReducer = (state, action) => {
 switch (action.type) {
  case GameTypes.SET_DIFFICULTY:
   localStorage.setItem('mode', action.payload.mode)
   return {
    ...state,
    difficulty: action.payload,
   }

  default:
   return state
 }
}
