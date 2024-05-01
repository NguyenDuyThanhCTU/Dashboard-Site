'use client';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import React from 'react';

const ChangePass = ({ setIsOpen }: any) => {
  const { FormData } = useStateProvider();
  const HandleSubmit = () => {};
  return (
    <div className="">
      <div className="flex flex-col gap-2 pb-4">
        <InputForm Label="Mật khẩu cũ" Type="Password" field="password" />
        <InputForm Label="Mật khẩu mới" Type="Password" field="newpassword" />
        <InputForm
          Label="Nhập lại mật khẩu mới"
          Type="Password"
          field="retype"
        />
      </div>
      <div className="flex items-center justify-end gap-5  cursor-pointer py-4 border-t">
        <div
          className="py-2 px-6 border rounded-md hover:bg-gray-200 hover:border-gray-500"
          onClick={() => setIsOpen(false)}
        >
          Thoát
        </div>
        <div
          className="py-2 px-6 bg-red-500 rounded-md text-white hover:bg-red-700"
          onClick={() => HandleSubmit()}
        >
          Cập nhật
        </div>
      </div>
    </div>
  );
};

export default ChangePass;
