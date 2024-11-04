import { FC, ReactElement, ReactNode } from 'react';
import s from './button.module.sass';

type ButtonType = 'secondary' | 'primary';
interface IButton {
    type: ButtonType;
    children?: ReactNode;
    onClick?: () => void;
    className?: string;
};
export const Button: FC<IButton> = ({ className, type, children, onClick }): ReactElement => {
    return (
        <div
            className={`${s.button} ${s[`button_${type}`]} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};