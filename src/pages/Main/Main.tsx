import { FC, ReactElement } from 'react';
import s from './main.module.sass';
import { News } from 'widgets/News';
import { Rooms } from 'widgets/Rooms';
import { RentalNav } from 'widgets/RentalNav';
import { Faq } from 'widgets/Faq';
import { Reviews } from 'widgets/Reviews';
import { useGetRentQuery } from 'shared/hooks/useGetRents';

export const Main: FC = (): ReactElement => {
    const [input, setSearchParams] = useGetRentQuery();

    return (
        <div className={s.root}>
            <h2 className={s.title}>Новости</h2>
            <News />
            <h2 className={s.title}>Комнаты</h2>
            <Rooms />
            <h2 className={s.title}>Аренда</h2>
            <div className={s.rentalWrapper}>
                <RentalNav setSearchParams={setSearchParams} input={input} type='main' />
            </div>
            <h2 className={s.title}>FAQ</h2>
            <Faq />
            <h2 className={s.title}>Отзывы</h2>
            <Reviews />
            <h2 className={s.title}>Записаться на репетицию</h2>
        </div>
    );
};