import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IQueryResult } from 'shared/interfaces';

//! Выделить в env
const apiAddr = 'http://localhost:5001';

/**
 * This function is a custom hook that fetches starship data from the SWAPI.
 *
 * @param {string} endpoint - The API endpoint to fetch data from
 * @param {string} key - The unique key for the query
 * @return {{ data: any, isLoading: boolean, isError: boolean }} An object containing starships data, loading state, and error state
 */
export const useGetQuery = <T>(endpoint: string, key: string): IQueryResult<T> => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [key],
        staleTime: 60000,
        queryFn: async () =>
            await axios.get(`${apiAddr}/${endpoint}`)
                .then((response) => response.data)
    });
    return { data, isLoading, isError };
};