import { FC, ReactElement, useEffect, useState } from 'react';
import s from './auth.module.sass';
// import { useMutation } from '@tanstack/react-query';
import { api } from 'entities/api';
import { jwtDecode } from 'jwt-decode';
import Portal, { createContainer } from 'app/Portal';
import { useModal } from 'features/Contexts/ModalContext';
import { AUTH_MODAL, REG_MODAL } from 'shared/types';
// import { usePostQuery } from 'shared/hooks/useQuery';
// import { ILoginData } from 'shared/interfaces';

interface IAuth {

};

const MODAL_CONTAINER_ID = AUTH_MODAL;
export const Auth: FC<IAuth> = (): ReactElement | null => {
    const [isMounted, setMounted] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { openId, closeModal, openModal } = useModal<IAuth>(); // Используйте дженерик T

    // mutateAsync
    // const mutation = useMutation({
    //     mutationFn: async (data: { email: string; password: string; }) => {
    //         try {
    //             console.log('Making request to /auth/login with data:', data);
    //             // const response = await api.post('http://localhost:5001/auth/login', data);
    //         } catch (error) {
    //             console.error('Error making request:', error);
    //             throw error;
    //         }
    //     }
    // });

    const handleOpenReg = async () => {
        openModal(REG_MODAL);
        // const response = await api.post('http://localhost:5001/auth/login', data);
    };

    const handleLogin = async () => {
        const data = { email, password };
        if (!data.email || !data.password) {
            setError('Поля не должны быть пустыми');
            return;
        }
        await api.post('/auth/login', data)
            .then((response) => {
                console.log(jwtDecode(response.data.accessToken));
                console.log(jwtDecode(response.data.refreshToken));
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }).catch((error) => {
                // try to fix the error or
                // notify the users about somenthing went wrong
                if (error.status === 401) {
                    setError('Invalid email or password');
                } else {
                    setError('Something went wrong');
                }
                setError(error.status);
                console.log(error);
            });

        // const response = await api.post('http://localhost:5001/auth/login', data);
    };

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);
    return (
        isMounted
            ? (<Portal id={MODAL_CONTAINER_ID} closeModal={closeModal}>
                <div
                    className={
                        openId !== AUTH_MODAL
                            ? `${s.auth} ${s.inactive_op}`
                            : s.auth
                    } onClick={closeModal}
                >
                    <div className={
                        openId !== AUTH_MODAL
                            ? `${s.content} ${s.inactive}`
                            : s.content
                    } onClick={e => e.stopPropagation()}>
                        {!!error && <span>{error}</span>}
                        <input className={s.input} type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email или телефон" />
                        <input className={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />

                        <button className={s.button} onClick={handleLogin} type="submit">Вход</button>
                        <p className={s.toreg}>
                            Нет аккаунта? -
                            <span onClick={handleOpenReg}> Регистрация</span>
                        </p>
                    </div>
                </div>
            </Portal>)
            : null
    );
};