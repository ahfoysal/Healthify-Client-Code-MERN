/* eslint-disable @typescript-eslint/no-explicit-any 




*/
import { useRef } from 'react';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Button, Card } from '@nextui-org/react';
import { type Swiper } from 'swiper';
import ChevronLeft from '@/assets/icons/ChevronLeftIcon';
import ChevronRight from '@/assets/icons/ChevronRightIcon';
import { Player } from '@lottiefiles/react-lottie-player';
import { Icons } from '@/assets/icons/Icons';
import useFetchQuery from '@/hooks/shared/useFetch';
import Loader from '@/others/Loader';

const UpcomingServices = () => {
  const swiperRef = useRef<Swiper | null>(null);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  const { data, isLoading: isFetching } = useFetchQuery('/recommendations');

  if (isFetching) {
    return <Loader />;
  }
  return (
    <div>
      <div className="max-w-7xl w-[93%] flex md:flex-row flex-col justify-around md:w-full  mx-auto">
        <div className="flex flex-col max-w-xl text-center justify-around ">
          <h1 className="text-3xl font-bold  text-center md:text-left">
            What Our Professionals Say
          </h1>
          <div className="w-full h-fit flex justify-center items-center">
            <SwiperReact
              ref={swiperRef as any}
              slidesPerView={1}
              spaceBetween={50}
              speed={500}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {data.data.map((item: HealthRecommendation, index: number) => (
                <SwiperSlide key={Math.random() * index}>
                  <Card
                    shadow="none"
                    className="py-0 px-0 h-full   border-none bg-transparent"
                  >
                    <div className="flex flex-1 gap-10 justify-between items-start h-full flex-col">
                      <Icons.quote className="h-[36px] w-[36px]" />
                      <p className="text-left">{item.recommendation}</p>
                      <li className="list-disc list-inside font-semibold text-danger">
                        {item.doctorName}
                      </li>
                    </div>
                  </Card>
                </SwiperSlide>
              ))}
            </SwiperReact>
          </div>
          <div className="mt-5 md:my-0  gap-3 flex ">
            <Button
              variant="flat"
              isIconOnly
              className="cursor-pointer bg-transparent rounded-full p-1.5 swiper-button-prev"
              onClick={handlePrevClick}
            >
              <ChevronLeft />
            </Button>
            <Button
              isIconOnly
              variant="flat"
              className="cursor-pointer bg-transparent  rounded-full p-1.5 swiper-button-next"
              onClick={handleNextClick}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div>
          <Player
            autoplay
            loop
            src="https://lottie.host/701e5b49-6c23-4940-b8b2-c74de4416654/RMYAqxZDZj.json"
            style={{ height: '400px', width: '100%' }}
          ></Player>
        </div>
      </div>
    </div>
  );
};

export default UpcomingServices;
interface HealthRecommendation {
  doctorName: string;
  recommendation: string;
}
