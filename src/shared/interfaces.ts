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