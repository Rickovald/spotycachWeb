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