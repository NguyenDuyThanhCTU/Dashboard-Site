'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Notification from './Home/Notification';
import localFont from 'next/font/local';

import Link from 'next/link';
import { Modal } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { FcGlobe, FcSmartphoneTablet } from 'react-icons/fc';
import ReportCard from './items/UI/ReportCard';
import { FunctionItem } from '@components/layout/dashboard/items/items';
import { WebsiteUrl } from '@assets/items';
import { PostProps } from '@assets/props';
import { useAuth } from '@context/AuthProviders';

const AdminPage = ({ Data }: { Data: PostProps }) => {
  const [isNotification, setIsNotification] = useState(true);
  const { HandleDashboardNavigate } = useAuth();
  return (
    <>
      <div className="d:w-[1200px] p:mx-auto mx-auto flex flex-col gap-5">
        <div className="grid p:grid-cols-2 d:grid-cols-4 gap-3">
          {/* <ReportCard Label="Tổng Số Sản Phẩm" Value={Products?.length} />
          <ReportCard Label="Tổng Số Tin Tức" Value={Posts?.length} /> */}
          <ReportCard Label="Tổng Số Truy Cập" />
          <ReportCard Label="Tổng Số Thông Báo" />
        </div>
        <div className="py-5 grid p:grid-cols-1 d:grid-cols-8 p:gap-0 d:gap-10 ">
          <div className=" d:col-span-2">
            <Notification Data={Data} />
          </div>
          <div className="grid p:grid-cols-2 d:grid-cols-4 gap-5 w-full col-span-6">
            {FunctionItem.map((item, idx) => (
              <div
                onClick={() => HandleDashboardNavigate(`${item.value}`)}
                key={idx}
              >
                <div className="grid grid-rows-3  justify-center p-2 items-center gap-2 border cursor-pointer hover:bg-[#F2F2F2] duration-300 h-[196px]">
                  <div className="row-span-2 h-full w-full justify-center items-center flex">
                    <div className="h-[80px] w-[80px] relative  ">
                      <Image
                        src={
                          item.image
                            ? item.image
                            : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                        }
                        alt={item.label}
                        fill
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-center font-light text-[18px]">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <Modal
        open={isNotification}
        closeIcon={null}
        footer={null}
        width={500}
        className="custom-ant"
        centered
        onCancel={() => setIsNotification(false)}
      >
        <div className="p-1 bg-main ">
          <div className="h-[600px] flex  flex-col justify-between w-full bg-center relative">
            <div className="text-white flex flex-col justify-center items-center pt-1 z-20">
              <p className={`${UTMFleur.className} text-[50px] leading-7`}>
                Thông tin
              </p>
              <h2 className={`${iCielBC.className} text-[60px]`}>Website</h2>
            </div>

            <div className="bg-[rgba(255,255,255,0.77)] w-max ml-5 rounded-lg font-LexendDeca font-normal d:text-[18px] p:text-[14px] lg:text-[18px] z-20">
              <div className="p-2">
                <p>Thông Tin Website: {WebsiteUrl}</p>
                <p>Ngày Đăng Ký: 19/03/2024</p>
                <p>Ngày Hết Hạn: 19/03/2025</p>
              </div>
            </div>
            <div></div>
            <div></div>
            <div className="text-white font-LexendDeca font-light bg-[rgba(0,0,0,0.68)] pl-5 py-2 z-20">
              <h3 className="text-[18px] font-bold">
                Thông tin liên hệ gia hạn website:
              </h3>
              <div className="pl-5 d:flex-row p:flex-col flex p:gap-0 d:gap-5 text-[14px]">
                <div className="flex gap-1 items-center ">
                  <FcSmartphoneTablet className="text-[22px]" />
                  <div>
                    <strong className="">Hotline: </strong>
                    <Link
                      href={`tel:0911 906 349`}
                      className=" hover:underline"
                    >
                      0911 906 349
                    </Link>
                  </div>
                </div>
                <div className="flex gap-1 items-center ">
                  <FcGlobe className="text-[22px]" />
                  <div className="">
                    <strong>Website: </strong>
                    <Link
                      href={`https://www.google.com/search?q=www.congtyads.com`}
                      className=" hover:underline hover:text-blue-600"
                    >
                      www.congtyads.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full absolute z-10 ">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/congtyads-33180.appspot.com/o/Thoong.jpg?alt=media&token=ad46626c-b9c5-4a2b-835d-e323b4b74f8f"
                alt="background"
                width={500}
                height={600}
                className="h-full"
              />
            </div>
          </div>
          <div
            className="bg-gray-200 text-gray-600 text-[25px] p-1 absolute -top-8 -right-8 rounded-full cursor-pointer"
            onClick={() => setIsNotification(false)}
          >
            <RxCross2 />
          </div>
        </div>
      </Modal> */}
    </>
  );
};

export default AdminPage;
