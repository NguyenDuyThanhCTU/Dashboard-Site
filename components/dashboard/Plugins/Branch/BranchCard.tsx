'use client';
import { useStateProvider } from '@context/StateProvider';
import { Modal, Popconfirm } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiMapPin } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { FaCircleUser } from 'react-icons/fa6';
import { GiAlarmClock } from 'react-icons/gi';
import { RiUserSettingsLine } from 'react-icons/ri';
import Handle from './Handle';
import { useRouter } from 'next/navigation';
import { deleteOne } from '@lib/api';
import Image from 'next/image';

const BranchCard = ({ Data }: any) => {
  const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false);
  const { setFormData, FormData } = useStateProvider();

  const router = useRouter();

  const HandleDelete = async (id: string) => {
    deleteOne('Branches', id).then(() => {
      router.refresh();
    });
  };
  return (
    <div className="border border-black rounded-lg shadow-lg">
      <div className="p-2">
        <h2 className="text-center uppercase font-semibold text-[22px] pb-2 border-b truncate border-black">
          {Data?.title}
        </h2>
        <div className="border mt-2 rounded-lg border-gray-400">
          <div className=" m-2 flex justify-center ">
            {Data?.MapUrl ? (
              <iframe
                src={Data?.MapUrl}
                loading="lazy"
                className="w-full h-full outline-none"
              ></iframe>
            ) : (
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/congtyads-33180.appspot.com/o/no-address-found-4344458-3613886.png?alt=media&token=6f6f2f3d-d626-401f-94a3-0988be47c0f4"
                alt="no address found"
                width={150}
                height={150}
              ></Image>
            )}
          </div>
          <div className=" m-2 bg-slate-200 rounded-lg truncate2 h-[56px]">
            <div className="p-1 ml-1">{Data?.address}</div>
          </div>
        </div>

        <div className="p-2 flex flex-col gap-2">
          <div className="pt-2 flex justify-between font-normal">
            <div className="">Địa chỉ</div>
            <Link
              href={Data?.direct ? Data?.direct : ''}
              className={`${
                Data?.direct ? 'text-blue-600 hover:underline' : 'text-gray-400'
              } flex items-center gap-1  text-[15px] cursor-pointer `}
            >
              <BiMapPin />
              <p>Chỉ đường</p>
            </Link>
          </div>

          <div className="pt-2 flex justify-between font-normal">
            <div className="">Hotline</div>
            <Link
              href={`tel:${Data?.hotline}`}
              className={`${
                Data?.hotline
                  ? 'text-blue-600 hover:underline'
                  : 'text-gray-400'
              } flex items-center gap-1  text-[15px] cursor-pointer `}
            >
              <BsTelephone className="text-[14px]" />
              <p>{Data?.hotline ? Data?.hotline : 'N/A'}</p>
            </Link>
          </div>
          <div className="pt-2 flex justify-between font-normal ">
            <div className="">Nhân sự</div>
            <div
              className={`${
                Data?.name ? 'text-blue-600 hover:underline' : 'text-gray-400'
              } flex items-center gap-1  text-[15px] cursor-pointer `}
            >
              <RiUserSettingsLine className="text-[14px]" />
              <p>{Data?.name ? Data?.name : 'N/A'}</p>
            </div>
          </div>
          <div className="pt-2 flex justify-between font-normal ">
            <div className="">Thời gian</div>
            <div
              className={`${
                Data?.name ? 'text-blue-600 hover:underline' : 'text-gray-400'
              } flex items-center gap-1  text-[15px] cursor-pointer `}
            >
              <GiAlarmClock className="text-[14px]" />
              <p className="truncate">
                {Data?.timeactive ? Data?.timeactive : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-2 text-center py-2 border-t border-black cursor-pointer font-normal ">
          <Popconfirm
            title="Xóa phản hồi"
            description="Bạn có chắc chắn muốn xóa phản hồi này không?"
            placement="left"
            onConfirm={() => HandleDelete(Data.id)}
            okType="danger"
            okText="Yes"
            cancelText="No"
          >
            <div className="w-full py-3 border-red-500 text-red-500 border hover:bg-red-500 hover:text-white duration-300">
              Xóa
            </div>
          </Popconfirm>

          <div
            className="bg-blue-500 text-white w-full py-3 hover:bg-blue-700 duration-300"
            onClick={() => {
              setFormData(Data);
              setIsOpenUpdate(true);
            }}
          >
            Chỉnh Sửa
          </div>
        </div>
      </div>

      <Modal
        title="Thêm chi nhánh"
        footer={null}
        open={isOpenUpdate}
        onCancel={() => setIsOpenUpdate(false)}
        destroyOnClose={true}
        afterClose={() => setFormData({})}
      >
        <Handle setIsOpen={setIsOpenUpdate} branchLength={FormData.stt} />
      </Modal>
    </div>
  );
};

export default BranchCard;
