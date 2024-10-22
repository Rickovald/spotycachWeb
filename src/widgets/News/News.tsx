import { FC, ReactElement } from 'react';
import s from './news.module.sass';
import { Swiper, SwiperSlide } from 'swiper/react';
import newImg from '../../shared/assets/newB.jpg';
import newImg2 from '../../shared/assets/important.jpg';

// Import Swiper styles
import 'swiper/css';
import { INew } from 'shared/interfaces';
import { NewsCard } from 'features/NewsCard';
import { EffectCoverflow, Pagination } from 'swiper/modules';

interface INews {

};
// TODO: add news, 'any' to normal type
export const News: FC<INews> = (): ReactElement => {
    return (
        <div className={s.news}>
            <div className={s.swiper}>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: -100,
                        depth: 300,
                        modifier: 1,
                        slideShadows: false
                    }}
                    // spaceBetween={50}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper: any) => console.log(swiper)}
                >
                    {news.map((n: INew) => (
                        <SwiperSlide style={{ width: 'auto' }} key={n.id}>
                            <div className={s.slide}>
                                <NewsCard
                                    title={n.title}
                                    summary={n.summary}
                                    image={n.image}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

const news: INew[] = [
    {
        id: 1,
        title: 'title',
        summary: 'description',
        content: 'content',
        createdAt: new Date(),
        image: newImg
    },
    {
        id: 2,
        title: 'title',
        summary: 'description',
        content: 'content',
        createdAt: new Date(),
        image: newImg2
    },
    {
        id: 3,
        title: 'title',
        summary: 'description',
        content: 'content',
        createdAt: new Date(),
        image: newImg
    },
    {
        id: 4,
        title: 'title',
        summary: 'description',
        content: 'content',
        createdAt: new Date(),
        image: newImg2
    },
    {
        id: 5,
        title: 'title',
        summary: 'description',
        content: 'content',
        createdAt: new Date(),
        image: newImg
    },
    {
        id: 6,
        title: 'title',
        summary: 'description',
        content: 'content',
        createdAt: new Date(),
        image: newImg2
    }
];