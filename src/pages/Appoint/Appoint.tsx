import { FC, ReactElement } from 'react';
import s from './appoint.module.sass';

interface IAppoint {

};

export const Appoint: FC<IAppoint> = (): ReactElement => {
    return (
        <div className = { s.appoint }>
            appoint
        </div>
    );
};