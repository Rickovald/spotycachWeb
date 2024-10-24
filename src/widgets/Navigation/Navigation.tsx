import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import s from './navigation.module.sass';
import { Profile } from 'shared/icons';

export const Navigation: FC = (): ReactElement => {
    return (
        <div className={s.root}>
            <div className={s.wrapper}>
                <NavLink className={s.link} to=''>Главная</NavLink>
                <NavLink className={s.link} to='about'>О нас</NavLink>
                <NavLink className={s.link} to='contacts'>Контакты</NavLink>
                {/* COMPONENT LINKS */}
                <NavLink className={s.link} to='rooms'>Комнаты</NavLink>
                <NavLink className={s.link} to='rental'>Аренда техники</NavLink>
                <NavLink className={s.profile} to='profile'>
                    <Profile className={s.profile_pic} />
                </NavLink>
            </div>
        </div>
    );
};