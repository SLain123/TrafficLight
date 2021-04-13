type SetTimeType = {
    type: string;
    time: number;
};

type SetLightType = {
    type: string;
    prevUrl: string;
};

type SetRedirectType = {
    type: string;
    nextUrl: string;
};

const lightActions = {
    setTime: (time: number): SetTimeType => ({
        type: 'SET_TIME',
        time,
    }),

    increaceTimer: (time: number): SetTimeType => ({
        type: 'INCREACE_TIMER',
        time,
    }),

    changePrevLight: (prevUrl: string): SetLightType => ({
        type: 'CHANGE_PREV_LIGHT',
        prevUrl,
    }),

    changeNextLightUrl: (nextUrl: string): SetRedirectType => ({
        type: 'CHANGE_NEXT_LIGHT',
        nextUrl,
    }),
};

export default lightActions;
