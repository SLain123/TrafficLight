export type StateType = {
    timer: null | number;
    prevLigthUrl: null | string;
    nextLigthUrl: null | string;
};

type ActionType = {
    type: string;
    time: number;
    prevUrl: string;
    nextUrl: string;
};

const initialState = {
    timer: null,
    prevLigthUrl: null,
    nextLigthUrl: null,
};

const ligthReducer = (
    state: StateType = initialState,
    action: ActionType,
): StateType => {
    switch (action.type) {
        case 'INCREACE_TIMER':
            return { ...state, timer: action.time };
        case 'SET_TIME':
            return {
                ...state,
                timer: action.time,
            };
        case 'CHANGE_PREV_LIGHT':
            return { ...state, prevLigthUrl: action.prevUrl };

        case 'CHANGE_NEXT_LIGHT': {
            return { ...state, nextLigthUrl: action.nextUrl };
        }

        default:
            return state;
    }
};

export default ligthReducer;
