import { FC, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import s from './navigation.module.sass';
import { Profile } from 'shared/icons';
import { useModal } from 'features/Contexts/ModalContext';
import { AUTH_MODAL } from 'shared/types';
import { jwtDecode } from 'jwt-decode';

export const Navigation: FC = (): ReactElement => {
    const { openModal } = useModal();

    const user = localStorage.getItem('accessToken');
    if (user) {
        console.log((jwtDecode(user)));
    }
    return (
        <div className={s.root}>
            <div className={s.wrapper}>
                <NavLink className={s.link} to=''>Главная</NavLink>
                <NavLink className={s.link} to='about'>О нас</NavLink>
                <NavLink className={s.link} to='contacts'>Контакты</NavLink>
                {/* COMPONENT LINKS */}
                <NavLink className={s.link} to='rooms'>Комнаты</NavLink>
                <NavLink className={s.link} to='rental'>Аренда техники</NavLink>
                {
                    user
                        ? <NavLink className={s.profile} to='profile'>
                            <Profile className={s.profile_pic} />
                        </NavLink>
                        : <div className={s.profile}
                            onClick={() => openModal(AUTH_MODAL)}>
                            Войти
                        </div>
                }
            </div>
        </div>
    );
};