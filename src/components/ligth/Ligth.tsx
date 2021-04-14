import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import lightActions from '../../reducers/ligthActions';

import { match, Redirect } from 'react-router';
import { RootState } from '../../store';

import green from './green.jpg';
import yellow from './yellow.jpg';
import red from './red.jpg';
import empty from './empty.jpg';

import classes from './light.module.scss';

type PropTypes = {
    match: match;
    baseTime: number;
};

const Light: React.FC<PropTypes> = ({ match, baseTime }) => {
    const dispatch = useDispatch();

    const { url }: { url: string } = match;

    const prevLigth: string | null = useSelector(
        (state: RootState) => state.prevLigthUrl,
    );
    const nextLigthUrl: string | null = useSelector(
        (state: RootState) => state.nextLigthUrl,
    );
    const directionController: boolean | null = useSelector(
        (state: RootState) => state.directionController,
    );
    const time: number | null = useSelector((state: RootState) => state.time);

    let imageSrc = empty;

    if (url === '/red') {
        imageSrc = red;
    }
    if (url === '/yellow') {
        imageSrc = yellow;
    }
    if (url === '/green') {
        imageSrc = green;
    }
    if (
        ((time as number) < 3 && (time as number) > 2.5) ||
        ((time as number) < 2 && (time as number) > 1.5) ||
        ((time as number) < 1 && (time as number) > 0.5)
    ) {
        imageSrc = empty;
    }

    if (prevLigth !== url) {
        dispatch(lightActions.setCurrentLight(url));
    }

    useEffect(() => {
        const mainTimer = setInterval(() => {
            if (time === null) {
                dispatch(lightActions.setTime(baseTime));
            } else if (time > 0) {
                dispatch(lightActions.setTime(+(time - 0.1).toFixed(1)));
            } else {
                if (prevLigth === '/green') {
                    dispatch(lightActions.changeLight('/yellow', 3, true));
                }
                if (prevLigth === '/red') {
                    dispatch(lightActions.changeLight('/yellow', 3, false));
                }
                if (prevLigth === '/yellow' && !directionController) {
                    dispatch(lightActions.changeLight('/green', 15, true));
                }
                if (prevLigth === '/yellow' && directionController) {
                    dispatch(lightActions.changeLight('/red', 10, false));
                }
            }
        }, 100);

        return () => clearInterval(mainTimer);
    });

    if (
        prevLigth === url &&
        nextLigthUrl !== url &&
        prevLigth !== null &&
        nextLigthUrl !== null
    ) {
        return <Redirect to={`${nextLigthUrl}`} />;
    }

    return (
        <div className={classes.light}>
            <img
                src={imageSrc}
                alt='traffic-light'
                className={classes.lightPic}
            />
        </div>
    );
};

export default Light;
