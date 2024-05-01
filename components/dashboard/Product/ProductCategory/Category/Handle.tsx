'use client';
import { ProductTypeItems } from '@assets/item';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId } from '@lib/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ProductCategoryFormProps {
  setIsOpen: (isOpen: boolean) => void;
  categoryLength: number;
  Type?: string;
}

const ProductCategoryForm = ({
  setIsOpen,
  categoryLength,
  Type,
}: ProductCategoryFormProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();

  const HandleSubmit = async () => {
    if (FormData?.level0 === undefined) {
      notification.error({
        message: 'Vui lòng chọn loại sản phẩm',
      });
    } else if (FormData?.level1 === undefined) {
      notification.error({
        message: 'Vui lòng chọn mục sản phẩm',
      });
    } else {
      let Data = { ...FormData, stt: categoryLength };

      await insertAndCustomizeId(
        'ProductCategory',
        Data,
        `${categoryLength ? 100000000000 + categoryLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    }
  };

  return (
    <div>
      {Type === 'update' ? (
        <div className="flex flex-col gap-2">
          <InputForm
            Label="Mục sản phẩm"
            Type="Input"
            field="level1"
            PlaceHolder={FormData?.level1}
          />
          <div className="flex w-full justify-end">
            <div
              className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
              onClick={() => HandleSubmit()}
            >
              Cập nhật
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 flex flex-col gap-2">
          <InputForm
            Label="Loại sản phẩm"
            Type="Select"
            field="level0"
            Option={ProductTypeItems}
          />
          <InputForm Label="Mục sản phẩm" Type="Input" field="level1" />

          <div className="flex w-full justify-end ">
            <div
              className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
              onClick={() => HandleSubmit()}
            >
              Tải lên
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCategoryForm;
