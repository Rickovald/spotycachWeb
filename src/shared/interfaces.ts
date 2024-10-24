export interface User {
    login: string;
    avatar_url: string;
}

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