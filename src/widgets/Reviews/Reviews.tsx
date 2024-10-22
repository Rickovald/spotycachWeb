import { FC, ReactElement } from 'react';
import s from './reviews.module.sass';

interface IReviews {

};

export const Reviews: FC<IReviews> = (): ReactElement => {
    const reviews = [
        {
            id: 0,
            name: 'Иван Иванов',
            text: 'Да любые блять, какие дадут, тем и радуйся, уеба'
        },
        {
            id: 1,
            name: 'Иван Иванов',
            text: 'Да любые блять, какие дадут, тем и радуйся, уеба'
        },
        {
            id: 2,
            name: 'Иван Иванов',
            text: 'Да любые блять, какие дадут, тем и радуйся, уеба'
        }
    ];
    return (
        <div className={s.reviews}>
            <div className={s.content}>
                <div className={s.cards}>
                    {reviews.map((r) => (
                        <div className={s.card} key={r.id}>
                            <h3 className={s.card__title}>{r.name}</h3>
                            <p className={s.card__text}>{r.text}</p>
                        </div>
                    ))}
                </div>
                <div className={s.form}>

                </div>
            </div>
        </div>
    );
};