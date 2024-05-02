'use client';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { updateOne } from '@config/api/api';
import { firebaseConfig } from '@config/firebase/firebase';
import { useAuth } from '@context/AuthProviders';
import { useStateProvider } from '@context/StateProvider';
import { useRouter } from 'next/navigation';
import React from 'react';

const AccountForm = ({ setIsOpen }: any) => {
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();
  const genderItems = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
    { label: 'Khác', value: 'Khác' },
  ];
  const router = useRouter();
  const HandleSubmit = () => {
    updateOne(firebaseConfig, 'Accounts', currentUser.id, FormData).then(() => {
      router.refresh();
      router.push('/login');
    });
  };
  return (
    <div className="">
      <div className="flex flex-col gap-2 pb-4">
        <InputForm Label="Họ Tên" Type="Input" field="name" />
        <InputForm Label="Email" Type="Input" field="email" />
        <InputForm Label="Số Điện Thoại" Type="Input" field="phone" />

        <InputForm Label="Địa Chỉ" Type="Input" field="address" />
        <InputForm Label="Ngày Sinh" Type="DatePicker" field="dateofbirth" />
        <InputForm
          Label="Giới Tính"
          Type="Radio"
          field="gender"
          Option={genderItems}
        />
        <InputForm Label="Giới Thiệu" Type="TextArea" field="introduce" />
        <InputForm Label="Ảnh Đại Diện" Type="Upload" field="image" />
      </div>
      <div className="flex items-center justify-end gap-5  cursor-pointer py-4 border-t">
        <div
          className="py-2 px-6 border rounded-md hover:bg-gray-200 hover:border-gray-500"
          onClick={() => setIsOpen(false)}
        >
          Trở về
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

export default AccountForm;
