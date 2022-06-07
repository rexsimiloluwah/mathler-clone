export enum Types {
 // eslint-disable-next-line no-unused-vars
 SET_DIFFICULTY = 'SET_DIFFICULTY',
}

//@ts-ignore
export const gameReducer = (state, action) => {
 switch (action.type) {
  case Types.SET_DIFFICULTY:
   localStorage.setItem('mode', action.payload.mode)
   return {
    ...state,
    difficulty: action.payload,
   }

  default:
   return state
 }
}
