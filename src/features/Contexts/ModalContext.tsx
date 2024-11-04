import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ModalContextType<T> {
    isOpen: boolean;
    openModal: (data: T) => void;
    closeModal: () => void;
    modalData: T | null;
}

const ModalContext = createContext<ModalContextType<unknown> | undefined>(undefined);

export const ModalProvider = <T extends unknown>({ children }: { children: ReactNode; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<T | null>(null); // Используем T

    const openModal = (data: unknown) => { // Используем T здесь
        setModalData(data as T);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            setModalData(null);
        }, 300);
        // setModalData(null);
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Отключаем прокрутку
        } else {
            document.body.style.overflow = 'auto'; // Включаем прокрутку
        }

        // Чистим эффект
        return () => {
            document.body.style.overflow = 'auto'; // Включаем прокрутку при размонтировании
        };
    }, [isOpen]);
    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalData }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = <T extends unknown>() => {
    const context = useContext(ModalContext) as ModalContextType<T>;
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};