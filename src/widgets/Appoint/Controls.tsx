import { FC, ReactElement } from 'react';
import s from './appoint.module.sass';
import { Button } from 'shared/Button';
// import { Dropdown } from 'shared/Dropdown';

interface IAppointControls {
    isButtonHidden: boolean;
    isFormOpen: boolean;
    previousWeek: () => void;
    nextWeek: () => void;
    setIsFormOpen: (value: boolean) => void;
    handleFormSubmit: () => void;
};
export const Controls: FC<IAppointControls> = ({ isButtonHidden, isFormOpen, previousWeek, nextWeek, setIsFormOpen, handleFormSubmit }): ReactElement => {
    return (
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
                <Button type={'primary'}
                    className={
                        !isFormOpen
                            ? `${s.backButton_hidden} ${s.goButton}`
                            : s.goButton
                    }>
                    <div
                        // onClick={() => (setModalOpen(!modalOpen))}
                        onClick={() => handleFormSubmit()}
                    >
                    Записаться
                        {/* {isFormOpen ? 'Далее' : 'Записться'} */}
                    </div>
                </Button>
                <Button type={'primary'}
                    className={
                        isFormOpen
                            ? `${s.backButton_hidden} ${s.backButton}`
                            : s.backButton
                    }>
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
    );
};