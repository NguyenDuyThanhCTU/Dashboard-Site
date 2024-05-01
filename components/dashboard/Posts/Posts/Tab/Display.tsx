'use client';
import { PostsTypeItems, WebsiteUrl } from '@assets/item';
import { useStateProvider } from '@context/StateProvider';
import Link from 'next/link';
import React from 'react';

const Display = () => {
  const { FormData } = useStateProvider();

  return (
    <div>
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
        <div className="p-4  text-[20px] font-LexendDeca">
          <div className="col-span-4 text-gray-600 flex flex-col gap-5">
            <div className="">
              <h3 className="font-bold">Thông tin bài viết</h3>

              <div className="border rounded-xl border-black mt-3">
                <div className="text-[18px] ml-2 mt-3 grid grid-cols-1 w-full gap-2 p-2 overflow-y-auto">
                  <li className="">
                    Tiêu đề bài viết:{' '}
                    <span className="underline">{FormData?.title}</span>
                  </li>

                  <div className="flex items-center gap-2">
                    <p> Mã bài viết:</p>
                    <div className="rounded-md px-3 py-1 bg-gray-200">
                      #{FormData?.id}
                    </div>
                  </div>

                  <li>
                    Trạng thái: <span className="text-green-500">Hiển thị</span>
                  </li>
                  <li>
                    Ngày tạo: <strong> {FormData.date}</strong>
                  </li>
                  <li>
                    Lượt xem: <strong> {FormData?.view}</strong>
                  </li>

                  <div className="border rounded-md bg-slate-100">
                    <div className="p-2">
                      {' '}
                      <li>
                        Danh mục:{' '}
                        {
                          PostsTypeItems.find(
                            (item) => item.value === FormData?.level0
                          )?.label
                        }
                      </li>
                      <li>Danh mục con: {FormData?.level1}</li>
                      <li>Topic: </li>
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
              <h3 className="font-bold">Thẻ mô tả: </h3>
              <div className="min-h-20 border rounded-md">
                <div className="p-3">
                  {FormData.description ? FormData.description : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
