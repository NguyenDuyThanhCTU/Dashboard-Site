import { PostProps, ProductProps } from '@assets/TypeProps';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { insertAndCustomizeId } from '@lib/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SlideForm {
  setIsOpen: (isOpen: boolean) => void;
  slideLength: number;
  Type?: string;
  Products: ProductProps[];
  Posts: PostProps[];
}

const SlidesForm = ({
  setIsOpen,
  slideLength,
  Type,
  Products,
  Posts,
}: SlideForm) => {
  const { FormData } = useStateProvider();
  const RadioItem = [
    {
      label: 'Sản phẩm',
      value: 'Sản phẩm',
    },
    {
      label: 'Bài viết',
      value: 'Bài viết',
    },
  ];
  const router = useRouter();

  const HandleSubmit = async () => {
    if (!FormData?.image) {
      notification.error({ message: 'Vui lòng chọn ảnh' });
    } else {
      const Data = { ...FormData, stt: slideLength };
      await insertAndCustomizeId(
        'Slides',
        Data,
        `${slideLength ? 100000000000 + slideLength : 100000000000}`
      ).then(() => {
        setIsOpen(false);
        router.refresh();
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 overflow-y-auto h-[60vh]">
        <InputForm
          Label="Chon đối tượng liên kết"
          Type="Radio"
          field="type"
          Option={RadioItem}
        />
        {FormData?.type === 'Bài viết' ? (
          <InputForm
            Label="Bài viết liên kết"
            Type="Select"
            field="url"
            Option={Posts}
          />
        ) : (
          FormData?.type === 'Sản phẩm' && (
            <InputForm
              Label="Sản phẩm liên kết"
              Type="Select"
              field="url"
              Option={Products}
            />
          )
        )}
        <InputForm Label="Slide giới thiệu" Type="Upload" field="image" />
      </div>
      <>
        {' '}
        <div className="flex w-full justify-end mt-5 pt-3 border-t border-black">
          <div
            className="bg-red-500 hover:bg-red-700 duration-300 cursor-pointer text-white p-2 rounded-md"
            onClick={() => HandleSubmit()}
          >
            {Type === 'update' ? 'Cập nhật' : 'Thêm mới'}
          </div>
        </div>
      </>
    </div>
  );
};

export default SlidesForm;
