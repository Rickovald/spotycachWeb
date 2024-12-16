import { FC, ReactElement, useEffect, useState } from 'react';
import s from './profile.module.sass';
import { Button } from 'shared/Button';
import { api } from 'entities/api';
import { jwtDecode } from 'jwt-decode';

interface IProfile {

};

interface Group {
    id: string;
    name: string;
}
interface User {
    avatar: string;
    email: string;
    exp: number;
    group: Group[];
    iat: number;
    phone: string;
    role: string;
    userId: string;
    userName: string;
}

export const Profile: FC<IProfile> = (): ReactElement => {
    const [error, setError] = useState('');
    const [user, setUser] = useState<User | null>(null);

    const userToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (userToken) {
            setUser(jwtDecode(userToken));
            console.log(user);
        }
    }, [userToken]);

    const handleLogout = async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const response = await api.post('/auth/logout')
            .then((response) => {
                console.log(response);
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
    if (!user) return <div className={s.profile}>error: no user</div>;
    return (
        <div className={s.profile}>
            {user?.role}
            <Button type='primary' onClick={handleLogout}>
                <div className={s.logout}>Выйти</div>
            </Button>
            <div className={s.error}>{error}</div>
        </div>
    );
};