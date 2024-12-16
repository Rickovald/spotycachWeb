import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface ModalContextType<T> {
    openId: string;
    openModal: (id: string, data?: T) => void;
    closeModal: () => void;
    modalData: T | null;
}

// Создаём контекст с типом, который по умолчанию может быть null
const ModalContext = createContext<ModalContextType<unknown> | null>(null);

export const ModalProvider = <T, >({ children }: { children: ReactNode }) => {
    const [openId, setOpenId] = useState<string>('');
    const [modalData, setModalData] = useState<T | null | unknown>(null);

    // openModal использует T для передачи данных
    const openModal = useCallback((id: string, data?: T | unknown) => {
        if (openId !== id) {
            setModalData(data ?? null);
            setOpenId(id);
        }
    }, []);

    const closeModal = useCallback(() => {
        setOpenId('');
        setTimeout(() => {
            setModalData(null);
        }, 300);
    }, []);

    useEffect(() => {
        document.body.style.overflow = openId ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [openId]);

    return (
        <ModalContext.Provider value={{ openId, openModal, closeModal, modalData }}>
            {children}
        </ModalContext.Provider>
    );
};

// useModal возвращает строго типизированный контекст
export const useModal = <T, >(): ModalContextType<T> => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context as ModalContextType<T>; // Типизация контекста
};