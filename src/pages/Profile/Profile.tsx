import { FC, ReactElement } from 'react';
import s from './profile.module.sass';

interface IProfile {

};

export const Profile: FC<IProfile> = (): ReactElement => {
    return (
        <div className = { s.profile }>
            profile
        </div>
    );
};