'use client';
import { PostsTypeItems, WebsiteUrl } from '@assets/item';
import HandleKeyword from '@components/items/admin/Handle/Keyword';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import Link from 'next/link';
import React, { useState } from 'react';

export const StaticForm = ({
  DataFilter,
}: {
  DataFilter: { label: string; value: string }[];
}) => {
  const { FormData, setFormData } = useStateProvider();
  return (
    <form className="flex flex-col gap-3 overflow-y-auto h-[60vh]">
      <div className="grid grid-cols-2 gap-5">
        {' '}
        <div className="flex flex-col gap-2">
          <InputForm Label="Tiêu đề bài viết" Type="Input" field="title" />{' '}
          {FormData?.level0 !== 'policy' && (
            <InputForm Label="Ảnh đại diện" Type="Upload" field="image" />
          )}
        </div>
        <div className="flex flex-col  gap-2">
          <InputForm
            Label="Loại bài viết"
            Type="Select"
            field="level0"
            Option={PostsTypeItems}
          />{' '}
          {FormData?.level0 !== 'policy' && (
            <InputForm
              Label="Mục bài viết"
              Type="Select"
              field="level1"
              Option={DataFilter}
            />
          )}
          <div className="flex gap-2 items-center">
            <label>Dịch vụ nổi bật: </label>
            <input
              type="checkbox"
              onChange={(e) => {
                setFormData({
                  ...FormData,
                  isHighlight: e.target.checked,
                });
              }}
            />
          </div>
        </div>
      </div>
      <InputForm Label="Chi Tiết" Type="Editor" field="content" />
      <InputForm Label="Mô tả" Type="TextArea" field="description" />
    </form>
  );
};

export const SEOForm = () => {
  const { FormData } = useStateProvider();
  return (
    <>
      <form className="font-LexendDeca">
        <Link
          target="_blank"
          href={`https://www.google.com/search?q=${WebsiteUrl}/chi-tiet-bai-viet/${FormData?.url}`}
        >
          <div className="border rounded-md border-black hover:shadow-2xl duration-300 mt-3 cursor-pointer">
            <div className=" flex flex-col px-5 py-3 text-[18px] font-normal">
              <h2 className="text-[#1a0dab]  text-[30px] font-semibold">
                {FormData?.title === undefined ? <>N/A</> : FormData?.title}
              </h2>
              <p className="text-[#006621]">
                {WebsiteUrl}/{FormData?.url}
              </p>
              <p className="">
                {FormData?.description === undefined
                  ? 'N/A'
                  : FormData?.description}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex  flex-col gap-2 mt-5">
          <InputForm
            PlaceHolder={FormData?.title}
            Label="Thẻ tiêu đề trang"
            Type="Input"
            field="title"
          />
          <InputForm Label="Đường dẫn" Type="Input" field="url" />

          <InputForm Label="Thẻ mô tả" Type="Input" field="description" />
          <HandleKeyword />
        </div>
      </form>
    </>
  );
};
