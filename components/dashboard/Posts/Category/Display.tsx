import { PostCategory } from '@assets/TypeProps';
import { PostsTypeItems } from '@assets/item';
import { deleteOne } from '@lib/api';
import { Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface PostsCategoryBoxProps {
  DataFilter: PostCategory[];
  Data: PostCategory[];
  setIsOpen: (isOpen: string) => void;
}

const PostsCategoryBox = ({
  DataFilter,
  Data,
  setIsOpen,
}: PostsCategoryBoxProps) => {
  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne('PostCategory', id).then(() => {
      router.refresh();
    });
  };
  return (
    <>
      <div className="mt-5 text-black">
        <div className="grid grid-cols-4 border-b-2 border-black py-3">
          {['Mục bài viết', 'Loại bài viết', 'Thời gian', ''].map(
            (item, idx) => (
              <div
                key={idx}
                className={`${item === '' ? 'col-span-2 ml-5' : '  col-span-1'}
          flex  w-full
          `}
              >
                {item}
              </div>
            )
          )}
        </div>
        <div className="h-[500px] overflow-y-auto scrollbar-thin">
          {(DataFilter.length > 0 ? DataFilter : Data)?.map((item, idx) => {
            const TopicName = PostsTypeItems.find(
              (item2) => item2.value === item.level0
            )?.label;
            return (
              <div
                className="grid grid-cols-4  border-b py-3 cursor-pointer hover:bg-slate-200 items-center "
                key={idx}
              >
                <div className=" ml-5">
                  <p>{TopicName}</p>
                </div>
                <div className="">{item.level1} </div>
                <div className="">{item.date}</div>
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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostsCategoryBox;
