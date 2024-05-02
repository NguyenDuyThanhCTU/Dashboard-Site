'use client';
import { AccountProps } from '@assets/props';
import { Progress, Statistic, Timeline } from 'antd';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUserCheck } from 'react-icons/fa';
import { FaUserGear, FaUserPen } from 'react-icons/fa6';
import { IoBanSharp } from 'react-icons/io5';
import { MdOutlineVerifiedUser } from 'react-icons/md';

const ManagerBox = ({ Data }: { Data: AccountProps[] }) => {
  const countActive = Data?.filter((item) => item.status === 'active')?.length;
  const countBlock = Data?.filter((item) => item.status === 'block')?.length;
  const countUser = Data?.filter((item) => item.role === 'user')?.length;
  const countAdmin = Data?.filter((item) => item.role === 'admin')?.length;
  const countEditor = Data?.filter((item) => item.role === 'user1')?.length;

  const activepercent: any = ((countActive / Data?.length) * 100).toFixed(2);
  const blockpercent: any = ((countBlock / Data?.length) * 100).toFixed(2);

  const conicColors = { '0%': '#d06868', '50%': '#ff8f8f', '100%': '#ff9c8f' };
  const twoColors = { '0%': '#108ee9', '100%': '#68acd0' };
  return (
    <div>
      <div className="border rounded-md my-5 border-black">
        <div className="p-4 grid grid-cols-3 items-center w-full justify-between">
          <div className="w-full col-span-2 border-r">
            <h3 className="pb-4 text-[18px] font-LexendDeca w-full border-b ">
              Tổng quan tài khoản
            </h3>

            <div className="flex items-center gap-5 pt-2">
              <Progress
                type="circle"
                percent={activepercent}
                strokeColor={twoColors}
              />
              <Progress
                percent={activepercent}
                size="small"
                strokeColor={twoColors}
              />
              <div className="truncate flex-[30%]"> Đang hoạt động </div>
            </div>
            <div className="flex items-center gap-5 mt-3 text-red-500">
              <Progress
                type="circle"
                percent={blockpercent}
                strokeColor={conicColors}
              />
              <Progress
                percent={blockpercent}
                size="small"
                strokeColor={conicColors}
              />
              <div className="flex-[30%]"> Đang tạm khóa </div>
            </div>
          </div>
          <div className=" w-full h-full">
            <div className="p-3">
              <h2 className="text-[25px] font-semibold">Hoạt Động</h2>
              <p>
                Hiện tại đang có{' '}
                <strong className="text-red-500">{Data?.length} </strong> Tài
                khoản trong hệ thống
              </p>
              <div className="border mt-5 rounded-lg bg-slate-100">
                <div className=" flex  gap-20 m-5 ">
                  <Timeline
                    items={[
                      {
                        style: { color: 'red' },
                        children: `${countAdmin} Tài khoản quản trị`,
                        dot: <FaUserGear />,
                        color: 'red',
                      },
                      {
                        style: { color: 'blue' },
                        children: `${countUser} Tài khoản người dùng`,
                        dot: <FaUserCheck />,
                        color: 'blue',
                      },
                      {
                        style: { color: 'orange' },
                        children: `${countEditor} Tài khoản biên tập viên`,
                        dot: <FaUserPen />,
                        color: 'rgb(249 115 22 / var(--tw-text-opacity))',
                      },
                    ]}
                  />
                  <Timeline
                    items={[
                      {
                        style: { color: 'green' },
                        children: `${countActive}  Tài khoản (${activepercent}%) đang hoạt động`,
                        dot: <MdOutlineVerifiedUser />,
                        color: 'green',
                      },
                      {
                        style: { color: 'red' },
                        children: `${countBlock} Tài khoản (${blockpercent}%) bị khóa`,
                        dot: <IoBanSharp />,
                        color: 'red',
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerBox;
