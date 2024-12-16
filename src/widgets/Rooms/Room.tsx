import { FC, ReactElement } from 'react';
import s from './rooms.module.sass';
import { IRoomData } from 'shared/interfaces';
import { Button } from 'shared/Button';
import { NavLink } from 'react-router-dom';
// import { Appoint } from 'widgets/Appoint';
import { useModal } from 'features/Contexts/ModalContext';
import { APPOINT_MODAL } from 'shared/types';
// import { motion } from 'framer-motion';

interface IRoom {
    data: IRoomData;
};

export const Room: FC<IRoom> = ({ data }): ReactElement => {
    // const [modalOpen, setModalOpen] = useState(false);
    const { openModal } = useModal<IRoomData>();
    // const [bookings, setBookings] = useState([
    //     { timestamp: '01.11.2024 09:00', bookedBy: 'User1' },
    //     { timestamp: '02.11.2024 10:00', bookedBy: 'User2' },
    //     { timestamp: '02.11.2024 11:00', bookedBy: 'User1' }
    // ]);

    // // Метод для обработки бронирования
    // const handleBook = (newSlots: Booking[]) => {
    //     setBookings((prevBookings) => [
    //         ...prevBookings,
    //         ...newSlots.map(slot => ({ ...slot, bookedBy: 'CurrentUser' })) // Замените 'CurrentUser' на ID текущего пользователя
    //     ]);
    //     console.log('Забронированные слоты:', newSlots);
    // };

    return (
        <div className={s.room}>
            {/* <div className={
                modalOpen
                    ? `${s.room__wrapper} ${s.inactive}`
                    : s.room__wrapper
            }> */}
            <div className={s.room__wrapper}>
                <div className={s.room__title}>{data.title}</div>

                <div className={s.stuff}>
                    <div className={s.stuff__title}>Оборудование</div>
                    {data.stuff.join(', ')}
                </div>

                {/* <img className={s.room__img} src={data.img} alt="" /> */}
                <div className={s.room__btns}>
                    <Button type={'primary'}>
                        {/* <NavLink to={`/rooms/${data.id}`}> */}
                        <NavLink to={'/rooms'}>
                            Узнать больше
                        </NavLink>
                    </Button>
                    <Button type={'primary'}>

                        <div
                            onClick={() => openModal(APPOINT_MODAL, data)}
                        // onClick={() => (setModalOpen(!modalOpen))}
                        >
                            Записаться
                        </div>

                    </Button>
                </div>
            </div>
            {/* <div className={
                modalOpen
                    ? `${s.room__modal} ${s.active}`
                    : s.room__modal
            }>
                <Appoint
                    // bookings={bookings}
                    // onBook={handleBook}
                    data={data}
                    setModalOpen={() => setModalOpen(!modalOpen)}
                />
            </div> */}
        </div >
    );
};