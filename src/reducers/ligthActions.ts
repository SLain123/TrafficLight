type SetTimeType = {
    type: string;
    time: number;
};

type ChangeLightType = {
    type: string;
    nextUrl: string;
    time: number;
    direction?: boolean;
};

type SetCurrentLightType = {
    type: string;
    prevUrl: string;
};

const lightActions = {
    setTime: (time: number): SetTimeType => ({
        type: 'SET_TIME',
        time,
    }),

    changeLight: (
        nextUrl: string,
        time: number,
        direction?: boolean,
    ): ChangeLightType => ({
        type: 'CHANGE_LIGHT',
        nextUrl,
        time,
        direction,
    }),

    setCurrentLight: (prevUrl: string): SetCurrentLightType => ({
        type: 'SET_CURRENT_LIGTH',
        prevUrl,
    }),
};

export default lightActions;
