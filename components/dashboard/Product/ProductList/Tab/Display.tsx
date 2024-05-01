import { WebsiteUrl } from '@assets/item';
import { convertDate } from '@components/items/admin/Handle/Handle';
import { useStateProvider } from '@context/StateProvider';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoMdStar } from 'react-icons/io';

const Display = () => {
  const { FormData, HandleNavigate } = useStateProvider();
  return (
    <div>
      <Link
        href={`https://www.google.com/search?q=${WebsiteUrl}/chi-tiet-san-pham/${FormData?.url}`}
      >
        <div className="border rounded-md border-black hover:shadow-2xl duration-300 mt-3 cursor-pointer">
          <div className=" flex flex-col px-5 py-3 text-[18px] font-normal">
            <h2 className="text-[#1a0dab]  text-[30px] font-semibold">
              {FormData?.title === undefined ? <>N/A</> : FormData?.title}
            </h2>
            <p className="text-[#006621]">
              {WebsiteUrl}/{FormData?.url}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-4 font-LexendDeca font-light">
        <div className="p-4 grid grid-cols-6 gap-5 text-[20px]">
          <div className="col-span-2">
            <div className="p-3  bg-slate-100 ">
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center">
                  <Image
                    src={FormData?.image}
                    alt="Product"
                    width={100}
                    height={100}
                    className=" rounded-md"
                  />
                  <p className="text-[20px] font-normal text-center mt-2">
                    {FormData?.title}
                  </p>
                </div>
                <div className="mt-5">
                  <p className="text-center font-light ">
                    {FormData?.evaluate ? FormData?.evaluate : 'N/A'} Đánh giá
                  </p>
                  <div className="text-yellow-400 flex items-center text-[20px] gap-1">
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                    <IoMdStar />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 text-gray-600 flex flex-col gap-5">
            <div className="">
              <h3 className="font-bold">Thông tin sản phẩm</h3>

              <div className="border rounded-xl border-black mt-3">
                <div className="text-[18px] ml-2 mt-3 grid grid-cols-1 w-full gap-2 p-2 overflow-y-auto">
                  <li className="">
                    Tên sản phẩm:{' '}
                    <span className="underline">{FormData?.title}</span>
                  </li>

                  <div className="flex items-center gap-2">
                    <p> Mã sản phẩm:</p>
                    <div className="rounded-md px-3 py-1 bg-gray-200">
                      #{FormData?.id}
                    </div>
                  </div>
                  <li>
                    Giá sản phẩm:{' '}
                    {FormData?.price ? (
                      <strong className="text-red-500">
                        {FormData?.price} VNĐ
                      </strong>
                    ) : (
                      <strong className="text-gray-400">N/A</strong>
                    )}
                  </li>

                  <li>
                    Trạng thái:{' '}
                    {FormData?.status === 'inStock' ? (
                      <span className="text-blue-500">Còn Hàng</span>
                    ) : FormData?.status === 'outOfStock' ? (
                      <span className="text-red-500">Hết Hàng</span>
                    ) : (
                      <span className="text-green-500">Đang cập nhật</span>
                    )}
                  </li>
                  <li>
                    Ngày tạo: <strong> {FormData?.date}</strong>
                  </li>
                  <li>
                    Lượt xem: <strong> {FormData?.view}</strong>
                  </li>

                  <div className="border rounded-md bg-slate-100">
                    <div className="p-2">
                      {' '}
                      <li>Danh mục: {FormData?.level0}</li>
                      <li>Danh mục con: {FormData?.level1}</li>
                    </div>
                  </div>
                  <li>
                    lượt đánh giá:{' '}
                    <strong>
                      {FormData?.evaluate ? FormData?.evaluate : 'N/A'} Đánh giá
                    </strong>
                  </li>
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="font-bold">Thông tin Sale</h3>
              <div
                className="cursor-pointer hover:text-blue-500 hover:underline"
                onClick={() => HandleNavigate(`/admin?tab=danh-muc-san-pham`)}
              >
                chuyển hướng đến sale
              </div>
            </div>
            <div className="">
              <h3 className="font-bold">Mô tả sản phẩm</h3>
              <div
                dangerouslySetInnerHTML={
                  FormData?.describe
                    ? { __html: FormData?.describe }
                    : { __html: '' }
                }
              ></div>
            </div>
            <div className="">
              <h3 className="font-bold">Chi tiết sản phẩm</h3>
              <div
                className="truncate"
                dangerouslySetInnerHTML={
                  FormData?.detail
                    ? { __html: FormData?.detail }
                    : { __html: '' }
                }
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
