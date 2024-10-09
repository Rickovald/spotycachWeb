import { FC, ReactElement } from 'react';
import s from './main.module.sass';
import { News } from 'widgets/News';

export const Main: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            <News />
        </div>
    );
};