'use client';

import { HeaderItems } from '@assets/items';
import HandleKeyword from '@components/dashboard/items/Handle/Keyword';
import InputForm from '@components/dashboard/items/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { findOne, insertOne, updateOne } from '@config/api/api';
import { Slider } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useAuth } from '@context/AuthProviders';

export const BasicSEOForm = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const router = useRouter();
  const { FormData } = useStateProvider();
  const { currentUser } = useAuth();
  const HandleSubmit = async () => {
    await updateOne(
      currentUser.firebaseConfig,
      'Config',
      'SEOconfig',
      FormData
    ).then(() => {
      setIsOpen(false);
      router.refresh();
    });
  };
  return (
    <div className="p-2 flex flex-col gap-2">
      <InputForm Label="Tiêu đề trang" Type="Input" field="Title" />
      <InputForm Label="Thẻ mô tả" Type="Input" field="Description" />
      <InputForm Label="Favicon" Type="Upload" field="Favicon" />

      <HandleKeyword />
      <div className="flex w-full justify-end">
        <div
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
          onClick={() => HandleSubmit()}
        >
          Cập nhật
        </div>
      </div>
    </div>
  );
};

export const AdvanceSEOForm = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { FormData, setFormData } = useStateProvider();
  const router = useRouter();
  const { currentUser } = useAuth();
  const HandleSubmit = async () => {
    if (FormData?.Type === 'Robots') {
      await updateOne(
        currentUser.firebaseConfig,
        'Config',
        'SEOconfig',
        FormData
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    } else {
      findOne(
        currentUser.firebaseConfig,
        'SEO',
        'subUrl',
        FormData?.subUrl
      ).then((res: any) => {
        if (res.length > 0) {
          updateOne(currentUser.firebaseConfig, 'SEO', 'subUrl', FormData).then(
            () => {
              setIsOpen(false);
              router.refresh();
            }
          );
        } else {
          insertOne(currentUser.firebaseConfig, 'SEO', FormData).then(() => {
            setIsOpen(false);
            router.refresh();
          });
        }
      });
    }
  };

  const OptionItems = [
    {
      label: 'Cấu hình file robots.txt',
      value: 'Robots',
    },
    {
      label: 'Cấu hình file sitemap.xml',
      value: 'SiteMap',
    },
  ];

  const RobotsItems = [
    {
      label: 'Cho phép tất cả',
      value: '*',
    },
    {
      label: 'Chỉ cho phép tìm thấy trên Google',
      value: 'Googlebot',
    },
    {
      label: 'Chỉ cho phép tìm thấy trên Bing',
      value: 'Bingbot',
    },
  ];
  if (HeaderItems[0].label === 'Trang Chủ') {
    HeaderItems.shift();
  }

  const FrequencyItems = [
    {
      label: 'Hàng ngày',
      value: 'daily',
    },
    {
      label: 'Hàng tuần',
      value: 'weekly',
    },
    {
      label: 'Hàng tháng',
      value: 'monthly',
    },
    {
      label: 'Hàng năm',
      value: 'yearly',
    },
    {
      label: 'Không xác định',
      value: 'never',
    },
  ];
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="border border-black rounded-lg  pb-2">
        <div className="p-2">
          <InputForm
            Label="Loại cấu hình"
            Type="Radio"
            field="Type"
            Option={OptionItems}
          />
        </div>
      </div>
      {FormData?.Type === 'Robots' ? (
        <>
          <InputForm
            Label="Robots"
            Type="Select"
            field="UserAgent"
            Option={RobotsItems}
          />
        </>
      ) : (
        FormData?.Type === 'SiteMap' && (
          <>
            {' '}
            <InputForm
              Label="Chọn tuyến đường"
              Type="Select"
              field="subUrl"
              Option={HeaderItems}
            />
            {FormData?.subUrl && (
              <div className=" rounded-lg border border-red-300 my-3">
                <div className="p-4">
                  <InputForm
                    Label="Tần suất cập nhật"
                    Type="Select"
                    field="frequency"
                    Option={FrequencyItems}
                  />

                  <div className="mt-3">
                    <h2>Độ ưu tiên</h2>
                    <Slider
                      min={0}
                      max={100}
                      onChange={(e) =>
                        setFormData({ ...FormData, priority: e })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )
      )}

      <div className="flex w-full justify-end ">
        <div
          className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
          onClick={() => HandleSubmit()}
        >
          Tải lên
        </div>
      </div>
    </div>
  );
};
