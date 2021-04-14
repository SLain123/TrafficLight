import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';

import classes from './timer.module.scss';

const Timer: React.FC = () => {
    const time = useSelector((state: RootState) => state.time);

    if (time === 0) {
        return (
            <div className={classes.timerBlock}>
                <span>Change</span>
            </div>
        );
    }

    if (time !== null) {
        return (
            <div className={classes.timerBlock}>
                <span>{time.toFixed(0)}</span>
            </div>
        );
    }

    return null;
};

export default Timer;
