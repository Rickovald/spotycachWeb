import { FC, ReactElement, useState } from 'react';
import s from './auth.module.sass';
// import { useMutation } from '@tanstack/react-query';
import { api } from 'entities/api';
import { jwtDecode } from 'jwt-decode';
// import { usePostQuery } from 'shared/hooks/useQuery';
// import { ILoginData } from 'shared/interfaces';

interface IAuth {

};

export const Auth: FC<IAuth> = (): ReactElement => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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

    const handleLogin = async () => {
        const data = { email, password };
        if (!data.email || !data.password) {
            setError('Поля не должны быть пустыми');
            return;
        }
        const response = await api.post('/auth/login', data)
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

        console.log(response);
        // const response = await api.post('http://localhost:5001/auth/login', data);
    };
    return (
        <div className={s.auth}>
            {!!error && <span>{error}</span>}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin} type="submit">Login</button>
        </div>
    );
};