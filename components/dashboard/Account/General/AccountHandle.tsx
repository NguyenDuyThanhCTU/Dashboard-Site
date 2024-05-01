'use client';
import { AccountProps } from '@assets/TypeProps';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId } from '@lib/api';
import { notification } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface AccountFormProps {
  accountLength: number;
  Data: AccountProps[];
  setIsOpen: (isOpen: boolean) => void;
  Type?: string;
}

const AccountForm = ({
  accountLength,
  Data,
  setIsOpen,
  Type,
}: AccountFormProps) => {
  const { FormData } = useStateProvider();
  const [SelectedAvatar, setSelectedAvatar] = useState<string>(
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F1.png?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb'
  );
  const RoleItems = [
    {
      value: 'editor',
      label: 'Biên tập viên',
    },
    {
      value: 'user',
      label: 'Người Dùng',
    },
    {
      value: 'admin',
      label: 'Quản trị viên',
    },
  ];

  const StatusItems = [
    {
      value: 'active',
      label: 'Hoạt động',
    },
    {
      value: 'block',
      label: 'Khóa',
    },
  ];
  const router = useRouter();

  const HandleSubmit = async () => {
    if (Type === 'update') {
      await insertAndCustomizeId(
        'Accounts',
        FormData,
        `${accountLength ? 100000000000 + accountLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    } else {
      const sort = Data?.filter(
        (item: any) => item.username === FormData.username
      );

      if (!FormData.username || !FormData.password || !FormData.role) {
        notification.info({
          message: 'Thêm thành viên không thành công',
          description: 'Vui lòng bổ sung đầy đủ thông tin!',
        });
      } else if (FormData.password !== FormData.retype) {
        notification.info({
          message: 'Thêm thành viên không thành công',
          description: 'Mật khẩu không trùng khớp!',
        });
      } else if (sort?.length > 0) {
        notification.info({
          message: 'Thêm thành viên không thành công',
          description: 'Tài khoản đã tồn tại!',
        });
      } else {
        let Data = {
          ...FormData,
          stt: accountLength,
          status: 'active',
          image: SelectedAvatar,
        };
        delete Data.retype;
        await insertAndCustomizeId(
          'Accounts',
          Data,
          `${accountLength ? 100000000000 + accountLength : 100000000000}`
        ).then(() => {
          setIsOpen(false);
          router.refresh();
        });
      }
    }
  };
  //tranaita52@gmail.com [CongTyADS]
  const AvatarItems = [
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F1.png?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F2.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F3.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F4.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F5.jpg?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
    'https://firebasestorage.googleapis.com/v0/b/adminads-11c80.appspot.com/o/st%2F7.png?alt=media&token=bff2fa1f-fc95-44fe-8315-ab742f471cbb',
  ];

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div>
        <Image
          src={FormData.image ? FormData.image : SelectedAvatar}
          alt="avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h2 className="text-[22px]">
        Thêm thành viên mới cho website của bạn!!!
      </h2>
      <div className="border w-full">
        <div className="m-4 flex flex-col gap-3">
          <div className="">
            <label>Ảnh đại diện</label>
            <div className="flex flex-wrap gap-3  my-3">
              {AvatarItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    item === SelectedAvatar
                      ? 'border-red-700 scale-110'
                      : 'border-gray-500'
                  } cursor-pointer border-2 rounded-full  hover:border-red-700 hover:scale-110 duration-100`}
                  onClick={() => setSelectedAvatar(item)}
                >
                  <Image
                    src={
                      item
                        ? item
                        : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full object-center w-[50px] h-[50px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <InputForm Label="Tên thành viên" Type="Input" field="name" />
          <InputForm Label="Tài khoản" Type="Input" field="username" />
          <InputForm Label="Mật khẩu" Type="Password" field="password" />
          <InputForm Label="Nhập lại mật khẩu" Type="Password" field="retype" />
          <InputForm
            Label="Vai Trò"
            Type="Select"
            field="role"
            Option={RoleItems}
          />
          {Type === 'update' && (
            <InputForm
              Label="Trạng thái"
              Type="Select"
              field="status"
              Option={StatusItems}
            />
          )}

          <div className="flex items-center cursor-pointer gap-3 justify-center mt-2">
            <div className="py-2 px-4 border text-black hover:bg-gray-200 duration-300 hover:border-gray-400">
              Thoát
            </div>
            <div
              className="py-2 px-4 bg-red-500 hover:bg-red-700 duration-300 text-white"
              onClick={() => HandleSubmit()}
            >
              {Type === 'update' ? 'Cập nhật' : 'Thêm'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
