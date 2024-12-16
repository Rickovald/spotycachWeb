import { FC, ReactElement, ReactNode } from 'react';
import { motion } from 'framer-motion';

const variants = {
    open: { opacity: 1, y: 0, height: '9.375rem' },
    closed: { opacity: 1, y: '0%', height: 0 },
    init: { opacity: 1, y: '-100%', height: 0 }
};
type TFader = {
    state: boolean;
    children: ReactNode;
};
export const Fader: FC<TFader> = ({ children, state }): ReactElement => {
    return (
        <motion.nav
            animate={!state ? 'open' : 'closed'}
            initial="init"
            variants={variants}
            transition={{ duration: 0.5, type: 'spring' }}
        >
            {/* <Toggle onClick={() => setIsOpen(isOpen => !isOpen)} /> */}
            {children}
        </motion.nav>
    );
};