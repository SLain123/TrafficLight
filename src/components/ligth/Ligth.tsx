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

    useEffect(() => {
        dispatch(lightActions.changePrevLight(url));

        const activeTimer = setInterval(() => {
            if (prevLigth === '/green') {
                dispatch(lightActions.changeNextLightUrl('/red'));
            }
            if (prevLigth === '/red') {
                dispatch(lightActions.changeNextLightUrl('/green'));
            }
        }, baseTime);

        return () => {
            clearInterval(activeTimer);

            console.log('unmount');
        };
    });

    if (
        prevLigth === url &&
        nextLigthUrl !== url &&
        prevLigth !== null &&
        nextLigthUrl !== null
    ) {
        console.log('redirect');
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
