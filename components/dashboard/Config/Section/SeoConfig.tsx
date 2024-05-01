'use client';
import { useStateProvider } from '@context/StateProvider';
import { Modal } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AdvanceSEOBox, BasicSEOBox } from './SeoConfig/Display';
import { ContactProps, SEOProps } from '@assets/props';
import { AdvanceSEOForm, BasicSEOForm } from './SeoConfig/Handle';

const SeoConfig = ({ Data }: { Data: Array<any> }) => {
  const [isOpenBasicSEO, setIsOpenBasicSEO] = useState(false);
  const [isOpenAdvanceSEO, setIsOpenAdvanceSEO] = useState(false);
  const { setFormData } = useStateProvider();
  const contactData: ContactProps = Data?.find(
    (item: any) => item.id === 'contact'
  );
  const SEOconfigData: SEOProps = Data?.find(
    (item: any) => item.id === 'SEOconfig'
  );
  const HandleOpen = (type: string) => {
    if (type === 'Basic') {
      setIsOpenBasicSEO(true);
      setFormData(Data);
    }
    if (type === 'Advance') {
      setIsOpenAdvanceSEO(true);
    }
  };

  return (
    <>
      <div className="py-5 ">
        <div className="w-full p:px-0 d:px-10 font-light">
          <div className="">
            <h1 className="text-[30px] font-semibold"> Cấu Hình SEO</h1>
            <p className=" text-gray-500">
              Bổ sung đầy đủ thông tin SEO để website của bạn có thể được tìm
              thấy trên các công cụ tìm kiếm
            </p>
          </div>
          <Link
            href={`https://www.google.com/search?q=${contactData.WebsiteAddress}`}
            target="_blank"
          >
            <div className="border rounded-md border-black hover:shadow-2xl duration-300 mt-3 cursor-pointer">
              <div className="flex p-5 gap-3 flex-col">
                <div className="">Kết quả tìm kiếm:</div>
                <div className=" flex flex-col p:ml-0 d:ml-10">
                  <h2 className="text-[#1a0dab]  flex items-center gap-3">
                    <Image
                      src={
                        SEOconfigData?.Favicon
                          ? SEOconfigData.Favicon
                          : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                      }
                      alt="Logo"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />{' '}
                    <div>
                      <p className="text-[22px] font-normal">
                        {SEOconfigData?.Title}
                      </p>
                      <p className="text-[#006621] ">
                        {contactData.WebsiteAddress}
                      </p>
                    </div>
                  </h2>

                  <p className="mt-3">{SEOconfigData?.Description}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="py-5 ">
        <div className="w-full  mt-3 grid p:grid-cols-1 d:grid-cols-2 p:px-0 d:px-10 font-light gap-5">
          <div className=" border border-black shadow-sm bg-white rounded-md  ">
            <BasicSEOBox setIsOpen={HandleOpen} Data={SEOconfigData} />
          </div>
          <div className=" border border-black shadow-sm bg-white rounded-md  ">
            <AdvanceSEOBox setIsOpen={HandleOpen} />
          </div>
        </div>
        <Modal
          title="Cấu hình SEO cơ bản"
          footer={null}
          open={isOpenBasicSEO}
          onCancel={() => setIsOpenBasicSEO(false)}
          destroyOnClose={true}
          afterClose={() => setFormData({})}
        >
          <BasicSEOForm setIsOpen={setIsOpenBasicSEO} />
        </Modal>
        <Modal
          title="Cấu hình SEO nâng cao"
          footer={null}
          width={800}
          open={isOpenAdvanceSEO}
          onCancel={() => setIsOpenAdvanceSEO(false)}
          destroyOnClose={true}
          afterClose={() => setFormData({})}
        >
          <AdvanceSEOForm setIsOpen={setIsOpenAdvanceSEO} />
        </Modal>
      </div>
    </>
  );
};

export default SeoConfig;
