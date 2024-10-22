import { FC, ReactElement } from 'react';
import s from './rooms.module.sass';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

interface IRooms {

};

export const Rooms: FC<IRooms> = (): ReactElement => {
    return (
        <div className={s.rooms}>
            <div className={s.swiper}>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    loop={true}
                    slidesPerView={1}
                    loopAdditionalSlides={1}
                    coverflowEffect={{
                        rotate: -20,
                        stretch: 250,
                        depth: 800,
                        modifier: 1,
                        slideShadows: false
                    }}
                    spaceBetween={50}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper"
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper: any) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <div className={s.slide}>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={s.slide}>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={s.slide}>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={s.slide}>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};