import { FC, ReactElement } from 'react';
import s from './main.module.sass';
import { News } from 'widgets/News';
import { Rooms } from 'widgets/Rooms';
import { Rental } from 'widgets/Rental';
import { Faq } from 'widgets/Faq';
import { Reviews } from 'widgets/Reviews';

export const Main: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            <News />
            <Rooms />
            <Rental />
            <Faq />
            <Reviews />
        </div>
    );
};