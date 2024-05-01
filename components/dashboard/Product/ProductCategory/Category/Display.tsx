import { ProductCategoryProps } from '@assets/TypeProps';
import { ProductTypeItems } from '@assets/item';
import { deleteOne } from '@lib/api';
import { Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface ProductCategoryBoxProps {
  DataShow: ProductCategoryProps[];
  setIsOpen: (isOpen: string) => void;
}

const ProductCategoryBox = ({
  DataShow,
  setIsOpen,
}: ProductCategoryBoxProps) => {
  const router = useRouter();
  const HandleDelete = async (id: string) => {
    deleteOne('ProductCategory', id).then(() => {
      router.refresh();
    });
  };
  return (
    <>
      <div className="grid grid-cols-4 border-b-2 border-black py-3 font-semibold">
        {['Loại sản phẩm', 'Mục sản phẩm', 'Thời gian', ''].map((item, idx) => (
          <div
            key={idx}
            className={`
      flex  w-full
      `}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="h-[500px] overflow-y-auto scrollbar-thin ">
        {ProductTypeItems.map((item, index) => {
          const Sort: ProductCategoryProps[] = DataShow?.filter(
            (type: any) => type.level0 === item.value
          );
          return (
            <div key={index}>
              {Sort?.map((item, idx) => {
                return (
                  <div
                    className="grid cursor-default  grid-cols-4 border-b py-3  hover:bg-slate-200 items-center "
                    key={idx}
                  >
                    <div className="  ">
                      {
                        ProductTypeItems.find(
                          (type: any) => type.value === item.level0
                        )?.label
                      }
                    </div>

                    <div className="font-normal   ">{item.level1}</div>

                    <div className="w-full  ">
                      <p className="text-[14px]">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-3 text-[22px] mr-3 cursor-pointer">
                      <div
                        className="text-emerald-500 hover:text-emerald-700 duration-300 hover:scale-125"
                        onClick={() => {
                          setIsOpen(item.id);
                        }}
                      >
                        <FaEdit />
                      </div>
                      <Popconfirm
                        title="Xóa phản hồi"
                        description="Bạn có chắc chắn muốn xóa phản hồi này không?"
                        placement="topLeft"
                        onConfirm={() => HandleDelete(item.id)}
                        okType="danger"
                        okText="Yes"
                        cancelText="No"
                      >
                        <div className="text-red-500 hover:text-red-700 duration-300 hover:scale-125">
                          <MdDeleteForever />
                        </div>
                      </Popconfirm>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductCategoryBox;
