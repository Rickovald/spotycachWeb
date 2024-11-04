import { FC, ReactElement, useState } from 'react';
import s from './appoint.module.sass';
import { IRoomData } from 'shared/interfaces';
import { Hours } from './Hours';
import { useModal } from 'features/Contexts/ModalContext';
import { Button } from 'shared/Button';
// import { Dropdown } from 'shared/Dropdown';

interface IAppoint {
};
const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
//! Блять упрости
export const Appoint: FC<IAppoint> = (): ReactElement => {
    const [selectedGlobal, setSelectedGlobal] = useState<{ [hourId: string]: Set<string>; }>({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isButtonHidden, setIsButtonHidden] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { modalData, isOpen, closeModal } = useModal<IRoomData>(); // Используйте дженерик T
    // Функция для получения массива дней на основе текущей даты
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
    // useEffect(() => {
    //     console.log(selectedGlobal);
    // }, [selectedGlobal]);
    const handleSelectedChange = (hourId: string, selected: Set<string>) => {
        if (selected.size === 0) {
            setSelectedGlobal((prevSelected) => {
                const newSelected = { ...prevSelected };
                delete newSelected[hourId];
                return newSelected;
            });
        } else {
            setSelectedGlobal((prevSelected) => ({ ...prevSelected, [hourId]: selected }));
        }
    };

    return (
        <div className={
            !isOpen
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
                !isOpen
                    ? `${s.content} ${s.inactive}`
                    : s.content
            } onClick={e => e.stopPropagation()}>
                <h3 className={s.title}>{modalData?.title}</h3>
                <div className={s.close} onClick={closeModal} />

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
                <div className={s.buttons}>
                    <div className={s.navigation}>
                        <Button
                            className={
                                isButtonHidden || isFormOpen
                                    ? `${s.weekButton_hidden} ${s.weekButton}`
                                    : s.weekButton
                            }
                            type={'secondary'} onClick={previousWeek}>
                            <div className={
                                isButtonHidden && isFormOpen
                                    ? `${s.weekButton_hidden} ${s.weekButton}`
                                    : s.weekButton
                            }>
                                Предыдущая неделя
                            </div>
                        </Button>
                        <Button
                            className={
                                isFormOpen
                                    ? `${s.weekButton_hidden} ${s.weekButton}`
                                    : s.weekButton
                            }
                            type={'secondary'} onClick={nextWeek}>
                            <div className={
                                isFormOpen
                                    ? `${s.weekButton_hidden} ${s.weekButton}`
                                    : s.weekButton
                            }>
                                Следующая неделя
                            </div>
                        </Button>
                    </div>
                    <div className={s.controls}>
                        <Button type={'primary'} className={
                            !isFormOpen
                                ? `${s.backButton_hidden} ${s.backButton}`
                                : s.backButton
                        }>
                            <div
                                onClick={() => setIsFormOpen(false)}
                                className={
                                    !isFormOpen
                                        ? `${s.backButton_hidden} ${s.backButton}`
                                        : s.backButton
                                }>
                                Назад
                            </div>
                        </Button>
                        <Button type={'primary'}>
                            <div
                                // onClick={() => (setModalOpen(!modalOpen))}
                                onClick={() => setIsFormOpen(true)}
                            >
                                Далее
                                {/* {isFormOpen ? 'Далее' : 'Записться'} */}
                            </div>
                        </Button>

                    </div>
                </div>
            </div>
        </div >
    );
};