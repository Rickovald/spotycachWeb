import { FC, ReactElement, useEffect, useState } from 'react';
import s from './appoint.module.sass';
import { IRoomData } from 'shared/interfaces';
import { Hours } from './Hours';
import { useModal } from 'features/Contexts/ModalContext';
import { Controls } from './Controls';
import { Form } from './Form';
import Portal, { createContainer } from 'app/Portal';
import { APPOINT_MODAL } from 'shared/types';
import { api } from 'entities/api';
// import { jwtDecode } from 'jwt-decode';
// import { Dropdown } from 'shared/Dropdown';

interface IAppoint {
};

const MODAL_CONTAINER_ID = APPOINT_MODAL;

const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

// todo
//! упростить
//! оптимизировать архитектуру
//! Перевести часть функций в хуки при возможности
//! closeModal => в отдельную функцию с isFormOpen - false
// todo end
export const Appoint: FC<IAppoint> = (): ReactElement | null => {
    const [selectedGlobal, setSelectedGlobal] = useState<{ [hourId: string]: Set<string>; }>({});
    const [dataToPost, setDataToPost] = useState<Date[] | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isButtonHidden, setIsButtonHidden] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [isMounted, setMounted] = useState(false);

    const { modalData, openId, closeModal } = useModal<IRoomData>(); // Используйте дженерик T
    // Функция для получения массива дней на основе текущей даты

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);

    const getWeekDays = (date: Date) => {
        const weekDays = [];
        const startOfWeek = new Date(date); // Используем текущую дату как стартовую

        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i); // Добавляем дни к текущей дате
            weekDays.push(day);
        }
        return weekDays;
    };
    const weekDays = getWeekDays(currentDate);

    // Функции для переключения между неделями
    const nextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        if (newDate.getDate() !== new Date().getDate()) {
            setIsButtonHidden(false);
        } else {
            setIsButtonHidden(true);
        }
        setCurrentDate(newDate);
    };

    const previousWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        if (newDate.getDate() !== new Date().getDate()) {
            setIsButtonHidden(false);
        } else {
            setIsButtonHidden(true);
        }
        setCurrentDate(newDate);
    };
    useEffect(() => {
        const mappedGlobal = Object.entries(selectedGlobal).flatMap(([hourId, values]) =>
            Array.from(values).map(value => {
                const [date, time] = value.split(' ');
                const [day, month, year] = date.split('.');
                const [hours, minutes] = time.split(':');
                return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
            })
        );
        setDataToPost(mappedGlobal);
    }, [selectedGlobal]);
    /**
        * Updates the `selectedGlobal` state based on the provided `hourId` and `selected` set.
        *
        * If the `selected` set is empty, it removes the entry associated with `hourId` from `selectedGlobal`.
        * Otherwise, it adds or updates the entry in `selectedGlobal` with the given `selected` set.
        *
        * The updated `selectedGlobal` is sorted by the date represented in the keys.
        *
        * @param {string} hourId - The identifier for the hour block being updated.
        * @param {Set<string>} selected - A set of selected time slots for the given hourId.
    */
    const sortEntriesByDate = (entries: [string, Set<string>][]) => {
        return entries.sort(([keyA], [keyB]) => {
            const [dayA, monthA, yearA] = keyA.split('.');
            const [dayB, monthB, yearB] = keyB.split('.');
            return (
                new Date(`${yearA}-${monthA}-${dayA}`).getTime() -
                new Date(`${yearB}-${monthB}-${dayB}`).getTime()
            );
        });
    };

    const handleSelectedChange = (hourId: string, selected: Set<string>) => {
        setSelectedGlobal(prevSelected => {
            const newSelected = { ...prevSelected };
            if (selected.size === 0) {
                delete newSelected[hourId];
            } else {
                newSelected[hourId] = selected;
            }
            return Object.fromEntries(sortEntriesByDate(Object.entries(newSelected)));
        });
    };

    const handleFormSubmit = async () => {
        if (dataToPost !== null) {
            const data = {
                datetimes: dataToPost,
                room: modalData?.id,
                userName: userName.trim().replace(/[^a-zA-Z0-9]/g, ''),
                bookedBy: userId
            };
            console.log(data);
            try {
                const response = await api.post('/appoints', data);
                console.log(response.data);
            } catch (error: any) {
                console.error(error.response.data.message);
            }
            // await api.post('/appoints', data);
        } else {
            console.error('dataToPost is null');
        }
    };
    return (
        isMounted
            ? (<Portal id={MODAL_CONTAINER_ID} closeModal={closeModal}>
                <div className={
                    openId !== APPOINT_MODAL
                        ? `${s.appoint} ${s.inactive_op}`
                        : s.appoint
                } onClick={closeModal}>
                    {selectedGlobal && Object.keys(selectedGlobal).length > 0 && (
                        <div className={s.selected}>
                            {/* {Object.keys(selectedGlobal).map((key) => (
                        <div key={key} className={s.selected__item}>
                            {key} - {Array.from(selectedGlobal[key]).join(', ')}
                        </div>
                    ))} */}
                        </div>
                    )}
                    <div className={
                        openId !== APPOINT_MODAL
                            ? `${s.content} ${s.inactive}`
                            : s.content
                    } onClick={e => e.stopPropagation()}>
                        <h3 className={s.title}>{modalData?.title}</h3>
                        <div className={s.close} onClick={closeModal} />
                        <div className={s.forms_wrapper}>
                            <div
                                className={
                                    isFormOpen
                                        ? `${s.table} ${s.table_hidden}`
                                        : s.table
                                }>
                                {weekDays.map((day, index) => (
                                    <div key={index} className={s.day}>
                                        <p className={s.day__title}>{day.toLocaleDateString('ru-RU', { weekday: 'long' })}</p>
                                        <p className={s.day__date}>{day.toLocaleDateString()}</p>
                                        <Hours
                                            hours={hours}
                                            hourId={day.toLocaleDateString()}
                                            setSelectedGlobal={handleSelectedChange}
                                        />
                                    </div>
                                ))}
                            </div>
                            <Form
                                isFormOpen={isFormOpen}
                                selectedGlobal={selectedGlobal}
                                setUserName={setUserName}
                                setUserId={setUserId}
                            />
                        </div>
                        <Controls
                            isButtonHidden={isButtonHidden}
                            isFormOpen={isFormOpen}
                            previousWeek={previousWeek}
                            nextWeek={nextWeek}
                            setIsFormOpen={setIsFormOpen}
                            handleFormSubmit={handleFormSubmit}
                        />
                    </div >
                </div >
            </Portal>)
            : null
    );
};