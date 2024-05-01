import { SlideProps } from '@assets/TypeProps';
import { WebsiteUrl } from '@assets/item';
import { deleteOne } from '@lib/api';
import { Popconfirm } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface SlideBoxProps {
  Data: SlideProps[];
  setIsOpen: (isOpen: string) => void;
}

const SlideBox = ({ Data, setIsOpen }: SlideBoxProps) => {
  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne('Slides', id).then(() => {
      router.refresh();
    });
  };

  return (
    <>
      <div className="mt-5 text-black d:block p:hidden">
        <div className="grid grid-cols-7 border-b-2 border-black py-3">
          {['Đối tượng liên kết', 'Hình ảnh', 'Liên kết', 'Thời gian', ''].map(
            (item, idx) => (
              <div
                key={idx}
                className={`${
                  item === 'Hình ảnh' || item === 'Liên kết'
                    ? 'col-span-2 '
                    : 'ml-3'
                } flex  w-full`}
              >
                {item}
              </div>
            )
          )}
        </div>
        <div className="h-[550px] scrollbar-thin overflow-y-auto">
          {Data?.map((item, idx) => {
            return (
              <div
                className="grid grid-cols-7 gap-3  border-b py-3 cursor-pointer hover:bg-slate-200 items-center "
                key={idx}
              >
                <div className="ml-3">{item.type}</div>

                <div className="flex justify-start items-center col-span-2">
                  <div className="h-[100px]">
                    <Image
                      src={
                        item.image
                          ? item.image
                          : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                      }
                      alt="slide review"
                      width={200}
                      height={300}
                      className="h-full"
                    />
                  </div>
                </div>
                <div
                  className="col-span-2  truncate text-blue-600 hover:underline"
                  onClick={() =>
                    router.push(
                      `/${
                        item.type === 'Sản phẩm'
                          ? 'chi-tiet-san-pham'
                          : item.type === 'Bài viết' && 'chi-tiet-bai-viet'
                      }/${item.url}`
                    )
                  }
                >{`${WebsiteUrl}/${
                  item.type === 'Sản phẩm'
                    ? 'chi-tiet-san-pham'
                    : item.type === 'Bài viết' && 'chi-tiet-bai-viet'
                }/${item.url}`}</div>

                <div>{item?.date}</div>
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
                    title="Xóa Slide"
                    description="Bạn có chắc chắn muốn xóa slide này không?"
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
      </div>
    </>
  );
};

export default SlideBox;
