
export const ACTION = {
    CREATE_TEXT : 'CREATE_TEXT',
    CHANGE_TEXT : 'CHANGE_TEXT',
    REPEAT_TEXT : 'REPEAT_TEXT',
    BACKSPACE : 'BACKSPACE',
    ADD_CORRECT : 'ADD_CORRECT',
    ADD_INCORRECT : 'ADD_INCORRECT'
}


export default function reducer(state, { type, payload }){
    switch(type){
        case ACTION.CREATE_TEXT:
            return {
                typed: [], 
                text: payload, 
                change: false, 
                isFirstWord: false, 
            }
        case ACTION.CHANGE_TEXT:
            return {
                typed: [],
                text: '',
                change: true, 
                isFirstWord: false, 
            }
        case ACTION.REPEAT_TEXT:
            return {
                typed: [],
                text: state.text,
                change: false, 
                isFirstWord: false, 
            }
        case ACTION.BACKSPACE:
            return {
                typed: [...state.typed.slice(0, state.typed.length - 1)],
                text: state.text,
                change: false, 
                isFirstWord: true, 
            }
        case ACTION.ADD_CORRECT:
            return {
                typed: [...state.typed , payload],
                text: state.text,
                change: false, 
                isFirstWord: true, 
            }
        case ACTION.ADD_INCORRECT:
            return {
                typed: [...state.typed , payload],
                text: state.text,
                change: false, 
                isFirstWord: true, 
            }
        default :
            return state
    }
}