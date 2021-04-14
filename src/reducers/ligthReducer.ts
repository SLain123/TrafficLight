export type StateType = {
    time: null | number;
    prevLigthUrl: null | string;
    nextLigthUrl: null | string;
    directionController: boolean;
};

type ActionType = {
    type: string;
    time: number;
    prevUrl: string;
    nextUrl: string;
    direction: boolean;
};

const initialState = {
    time: null,
    prevLigthUrl: null,
    nextLigthUrl: null,
    directionController: false,
};

const ligthReducer = (
    state: StateType = initialState,
    action: ActionType,
): StateType => {
    switch (action.type) {
        case 'SET_TIME':
            return {
                ...state,
                time: action.time,
            };
        case 'CHANGE_LIGHT': {
            return {
                ...state,
                nextLigthUrl: action.nextUrl,
                time: action.time,
                directionController: action.direction,
            };
        }
        case 'SET_CURRENT_LIGTH': {
            return { ...state, prevLigthUrl: action.prevUrl };
        }

        default:
            return state;
    }
};

export default ligthReducer;
