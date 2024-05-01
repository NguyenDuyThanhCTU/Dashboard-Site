'use client';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import Image from 'next/image';
import { useStateProvider } from '@context/StateProvider';

const Notification = ({ Data }: any) => {
  const { HandleNavigate } = useStateProvider();
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full pb-10">
        <div className="flex items-center justify-between border-b border-black cursor-pointer">
          <h2 className="border-b-2 py-2  border-blue-600 font-semibold text-[18px] text-mainorange hover:border-blue-800  duration-300 ">
            Thông báo mới nhất
          </h2>
          <div className="flex items-center ">
            <div className=" p-2 hover:bg-adminOrange hover:text-white duration-300">
              <FaAngleLeft />
            </div>
            <div className=" p-2 hover:bg-adminOrange hover:text-white duration-300">
              <FaAngleRight />
            </div>
          </div>
        </div>
        <div className="border mt-5 h-[360px]">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={1}
            loop={true}
            slidesPerGroup={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            {Data?.map((item: any, idx: number) => {
              return (
                <SwiperSlide key={idx}>
                  <div
                    className="cursor-pointer group w-full "
                    onClick={() =>
                      HandleNavigate(
                        `www.congtyads.com/chi-tiet-bai-viet/${item.url}`
                      )
                    }
                  >
                    <div className="h-[145px] w-full overflow-hidden">
                      <Image
                        width={300}
                        height={200}
                        src={
                          item.image
                            ? item.image
                            : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                        }
                        alt="post"
                        className="object-cover h-full w-full object-center"
                      />
                    </div>
                    <div className="py-2 px-3 mt-2 flex flex-col justify-between h-full">
                      <div>
                        <div className="font-semibold group-hover:underline ">
                          {item.title}
                        </div>
                        <div className="flex py-1 flex-col">
                          <div className="flex items-center gap-1 text-gray-500  text-[14px]">
                            <AiOutlineUser />
                            <p className="">Công Ty ADS</p>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500  pr-5 text-[14px]">
                            <AiOutlineClockCircle />
                            <p className="">{item.date}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-[15px] truncate2">
                          {item.description}
                        </p>
                        <div className="text-red-500  font-normal hover:scale-105 duration-300  cursor-pointer">
                          [Đọc tiếp...]
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Notification;
