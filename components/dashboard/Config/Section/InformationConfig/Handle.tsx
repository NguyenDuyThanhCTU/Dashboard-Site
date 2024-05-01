'use client';

import { useStateProvider } from '@context/StateProvider';
import { updateOne } from '@config/api/api';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@context/AuthProviders';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { HeaderItems } from '@assets/items';

interface HandleFormProps {
  setIsOpen: (isOpen: boolean) => void;
  Logo?: object;
}

export const Handle404Form = ({ setIsOpen }: HandleFormProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();
  const HandleSubmit = async () => {
    await updateOne(
      currentUser.firebaseConfig,
      'Config',
      'information',
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };

  return (
    <div>
      <div className="p-2 flex flex-col gap-2">
        <div className="">
          <InputForm
            Label="Chuyển hướng"
            Type="Radio"
            Option={HeaderItems}
            field={'NotFoundNavigate'}
          />
        </div>

        <InputForm Label="Ảnh hiển thị" Type="Upload" field="ImageNotFound" />

        <div className="flex w-full justify-end pt-2 gap-4">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Trở về
          </div>
          <div
            className="bg-red-500 hover:bg-red-700 duration-300 text-white p-2  px-4 rounded-md cursor-pointer"
            onClick={() => HandleSubmit()}
          >
            Cập nhật
          </div>
        </div>
      </div>
    </div>
  );
};

export const HandleLogoForm = ({ setIsOpen, Logo }: HandleFormProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();

  const HandleSubmit = async () => {
    await updateOne(
      currentUser.firebaseConfig,
      'Config',
      'information',
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };
  return (
    <>
      <div className="p-2 flex flex-col gap-2">
        <div className="">
          <InputForm
            Label="Vị trí của logo"
            Type="Radio"
            Option={Logo}
            field={'LogoPosition'}
          />
        </div>

        <InputForm Label="Tải lên" Type="Upload" field="LogoSnippet" />

        <div className="flex w-full justify-end pt-2 gap-4">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-2 px-4 rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Trở về
          </div>
          <div
            className="bg-red-500 hover:bg-red-700 duration-300 text-white p-2  px-4 rounded-md cursor-pointer"
            onClick={() => HandleSubmit()}
          >
            Cập nhật
          </div>
        </div>
      </div>
    </>
  );
};

export const HandleFacebookForm = ({ setIsOpen }: HandleFormProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();

  const HandleSubmit = async () => {
    await updateOne(
      currentUser.firebaseConfig,
      'Config',
      'information',
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };
  return (
    <>
      <div className="flex flex-col gap-3 p-2  border-b ">
        <InputForm Label="Tiêu đề" Type="Input" field="ogtitle" />
        <InputForm Label="Mô tả" Type="TextArea" field="ogdescription" />
        <InputForm Label="Hình ảnh" Type="Upload" field="ogimage" />
      </div>
      <div className="flex w-full justify-end pt-2 gap-4">
        <div
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-2 px-4 rounded-md cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Trở về
        </div>
        <div
          className="bg-red-500 hover:bg-red-700 duration-300 text-white p-2  px-4 rounded-md cursor-pointer"
          onClick={() => HandleSubmit()}
        >
          Cập nhật
        </div>
      </div>
    </>
  );
};

export const HandleTwitterForm = ({ setIsOpen }: HandleFormProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();

  const HandleSubmit = async () => {
    await updateOne(
      currentUser.firebaseConfig,
      'Config',
      'information',
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };
  return (
    <>
      <div className="flex flex-col gap-3 p-2  border-b ">
        <InputForm Label="Tiêu đề" Type="Input" field="twtitle" />
        <InputForm Label="Mô tả" Type="TextArea" field="twdescription" />
        <InputForm Label="Hình ảnh" Type="Upload" field="twimage" />
      </div>
      <div className="flex w-full justify-end pt-2 gap-4">
        <div
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-2 px-4 rounded-md cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Trở về
        </div>
        <div
          className="bg-red-500 hover:bg-red-700 duration-300 text-white p-2  px-4 rounded-md cursor-pointer"
          onClick={() => HandleSubmit()}
        >
          Cập nhật
        </div>
      </div>
    </>
  );
};

export const HandleGoogleForm = ({ setIsOpen }: HandleFormProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();

  const HandleSubmit = async () => {
    await updateOne(
      currentUser.firebaseConfig,
      'Config',
      'information',
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };
  return (
    <>
      <div className="flex flex-col gap-3 p-2  border-b ">
        <InputForm
          Label="Mã Google Analytics"
          Tips='Mã đo lường lấy từ Google Analytics có dạng: "G-XYZ"'
          Type="Input"
          field="analytics"
        />
        <InputForm
          Label="Mã Remakerting"
          Tips="Mã đo lường lấy từ Google Adwords"
          Type="Input"
          field="remakerting"
        />
        <InputForm
          Label="Nhúng Live Chat"
          Tips="Pop-Up live chat nhúng từ bên thứ 3: tawk.to, popupsmart.com, ..."
          Type="TextArea"
          field="livechat"
        />
      </div>
      <div className="flex w-full justify-end pt-2 gap-4">
        <div
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white py-2 px-4 rounded-md cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Trở về
        </div>
        <div
          className="bg-red-500 hover:bg-red-700 duration-300 text-white p-2  px-4 rounded-md cursor-pointer"
          onClick={() => HandleSubmit()}
        >
          Cập nhật
        </div>
      </div>
    </>
  );
};
