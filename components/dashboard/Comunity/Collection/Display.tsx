import { CollectionProps } from '@assets/TypeProps';
import { deleteOne } from '@lib/api';
import { Image, Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface VideoCollectionBoxProps {
  Data: CollectionProps[];
  setIsOpen: (isOpen: string) => void;
}

export const ImageCollectionBox = ({ Data }: { Data: CollectionProps[] }) => {
  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne('Collections', id).then(() => {
      router.refresh();
    });
  };

  return (
    <div className="mt-5 text-black d:block p:hidden">
      <div className={`grid grid-cols-5 border-b-2 border-black p-3  `}>
        {['STT', 'Hình Ảnh', 'Thời gian', '']?.map((item, idx) => (
          <div
            key={idx}
            className={`${
              item === 'Hình Ảnh' ? 'col-span-2 ' : ' col-span-1'
            } flex  w-full `}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="h-[730px] overflow-y-auto scrollbar-thin">
        {Data?.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="grid grid-cols-5  px-3   border-b py-3 cursor-pointer hover:bg-slate-200 items-center ">
                <div className="">{idx + 1}</div>

                <div className=" col-span-2 ">
                  <div className="h-[100px]">
                    <Image
                      src={
                        item.image
                          ? item.image
                          : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                      }
                      width={200}
                      alt="product webp"
                      height={100}
                      className="h-full object-center object-contain"
                    />
                  </div>
                </div>
                <div>{item.date}</div>
                <Popconfirm
                  title="Xóa hình ảnh"
                  description="Bạn có chắc chắn muốn xóa?"
                  onConfirm={() => HandleDelete(item.id)}
                  okText="Yes"
                  okButtonProps={{
                    loading: false,
                    danger: true,
                  }}
                  cancelText="No"
                >
                  <div className="text-red-500 hover:text-red-700 duration-300 hover:scale-105 w-full flex justify-end text-[22px]">
                    <MdDeleteForever />
                  </div>
                </Popconfirm>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const VideoCollectionBox = ({
  Data,
  setIsOpen,
}: VideoCollectionBoxProps) => {
  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne('Collections', id).then(() => {
      router.refresh();
    });
  };
  return (
    <div className="mt-5 text-black d:block p:hidden">
      <div className={`grid grid-cols-5 border-b-2 border-black py-3 px-2`}>
        {['Tiêu đề', 'Video', 'Thumbnail', '']?.map((item, idx) => (
          <div
            key={idx}
            className={`${idx === 1 ? 'col-span-2' : ' col-span-1'}  w-full`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="h-[730px] overflow-y-auto scrollbar-thin ">
        {Data?.map((item, idx) => {
          return (
            <div key={idx}>
              <div className="grid grid-cols-5 border-b py-3 cursor-pointer px-2 hover:bg-slate-200 items-center ">
                <div className="text-start  ">
                  <h2 className="truncate">
                    <strong>
                      {' '}
                      {item.title ? item.title : ' Đang cập nhật'}
                    </strong>
                  </h2>
                </div>

                <div className="col-span-2">
                  <div className="p-2">
                    <iframe
                      className="w-full"
                      src={item.embedVideo}
                      title="YouTube Video"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="h-[100px]">
                  <Image
                    src={
                      item.image
                        ? item.image
                        : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                    }
                    width={100}
                    alt="thumbnail"
                    height={100}
                    className="h-full object-center object-contain"
                  />
                </div>
                <div className="flex items-center gap-3 text-[22px] mr-3 cursor-pointer justify-center">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
