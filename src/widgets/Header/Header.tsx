import { FC, ReactElement } from 'react';
import s from './header.module.sass';
import { Navigation } from 'widgets/Navigation';

interface IHeader {

};

export const Header: FC<IHeader> = (): ReactElement => {
    return (
        <div className={s.head}>
            <div className={s.upper}>
                <img className={s.upper__logo} src="/media/headLogo.jpg" alt="" />
                <div className={s.upper__feats}>
                    <p className={s.upper__feat}>Реп база</p>
                    <p className={s.upper__feat}>Звукозапись</p>
                    <p className={s.upper__feat}>Прокат</p>
                </div>
            </div>
            <Navigation />
        </div>
    );
};