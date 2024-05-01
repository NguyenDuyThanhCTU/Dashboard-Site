'use client';
import { extractSrc } from '@components/items/admin/Handle/Handle';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId, updateOne } from '@lib/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const Handle = ({ setIsOpen, branchLength }: any) => {
  const router = useRouter();
  const { FormData, setFormData } = useStateProvider();
  const HandleCheckGoogleMap = () => {
    const url = extractSrc(FormData?.GoogleMap);
    setFormData({ ...FormData, MapUrl: url });
  };
  const HandleSubmit = async () => {
    if (!FormData.title) {
      notification.error({
        message: 'Chi nhánh của bạn chưa được thêm',
        description: 'Vui lòng nhập tên chi nhánh',
      });
    } else if (!FormData.address) {
      notification.error({
        message: 'Chi nhánh của bạn chưa được thêm',
        description: 'Vui lòng nhập địa chỉ chi nhánh',
      });
    } else {
      const Data = { ...FormData, stt: branchLength };
      await insertAndCustomizeId(
        'Branches',
        Data,
        `${branchLength ? 100000000000 + branchLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    }
  };
  return (
    <>
      <div className="   border border-gray-300 rounded-md ">
        <div className="p-4 flex flex-col gap-3 h-[400px] overflow-y-auto scrollbar-thin">
          <InputForm Label="Tên Chi Nhánh" Type="Input" field="title" />
          <InputForm Label="Địa Chỉ" Type="TextArea" field="address" />
          <InputForm
            Label="Thời gian hoạt động"
            Type="Input"
            field="timeactive"
          />

          <div className="flex gap-3 w-full">
            <InputForm Label="Hotline" Type="Input" field="hotline" />
            <InputForm Label="Tên người quản lý" Type="Input" field="name" />
          </div>
          <InputForm Label="Liên kết chỉ đường" Type="Input" field="direct" />

          <div>
            <InputForm
              Label="Vị trí (Google map)"
              Type="Input"
              field="GoogleMap"
            />
            {FormData?.GoogleMap && (
              <div className="flex mt-2 gap-2">
                <div>
                  <div
                    className="py-2 px-5 rounded-lg cursor-pointer bg-lime-400 w-max hover:bg-lime-600 duration-300"
                    onClick={() => HandleCheckGoogleMap()}
                  >
                    Kiểm tra
                  </div>
                </div>
                <iframe
                  src={FormData?.MapUrl}
                  loading="lazy"
                  className="w-full h-full outline-none"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center py-4 gap-4 font-normal text-[16px] ">
        <div
          className="border border-blue-500 text-blue-500 py-2 w-full cursor-pointer rounded-sm text-center hover:text-white hover:bg-blue-500 "
          onClick={() => HandleSubmit()}
        >
          Trở về
        </div>
        <div
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2  w-full cursor-pointer  rounded-sm text-center "
          onClick={() => HandleSubmit()}
        >
          Tiếp tục
        </div>
      </div>
    </>
  );
};

export default Handle;
