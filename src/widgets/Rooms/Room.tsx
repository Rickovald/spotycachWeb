import { FC, ReactElement } from 'react';
import s from './rooms.module.sass';
import { IRoomData } from 'shared/interfaces';
import { Button } from 'shared/Button';
import { NavLink } from 'react-router-dom';

interface IRoom {
    data: IRoomData;
};

export const Room: FC<IRoom> = ({ data }): ReactElement => {
    return (
        <div className={s.room}>
            <div className={s.room__title}>{data.title}</div>

            <div className={s.stuff}>
                <div className={s.stuff__title}>Оборудование</div>
                {data.stuff.join(', ')}
            </div>

            {/* <img className={s.room__img} src={data.img} alt="" /> */}
            <div className={s.room__btns}>
                <Button type={1}>
                    {/* <NavLink to={`/rooms/${data.id}`}> */}
                    <NavLink to={'/rooms'}>
                        Узнать больше
                    </NavLink>
                </Button>
                <Button type={1}>
                    <div>Записаться</div>
                </Button>
            </div>
        </div>
    );
};