import { FC, ReactElement, useEffect, useState } from 'react';
import s from './appoint.module.sass';
// import { Dropdown } from 'shared/Dropdown';
import SelectionArea, { SelectionEvent } from '@viselect/react';
interface IHours {
    hours: string[];
    hourId: string;
    setSelectedGlobal: (hourId: string, selected: Set<string>) => void;
};
// TODO refactor, добавить стейт типа драга (снятие/выбор)

/**
 * Компонент, отображающий список часов с возможностью выбора
 *
 * @param {string[]} hours - список часов
 * @param {string} hourId - id для часов
 * @param {(hourId: string, selected: Set<string>) => void} setSelectedGlobal - функция для установки стейта
 * @returns {ReactElement} - JSX-элемент
 */
export const Hours: FC<IHours> = ({ hours, hourId, setSelectedGlobal }): ReactElement => {
    const [selected, setSelected] = useState<Set<string>>(() => new Set());
    const extractIds = (els: Element[]): string[] =>
        els.map(v => v.getAttribute('data-key'))
            .filter(Boolean)
            .map(String);
    useEffect(() => {
        setSelectedGlobal(hourId, selected);
    }, [selected]);

    const onMove = ({
        store: {
            changed: { added, removed }
        }
    }: SelectionEvent) => {
        setSelected(prev => {
            const next = new Set(prev);

            extractIds(added).forEach(id => next.add(id));
            extractIds(removed).forEach(id => next.delete(id));
            return next;
        });
    };

    return (
        <SelectionArea
            className={s.hours}
            onMove={onMove}
            selectables={`.${s.hour}`}>
            {hours.map((hour, index) => (
                <div
                    className={
                        selected.has(`${hourId} ${hour}`)
                            ? `${s.hour} ${s.selected}`
                            : s.hour
                    }
                    data-key={`${hourId} ${hour}`}
                    key={index}
                >
                    {hour}
                </div>
            ))}
        </SelectionArea>
    );
};

// const onStart = ({ event, selection }: SelectionEvent) => {
// console.log('000');

// if (!event?.ctrlKey && !event?.metaKey) {
//     selection.clearSelection();
//     setSelected(() => new Set());
// }
// };
// onStart={onStart}