import { FC, ReactElement } from 'react';
import s from './rental.module.sass';

interface IRental {

};

export const Rental: FC<IRental> = (): ReactElement => {
    return (
        <div className = { s.rental }>
            rental
        </div>
    );
};