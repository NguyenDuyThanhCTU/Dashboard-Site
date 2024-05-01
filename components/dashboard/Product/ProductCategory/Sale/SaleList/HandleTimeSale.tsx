'use client';
import InputForm from '@components/items/admin/UI/InputForm';
import { useStateProvider } from '@context/StateProvider';
import { updateOne } from '@lib/api';
import { notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const TimeSale = ({ end }: { end: string }) => {
  let endPoint: any = new Date(end);
  let currentTime: any = new Date();

  const [days, setDays] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [seconds, setSeconds] = useState<number>();
  const [hours, setHours] = useState<number>();

  useEffect(() => {
    const interval = setInterval(() => {
      const timeDifference = endPoint - currentTime;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDifference / 1000) % 60);
      setDays(days);
      setMinutes(minutes);
      setSeconds(seconds);
      setHours(hours);
    }, 1000);
    return () => clearInterval(interval);
  }, [minutes, seconds, hours]);

  return (
    <>
      {currentTime > endPoint ? (
        <div>
          <p>Sale đã kết thúc</p>
        </div>
      ) : (
        <>
          <p>KẾT THÚC SAU:</p>
          <div className=" font-bold flex gap-2 font-LexendDeca text-white w-max">
            <span className="bg-main px-1 ">{days} Ngày</span>
            <span className="bg-main px-1 ">{hours}</span>
            <span className="text-main">:</span>
            <span className="bg-main px-1 ">{minutes}</span>
            <span className="text-main">:</span>
            <span className="bg-main px-1 ">{seconds}</span>
          </div>
        </>
      )}
    </>
  );
};

const Handle = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const { FormData } = useStateProvider();
  const router = useRouter();
  const HandleSubmit = () => {
    const currentTime = new Date().toISOString().split('T')[0];

    if (!FormData?.start || !FormData?.end) {
      notification.error({
        message: 'Vui lòng điền đầy đủ thông tin',
      });
      return;
    } else if (FormData?.start > FormData?.end) {
      notification.error({
        message: 'Ngày kết thúc không hợp lệ',
        description: 'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu',
      });
    } else if (FormData?.start < currentTime) {
      notification.error({
        message: 'Ngày bắt đầu không hợp lệ',
        description: 'Ngày bắt đầu không thể nhỏ hơn ngày hiện tại',
      });
    } else {
      updateOne('Config', 'sales', FormData).then(() => {
        router.refresh();
        setIsOpen(false);
      });
    }
  };
  return (
    <div>
      <div className="p-2 flex flex-col gap-2">
        <>
          <InputForm Label="Ngày bắt đầu" Type="DatePicker" field="start" />
          <InputForm Label="Ngày kết thúc" Type="DatePicker" field="end" />
          <InputForm Label="Ghi chú" Type="TextArea" field="note" />
        </>
        <div className="flex w-full justify-end ">
          <div
            className="bg-blue-500 hover:bg-blue-700 duration-300 text-white p-2 rounded-md cursor-pointer"
            onClick={() => HandleSubmit()}
          >
            Tải lên
          </div>
        </div>
      </div>
    </div>
  );
};

export default Handle;
