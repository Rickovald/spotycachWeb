import { FC, ReactElement } from 'react';
import s from './aboutRooms.module.sass';

interface IAboutRooms {

};

export const AboutRooms: FC<IAboutRooms> = (): ReactElement => {
    return (
        <div className = { s.aboutRooms }>
            aboutRooms
        </div>
    );
};