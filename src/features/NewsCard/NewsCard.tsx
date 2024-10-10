import { FC, ReactElement } from 'react';
import s from './newsCard.module.sass';
import { useSwiperSlide } from 'swiper/react';

interface INewCard {
    title: string,
    summary: string;
    image: string,
};

export const NewsCard: FC<INewCard> = ({
    title,
    summary,
    image
}): ReactElement => {
    const swiperSlide = useSwiperSlide();

    return (
        <div className={
            swiperSlide.isActive
                ? s.new
                : `${s.new} ${s.inactive}`
        }>
            <img className={s.new__image} src={image} alt="" />
            <div className={s.new__content}>
                <div className={s.new__title}>
                    {title}
                </div>
                <div className={s.new__summary}>
                    {summary}
                </div>

            </div>
        </div >
    );
};