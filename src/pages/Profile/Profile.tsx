import { FC, ReactElement, useState } from 'react';
import s from './profile.module.sass';
import { Button } from 'shared/Button';
import { api } from 'entities/api';

interface IProfile {

};

export const Profile: FC<IProfile> = (): ReactElement => {
    const [error, setError] = useState('');
    const handleLogout = async () => {
        const response = await api.post('/auth/logout')
            .then((response) => {
                console.log(response);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }).catch((error) => {
                if (error.status === 401) {
                    setError('Invalid email or password');
                } else {
                    setError('Something went wrong');
                }
                setError(error.status);
                console.log(error);
            });

        console.log(response);
        // const response = await api.post('http://localhost:5001/auth/login', data);
    };
    return (
        <div className={s.profile}>
            <Button type='primary' onClick={handleLogout}>
                <div className={s.logout}>Выйти</div>
            </Button>
            <div className={s.error}>{error}</div>
        </div>
    );
};