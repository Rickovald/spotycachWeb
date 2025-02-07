import { ReactElement } from 'react';

export interface INew {
    id: number;
    title: string,
    summary: string;
    content: string;
    createdAt: Date;
    image: string,
}

export interface IRoomData {
    id: number;
    title: string,
    stuff: string[];
}

export interface IQueryResult<T> {
    data: T;
    isLoading: boolean;
    isError: boolean;
}

export interface Slot {
    id: number;
    datetime: string;
    booked: string;
}
export interface Slots {
    [key: string]: Slot[];
}

export interface Schedule {
    id: number;
    week: string;
    slots: Slots;
}

export interface IContextProps {
    children: string | ReactElement | ReactElement[];
}

export type UserRole = 'unAuthorized' | 'user' | 'moderator' | 'admin';
export const ROLES: { [key: string]: UserRole; } = {
    unAuthorized: 'unAuthorized',
    user: 'user',
    moderator: 'moderator',
    admin: 'admin'
};

export interface User {
    id: number;
    username: string;
    avatar_url: string;
}

export interface ILoginData {
    email: string;
    password: string;
};

export interface UserContextValue {
    currentUserId: string | null;
    currentUserName: string | null;
    currentUserRole: UserRole;
    setCurrentUser: (
        currentUserId: string | null,
        currentUserName: string | null,
        currentUserRole: UserRole,
    ) => void;
}

export interface IGroup {
    id: string;
    name: string;
}
export interface DecodedUserToken {
    role: string;
    userId: string;
    avatar: string;
    email: string;
    exp: number;
    group: IGroup[];
    iat: number;
    phone: string;
    userName: string;
    // Add properties here that you expect to be present in the payload
}

// avatar: "/fasfas"
// email: "test2@mail.com"
// exp: 1730833613
// group: [{…}]
// iat: 1730747213
// phone: "asd"
// role: "admin"
// userId: "44a653aa-77bd-414a-9396-1a390ad0bb29"
// userName: "asd"