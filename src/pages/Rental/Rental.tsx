import { FC, ReactElement } from 'react';
import s from './rental.module.sass';
import { RentalNav } from 'widgets/RentalNav';
import { useGetRentQuery } from 'shared/hooks/useGetRents';
import { Fader } from 'shared/components/StateFade';

interface IRental {

};

export const Rental: FC<IRental> = (): ReactElement => {
    const [input, setSearchParams] = useGetRentQuery();
    return (
        <div className={s.rental}>
            <Fader state={!!input}>
                <RentalNav input={input} setSearchParams={setSearchParams} />
            </Fader>
            <div className={s.content}>
                input: {input}
            </div>
        </div>
    );
};