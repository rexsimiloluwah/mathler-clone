//@ts-ignore
export const gameReducer = (state,action) => {
    switch(action.type){
        case 'SET_DIFFICULTY':
            localStorage.setItem("mode",action.payload.mode);
            return {
                ...state,
                difficulty: action.payload
            }
        
        default: 
            return state;
    }
}