'use client';
import Link from 'next/link';
import React from 'react';
import { DashboardMapping } from '../items';
import { useAuth } from '@context/AuthProviders';

const HeaderDropDown = ({ Data }: any) => {
  const { HandleDashboardNavigate } = useAuth();
  return (
    <>
      <div className="py-3 min-w-[160px] border-gray-300  border border-solid rounded-lg bg-white relative  ">
        <div className="">
          {Data?.map((item: any, index: any) => {
            const Icon = DashboardMapping[item.icon];

            return (
              <div
                onClick={() =>
                  HandleDashboardNavigate(`/admin?tab=${item.value}`)
                }
                key={index}
                className="flex gap-2 items-center font-light hover:bg-gray-100 h-max py-2 px-5 text-[14px]  rounded-md cursor-pointer"
              >
                {Icon && <Icon className="" />}
                <p className="w-max">{item.label}</p>
              </div>
            );
          })}
        </div>
        <div className="absolute w-4 h-4 border border-b-0 border-r-0 bg-white border-solid border-gray-300 -top-2 right-[50%] transform rotate-45 z-0"></div>
        <div className="w-full h-10  bg-none absolute -top-5 "> </div>
      </div>
    </>
  );
};

export default HeaderDropDown;
