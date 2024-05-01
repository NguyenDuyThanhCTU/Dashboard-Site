'use client';
import { PostsTypeItems } from '@assets/item';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId } from '@lib/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PostsCategoryFormProps {
  setIsOpen: (isOpen: boolean) => void;
  CategoryLength: number;
  Type?: string;
}

const PostsCategoryForm = ({
  setIsOpen,
  CategoryLength,
  Type,
}: PostsCategoryFormProps) => {
  const router = useRouter();
  const { FormData } = useStateProvider();

  const HandleSubmit = async () => {
    if (!FormData?.level1) {
      notification.error({
        message: 'Tiêu đề không được để trống',
      });
    } else {
      let Data = { ...FormData, stt: CategoryLength };

      await insertAndCustomizeId(
        'PostCategory',
        Data,
        `${`${CategoryLength ? 100000000000 + CategoryLength : 100000000000}`}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    }
  };

  return (
    <div>
      <div className="p-2 flex flex-col gap-2">
        {Type !== 'update' && (
          <div className="border border-black rounded-lg  pb-2">
            <div className="p-2">
              <InputForm
                Label="Mục cần thêm"
                Type="Radio"
                field="level0"
                Option={PostsTypeItems}
              />
            </div>
          </div>
        )}
        <InputForm
          Label="Tiêu đề"
          PlaceHolder="Nhập tiêu đề..."
          Type="Input"
          field="level1"
          Option={PostsTypeItems}
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
    </div>
  );
};

export default PostsCategoryForm;
