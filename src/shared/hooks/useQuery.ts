import { useQuery } from '@tanstack/react-query';
import { api } from 'entities/api';
import { useEffect } from 'react';
import { IQueryResult, User } from 'shared/interfaces';

//! Выделить в env
/**
 * This function is a custom hook that fetches data from the API.
 *
 * @param {string} endpoint - The API endpoint to fetch data from
 * @param {string} key - The unique key for the query
 * @returns {{ data: T | undefined, isLoading: boolean, isError: boolean }} An object containing the data, loading state, and error state
 */
export const useGetQuery = <T>(endpoint: string, key: string): IQueryResult<T | undefined> => {
    const { data, isLoading, isError } = useQuery<T | undefined>({
        queryKey: [key],
        staleTime: 60000,
        queryFn: async () =>
            await api.get<T>(`${endpoint}`)
                .then((response) => response.data)
    });
    return { data, isLoading, isError };
};
// export const login = async (data: ILoginData): Promise<string> => {
//     const response = await axios.post<string>(`${apiAddr}/auth/login`, data);
//     return response.data; // Возвращаем данные ответа
// };

/**
 * Fetches a list of all users from the API and returns it strongly typed.
 *
 * @returns {{ data: User[] | undefined, isLoading: boolean, isError: boolean }} An object containing the user data, loading state, and error state
 */
export const useGetUser = (): IQueryResult<User[] | undefined> => {
    // return useGetQuery<User[]>('users', 'users');
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return { data: undefined, isLoading: false, isError: false };
    }
    const { data, isLoading, isError, refetch } = useQuery<User[] | undefined>(
        {
            queryKey: ['users'],
            staleTime: 60000,
            queryFn: async () =>
                await api.get<User[]>('users')
                    .then((response) => response.data)
        }
    );
    useEffect(() => {
        if (token) {
            refetch(); // Retry the query when the token changes
        }
    }, [token, refetch]);

    return { data, isLoading, isError };
};

export const refreshAccessToken = async (): Promise<string> => {
    try {
        const response = await api.post('/auth/refresh', {
            refreshToken: localStorage.getItem('refreshToken')
        });

        return response.data.accessToken;
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        throw error;
    }
};
// try {
// } catch (error) {
//     console.log('asd');

//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     throw new Error('Failed to refresh access token');
// }
export const createAppoints = async (data: any): Promise<any> => {
    const response = await api.post('/appoints', data);
    return response.data;
};