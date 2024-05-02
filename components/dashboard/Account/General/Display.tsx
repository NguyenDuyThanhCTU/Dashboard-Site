import { AccountProps } from '@assets/props';
import { deleteOne } from '@config/api/api';
import { firebaseConfig } from '@config/firebase/firebase';
import { Popconfirm, Tooltip } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaEdit, FaUserCheck, FaUserTag } from 'react-icons/fa';
import { FaUserGear, FaUserPen } from 'react-icons/fa6';
import { IoBanSharp } from 'react-icons/io5';
import { MdDeleteForever, MdOutlineVerifiedUser } from 'react-icons/md';

interface ListAccountBoxProps {
  DataFilter: AccountProps[];
  setIsOpen: (isOpen: string) => void;
  Data: AccountProps[];
}

const ListAccountBox = ({
  DataFilter,
  setIsOpen,
  Data,
}: ListAccountBoxProps) => {
  const router = useRouter();
  const HandleDelete = async (id: string) => {
    deleteOne(firebaseConfig, 'Accounts', id).then(() => {
      router.refresh();
    });
  };

  return (
    <>
      <div className="mt-5 text-black d:block p:hidden ">
        <div className="grid grid-cols-8 border-b-2 border-black py-3 font-semibold px-5    ">
          {[
            'Người Dùng',
            'Thông Tin',

            'Vai Trò',
            'Trạng Thái',
            'Thời Gian',
            '',
          ].map((item, idx) => (
            <div
              key={idx}
              className={`${
                item === 'Người Dùng' || item === 'Thông Tin'
                  ? 'col-span-2  '
                  : 'col-span-1'
              }
              flex  w-full
              `}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="h-[555px] overflow-y-auto scrollbar-thin">
          {(DataFilter.length > 0 ? DataFilter : Data)?.map((item, idx) => {
            return (
              <div
                className="grid grid-cols-8 border-b py-3 cursor-pointer hover:bg-slate-100 items-center text-[14px]"
                key={idx}
              >
                <div className="text-start col-span-2  flex items-center gap-3  font-normal duration-300 ml-5 mr-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2">
                      <Image
                        src={
                          item.image
                            ? item.image
                            : 'https://firebasestorage.googleapis.com/v0/b/garagebinh-46c14.appspot.com/o/icon-image-not-found-free-vector.jpg?alt=media&token=da958ab6-061d-473f-b72d-f5442cc7ca7c'
                        }
                        alt="product"
                        width={100}
                        height={100}
                        className=" w-14 h-14 object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-[17px]">{item.name}</h2>
                      <p className="text-[14px] italic text-gray-600">
                        UID: {item.id}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col col-span-2 ml-5">
                  {item.phone ? (
                    <Link
                      className="text-blue-600 hover:underline hover:text-blue-800"
                      href={`tel:${item.phone}`}
                    >
                      {item.phone}
                    </Link>
                  ) : (
                    <p className="text-gray-500 ">Chưa cập nhật</p>
                  )}
                </div>
                <div className="text-[30px] ml-6">
                  {item.role === 'admin' ? (
                    <Tooltip title="Người quản trị">
                      <FaUserGear className="text-red-500" />
                    </Tooltip>
                  ) : item.role === 'user' ? (
                    <Tooltip title="Người dùng (Website giới thiệu)">
                      <FaUserCheck className="text-blue-500" />
                    </Tooltip>
                  ) : (
                    item.role === 'user1' && (
                      <Tooltip title="Người dùng (website bán hàng)">
                        <FaUserTag className="text-orange-500" />
                      </Tooltip>
                    )
                  )}
                </div>
                <div className="text-[30px] ml-6">
                  {item.status === 'active' ? (
                    <Tooltip title="Đang hoạt động">
                      <MdOutlineVerifiedUser className="text-green-500" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Bị cấm tạm thời ">
                      <IoBanSharp className="text-red-500" />
                    </Tooltip>
                  )}
                </div>
                <div className="">{item.date}</div>{' '}
                <div className="flex items-center  justify-center gap-3 text-[22px] mr-3 cursor-pointer">
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

export default ListAccountBox;
