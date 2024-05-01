import { PostCategory, PostProps } from '@assets/TypeProps';
import { PostsTypeItems } from '@assets/item';
import { deleteOne } from '@lib/api';
import { Pagination, Popconfirm } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import slugify from 'slugify';

interface PolicyBoxProps {
  Policy: PostProps[];
  setIsOpen: (id: string, type: string) => void;
}

interface PostListBoxProps {
  DataShow: PostProps[];
  Data: PostProps[];
  Category: PostCategory[];
  setIsOpen: (id: string, type: string) => void;
}

export const PolicyBox = ({ Policy, setIsOpen }: PolicyBoxProps) => {
  const router = useRouter();
  const HandleDelete = async (id: string) => {
    deleteOne('Posts', id).then(() => {
      router.refresh();
    });
  };
  return (
    <div>
      {' '}
      <div className="border rounded-lg mt-10">
        <div className="p-3">
          <div className="mt-5 text-black">
            <div className="grid grid-cols-4 border-b-2 border-black py-3 font-normal  px-3">
              {['Điều khoản', 'Thời gian', ''].map((item, idx) => (
                <div
                  key={idx}
                  className={`${
                    item === 'Điều khoản' ? 'col-span-2 ' : 'col-span-1'
                  } flex  w-full`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="h-[600px] overflow-y-auto scrollbar-thin ">
              {Policy?.map((items, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4  py-2 hover:bg-gray-200 px-3 items-center"
                >
                  <p className="col-span-2 truncate">{items.title}</p>
                  <p className="">{items.date}</p>

                  <div className="flex items-center gap-3 text-[22px] mr-3 cursor-pointer justify-center">
                    <div
                      className="text-emerald-500 hover:text-emerald-700 duration-300 hover:scale-125"
                      onClick={() => {
                        setIsOpen(items.id, 'policy');
                      }}
                    >
                      <FaEdit />
                    </div>
                    <Popconfirm
                      title="Xóa phản hồi"
                      description="Bạn có chắc chắn muốn xóa phản hồi này không?"
                      placement="topLeft"
                      onConfirm={() => HandleDelete(items.id)}
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PostListBox = ({
  DataShow,
  Data,
  Category,
  setIsOpen,
}: PostListBoxProps) => {
  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne('Posts', id).then(() => {
      router.refresh();
    });
  };
  return (
    <div className="p-3 ">
      <div className="mt-5 text-black">
        <div className="grid grid-cols-7 border-b-2 border-black py-3 font-normal">
          {['STT', 'Tiêu đề', 'Hình ảnh', 'Mục', 'Thời gian'].map(
            (item, idx) => (
              <div
                key={idx}
                className={`${
                  item === 'Tiêu đề'
                    ? 'col-span-2 justify-start'
                    : 'justify-center col-span-1'
                }
flex  w-full
`}
              >
                {item}
              </div>
            )
          )}
        </div>
        <div className="h-[550px] overflow-y-auto scrollbar-thin ">
          {(DataShow?.length > 0 ? DataShow : Data?.slice(0, 10))?.map(
            (item, idx) => {
              return (
                <div
                  className="grid grid-cols-7  gap-2 text-center border-b py-3 cursor-pointer hover:bg-slate-200 items-center "
                  key={idx}
                >
                  <div className="">{idx + 1}</div>
                  <div className="col-span-2 text-start truncate">
                    {item.title}
                  </div>
                  <div className="flex justify-center items-center">
                    <Image
                      src={
                        item.image
                          ? item.image
                          : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                      }
                      width={100}
                      height={100}
                      alt="product webp"
                    />
                  </div>
                  <div className="flex flex-col items-start text-[14px] ">
                    <p>
                      {
                        PostsTypeItems.find((i) => i.value === item.level0)
                          ?.label
                      }
                      <sup>(Cấp 1)</sup>
                    </p>
                    {item.level1 && (
                      <p className="border-l border-black ml-3 w-max pl-3">
                        {
                          Category?.find(
                            (i) =>
                              slugify(i.level1, {
                                locale: 'vi',
                                lower: true,
                              }) === item.level1
                          )?.level1
                        }
                        <sup>(Cấp 2 )</sup>
                      </p>
                    )}
                  </div>
                  <div className="truncate">{item.date}</div>
                  <div className="flex items-center gap-3 text-[22px] mr-3 cursor-pointer justify-center">
                    <div
                      className="text-emerald-500 hover:text-emerald-700 duration-300 hover:scale-125"
                      onClick={() => {
                        setIsOpen(item.id, 'update');
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
            }
          )}
        </div>
      </div>
    </div>
  );
};
