import { FC, ReactElement, ReactNode } from 'react';
import s from './button.module.sass';

interface IButton {
    type: number;
    children?: ReactNode;
};
export const Button: FC<IButton> = ({ type, children }): ReactElement => {
    return (
        <div className={s.button}>
            {children}
        </div>
    );
};