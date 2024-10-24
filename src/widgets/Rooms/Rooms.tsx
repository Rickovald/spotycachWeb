import { FC, ReactElement } from 'react';
import s from './rooms.module.sass';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Room } from './Room';

interface IRooms {

};

export const Rooms: FC<IRooms> = (): ReactElement => {
    const roomData = [
        {
            id: 0,
            title: 'Большой зал',
            stuff: ['Гитара', 'Барабан', 'Звук', 'Комплекты', 'Комплекты']
        },
        {
            id: 1,
            title: 'Малый зал',
            stuff: ['Гитара', 'Барабан', 'Звук', 'Комплекты', 'Комплекты']
        }
    ];
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
                    {roomData.map((room) => (
                        <SwiperSlide key={room.id}>
                            <Room data={room} />
                        </SwiperSlide>
                    ))}
                    {roomData.map((room) => (
                        <SwiperSlide key={room.id}>
                            <Room data={room} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};