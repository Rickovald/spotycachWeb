import { FC, ReactElement } from 'react';
import s from './rental.module.sass';
import { RentalNav } from 'widgets/RentalNav';
import { useGetRentQuery } from 'shared/hooks/useGetRents';
import { Fader } from 'shared/components/StateFade';
import { motion } from 'framer-motion';

interface IRental {

};
const variants = {
    open: { opacity: 1, y: 0, height: '9.375rem' },
    init: { opacity: 0, y: '-10%', height: 0 }
};
export const Rental: FC<IRental> = (): ReactElement => {
    const [input, setSearchParams] = useGetRentQuery();
    return (
        <motion.div className={s.rental}
            animate='open'
            initial="init"
            transition={{ duration: 0.5, type: 'spring' }}
            variants={variants}>

            <Fader state={!!input}>
                <RentalNav input={input} setSearchParams={setSearchParams} />
            </Fader>
            <div className={s.content}>
                input: {input}
            </div>
        </motion.div>
    );
};