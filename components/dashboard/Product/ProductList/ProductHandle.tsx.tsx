'use client';

import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId } from '@lib/api';
import { Tabs, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import slugify from 'slugify';
import Display from './Tab/Display';
import { DynamicForm, SEOForm, StaticForm } from './Tab/Form';
import { ProductCategoryProps } from '@assets/TypeProps';

interface ProductHandleProps {
  setIsOpen: (value: boolean) => void;
  Type?: string;
  Category: ProductCategoryProps[];
  productLength?: number;
  setIsUpdate?: (value: boolean) => void;
}

const ProductHandle = ({
  setIsOpen,
  Type,
  Category,
  productLength,
}: ProductHandleProps) => {
  const { FormData, setFormData } = useStateProvider();
  const router = useRouter();
  useEffect(() => {
    const randomText = Math.floor(Math.random() * 100000000000);
    const headUrl = slugify(`${FormData?.title}-p${randomText}.html`, {
      lower: true,
      locale: 'vi',
    });
    setFormData({
      ...FormData,
      stt: productLength,
      url: `${headUrl}?poid=${
        productLength ? 100000000000 + productLength : 100000000000
      }`,
    });
  }, [FormData.title]);

  const HandleSubmit = async () => {
    if (!FormData?.title) {
      notification.error({ message: 'Vui lòng nhập tên sản phẩm' });
    } else if (!FormData?.level0) {
      notification.error({ message: 'Vui lòng chọn danh mục sản phẩm' });
    } else if (!FormData?.image) {
      notification.error({ message: 'Vui lòng chọn ảnh sản phẩm' });
    } else {
      const level0 = slugify(`${FormData?.level0}`, {
        lower: true,
        locale: 'vi',
      });
      let Data = { ...FormData, level0: level0 };

      await insertAndCustomizeId(
        'Products',
        Data,
        `${productLength ? 100000000000 + productLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });

      router.refresh();
    }
  };

  return (
    <div className="relative h-[60vh] overflow-y-auto scrollbar-thin px-3">
      <Tabs
        tabPosition="top"
        items={[
          {
            key: '1',
            label: `${
              Type === 'update' ? 'Thông tin sản phẩm' : 'Thông tin chi tiết'
            }`,
            children: (
              <>
                {Type === 'update' ? (
                  <Display />
                ) : (
                  <StaticForm Category={Category} />
                )}
              </>
            ),
          },
          {
            key: '2',
            label: `${
              Type === 'update' ? 'Thông tin chi tiết' : 'Thông Tin Khác'
            }`,
            children: (
              <>
                {Type === 'update' ? (
                  <StaticForm Category={Category} />
                ) : (
                  <DynamicForm />
                )}
              </>
            ),
          },
          {
            key: '3',
            label: `${Type === 'update' ? 'Thông tin khác' : 'Cấu hình SEO'}`,
            children: <>{Type === 'update' ? <DynamicForm /> : <SEOForm />}</>,
          },
          {
            key: '4',
            label: `${Type === 'update' ? 'Cấu hình SEO' : ''}`,
            children: <>{Type === 'update' ? <SEOForm /> : <></>}</>,
          },
        ]}
      />

      <>
        <div className="flex w-full justify-end mt-5 pt-3 border-t border-black">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 cursor-pointer text-white p-2 rounded-md"
            onClick={() => HandleSubmit()}
          >
            Cập nhật
          </div>
        </div>
      </>
    </div>
  );
};

export default ProductHandle;
