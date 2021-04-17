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

interface IPropTypes {
    match: match;
    baseTime: number;
};

const Light: React.FC<IPropTypes> = ({ match, baseTime }) => {
    const dispatch = useDispatch();
    const { url }: { url: string } = match;

    // Selectors;
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

    // LS;
    const saveTime: string | null = JSON.parse(
        localStorage.getItem('time') as string,
    );
    const saveLight: string | null = JSON.parse(
        localStorage.getItem('light') as string,
    );
    const saveDirection: string | null = JSON.parse(
        localStorage.getItem('direction') as string,
    );

    // Присвоение картинки цвета светофора в зависимости от текущего url;

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
    // Присвоение выключенного сигнала светофора для эффекти мигания;
    if (time) {
        if (
            (time < 3 && time > 2.5) ||
            (time < 2 && time > 1.5) ||
            (time < 1 && time > 0.5)
        ) {
            imageSrc = empty;
        }
    }

    // Присвоение текущего url в состояние prevLigth сразу после перехода на новую страницу;

    if (prevLigth !== url) {
        dispatch(lightActions.setCurrentLight(url));
    }

    // Основной таймер;

    useEffect(() => {
        const mainTimer = setInterval(() => {
            // Присвоение таймеру базового времени при первом входе на страницу, вариативно либо стабильная база, либо значение из LocalStorage;
            if (time === null) {
                if (
                    saveTime !== null &&
                    saveLight !== null &&
                    saveLight === url
                ) {
                    dispatch(lightActions.setTime(+saveTime));
                    dispatch(
                        lightActions.changeDirection(Boolean(saveDirection)),
                    );
                } else {
                    dispatch(lightActions.setTime(baseTime));
                }

                // Таймер, диспатчит текущее значение в стор и localStorage;
            } else if (time > 0) {
                dispatch(lightActions.setTime(+(time - 0.1).toFixed(1)));
                localStorage.setItem('time', JSON.stringify(time));
                localStorage.setItem('light', JSON.stringify(url));
                localStorage.setItem(
                    'direction',
                    JSON.stringify(directionController),
                );

                // Алгоритм назначающий необходимые параметры для последющего редиректа, диспатчит в стор путь для перехода, время таймера и маршрут;
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

    // Выполнение редиректа после присвоения nextLigthUrl свежего значения;

    if (prevLigth === url && nextLigthUrl !== url && nextLigthUrl !== null) {
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
