import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { User } from 'shared/interfaces';

/**
 * A hook that fetches user data from the GitHub API.
 *
 * @param {string} username - The GitHub username of the user.
 * @returns {Object} - An object containing the user data, loading state, and error state.
 * @property {User} user - The user data.
 * @property {boolean} isLoading - The loading state.
 * @property {boolean} isError - The error state.
 */
export const useGetUserData = (username: string): {
    user: User,
    isLoading: boolean,
    isError: boolean
} => {
    const { data: user, isLoading, isError } = useQuery<User>({
        queryKey: ['user', username],
        staleTime: 60000,
        queryFn: async () => {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            return response.data;
        }
    });

    if (user === undefined) {
        throw new Error('User data is not available');
    }

    return { user, isLoading, isError };
};