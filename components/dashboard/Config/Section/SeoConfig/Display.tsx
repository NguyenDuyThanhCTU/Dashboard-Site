'use client';

import { ContactProps, SEOProps } from '@assets/props';
import HeaderBox from '@components/dashboard/items/UI/HeaderBox';
import { useStateProvider } from '@context/StateProvider';
import { Tooltip } from 'antd';
import Image from 'next/image';
import React from 'react';
import { FaRegCircleQuestion } from 'react-icons/fa6';

interface SEOBoxProps {
  setIsOpen: (isOpen: string) => void;
  Data?: SEOProps;
}

type BasicSEOItemsProps = {
  label: string;
  value: SEOProps[keyof SEOProps];
  tooltip: string;
};

export const BasicSEOBox = ({ setIsOpen, Data }: SEOBoxProps) => {
  const BasicSEOItems: BasicSEOItemsProps[] = [
    {
      label: 'Tiêu đề trang ',
      value: Data?.Title,
      tooltip: '',
    },

    {
      label: 'Thẻ mô tả',
      value: Data?.Description,
      tooltip: '',
    },

    {
      label: 'Favicon',
      value: Data?.Favicon,
      tooltip: '',
    },
  ];
  return (
    <div className="p-4 flex flex-col gap-1">
      <HeaderBox
        Title="Cấu hình SEO cơ bản"
        ClickedProps={() => setIsOpen('Basic')}
        Description="Cập nhật thông tin website của bạn cho tương tác của khách hàng"
      />

      <div className="mt-4">
        {BasicSEOItems.map((item, idx) => (
          <div
            key={idx}
            className={`${
              idx === BasicSEOItems.length - 1 ? 'border-y' : 'border-t '
            } grid grid-cols-6  border-x `}
          >
            <div className="py-2 pr-3 border-r flex items-center gap-2 col-span-2 w-full justify-end">
              {' '}
              <p> {item.label}</p>{' '}
              {item.tooltip && (
                <Tooltip title={item.tooltip}>
                  <div className="">
                    <FaRegCircleQuestion />
                  </div>
                </Tooltip>
              )}
              :{' '}
            </div>
            {item.label === 'Vị trí (Google map)' ? (
              <></>
            ) : item.label === 'Favicon' ? (
              <div className="py-2 flex items-center  ml-2">
                <Image
                  src={
                    item.value
                      ? item.value
                      : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                  }
                  alt="logo website"
                  width={100}
                  height={100}
                ></Image>
              </div>
            ) : (
              <div className="col-span-4 pl-2 py-2 text-gray-00">
                {item.value}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-2">
        <div className="py-2 pr-3 flex items-center gap-2 col-span-1 w-full justify-end">
          Từ khóa SEO:
        </div>
        <div className="col-span-6 pl-2 py-2 flex flex-wrap gap-2">
          {Data?.Keyword?.map((item: any, idx: number) => (
            <div key={idx} className="border bg-slate-200 rounded-full">
              <div className="w-max py-1 px-3">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdvanceSEOBox = ({
  setIsOpen,
  Data,
}: {
  setIsOpen: (isOpen: string) => void;
  Data: ContactProps;
}) => {
  const { HandleNavigate } = useStateProvider();
  return (
    <div className="p-4 flex flex-col gap-1">
      <HeaderBox
        Title="Cấu hình SEO Nâng Cao"
        ClickedProps={() => setIsOpen('Advance')}
        Description=""
      />

      <div className="mt-4"></div>
      <div className="mt-2 flex flex-col gap-2">
        <div className="grid grid-cols-7 ">
          <div className="py-2 pr-3 flex items-center gap-2 col-span-2 w-full justify-end">
            Đường dẫn tới file robot:
          </div>
          <div
            className="col-span-5 pl-2 py-2 flex gap-2 overflow-auto scrollbar-thin text-[#006621] cursor-pointer"
            onClick={() => HandleNavigate(`${Data.WebsiteAddress}/robots.txt`)}
          >
            {Data.WebsiteAddress}/robots.txt
          </div>
          <div className="py-2 pr-3 flex items-start gap-2 col-span-2 w-full justify-end mt-2 ">
            Nội dung file robots.txt:
          </div>
          <div className="col-span-5 pl-2 py-2 flex gap-2 border rounded-lg border-gray-500 mt-2 bg-slate-100">
            <div className="p-2">
              User-agent: * <br />
              Allow: /<br /> Disallow: /admin
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 ">
          <div className="py-2 pr-3 flex items-center gap-2 col-span-2 w-full justify-end">
            Đường dẫn tới file sitemap.xml:
          </div>
          <div className="col-span-5 pl-2 py-2 flex gap-2 overflow-auto scrollbar-thin text-[#006621] cursor-pointer">
            {Data.WebsiteAddress}/sitemap.xml
          </div>
          <div className="py-2 pr-3 flex items-start gap-2 col-span-2 w-full justify-end mt-2 ">
            Nội dung file sitemap.xml:
          </div>
          <div className="col-span-5 pl-2 py-2 flex gap-2 border rounded-lg border-gray-500 mt-2 bg-slate-100">
            <div className="p-2 overflow-auto">
              {`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc${Data.WebsiteAddress}</loc>
        <lastmod>2023-04-06T15:02:24.021Z</lastmod>
        <changefreq>yearly</changefreq>
        <priority>1</priority>
      </url>
     ...
    </urlset>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
