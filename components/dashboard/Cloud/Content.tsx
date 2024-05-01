import React from 'react';
import {
  FaCloudUploadAlt,
  FaCaretRight,
  FaCloud,
  FaInfo,
} from 'react-icons/fa';
import { MdCreateNewFolder } from 'react-icons/md';
import { FiHardDrive } from 'react-icons/fi';
import { SlOptionsVertical } from 'react-icons/sl';
import { FaArrowDownLong } from 'react-icons/fa6';
import { Progress } from 'antd';
import Display from './Content/Display';
import Detail from './Content/Detail';
const Content = () => {
  return (
    <div className="grid grid-cols-7 py-2 h-full">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          <div className="p-2 flex items-center gap-3 w-full ">
            <div className="flex items-center gap-3 bg-red-500 justify-center  rounded-full text-white w-full py-2">
              <div className="text-[25px]">
                <FaCloudUploadAlt />
              </div>
              <p>Tải lên</p>
            </div>
            <div className="rounded-full text-[22px] bg-slate-200 shadow-md shadow-gray-500 p-3">
              <MdCreateNewFolder />
            </div>
          </div>
          <div className="flex gap-2 bg-slate-200 items-center p-2 text-gray-600">
            <div className="text-[18px]">
              <FaCaretRight />
            </div>
            <div className="text-[25px]">
              <FiHardDrive />
            </div>
            <p className="text-black font-bold">My Drive</p>
          </div>
        </div>
        <div className="py-4 border ">
          <div className="w-full px-2 flex flex-col items-center gap-1">
            <div>
              <div className="text-[40px]">
                <FaCloud />
              </div>
              <p className="text-[20px] font-normal">35%</p>
            </div>
            <div className="w-full">
              <Progress percent={30} />
            </div>
            <p className="font-normal">377 MB của 1,200 MB</p>
          </div>
        </div>
      </div>

      <div className="col-span-6 h-full">
        <div className="flex justify-between h-[42px] items-center text-[20px] px-3 border-b py-1">
          <div>Home</div>
          <div className="px-4 border-l border-slate-400 h-full">
            <div className="text-[16px] flex gap-2 items-center text-slate-500 h-full">
              <SlOptionsVertical />
              <FaInfo />
            </div>
          </div>
        </div>
        <div className="border  w-full grid grid-cols-5 h-full">
          <Display />
          <Detail />
        </div>
      </div>
    </div>
  );
};

export default Content;
