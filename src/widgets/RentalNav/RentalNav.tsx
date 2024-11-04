import { FC, ReactElement } from 'react';
import s from './rentalNav.module.sass';
import { useNavigate } from 'react-router-dom';
import { TRent, TSearchParams } from 'shared/types';
import { rents } from './tempRents';

interface IRentalCards {
    setSearchParams: (values: TSearchParams) => void;
    input?: TRent;
    type?: string;
};

export const RentalNav: FC<IRentalCards> = ({ setSearchParams, input, type }): ReactElement => {
    const navigate = useNavigate();
    const handleUpdateSearchParams = (value: TRent) => {
        if (type === 'main') {
            navigate(`/rental?input=${value}`);
        } else setSearchParams({ input: value });
    };

    // useEffect(() => {
    //     // setSearchParams({ input: 'Гитары' });
    //     console.log(type);
    // }, [type]);

    return (
        <div className={s.rental}>
            <div className={s.content}>
                {rents.map((rent) => (
                    <div
                        key={`${type}-${rent.id}`}
                        onClick={() => handleUpdateSearchParams(rent.name)}
                        className={s.card}>
                        {rent.name}
                    </div>

                ))}
            </div>
        </div>
    );
};