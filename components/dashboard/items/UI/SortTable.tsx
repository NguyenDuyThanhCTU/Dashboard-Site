'use client';
import { useStateProvider } from '@context/StateProvider';
import React, { useEffect, useState } from 'react';
import { FaSort } from 'react-icons/fa';

const SortTable = ({ Data, setData, Field }: any) => {
  const { setIsLoading } = useStateProvider();
  const sortItem = [
    {
      label: 'Mới nhất',
      value: 'newest',
    },
    {
      label: 'Tên: A-Z',
      value: 'nameaz',
    },
    {
      label: 'Tên: Z-A',
      value: 'nameza',
    },
    {
      label: 'Cũ nhất',
      value: 'oldest',
    },
  ];

  const HandleSort = (value: string) => {
    setIsLoading(300);
    setTimeout(() => {
      if (value === 'newest') {
        const sort = [...Data]?.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setData(sort);
      } else if (value === 'oldest') {
        const sort = [...Data]?.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setData(sort);
      } else if (value === 'nameaz') {
        const sort = [...Data]?.sort((a: any, b: any) =>
          a[Field].localeCompare(b[Field])
        );
        setData(sort);
      } else if (value === 'nameza') {
        const sort = [...Data]?.sort((a: any, b: any) =>
          b[Field].localeCompare(a[Field])
        );
        setData(sort);
      }
    }, 300);
  };
  return (
    <div>
      <div className="flex gap-5 text-[14px]">
        <div className="flex items-center gap-1 text-blue-500 bg-gray-100">
          <div className="px-2">
            <FaSort />
          </div>
          <select
            className="outline-none pr-20 border-b py-1  bg-gray-100  border-blue-500   "
            onChange={(e: any) => HandleSort(e.target.value)}
          >
            {sortItem.map((item, idx) => (
              <option
                key={idx}
                className=" font-extralight "
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortTable;
