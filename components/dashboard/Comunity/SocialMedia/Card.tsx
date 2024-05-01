'use client';

import { SocialMediaDashboardProps } from '@assets/TypeProps';
import { updateOne } from '@lib/api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
interface IconProps {
  className: string;
}
interface SocialMediaCardProps {
  index: number;
  Icon: React.ComponentType<IconProps>;
  value: any;
  Data: SocialMediaDashboardProps;
  field: string;
}

const SocialMediaCard = ({
  index,
  Icon,
  value,
  Data,
  field,
}: SocialMediaCardProps) => {
  const [isSelected, setSelected] = useState<number>();
  const [isSocialMedia, setSocialMedia] = useState<string>('');
  const router = useRouter();
  const HandleUpdate = () => {
    const Data = {
      [field]: isSocialMedia,
    };
    updateOne('Config', 'SocialMedia', Data).then(() => {
      router.refresh();
    });
  };

  return (
    <div className="py-3 flex flex-col gap-5 bg-slate-200 rounded-md justify-between shadow-xl cursor-pointer hover:shadow-slate-600 duration-300">
      <div className="">
        <div className="flex justify-between items-center mb-4  mx-5">
          <h3>{Data.title}</h3>
          {Icon && <Icon className={`text-[25px] p-1 ${Data.style}`} />}
        </div>
        <div>
          <img
            src={Data.image}
            alt="img"
            className="h-[193px] w-full object-cover"
          />
        </div>
      </div>
      <div className="mx-2 ">
        <div className="flex justify-between items-center mb-4">
          <h3 className="italic">{Data.title}</h3>
        </div>
        <div className="" onClick={() => setSelected(index)}>
          <input
            type="text"
            value={isSocialMedia ? isSocialMedia : value}
            className="outline-none text-black py-2 px-3 rounded-md w-full"
            onChange={(e) => setSocialMedia(e.target.value)}
          />
        </div>
      </div>
      {isSelected === index ? (
        <div
          className="text-center duration-300 uppercase py-2 border mx-2 bg-purple hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-400 border-blue-400 "
          onClick={() => HandleUpdate()}
        >
          Cập nhật
        </div>
      ) : (
        <div className="text-center duration-300 uppercase py-2 border mx-2 bg-purple  border-black text-black">
          Cập nhật
        </div>
      )}
    </div>
  );
};

export default SocialMediaCard;
