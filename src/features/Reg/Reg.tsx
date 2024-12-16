import React, { FC, ReactElement, useEffect, useState } from 'react';
import s from './reg.module.sass';
// import { useMutation } from '@tanstack/react-query';
import { api } from 'entities/api';
import { jwtDecode } from 'jwt-decode';
import Portal, { createContainer } from 'app/Portal';
import { useModal } from 'features/Contexts/ModalContext';
import { AUTH_MODAL, REG_MODAL } from 'shared/types';
// import { usePostQuery } from 'shared/hooks/useQuery';
// import { ILoginData } from 'shared/interfaces';
import { useGetQuery } from 'shared/hooks/useQuery';
interface IReg {

};
//! Раскидать инпуты по модулям

const MODAL_CONTAINER_ID = REG_MODAL;
export const Reg: FC<IReg> = (): ReactElement | null => {
    const [isMounted, setMounted] = useState(false);
    const [fio, setFio] = useState('');
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [customGroup, setCustomGroup] = useState('');
    const [phone, setPhone] = useState<string>('7');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const { openId, closeModal, openModal } = useModal<IReg>(); // Используйте дженерик T
    const { data: groups } = useGetQuery<string[]>('group/reg', 'groups');

    const handleOpenAuth = async () => {
        openModal(AUTH_MODAL);
    };

    const handleLogin = async () => {
        const data = { email, password, username: fio, phone, groupNames: groups };
        if (!data.email || !data.password || !data.username || !data.phone) {
            setError('Поля не должны быть пустыми');
            return;
        }
        const response = await api.post('/auth/register', data)
            .then((response) => {
                console.log(jwtDecode(response.data.accessToken));
                console.log(jwtDecode(response.data.refreshToken));
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }).catch((error) => {
                // try to fix the error or
                // notify the users about somenthing went wrong
                if (error.status === 401) {
                    setError('Invalid email or password');
                } else {
                    setError('Something went wrong');
                }
                setError(error.response.data.message);
                console.log(error.response.data.message);
            });

        console.log(response);
        // const response = await api.post('http://localhost:5001/auth/login', data);
    };
    // const handlePhoneChange = (value?: string) => {
    //     if (value) {
    //         setPhone(value);
    //     }
    // };
    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setMounted(true);
    }, []);
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ''); // Убираем все, кроме цифр
        let formatted = rawValue;

        // Устанавливаем "7" как первый символ
        if (!formatted.startsWith('7')) {
            formatted = '7' + formatted.slice(1);
        }

        // Форматируем номер телефона
        const formattedValue = `+7 (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7, 9)}-${formatted.slice(9, 11)}`;
        setPhone(formatted.slice(0, 11)); // Ограничиваем длину номера в состоянии
        e.target.value = formattedValue; // Устанавливаем форматированный текст в поле
    };

    const handleCheckboxChange = (group: string) => {
        setSelectedGroups((prev) =>
            prev.includes(group)
                ? prev.filter((g) => g !== group) // Удаляем из массива
                : [...prev, group] // Добавляем в массив
        );
    };

    // Обработчик добавления пользовательского значения
    const handleAddCustomGroup = () => {
        if (customGroup.trim() && !selectedGroups.includes(customGroup)) {
            setSelectedGroups((prev) => [...prev, customGroup.trim()]);
        }
        setCustomGroup('');
    };

    return (
        isMounted
            ? (<Portal id={MODAL_CONTAINER_ID} closeModal={closeModal}>
                <div
                    className={
                        openId !== REG_MODAL
                            ? `${s.auth} ${s.inactive_op}`
                            : s.auth
                    } onClick={closeModal}
                >
                    <div className={
                        openId !== REG_MODAL
                            ? `${s.content} ${s.inactive}`
                            : s.content
                    } onClick={e => e.stopPropagation()}>
                        {!!error && <span>{error}</span>}
                        <input className={s.input} type="text" value={fio} onChange={(e) => setFio(e.target.value)} placeholder="ФИО" />
                        <div
                            className={s.dropdownHeader}
                            onClick={() => setIsOpen((prev) => !prev)}
                        >
                            {selectedGroups.length > 0
                                ? selectedGroups.join(', ')
                                : 'Выберите группы'}
                        </div>

                        {isOpen && (
                            <div className={s.dropdownBody}>
                                <div className={s.checkboxList}>
                                    {groups?.map((group) => (
                                        <label key={group} className={s.checkboxItem}>
                                            <input
                                                type="checkbox"
                                                checked={selectedGroups.includes(group)}
                                                onChange={() => handleCheckboxChange(group)}
                                            />
                                            {group}
                                        </label>
                                    ))}
                                </div>

                                <div className={s.customGroupContainer}>
                                    <input
                                        type="text"
                                        className={s.input}
                                        value={customGroup}
                                        onChange={(e) => setCustomGroup(e.target.value)}
                                        placeholder="Введите группу"
                                    />
                                    <button
                                        className={s.addButton}
                                        onClick={handleAddCustomGroup}
                                    >
                                        Добавить
                                    </button>
                                </div>
                            </div>
                        )}
                        {/* <input
                            className={s.input}
                            type="text"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                            placeholder="Введите группу"
                        /> */}
                        {/* <input className={s.input} type="text" value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Группа" /> */}
                        {/* <PhoneInput
                            international
                            defaultCountry="RU"
                            className={s.input_phone}
                            value={phone}
                            onChange={(value?: string) => handlePhoneChange(value)}

                            laceholder="Телефон"
                        /> */}
                        <input
                            className={s.input}
                            type="text"
                            value={`+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`}
                            onChange={handlePhoneChange}
                            maxLength={18} // Ограничиваем длину ввода
                            placeholder="+7 (___) ___-__-__"
                        />
                        {/* <input className={s.input} type="phone" value={phone} onChange={(e) => setPhone(convertPhoneNumber(e.target.value))} placeholder="Телефон" /> */}
                        <input className={s.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input className={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" />
                        <input className={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Повторите пароль" />

                        <button className={s.button} onClick={handleLogin} type="submit">Вход</button>
                        <p className={s.toreg}>
                            Уже есть аккаунт? -
                            <span onClick={handleOpenAuth}> Вход</span>
                        </p>
                    </div>
                </div>
            </Portal>)
            : null
    );
};