import { useQuery } from '@tanstack/react-query';
import { api } from 'entities/api';
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
    return useGetQuery<User[]>('users', 'users');
};

export const refreshAccessToken = async (): Promise<string> => {
    const response = await api.post('/auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken')
    });

    // localStorage.setItem('accessToken', response.data.accessToken);
    return response.data.accessToken;
};