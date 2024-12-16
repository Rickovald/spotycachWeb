import { FC, ReactElement, useEffect, useState } from 'react';
import s from './appoint.module.sass';
import { jwtDecode } from 'jwt-decode';
import { DecodedUserToken } from 'shared/interfaces';
// import { Dropdown } from 'shared/Dropdown';

interface IAppointControls {
    isFormOpen: boolean;
    selectedGlobal: { [hourId: string]: Set<string>; };
    setUserName: (value: string) => void;
    setUserId: (value: string) => void;
};
export const Form: FC<IAppointControls> = ({ isFormOpen, selectedGlobal, setUserName, setUserId }): ReactElement => {
    const [user, setUser] = useState<DecodedUserToken | null>(null);

    const userStorage = localStorage.getItem('accessToken');
    useEffect(() => {
        if (userStorage) {
            const userDecoded = jwtDecode<DecodedUserToken>(userStorage);
            setUser(userDecoded);
            setUserName(userDecoded.userName);
            setUserId(userDecoded.userId);
            console.log(userDecoded);
        }
    }, [userStorage]);

    const formattedSchedule = formatSchedule(selectedGlobal);
    return (
        <div className={
            !isFormOpen
                ? `${s.form} ${s.form_hidden}`
                : s.form
        }>
            {user
                ? <div>{user.userName}</div>
                : <div>Пользователь не авторизован</div>
            }
            {formattedSchedule.map((slot, index) => (
                <div key={index}>{slot}</div>
            ))}
            {/* {Object.keys(selectedGlobal).map((hourId) => (
                <div key={hourId}>
                    {hourId}: {Array.from(selectedGlobal[hourId]).join(', ')}
                </div>
            ))} */}
        </div>
    );
};

type ScheduleData = { [date: string]: Set<string>; };
const formatSchedule = (data: ScheduleData): string[] => {
    const result: string[] = [];

    for (const [date, timesSet] of Object.entries(data)) {
        const sortedTimes = Array.from(timesSet).sort();
        let rangeStart = sortedTimes[0];
        let rangeEnd = sortedTimes[0];

        sortedTimes.forEach((time, index) => {
            const nextTime = sortedTimes[index + 1];
            const expectedNextHour = incrementHour(rangeEnd.split(' ')[1]); // Увеличиваем только часть времени

            if (nextTime && nextTime.split(' ')[1] === expectedNextHour) {
                rangeEnd = nextTime;
            } else {
                result.push(`${date} ${rangeStart.split(' ')[1]}-${incrementHour(rangeEnd.split(' ')[1])}`);
                rangeStart = nextTime;
                rangeEnd = nextTime;
            }
        });
    }

    return result;
};

// Увеличение часа на 1
const incrementHour = (time: string): string => {
    const [hour, minute] = time.split(':').map(Number);
    if (isNaN(hour) || isNaN(minute)) return time;
    return `${String(hour + 1).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
};