import { FC, ReactElement, useState } from 'react';
import s from './faq.module.sass';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'shared/icons';
// import { Dropdown } from 'shared/Dropdown';

interface IFaq {

};

export const Faq: FC<IFaq> = (): ReactElement => {
    const [openedId, setOpenedId] = useState<number | null>(null);
    // const variants = {
    //     open: { opacity: 1, height: '100%' },
    //     closed: { opacity: 0, height: '0px' }
    // };

    const faqs = [
        {
            id: 1,
            title: 'Какие музыкальные инструменты подойдут мне?',
            answer: 'Да любые блять, какие дадут, тем и радуйся, уеба'
        },
        {
            id: 2,
            title: 'Какие музыкальные инструменты подойдут мне?',
            answer: 'Да любые блять, какие дадут, тем и радуйся, уеба'
        },
        {
            id: 3,
            title: 'Какие музыкальные инструменты подойдут мне?',
            answer: 'Да любые блять, какие дадут, тем и радуйся, уеба'
        },
        {
            id: 4,
            title: 'Какие музыкальные инструменты подойдут мне?',
            answer: 'Да любые блять, какие дадут, тем и радуйся, уеба'
        }
    ];
    return (
        <div className={s.faq}>
            <h2 className={s.title}>FAQ</h2>
            {faqs.map(faq => (
                <div className={s.card} key={faq.id}>
                    <div
                        className={s.question}
                        onClick={() => setOpenedId(openedId === faq.id ? null : faq.id)}
                    >

                        <div className={s.question}>
                            {faq.title}
                        </div>
                        <div className=
                            {
                                openedId === faq.id
                                    ? `${s.arrowBox} ${s.active}`
                                    : s.arrowBox
                            }>
                            <ArrowDown className={s.arrow} />
                        </div>
                    </div>

                    <AnimatePresence >
                        {openedId === faq.id && (
                            <motion.div
                                className={s.answer}
                                animate={{ height: 'auto', marginTop: '1.25rem' }}
                                exit={{ height: 0, margin: 0 }}
                                initial={{ height: 0, overflow: 'hidden' }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
                                {faq.answer}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
            {/* {faqs.map(faq => (
                <Dropdown
                    key={faq.id}
                    id={faq.id}
                    expanded={openedId}
                    setExpanded={setOpenedId}
                    title={faq.title}
                    description={faq.answer} />
            ))} */}
        </div>
    );
};