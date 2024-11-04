// contexts/index.tsx
import { FC } from 'react';
import { ModalProvider } from './ModalContext';
import { IContextProps } from 'shared/interfaces';

const AppProvider: FC<IContextProps> = ({ children }) => {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    );
};

export default AppProvider;