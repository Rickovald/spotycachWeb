import { FC, ReactElement } from 'react';
import s from './appoint.module.sass';

interface IAppoint {
    isActive: boolean;
    onClose: () => void;
};
export const Appoint: FC<IAppoint> = (): ReactElement => {
    return (
        <div className={s.modal}>
        </div>
    );
};