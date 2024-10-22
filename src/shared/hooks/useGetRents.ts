import { useSearchParams } from 'react-router-dom';
import { TRent, TSearchParams } from 'shared/types';

export const useGetRentQuery = (): [TRent, (values: TSearchParams) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();
    const input = searchParams.get('input');

    return [input as TRent, setSearchParams];
};