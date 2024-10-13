import { FC, ReactElement } from 'react';
import s from './rental.module.sass';

interface IRental {

};

export const Rental: FC<IRental> = (): ReactElement => {
    return (
        <div className={s.rental}>
            <h2 className={s.title}>Аренда</h2>
            <div className={s.content}>
                <div className={s.card}>
                    Гитары
                </div>
                <div className={s.card}>
                    Барабаны
                </div>
                <div className={s.card}>
                    Звук
                </div>
                <div className={s.card}>
                    Коммутация
                </div>
                <div className={s.card}>
                    Комплекты
                </div>
            </div>
        </div>
    );
};